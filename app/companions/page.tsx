import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Plus, MessageCircle, Settings } from "lucide-react"
import Link from "next/link"

async function getCompanions() {
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

  const { data: companions } = await supabase
    .from("ai_companions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return companions || []
}

export default async function CompanionsPage() {
  const companions = await getCompanions()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Companions</h1>
            <p className="text-gray-600 mt-2">Manage your personalized learning partners</p>
          </div>
          <Link href="/companions/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Companion
            </Button>
          </Link>
        </div>

        {companions.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Brain className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No AI Companions Yet</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Create your first AI learning companion to get personalized tutoring and support for any subject.
              </p>
              <Link href="/companions/create">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Companion
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companions.map((companion) => (
              <Card key={companion.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{companion.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="secondary">{companion.subject}</Badge>
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Link href={`/companions/${companion.id}/settings`}>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{companion.personality_traits}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Difficulty Level:</span>
                      <span className="font-medium">Level {companion.difficulty_level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Teaching Style:</span>
                      <span className="font-medium capitalize">{companion.teaching_style}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <Badge variant={companion.is_active ? "default" : "secondary"}>
                        {companion.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/companions/${companion.id}/chat`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Start Chat
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
