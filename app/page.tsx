"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function HomePage() {
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showDemoVideo, setShowDemoVideo] = useState(false)

  const handleNavigation = (section: string) => {
    console.log(`[v0] Navigating to ${section}`)

    // Route to actual pages
    const pageRoutes = {
      login: "/login",
      careers: "/careers",
      blog: "/blog",
      help: "/help",
      documentation: "/documentation",
      privacy: "/privacy",
      terms: "/terms",
      about: "/about",
    }

    if (pageRoutes[section as keyof typeof pageRoutes]) {
      window.location.href = pageRoutes[section as keyof typeof pageRoutes]
      return
    }

    // For sections that exist on the current page, scroll to them
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      // Only show "coming soon" for sections that truly don't exist yet
      if (section === "companions" || section === "cookies") {
        alert(`${section.charAt(0).toUpperCase() + section.slice(1)} section coming soon!`)
      }
    }
  }

  const handleSearch = () => {
    console.log("[v0] Search button clicked")
    const searchTerm = prompt("Search for courses, topics, or AI companions:")
    if (searchTerm && searchTerm.trim()) {
      // Simulate search results
      const results = [
        "Mathematics AI Tutor",
        "Biology Companion",
        "CBSE Physics Learning Assistant",
        "ICSE English Study Buddy",
        "Coding & Programming Mentor AI",
        "Hindi Literature Tutor",
        "Commerce & Accounts Helper",
      ].filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))

      if (results.length > 0) {
        alert(`Found ${results.length} results for "${searchTerm}":\n\n${results.join("\n")}`)
      } else {
        alert(
          `No results found for "${searchTerm}". Try searching for:\n• Competitive Exam Preparation\n• CBSE/ICSE Subjects\n• Programming\n• Languages\n• Commerce`,
        )
      }
    }
  }

  const handleLogin = () => {
    console.log("[v0] Login button clicked")
    window.location.href = "/login"
  }

  const handlePlanSelection = (planType: string) => {
    console.log(`[v0] Plan selected: ${planType}`)
    setSelectedPlan(planType)
    setShowPricingModal(true)
  }

  const handleSocialMedia = (platform: string) => {
    console.log(`[v0] Opening ${platform}`)
    const urls = {
      facebook: "https://facebook.com/eduvora",
      twitter: "https://twitter.com/eduvora",
      linkedin: "https://linkedin.com/company/eduvora",
    }
    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  const handleDemo = () => {
    console.log("[v0] Starting live demo")
    setShowDemoVideo(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B6F47] via-[#A67C52] to-[#D4B896]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div
          className="text-2xl font-bold text-white font-serif cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Eduvora
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-white/90">
          <button onClick={() => handleNavigation("features")} className="hover:text-white transition-colors">
            Features
          </button>
          <button onClick={() => handleNavigation("login")} className="hover:text-white transition-colors">
            Login
          </button>
          <button onClick={() => handleNavigation("pricing")} className="hover:text-white transition-colors">
            Pricing
          </button>
          <button onClick={() => handleNavigation("contact")} className="hover:text-white transition-colors">
            Contact
          </button>
          <button onClick={() => handleNavigation("about")} className="hover:text-white transition-colors">
            About
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button className="bg-white text-[#8B6F47] hover:bg-white/90 font-semibold px-6" onClick={handleLogin}>
            Login/Signup
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-0 w-96 h-96 bg-[#F5F1ED] rounded-full opacity-20 -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#D4B896] rounded-full opacity-30 translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#A67C52] rounded-full opacity-15"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:px-12 lg:py-20 min-h-screen">
          <div className="flex-1 max-w-2xl space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                AI-Powered
                <br />
                <span className="text-[#F5F1ED]">Learning</span>
              </h1>

              <p className="text-xl text-white/80 leading-relaxed">
                Create personalized AI companions for competitive exam preparation and academic excellence. Interactive
                learning with advanced AI technology designed for Indian students.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#8B6F47] transition-all duration-300 px-12 py-4 rounded-full text-lg"
              onClick={() => handleNavigation("pricing")}
            >
              Choose Your Plan
            </Button>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative">
              <img
                src="/young-woman-modern-study.png"
                alt="Young woman studying with laptop in modern learning environment"
                className="w-full max-w-lg h-auto object-contain"
              />
              <Button
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 text-[#8B6F47] hover:bg-white font-semibold px-6 py-2 rounded-full shadow-lg"
                onClick={handleDemo}
              >
                Watch Live Demo
              </Button>
            </div>
          </div>
        </div>

        <section id="features" className="relative z-10 px-6 py-16 lg:px-12 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Platform Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-[#8B6F47] rounded-full flex items-center justify-center">
                    <img src="/icons8-robot-50.png" alt="AI Robot" className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">AI Companions</h3>
                  <p className="text-white/70">
                    Create personalized AI tutors for competitive exams and academic subjects with teaching styles
                    adapted to Indian curriculum.
                  </p>
                </div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-[#A67C52] rounded-full flex items-center justify-center">
                    <img src="/icons8-progress-50.png" alt="Progress Chart" className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Progress Tracking</h3>
                  <p className="text-white/70">
                    Monitor your exam preparation with detailed analytics, mock test scores, and subject-wise mastery
                    levels.
                  </p>
                </div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-[#D4B896] rounded-full flex items-center justify-center">
                    <img src="/icons8-interactive-50.png" alt="Interactive Learning" className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Interactive Learning</h3>
                  <p className="text-white/70">
                    Engage in dynamic problem-solving sessions with instant doubt clearing and concept reinforcement.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Bottom Section - Pricing */}
        <section id="pricing" className="relative z-10 px-6 py-16 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Choose Your Learning Plan</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                className="bg-white/10 backdrop-blur-sm border-white/20 p-6 rounded-2xl cursor-pointer hover:bg-white/20 transition-all duration-300"
                onClick={() => handlePlanSelection("free-plan")}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#8B6F47] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">Free</div>
                      <div className="text-white/60 text-sm">Basic Access</div>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">
                    Get started with 1 AI companion and basic NCERT solutions. Perfect for trying out the platform.
                  </p>
                </div>
              </Card>

              <Card className="bg-[#8B6F47] p-6 rounded-2xl text-white">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Core Plan</h3>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold">₹499</span>
                      <span className="text-sm opacity-70">/mo</span>
                    </div>
                    <p className="text-sm opacity-80">Monthly • ₹499</p>
                  </div>
                  <p className="text-sm opacity-90">
                    Enhanced AI tutoring for competitive exam preparation with doubt solving
                  </p>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
                    size="sm"
                    onClick={() => handlePlanSelection("core-plan")}
                  >
                    Start Learning
                  </Button>
                </div>
              </Card>

              <Card className="bg-[#A67C52] p-6 rounded-2xl text-white">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Pro Plan</h3>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold">₹999</span>
                      <span className="text-sm opacity-70">/mo</span>
                    </div>
                    <p className="text-sm opacity-80">Premium Access</p>
                  </div>
                  <p className="text-sm opacity-90">
                    Unlimited companions, mock tests, and complete exam preparation suite
                  </p>
                  <Button
                    className="w-full bg-white text-[#A67C52] hover:bg-white/90"
                    size="sm"
                    onClick={() => handlePlanSelection("pro-plan")}
                  >
                    Start Learning
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="relative z-10 px-6 py-16 lg:px-12 bg-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">About Eduvora</h2>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Eduvora is revolutionizing education in India through AI-powered learning companions. Our platform creates
              personalized tutoring experiences specifically designed for Indian curriculum and competitive exams.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
                <p className="text-white/70">
                  To democratize quality education across India through innovative AI technology that provides
                  personalized, affordable, and effective learning experiences for every Indian student.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
                <p className="text-white/70">
                  A future where every Indian student, regardless of location or background, has access to world-class
                  AI tutoring that understands their unique needs and helps them excel in competitive exams and
                  academics.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative z-10 px-6 py-16 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-4 text-white/80">
                  <div>
                    <strong>Email:</strong> hello@eduvora.in
                  </div>
                  <div>
                    <strong>Support:</strong> support@eduvora.in
                  </div>
                  <div>
                    <strong>Phone:</strong> +91 98765 43210
                  </div>
                  <div>
                    <strong>Address:</strong> 123 Tech Park, Bangalore, Karnataka 560001
                  </div>
                </div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-white mb-6">Send us a Message</h3>
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
                  <input type="hidden" name="access_key" value="d7c07f68-b0e1-4b65-9ec3-d406290b711a" />
                  <input type="hidden" name="subject" value="New Contact Form Submission from Eduvora" />
                  <input type="hidden" name="from_name" value="Eduvora Contact Form" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    required
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                  ></textarea>
                  <Button type="submit" className="w-full bg-[#8B6F47] hover:bg-[#8B6F47]/90 text-white">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {showDemoVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#8B6F47]">Eduvora Platform Demo</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDemoVideo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <video controls autoPlay className="w-full h-full object-cover" poster="/young-woman-modern-study.png">
                <source src="/eduvoravid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              See how Eduvora's AI companions help students excel in their studies
            </p>
          </div>
        </div>
      )}

      {showPricingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#8B6F47] mb-4">Selected Plan</h3>
            <p className="text-gray-600 mb-6">
              You selected: <strong>{selectedPlan}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">This would redirect to the payment page in a real application.</p>
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-[#8B6F47] hover:bg-[#8B6F47]/90"
                onClick={() => {
                  const planDetails = {
                    "free-plan": "Free Plan - 1 AI companion, basic NCERT solutions",
                    "core-plan": "Core Plan - ₹499/month, competitive exam preparation with doubt solving",
                    "pro-plan": "Pro Plan - ₹999/month, unlimited companions and complete exam prep",
                  }
                  alert(
                    `🎉 Welcome to Eduvora!\n\n${planDetails[selectedPlan as keyof typeof planDetails]}\n\nRedirecting to secure checkout...`,
                  )
                  setShowPricingModal(false)
                }}
              >
                Continue
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowPricingModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="px-6 py-12 lg:px-12">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white font-serif">Eduvora</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Empowering learners worldwide with AI-powered companions for personalized education and enhanced
                learning experiences.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSocialMedia("facebook")}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-white text-sm">f</span>
                </button>
                <button
                  onClick={() => handleSocialMedia("twitter")}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-white text-sm">t</span>
                </button>
                <button
                  onClick={() => handleSocialMedia("linkedin")}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-white text-sm">in</span>
                </button>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Product</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation("features")}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  Features
                </button>
                <button
                  onClick={() => handleNavigation("pricing")}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleNavigation("companions")}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  AI Companions
                </button>
                <button onClick={handleDemo} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Live Demo
                </button>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation("about")}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavigation("careers")}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  Careers
                </button>
                <button
                  onClick={() => handleNavigation("blog")}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  Blog
                </button>
                <button
                  onClick={() => handleNavigation("contact")}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation("help")}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Help Center
                </button>
                <button
                  onClick={() => handleNavigation("documentation")}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Documentation
                </button>
                <button
                  onClick={() => handleNavigation("privacy")}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNavigation("terms")}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">© 2025 Eduvora. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                onClick={() => handleNavigation("privacy")}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => handleNavigation("terms")}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => handleNavigation("cookies")}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
