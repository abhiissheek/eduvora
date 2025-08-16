import { redirect } from "next/navigation"
import { ChatInterface } from "@/components/ChatInterface"
import { getCurrentUser } from "@/lib/auth-utils"

async function getCompanion(id: string) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  // Mock companion data - in production, you'd fetch from your database
  const mockCompanions = [
    {
      id: '1',
      name: 'Math Mentor Maya',
      subject: 'Mathematics',
      personality_traits: 'Patient, encouraging, loves problem-solving',
      teaching_style: 'step-by-step',
      difficulty_level: 2
    },
    {
      id: '2', 
      name: 'Science Sage Sam',
      subject: 'Physics',
      personality_traits: 'Curious, experimental, great at explanations',
      teaching_style: 'hands-on',
      difficulty_level: 3
    },
    {
      id: '3',
      name: 'History Helper Helen',
      subject: 'History',
      personality_traits: 'Storyteller, engaging, connects past to present',
      teaching_style: 'narrative',
      difficulty_level: 2
    }
  ]

  const companion = mockCompanions.find(c => c.id === id)

  if (!companion) {
    redirect("/companions")
  }

  return companion
}

export default async function ChatPage({ params }: { params: { id: string } }) {
  const companion = await getCompanion(params.id)

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ChatInterface companion={companion} />
    </div>
  )
}
