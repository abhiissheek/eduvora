import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ChatInterface } from "@/components/ChatInterface"

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

export default async function ChatPage({ params }: { params: { id: string } }) {
  const companion = await getCompanion(params.id)

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ChatInterface companion={companion} />
    </div>
  )
}
