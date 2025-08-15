"use client"

import { useState } from "react"

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("getting-started")

  const sections = [
    { id: "getting-started", title: "Getting Started", icon: "🚀" },
    { id: "ai-companions", title: "AI Companions", icon: "🤖" },
    { id: "dashboard", title: "Dashboard", icon: "📊" },
    { id: "learning-sessions", title: "Learning Sessions", icon: "📚" },
    { id: "progress-tracking", title: "Progress Tracking", icon: "📈" },
    { id: "subscription", title: "Subscription Management", icon: "💳" },
    { id: "api", title: "API Reference", icon: "⚡" },
    { id: "troubleshooting", title: "Troubleshooting", icon: "🔧" },
  ]

  const content = {
    "getting-started": {
      title: "Getting Started with Eduvora",
      sections: [
        {
          title: "1. Create Your Account",
          content: `Sign up for Eduvora using your email address. You'll receive a verification email to activate your account.

**Steps:**
- Visit the signup page
- Enter your full name, email, and password
- Check your email for verification link
- Click the link to activate your account`,
        },
        {
          title: "2. Choose Your Plan",
          content: `Select the plan that best fits your learning needs:

**Free Plan (₹0/month):**
- 1 AI companion
- Basic NCERT solutions
- Limited learning sessions

**Core Plan (₹499/month):**
- Up to 5 AI companions
- Enhanced tutoring features
- Doubt solving support
- Progress analytics

**Pro Plan (₹999/month):**
- Unlimited AI companions
- Advanced features
- Priority support
- Complete exam preparation suite`,
        },
        {
          title: "3. Create Your First AI Companion",
          content: `After logging in, create your first AI learning companion:

**Steps:**
- Go to your dashboard
- Click "Create New Companion"
- Select a subject (Math, Physics, Chemistry, etc.)
- Choose personality traits
- Set learning goals
- Start your first conversation`,
        },
      ],
    },
    "ai-companions": {
      title: "AI Companions Guide",
      sections: [
        {
          title: "Creating AI Companions",
          content: `AI companions are personalized tutors that adapt to your learning style and pace.

**Customization Options:**
- Subject specialization
- Teaching style (patient, encouraging, challenging)
- Difficulty level adaptation
- Language preferences (English, Hindi, regional languages)
- Exam focus (CBSE, ICSE, competitive exams)`,
        },
        {
          title: "Interacting with Companions",
          content: `Your AI companions can help with:

**Academic Support:**
- Concept explanations
- Problem-solving guidance
- Doubt clearing
- Practice questions
- Mock tests

**Communication:**
- Text-based conversations
- Voice interactions (coming soon)
- Image-based problem solving
- Step-by-step solutions`,
        },
        {
          title: "Companion Management",
          content: `Manage your AI companions effectively:

**Features:**
- Edit companion personalities
- Archive unused companions
- Share companions with friends
- Export conversation history
- Set study reminders`,
        },
      ],
    },
    dashboard: {
      title: "Dashboard Overview",
      sections: [
        {
          title: "Dashboard Layout",
          content: `Your dashboard provides a comprehensive view of your learning journey:

**Main Sections:**
- Active companions overview
- Recent learning sessions
- Progress charts and analytics
- Upcoming study reminders
- Achievement badges
- Quick access to create new companions`,
        },
        {
          title: "Navigation",
          content: `Navigate through different sections:

**Menu Items:**
- Companions: Manage your AI tutors
- Sessions: View learning history
- Progress: Track your improvement
- Settings: Account and preferences
- Billing: Subscription management`,
        },
      ],
    },
    "learning-sessions": {
      title: "Learning Sessions",
      sections: [
        {
          title: "Starting a Session",
          content: `Begin productive learning sessions with your AI companions:

**Session Types:**
- Free conversation: Ask any questions
- Structured lessons: Follow curriculum
- Problem solving: Work through exercises
- Mock tests: Practice for exams
- Doubt clearing: Get specific help`,
        },
        {
          title: "Session Features",
          content: `Make the most of your learning sessions:

**Available Tools:**
- Whiteboard for visual explanations
- Code editor for programming topics
- Mathematical equation editor
- Image upload for problem photos
- Session recording and playback`,
        },
      ],
    },
    "progress-tracking": {
      title: "Progress Tracking",
      sections: [
        {
          title: "Analytics Dashboard",
          content: `Monitor your learning progress with detailed analytics:

**Metrics Tracked:**
- Study time per subject
- Concept mastery levels
- Problem-solving accuracy
- Learning streak counters
- Improvement trends over time`,
        },
        {
          title: "Reports and Insights",
          content: `Get actionable insights about your learning:

**Report Types:**
- Weekly progress summaries
- Subject-wise performance
- Strength and weakness analysis
- Recommended study areas
- Goal achievement tracking`,
        },
      ],
    },
    subscription: {
      title: "Subscription Management",
      sections: [
        {
          title: "Plan Comparison",
          content: `Choose the right plan for your needs:

**Free Plan:**
- 1 AI companion
- Basic features
- Community support

**Core Plan (₹499/month):**
- 5 AI companions
- Enhanced features
- Email support
- Progress analytics

**Pro Plan (₹999/month):**
- Unlimited companions
- All features
- Priority support
- Advanced analytics`,
        },
        {
          title: "Billing and Payments",
          content: `Manage your subscription easily:

**Payment Options:**
- Credit/Debit cards
- UPI payments
- Net banking
- Digital wallets

**Billing Features:**
- Automatic renewals
- Invoice downloads
- Payment history
- Refund requests`,
        },
      ],
    },
    api: {
      title: "API Reference",
      sections: [
        {
          title: "Authentication",
          content: `Authenticate API requests using JWT tokens:

\`\`\`javascript
// Get authentication token
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
});

const { token } = await response.json();
\`\`\``,
        },
        {
          title: "Companions API",
          content: `Manage AI companions programmatically:

\`\`\`javascript
// Create a new companion
const companion = await fetch('/api/user/companions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Math Tutor',
    subject: 'mathematics',
    personality: 'patient'
  })
});
\`\`\``,
        },
      ],
    },
    troubleshooting: {
      title: "Troubleshooting",
      sections: [
        {
          title: "Common Issues",
          content: `Solutions to frequently encountered problems:

**Login Issues:**
- Clear browser cache and cookies
- Check email verification status
- Reset password if needed
- Contact support for account issues

**Companion Not Responding:**
- Check internet connection
- Refresh the page
- Try creating a new session
- Report persistent issues to support`,
        },
        {
          title: "Performance Optimization",
          content: `Improve your Eduvora experience:

**Browser Recommendations:**
- Use latest Chrome, Firefox, or Safari
- Enable JavaScript
- Allow cookies for eduvora.in
- Disable ad blockers if needed

**Network Requirements:**
- Stable internet connection
- Minimum 1 Mbps speed
- Low latency for real-time features`,
        },
      ],
    },
  }

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
          <button onClick={() => (window.location.href = "/help")} className="hover:text-white transition-colors">
            Help
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

        <div className="relative z-10 flex">
          {/* Sidebar */}
          <div className="w-80 bg-white/10 backdrop-blur-sm border-r border-white/20 min-h-screen p-6">
            <h2 className="text-2xl font-bold text-white mb-8">Documentation</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                    activeSection === section.id
                      ? "bg-[#8B6F47] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 lg:p-12">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold text-white mb-8">
                {content[activeSection as keyof typeof content].title}
              </h1>

              <div className="space-y-12">
                {content[activeSection as keyof typeof content].sections.map((section, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold text-white mb-6">{section.title}</h2>
                    <div className="prose prose-invert max-w-none">
                      <pre className="text-white/80 leading-relaxed whitespace-pre-wrap font-sans">
                        {section.content}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/20">
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex((s) => s.id === activeSection)
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1].id)
                    }
                  }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-full font-semibold transition-colors disabled:opacity-50"
                  disabled={sections.findIndex((s) => s.id === activeSection) === 0}
                >
                  ← Previous
                </button>

                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex((s) => s.id === activeSection)
                    if (currentIndex < sections.length - 1) {
                      setActiveSection(sections[currentIndex + 1].id)
                    }
                  }}
                  className="bg-[#8B6F47] hover:bg-[#8B6F47]/90 text-white px-6 py-3 rounded-full font-semibold transition-colors disabled:opacity-50"
                  disabled={sections.findIndex((s) => s.id === activeSection) === sections.length - 1}
                >
                  Next →
                </button>
              </div>

              {/* Feedback */}
              <div className="mt-16">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl text-center">
                  <h3 className="text-2xl font-semibold text-white mb-4">Was this helpful?</h3>
                  <p className="text-white/70 mb-6">
                    Help us improve our documentation by providing feedback on this page.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                      onClick={() => alert("Thank you for your feedback!")}
                    >
                      👍 Yes, helpful
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                      onClick={() => alert("Thank you for your feedback! We'll work on improving this section.")}
                    >
                      👎 Needs improvement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
