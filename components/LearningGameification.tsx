"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, Zap, Award, Calendar } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

interface LearningGameificationProps {
  userId: string
  stats: {
    totalPoints: number
    level: number
    streak: number
    completedQuizzes: number
    studyMinutes: number
  }
}

export function LearningGameification({ userId, stats }: LearningGameificationProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    // Initialize achievements based on user stats
    const achievementList: Achievement[] = [
      {
        id: "first_quiz",
        title: "First Steps",
        description: "Complete your first quiz",
        icon: <Target className="h-5 w-5" />,
        unlocked: stats.completedQuizzes >= 1,
      },
      {
        id: "quiz_master",
        title: "Quiz Master",
        description: "Complete 10 quizzes",
        icon: <Trophy className="h-5 w-5" />,
        unlocked: stats.completedQuizzes >= 10,
        progress: stats.completedQuizzes,
        maxProgress: 10,
      },
      {
        id: "streak_warrior",
        title: "Streak Warrior",
        description: "Maintain a 7-day learning streak",
        icon: <Calendar className="h-5 w-5" />,
        unlocked: stats.streak >= 7,
        progress: stats.streak,
        maxProgress: 7,
      },
      {
        id: "study_champion",
        title: "Study Champion",
        description: "Study for 300 minutes total",
        icon: <Star className="h-5 w-5" />,
        unlocked: stats.studyMinutes >= 300,
        progress: stats.studyMinutes,
        maxProgress: 300,
      },
      {
        id: "point_collector",
        title: "Point Collector",
        description: "Earn 1000 points",
        icon: <Zap className="h-5 w-5" />,
        unlocked: stats.totalPoints >= 1000,
        progress: stats.totalPoints,
        maxProgress: 1000,
      },
      {
        id: "level_up",
        title: "Level Up",
        description: "Reach level 5",
        icon: <Award className="h-5 w-5" />,
        unlocked: stats.level >= 5,
        progress: stats.level,
        maxProgress: 5,
      },
    ]

    setAchievements(achievementList)
  }, [stats])

  const getNextLevelPoints = (currentLevel: number) => {
    return currentLevel * 100 // 100 points per level
  }

  const getCurrentLevelProgress = () => {
    const currentLevelPoints = (stats.level - 1) * 100
    const nextLevelPoints = getNextLevelPoints(stats.level)
    const progressInLevel = stats.totalPoints - currentLevelPoints
    return (progressInLevel / 100) * 100
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)

  return (
    <div className="space-y-6">
      {/* Level and Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Level {stats.level}</h3>
                <p className="text-gray-600">{stats.totalPoints} total points</p>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                <Zap className="h-4 w-4 mr-1" />
                {stats.totalPoints}
              </Badge>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Level {stats.level + 1}</span>
                <span>{Math.round(getCurrentLevelProgress())}%</span>
              </div>
              <Progress value={getCurrentLevelProgress()} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">
                {100 - Math.round(getCurrentLevelProgress())} points to next level
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.streak}</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.completedQuizzes}</div>
            <div className="text-xs text-gray-600">Quizzes Done</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{Math.round(stats.studyMinutes / 60)}h</div>
            <div className="text-xs text-gray-600">Study Time</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
            <div className="text-xs text-gray-600">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-green-600" />
            Achievements
          </CardTitle>
          <CardDescription>
            {unlockedAchievements.length} of {achievements.length} unlocked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Unlocked Achievements */}
            {unlockedAchievements.length > 0 && (
              <div>
                <h4 className="font-medium text-green-600 mb-3">Unlocked</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {unlockedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="text-green-600">{achievement.icon}</div>
                      <div className="flex-1">
                        <h5 className="font-medium text-green-800">{achievement.title}</h5>
                        <p className="text-sm text-green-600">{achievement.description}</p>
                      </div>
                      <Badge variant="default" className="bg-green-600">
                        ✓
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Locked Achievements */}
            {lockedAchievements.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-600 mb-3">In Progress</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lockedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-75"
                    >
                      <div className="text-gray-400">{achievement.icon}</div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-700">{achievement.title}</h5>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        {achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="mt-2">
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">
                              {achievement.progress} / {achievement.maxProgress}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
