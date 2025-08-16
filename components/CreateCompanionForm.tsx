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
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center text-2xl text-white">
          <Brain className="h-6 w-6 mr-3 text-[#F5F1ED]" />
          Design Your AI Companion
        </CardTitle>
        <CardDescription className="text-white/80 text-lg">Create a personalized AI tutor tailored to your learning style and goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-white font-semibold text-lg">Companion Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Professor Smith, Math Mentor Maya"
                className="mt-2 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-[#F5F1ED] focus:ring-[#F5F1ED]/20"
                required
              />
            </div>

            <div>
              <Label htmlFor="subject" className="text-white font-semibold text-lg">Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
              >
                <SelectTrigger className="mt-2 bg-white/10 border-white/20 text-white focus:border-[#F5F1ED] focus:ring-[#F5F1ED]/20">
                  <SelectValue placeholder="Choose a subject" className="text-white/60" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-white/20">
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="text-gray-800 hover:bg-[#8B6F47]/10">
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <Label className="text-white font-semibold text-lg">Difficulty Level: {formData.difficulty_level[0]}</Label>
            <div className="mt-4">
              <Slider
                value={formData.difficulty_level}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty_level: value }))}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-white/70 mt-3">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>

          {/* Teaching Style */}
          <div>
            <Label className="text-white font-semibold text-lg">Teaching Style</Label>
            <Select
              value={formData.teaching_style}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, teaching_style: value }))}
            >
              <SelectTrigger className="mt-2 bg-white/10 border-white/20 text-white focus:border-[#F5F1ED] focus:ring-[#F5F1ED]/20">
                <SelectValue placeholder="Choose teaching approach" className="text-white/60" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-white/20">
                {teachingStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value} className="text-gray-800 hover:bg-[#8B6F47]/10">
                    <div>
                      <div className="font-medium">{style.label}</div>
                      <div className="text-xs text-gray-600">{style.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Personality Traits */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <Label className="text-white font-semibold text-lg">Personality Traits</Label>
            <p className="text-sm text-white/70 mb-4 mt-2">Select traits that describe your ideal tutor</p>
            <div className="flex flex-wrap gap-3">
              {personalityTraits.map((trait) => (
                <Badge
                  key={trait}
                  variant={formData.personality_traits.includes(trait) ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    formData.personality_traits.includes(trait)
                      ? "bg-[#8B6F47] text-white hover:bg-[#8B6F47]/80 border-[#8B6F47]"
                      : "bg-white/10 text-white/80 border-white/30 hover:bg-white/20 hover:border-white/50"
                  }`}
                  onClick={() => handlePersonalityToggle(trait)}
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <Label htmlFor="objectives" className="text-white font-semibold text-lg">Learning Objectives</Label>
            <Textarea
              id="objectives"
              value={formData.learning_objectives}
              onChange={(e) => setFormData((prev) => ({ ...prev, learning_objectives: e.target.value }))}
              placeholder="What do you want to achieve? e.g., Master calculus concepts, Prepare for exams, Understand complex theories..."
              rows={4}
              className="mt-2 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-[#F5F1ED] focus:ring-[#F5F1ED]/20 resize-none"
            />
          </div>

          {/* Custom Instructions */}
          <div>
            <Label htmlFor="instructions" className="text-white font-semibold text-lg">Custom Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              value={formData.custom_instructions}
              onChange={(e) => setFormData((prev) => ({ ...prev, custom_instructions: e.target.value }))}
              placeholder="Any specific preferences or requirements for your AI companion..."
              rows={4}
              className="mt-2 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-[#F5F1ED] focus:ring-[#F5F1ED]/20 resize-none"
            />
          </div>

          <div className="pt-6">
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#8B6F47] hover:bg-[#8B6F47]/90 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Creating Companion...
                </>
              ) : (
                <>
                  <Brain className="mr-3 h-5 w-5" />
                  Create AI Companion
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
