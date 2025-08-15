import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { InteractiveLearning } from "@/components/InteractiveLearning"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

async function getCompanion(id: string) {
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

  const { data: companion, error } = await supabase
    .from("ai_companions")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error || !companion) {
    redirect("/companions")
  }

  return companion
}

export default async function InteractiveLearningPage({ params }: { params: { id: string } }) {
  const companion = await getCompanion(params.id)

  const handleQuizComplete = async (score: number, totalQuestions: number) => {
    // In a real app, save the quiz results to the database
    console.log(`Quiz completed: ${score} points out of ${totalQuestions} questions`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/companions/${companion.id}/chat`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chat
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Interactive Learning</h1>
          <p className="text-gray-600 mt-2">
            Practice {companion.subject} with {companion.name} through interactive exercises
          </p>
        </div>

        <InteractiveLearning companion={companion} onComplete={handleQuizComplete} />
      </div>
    </div>
  )
}
