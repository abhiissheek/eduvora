import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Target, Award, Calendar, BookOpen } from "lucide-react"
import { ProgressCharts } from "@/components/ProgressCharts"

async function getProgressData() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  // Get user profile for streak data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get learning sessions for time tracking
  const { data: sessions } = await supabase
    .from("learning_sessions")
    .select(`
      *,
      ai_companions (name, subject)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Get learning progress by subject
  const { data: progressData } = await supabase
    .from("learning_progress")
    .select("*")
    .eq("user_id", user.id)
    .order("last_session_at", { ascending: false })

  // Get AI companions for subject breakdown
  const { data: companions } = await supabase
    .from("ai_companions")
    .select("subject")
    .eq("user_id", user.id)
    .eq("is_active", true)

  // Calculate statistics
  const totalMinutes = sessions?.reduce((sum, session) => sum + (session.duration_minutes || 0), 0) || 0
  const totalSessions = sessions?.length || 0
  const avgSessionLength = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0

  // Calculate subject-wise progress
  const subjectProgress =
    progressData?.reduce(
      (acc, progress) => {
        const subject = progress.subject
        if (!acc[subject]) {
          acc[subject] = {
            subject,
            mastery_level: 0,
            sessions_count: 0,
            total_time: 0,
          }
        }
        acc[subject].mastery_level = Math.max(acc[subject].mastery_level, progress.mastery_level)
        acc[subject].sessions_count += progress.sessions_completed
        acc[subject].total_time += progress.total_time_minutes
        return acc
      },
      {} as Record<string, any>,
    ) || {}

  // Get recent activity (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentSessions = sessions?.filter((session) => new Date(session.created_at) >= thirtyDaysAgo) || []

  // Calculate daily activity for chart
  const dailyActivity = recentSessions.reduce(
    (acc, session) => {
      const date = new Date(session.created_at).toDateString()
      if (!acc[date]) {
        acc[date] = { date, minutes: 0, sessions: 0 }
      }
      acc[date].minutes += session.duration_minutes || 0
      acc[date].sessions += 1
      return acc
    },
    {} as Record<string, any>,
  )

  return {
    profile,
    sessions: sessions || [],
    progressData: progressData || [],
    subjectProgress: Object.values(subjectProgress),
    companions: companions || [],
    stats: {
      totalMinutes,
      totalSessions,
      avgSessionLength,
      currentStreak: profile?.current_streak || 0,
      longestStreak: profile?.longest_streak || 0,
      totalSubjects: Object.keys(subjectProgress).length,
    },
    chartData: Object.values(dailyActivity),
  }
}

export default async function ProgressPage() {
  const { stats, subjectProgress, chartData, sessions } = await getProgressData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
          <p className="text-gray-600 mt-2">Track your learning journey and achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.totalMinutes / 60)}h</div>
              <p className="text-xs text-muted-foreground">{stats.totalMinutes} minutes total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Sessions</CardTitle>
              <BookOpen className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground">{stats.avgSessionLength} min average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubjects}</div>
              <p className="text-xs text-muted-foreground">active subjects</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Learning Activity (Last 30 Days)
                </CardTitle>
                <CardDescription>Your daily learning time and session count</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressCharts data={chartData} />
              </CardContent>
            </Card>
          </div>

          {/* Subject Progress */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Subject Mastery</CardTitle>
                <CardDescription>Your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                {subjectProgress.length === 0 ? (
                  <div className="text-center py-6">
                    <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No progress data yet</p>
                    <p className="text-xs text-gray-500">Start learning to see your progress</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subjectProgress.map((subject: any) => (
                      <div key={subject.subject} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{subject.subject}</span>
                          <Badge variant="outline">{subject.mastery_level}%</Badge>
                        </div>
                        <Progress value={subject.mastery_level} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{subject.sessions_count} sessions</span>
                          <span>{Math.round(subject.total_time / 60)}h total</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.totalSessions >= 10 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Dedicated Learner</p>
                        <p className="text-xs text-gray-500">Completed 10+ sessions</p>
                      </div>
                    </div>
                  )}

                  {stats.currentStreak >= 7 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Week Warrior</p>
                        <p className="text-xs text-gray-500">7-day learning streak</p>
                      </div>
                    </div>
                  )}

                  {stats.totalMinutes >= 300 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Time Master</p>
                        <p className="text-xs text-gray-500">5+ hours of learning</p>
                      </div>
                    </div>
                  )}

                  {stats.totalSubjects >= 3 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Multi-Subject Explorer</p>
                        <p className="text-xs text-gray-500">Learning 3+ subjects</p>
                      </div>
                    </div>
                  )}

                  {stats.totalSessions === 0 && (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-600">Start learning to unlock achievements!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Sessions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Learning Sessions</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Sessions Yet</h3>
                <p className="text-gray-600">Start chatting with your AI companions to see your progress!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.slice(0, 10).map((session: any) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{session.ai_companions?.name || "Unknown Companion"}</p>
                        <p className="text-sm text-gray-600">{session.ai_companions?.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{session.duration_minutes || 0} minutes</p>
                      <p className="text-xs text-gray-500">{new Date(session.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
