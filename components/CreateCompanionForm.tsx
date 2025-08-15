"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Brain, Loader2 } from "lucide-react"

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English Literature",
  "History",
  "Geography",
  "Economics",
  "Psychology",
  "Philosophy",
  "Art",
  "Music",
  "Languages",
  "Engineering",
]

const teachingStyles = [
  { value: "socratic", label: "Socratic", description: "Learns through questioning and discussion" },
  { value: "visual", label: "Visual", description: "Uses diagrams, charts, and visual aids" },
  { value: "practical", label: "Practical", description: "Focuses on real-world applications" },
  { value: "encouraging", label: "Encouraging", description: "Supportive and motivational approach" },
  { value: "analytical", label: "Analytical", description: "Breaks down complex problems step-by-step" },
]

const personalityTraits = [
  "Patient",
  "Enthusiastic",
  "Analytical",
  "Creative",
  "Supportive",
  "Challenging",
  "Humorous",
  "Methodical",
  "Inspiring",
  "Practical",
]

export function CreateCompanionForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    difficulty_level: [5],
    teaching_style: "",
    personality_traits: [] as string[],
    custom_instructions: "",
    learning_objectives: "",
  })

  const handlePersonalityToggle = (trait: string) => {
    setFormData((prev) => ({
      ...prev,
      personality_traits: prev.personality_traits.includes(trait)
        ? prev.personality_traits.filter((t) => t !== trait)
        : [...prev.personality_traits, trait],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/companions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          difficulty_level: formData.difficulty_level[0],
          personality_traits: formData.personality_traits.join(", "),
        }),
      })

      if (response.ok) {
        const companion = await response.json()
        router.push(`/companions/${companion.id}/chat`)
      } else {
        console.error("Failed to create companion")
      }
    } catch (error) {
      console.error("Error creating companion:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-blue-600" />
          Design Your AI Companion
        </CardTitle>
        <CardDescription>Create a personalized AI tutor tailored to your learning style and goals</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Companion Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Professor Smith, Math Mentor Maya"
                required
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <Label>Difficulty Level: {formData.difficulty_level[0]}</Label>
            <div className="mt-2">
              <Slider
                value={formData.difficulty_level}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty_level: value }))}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>

          {/* Teaching Style */}
          <div>
            <Label>Teaching Style</Label>
            <Select
              value={formData.teaching_style}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, teaching_style: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose teaching approach" />
              </SelectTrigger>
              <SelectContent>
                {teachingStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    <div>
                      <div className="font-medium">{style.label}</div>
                      <div className="text-xs text-gray-500">{style.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Personality Traits */}
          <div>
            <Label>Personality Traits</Label>
            <p className="text-sm text-gray-600 mb-3">Select traits that describe your ideal tutor</p>
            <div className="flex flex-wrap gap-2">
              {personalityTraits.map((trait) => (
                <Badge
                  key={trait}
                  variant={formData.personality_traits.includes(trait) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handlePersonalityToggle(trait)}
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <Label htmlFor="objectives">Learning Objectives</Label>
            <Textarea
              id="objectives"
              value={formData.learning_objectives}
              onChange={(e) => setFormData((prev) => ({ ...prev, learning_objectives: e.target.value }))}
              placeholder="What do you want to achieve? e.g., Master calculus concepts, Prepare for exams, Understand complex theories..."
              rows={3}
            />
          </div>

          {/* Custom Instructions */}
          <div>
            <Label htmlFor="instructions">Custom Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              value={formData.custom_instructions}
              onChange={(e) => setFormData((prev) => ({ ...prev, custom_instructions: e.target.value }))}
              placeholder="Any specific preferences or requirements for your AI companion..."
              rows={3}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Companion...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Create AI Companion
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
