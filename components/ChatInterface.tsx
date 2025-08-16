"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, ArrowLeft, Brain, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatInterfaceProps {
  companion: {
    id: string
    name: string
    subject: string
    personality_traits: string
    teaching_style: string
    difficulty_level: number
  }
}

export function ChatInterface({ companion }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    
    startSession()

    
    const welcomeMessage: Message = {
      id: "welcome",
      content: `Hello! I'm ${companion.name}, your ${companion.subject} companion. I'm here to help you learn with a ${companion.teaching_style} approach. What would you like to explore today?`,
      sender: "ai",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [companion])

  const startSession = async () => {
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companion_id: companion.id,
        }),
      })

      if (response.ok) {
        const session = await response.json()
        setSessionId(session.id)
        setSessionStartTime(new Date())
      }
    } catch (error) {
      console.error("Failed to start session:", error)
    }
  }

  const endSession = async () => {
    if (!sessionId || !sessionStartTime) return

    const duration = Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000) // minutes

    try {
      await fetch(`/api/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          duration_minutes: duration,
          message_count: messages.length,
        }),
      })
    } catch (error) {
      console.error("Failed to end session:", error)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          companionName: companion.name,
          subject: companion.subject,
          personality: companion.personality_traits,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: data.data.message,
            sender: "ai",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, aiMessage])
        } else {
          throw new Error(data.message || "Failed to get AI response")
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get AI response")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/companions">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-500 text-white">
                  <Brain className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{companion.name}</h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{companion.subject}</Badge>
                  <Badge variant="outline">Level {companion.difficulty_level}</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {sessionStartTime && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000)} min</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{messages.length} messages</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex space-x-4">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask ${companion.name} anything about ${companion.subject}...`}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  )
}
