import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Brain, Clock, TrendingUp, Plus, Play } from "lucide-react"
import Link from "next/link"
import DashboardClientActions from "@/components/DashboardClientActions"

async function getDashboardData() {
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

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get AI companions
  const { data: companions } = await supabase
    .from("ai_companions")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .limit(6)

  // Get recent learning sessions
  const { data: recentSessions } = await supabase
    .from("learning_sessions")
    .select(`
      *,
      ai_companions (name, subject)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Get learning progress
  const { data: progressData } = await supabase.from("learning_progress").select("*").eq("user_id", user.id)

  // Calculate stats
  const totalMinutes = recentSessions?.reduce((sum, session) => sum + (session.duration_minutes || 0), 0) || 0
  const avgMastery = progressData?.reduce((sum, p) => sum + p.mastery_level, 0) / (progressData?.length || 1) || 0

  return {
    user,
    profile,
    companions: companions || [],
    recentSessions: recentSessions || [],
    progressData: progressData || [],
    stats: {
      totalCompanions: companions?.length || 0,
      totalMinutes,
      avgMastery: Math.round(avgMastery),
      streakDays: profile?.current_streak || 0,
    },
  }
}

export default async function DashboardPage() {
  const { user, profile, companions, recentSessions, stats } = await getDashboardData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B6F47] via-[#A67C52] to-[#D4B896]">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <Link href="/" className="text-2xl font-bold text-white font-serif">
          Eduvora
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-white/90">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/companions" className="hover:text-white transition-colors">
            Companions
          </Link>
          <Link href="/progress" className="hover:text-white transition-colors">
            Progress
          </Link>
          <Link href="/subscription" className="hover:text-white transition-colors">
            Subscription
          </Link>
          <Link href="/help" className="hover:text-white transition-colors">
            Help
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <DashboardClientActions />
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="bg-white/20 text-white text-sm">
              {(profile?.full_name || user.email || "U")[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {profile?.full_name || user.email?.split("@")[0]}!
              </h1>
              <p className="text-white/80 mt-2">Ready to continue your learning journey?</p>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="bg-white/20 text-white text-lg">
                {(profile?.full_name || user.email || "U")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">AI Companions</CardTitle>
              <Brain className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalCompanions}</div>
              <p className="text-xs text-white/70">Active learning partners</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Learning Time</CardTitle>
              <Clock className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{Math.round(stats.totalMinutes / 60)}h</div>
              <p className="text-xs text-white/70">Total study time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Mastery Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.avgMastery}%</div>
              <p className="text-xs text-white/70">Average across subjects</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Streak</CardTitle>
              <BookOpen className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.streakDays}</div>
              <p className="text-xs text-white/70">Days in a row</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Companions */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Your AI Companions</CardTitle>
                  <CardDescription className="text-white/70">
                    Manage your personalized learning partners
                  </CardDescription>
                </div>
                <Link href="/companions/create">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {companions.length === 0 ? (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-white/60 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No AI Companions Yet</h3>
                    <p className="text-white/70 mb-4">Create your first AI learning companion to get started!</p>
                    <Link href="/companions/create">
                      <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Companion
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {companions.map((companion) => (
                      <div
                        key={companion.id}
                        className="border border-white/20 rounded-lg p-4 hover:bg-white/5 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-white">{companion.name}</h4>
                            <Badge variant="secondary" className="mt-1 bg-white/20 text-white border-0">
                              {companion.subject}
                            </Badge>
                          </div>
                          <Link href={`/companions/${companion.id}/chat`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Chat
                            </Button>
                          </Link>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{companion.personality_traits}</p>
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>Level {companion.difficulty_level}</span>
                          <span>Created {new Date(companion.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Sessions</CardTitle>
                <CardDescription className="text-white/70">Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                {recentSessions.length === 0 ? (
                  <div className="text-center py-6">
                    <Clock className="h-8 w-8 text-white/60 mx-auto mb-2" />
                    <p className="text-sm text-white/70">No recent sessions</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {session.ai_companions?.name || "Unknown Companion"}
                          </p>
                          <p className="text-xs text-white/60">
                            {session.duration_minutes} min • {session.ai_companions?.subject}
                          </p>
                        </div>
                        <div className="text-xs text-white/50">{new Date(session.created_at).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/companions/create" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create AI Companion
                  </Button>
                </Link>
                <Link href="/progress" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Progress
                  </Button>
                </Link>
                <Link href="/profile" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Avatar className="h-4 w-4 mr-2">
                      <AvatarFallback className="text-xs bg-white/20 text-white">P</AvatarFallback>
                    </Avatar>
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
