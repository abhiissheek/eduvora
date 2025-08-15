"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Lightbulb, Trophy, Target, Brain } from "lucide-react"

interface Question {
  id: string
  type: "multiple_choice" | "true_false" | "short_answer" | "essay"
  question: string
  options?: string[]
  correct_answer: string
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  points: number
}

interface InteractiveLearningProps {
  companion: {
    id: string
    name: string
    subject: string
  }
  onComplete?: (score: number, totalQuestions: number) => void
}

export function InteractiveLearning({ companion, onComplete }: InteractiveLearningProps) {
  const [currentMode, setCurrentMode] = useState<"quiz" | "practice" | "flashcards" | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)

  // Sample questions - in a real app, these would come from an API
  const sampleQuestions: Question[] = [
    {
      id: "1",
      type: "multiple_choice",
      question: "What is the derivative of x²?",
      options: ["2x", "x", "2", "x²"],
      correct_answer: "2x",
      explanation: "Using the power rule: d/dx(x²) = 2x¹ = 2x",
      difficulty: "easy",
      points: 10,
    },
    {
      id: "2",
      type: "true_false",
      question: "The integral of a constant is always zero.",
      options: ["True", "False"],
      correct_answer: "False",
      explanation: "The integral of a constant c is cx + C, where C is the constant of integration.",
      difficulty: "medium",
      points: 15,
    },
    {
      id: "3",
      type: "short_answer",
      question: "What is the limit of (sin x)/x as x approaches 0?",
      correct_answer: "1",
      explanation: "This is a fundamental limit in calculus: lim(x→0) (sin x)/x = 1",
      difficulty: "medium",
      points: 20,
    },
  ]

  const startQuiz = async () => {
    setLoading(true)
    setCurrentMode("quiz")

    // In a real app, fetch questions from API based on companion subject
    setTimeout(() => {
      setQuestions(sampleQuestions)
      setCurrentQuestionIndex(0)
      setUserAnswers({})
      setShowResults(false)
      setScore(0)
      setLoading(false)
    }, 1000)
  }

  const startPractice = () => {
    setCurrentMode("practice")
    // Similar to quiz but with immediate feedback
    setQuestions(sampleQuestions)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setShowResults(false)
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    let totalScore = 0
    questions.forEach((question) => {
      if (userAnswers[question.id]?.toLowerCase().trim() === question.correct_answer.toLowerCase().trim()) {
        totalScore += question.points
      }
    })
    setScore(totalScore)
    setShowResults(true)
    onComplete?.(totalScore, questions.length)
  }

  const resetQuiz = () => {
    setCurrentMode(null)
    setQuestions([])
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0)

  if (!currentMode) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            Interactive Learning with {companion.name}
          </CardTitle>
          <CardDescription>Choose your learning mode to practice {companion.subject} concepts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={startQuiz}>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Quiz Mode</h3>
                <p className="text-sm text-gray-600">Test your knowledge with timed questions and get a final score</p>
                <Button className="mt-4 w-full" disabled={loading}>
                  {loading ? "Loading..." : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={startPractice}>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Practice Mode</h3>
                <p className="text-sm text-gray-600">Learn at your own pace with immediate feedback and hints</p>
                <Button className="mt-4 w-full bg-transparent" variant="outline">
                  Start Practice
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow opacity-75">
              <CardContent className="p-6 text-center">
                <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Flashcards</h3>
                <p className="text-sm text-gray-600">Review key concepts with interactive flashcards</p>
                <Button className="mt-4 w-full bg-transparent" variant="outline" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow opacity-75">
              <CardContent className="p-6 text-center">
                <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI Tutor</h3>
                <p className="text-sm text-gray-600">Get personalized explanations and step-by-step solutions</p>
                <Button className="mt-4 w-full bg-transparent" variant="outline" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    const percentage = Math.round((score / maxScore) * 100)
    const getGrade = (percentage: number) => {
      if (percentage >= 90) return { grade: "A+", color: "text-green-600", message: "Excellent work!" }
      if (percentage >= 80) return { grade: "A", color: "text-green-600", message: "Great job!" }
      if (percentage >= 70) return { grade: "B", color: "text-blue-600", message: "Good work!" }
      if (percentage >= 60) return { grade: "C", color: "text-yellow-600", message: "Keep practicing!" }
      return { grade: "D", color: "text-red-600", message: "Need more practice" }
    }

    const gradeInfo = getGrade(percentage)

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${gradeInfo.color} mb-2`}>{gradeInfo.grade}</div>
            <div className="text-2xl font-semibold mb-2">
              {score} / {maxScore} points
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {percentage}% - {gradeInfo.message}
            </div>
            <Progress value={percentage} className="w-full max-w-md mx-auto" />
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-semibold">Question Review:</h3>
            {questions.map((question, index) => {
              const userAnswer = userAnswers[question.id]
              const isCorrect = userAnswer?.toLowerCase().trim() === question.correct_answer.toLowerCase().trim()

              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">
                        Q{index + 1}: {question.question}
                      </p>
                      <div className="text-sm space-y-1">
                        <p>
                          Your answer:{" "}
                          <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                            {userAnswer || "No answer"}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p>
                            Correct answer: <span className="text-green-600">{question.correct_answer}</span>
                          </p>
                        )}
                        <p className="text-gray-600">{question.explanation}</p>
                      </div>
                    </div>
                    <Badge variant={isCorrect ? "default" : "secondary"}>
                      {isCorrect ? `+${question.points}` : "0"} pts
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex space-x-4">
            <Button onClick={resetQuiz} variant="outline" className="flex-1 bg-transparent">
              Try Again
            </Button>
            <Button onClick={() => setCurrentMode(null)} className="flex-1">
              Choose Another Mode
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardTitle>
          <Badge variant="outline" className="capitalize">
            {currentQuestion.difficulty}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

            {currentQuestion.type === "multiple_choice" && currentQuestion.options && (
              <RadioGroup
                value={userAnswers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "true_false" && currentQuestion.options && (
              <RadioGroup
                value={userAnswers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`tf-${index}`} />
                    <Label htmlFor={`tf-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "short_answer" && (
              <Textarea
                placeholder="Enter your answer..."
                value={userAnswers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                rows={3}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">{currentQuestion.points} points</span>
            </div>

            <Button onClick={nextQuestion} disabled={!userAnswers[currentQuestion.id]}>
              {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
