"use client"

import { useState } from "react"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Getting Started", "AI Companions", "Billing", "Technical", "Account"]

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create my first AI companion?",
      answer:
        "After signing up, go to your dashboard and click 'Create New Companion'. Choose a subject, customize the personality, and start learning! Your AI companion will adapt to your learning style over time.",
    },
    {
      category: "Getting Started",
      question: "What subjects are available for AI companions?",
      answer:
        "We support all major subjects including Mathematics, Physics, Chemistry, Biology, English, Hindi, History, Geography, Economics, and more. You can create companions for competitive exam preparation too.",
    },
    {
      category: "AI Companions",
      question: "How does the AI understand my learning style?",
      answer:
        "Our AI analyzes your interaction patterns, response times, question types, and learning preferences to create a personalized tutoring experience that adapts to your unique needs.",
    },
    {
      category: "AI Companions",
      question: "Can I have multiple AI companions?",
      answer:
        "Yes! Free users get 1 companion, Core plan users get up to 5 companions, and Pro plan users get unlimited companions for different subjects and topics.",
    },
    {
      category: "Billing",
      question: "How does the pricing work?",
      answer:
        "We offer three plans: Free (₹0 - 1 companion), Core (₹499/month - enhanced features), and Pro (₹999/month - unlimited access). You can upgrade or downgrade anytime.",
    },
    {
      category: "Billing",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period.",
    },
    {
      category: "Technical",
      question: "What devices are supported?",
      answer:
        "Eduvora works on all modern web browsers on desktop, tablet, and mobile devices. We also have dedicated mobile apps for iOS and Android coming soon.",
    },
    {
      category: "Technical",
      question: "Is my data secure?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your data. We never share your personal information or learning data with third parties.",
    },
    {
      category: "Account",
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link. Follow the instructions in the email to create a new password.",
    },
    {
      category: "Account",
      question: "Can I change my email address?",
      answer:
        "Yes, you can update your email address in your account settings. You'll need to verify the new email address before the change takes effect.",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B6F47] via-[#A67C52] to-[#D4B896]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div
          className="text-2xl font-bold text-white font-serif cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Eduvora
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-white/90">
          <button onClick={() => (window.location.href = "/")} className="hover:text-white transition-colors">
            Home
          </button>
          <button onClick={() => (window.location.href = "/about")} className="hover:text-white transition-colors">
            About
          </button>
          <button onClick={() => (window.location.href = "/blog")} className="hover:text-white transition-colors">
            Blog
          </button>
          <button onClick={() => (window.location.href = "/login")} className="hover:text-white transition-colors">
            Login
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-0 w-96 h-96 bg-[#F5F1ED] rounded-full opacity-20 -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#D4B896] rounded-full opacity-30 translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div className="relative z-10 px-6 py-16 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">Help Center</h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Find answers to common questions about Eduvora's AI-powered learning platform. Can't find what you're
                looking for? Contact our support team.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-12">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 text-lg"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center hover:bg-white/15 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-[#8B6F47] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Getting Started Guide</h3>
                <p className="text-white/70 text-sm">
                  Learn how to set up your account and create your first AI companion
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center hover:bg-white/15 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-[#A67C52] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Contact Support</h3>
                <p className="text-white/70 text-sm">Get personalized help from our support team</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center hover:bg-white/15 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-[#D4B896] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📖</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Documentation</h3>
                <p className="text-white/70 text-sm">Detailed guides and API documentation</p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-[#8B6F47] text-white"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <div className="flex-1">
                        <span className="bg-[#A67C52] text-white px-2 py-1 rounded-full text-xs mr-3">
                          {faq.category}
                        </span>
                        <span className="text-white font-semibold">{faq.question}</span>
                      </div>
                      <div className="text-white group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-16">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl text-center">
                <h2 className="text-3xl font-semibold text-white mb-4">Still Need Help?</h2>
                <p className="text-white/70 mb-6">
                  Can't find the answer you're looking for? Our support team is here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="bg-[#8B6F47] hover:bg-[#8B6F47]/90 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    onClick={() => alert("Opening chat support...")}
                  >
                    Start Live Chat
                  </button>
                  <button
                    className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-full font-semibold transition-colors"
                    onClick={() => alert("Email: support@eduvora.in")}
                  >
                    Email Support
                  </button>
                </div>
                <p className="text-white/60 text-sm mt-4">Average response time: 2 hours • Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
