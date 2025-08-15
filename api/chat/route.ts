import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, companion_id, session_id, conversation_history } = await request.json()

    // Get companion details
    const { data: companion, error: companionError } = await supabase
      .from("ai_companions")
      .select("*")
      .eq("id", companion_id)
      .eq("user_id", user.id)
      .single()

    if (companionError || !companion) {
      return NextResponse.json({ error: "Companion not found" }, { status: 404 })
    }

    // Create AI prompt based on companion personality
    const systemPrompt = `You are ${companion.name}, an AI learning companion specializing in ${companion.subject}. 

Your personality traits: ${companion.personality_traits}
Your teaching style: ${companion.teaching_style}
Difficulty level: ${companion.difficulty_level}/10
Learning objectives: ${companion.learning_objectives || "General learning support"}
Custom instructions: ${companion.custom_instructions || "None"}

Guidelines:
- Stay in character as ${companion.name}
- Focus on ${companion.subject} topics
- Use a ${companion.teaching_style} teaching approach
- Adjust complexity to level ${companion.difficulty_level}/10
- Be encouraging and supportive
- Ask follow-up questions to ensure understanding
- Provide examples and explanations appropriate to the difficulty level
- If asked about topics outside ${companion.subject}, gently redirect to your specialty

Respond naturally and conversationally while maintaining your teaching role.`

    // For now, we'll create a simple response system
    // In a real implementation, you would integrate with OpenAI, Anthropic, or another AI service
    const aiResponse = generateSimpleResponse(message, companion, conversation_history)

    // Store the conversation in the database
    await supabase.from("chat_messages").insert([
      {
        session_id,
        companion_id,
        user_id: user.id,
        message_type: "user",
        content: message,
      },
      {
        session_id,
        companion_id,
        user_id: user.id,
        message_type: "ai",
        content: aiResponse,
      },
    ])

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Simple response generation (replace with actual AI service integration)
function generateSimpleResponse(message: string, companion: any, history: any[]): string {
  const lowerMessage = message.toLowerCase()

  // Subject-specific responses
  if (companion.subject === "Mathematics") {
    if (lowerMessage.includes("calculus")) {
      return "Calculus is fascinating! It's all about understanding rates of change and areas under curves. What specific aspect of calculus would you like to explore? Derivatives, integrals, or perhaps limits?"
    }
    if (lowerMessage.includes("algebra")) {
      return "Algebra is the foundation of so much mathematics! Think of it as a language for describing relationships between quantities. What algebraic concept are you working on?"
    }
  }

  if (companion.subject === "Physics") {
    if (lowerMessage.includes("force") || lowerMessage.includes("newton")) {
      return "Ah, forces! Newton's laws are fundamental to understanding motion. Remember: F = ma. Force equals mass times acceleration. What scenario are you trying to analyze?"
    }
  }

  // General encouraging responses
  const encouragingResponses = [
    `That's a great question! As your ${companion.subject} companion, I'd love to help you explore this further. Can you tell me more about what specifically interests you about this topic?`,
    `I appreciate your curiosity! In ${companion.subject}, this kind of thinking is exactly what leads to deeper understanding. Let's break this down step by step.`,
    `Excellent! This is exactly the kind of question that shows you're really thinking about ${companion.subject}. Let me guide you through this concept.`,
  ]

  // Question responses
  if (lowerMessage.includes("?")) {
    return encouragingResponses[Math.floor(Math.random() * encouragingResponses.length)]
  }

  // Default responses based on teaching style
  if (companion.teaching_style === "socratic") {
    return "That's interesting! Let me ask you this: what do you think might happen if we approach this problem from a different angle? What's your initial intuition?"
  }

  if (companion.teaching_style === "encouraging") {
    return `You're doing great! I can see you're really thinking about this. In ${companion.subject}, this kind of curiosity is exactly what leads to breakthroughs. What would you like to explore next?`
  }

  return `Thank you for sharing that with me! As your ${companion.subject} companion, I'm here to help you understand these concepts deeply. What specific aspect would you like to focus on?`
}
