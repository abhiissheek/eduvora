"use client"

export default function CareersPage() {
  const jobOpenings = [
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Build and optimize AI models for personalized learning experiences.",
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Create beautiful and intuitive user interfaces for our learning platform.",
    },
    {
      title: "Education Content Specialist",
      department: "Content",
      location: "Mumbai, India",
      type: "Full-time",
      description: "Develop curriculum-aligned content for Indian educational standards.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Drive product strategy and roadmap for AI-powered learning features.",
    },
  ]

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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">Join Our Mission</h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Help us revolutionize education in India. Join a team of passionate educators, engineers, and innovators
                building the future of AI-powered learning.
              </p>
            </div>

            {/* Why Join Us Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-white text-center mb-12">Why Join Eduvora?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-[#8B6F47] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Impact at Scale</h3>
                  <p className="text-white/70">
                    Your work will directly impact millions of Indian students and transform how they learn.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-[#A67C52] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🧠</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Cutting-edge Tech</h3>
                  <p className="text-white/70">
                    Work with the latest AI/ML technologies and shape the future of educational technology.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-[#D4B896] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Growth & Learning</h3>
                  <p className="text-white/70">
                    Continuous learning opportunities, mentorship, and career development in a fast-growing startup.
                  </p>
                </div>
              </div>
            </section>

            {/* Open Positions */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-white text-center mb-12">Open Positions</h2>
              <div className="space-y-6">
                {jobOpenings.map((job, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-white mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mb-3">
                          <span className="bg-[#8B6F47] text-white px-3 py-1 rounded-full text-sm">
                            {job.department}
                          </span>
                          <span className="bg-[#A67C52] text-white px-3 py-1 rounded-full text-sm">{job.location}</span>
                          <span className="bg-[#D4B896] text-white px-3 py-1 rounded-full text-sm">{job.type}</span>
                        </div>
                        <p className="text-white/70">{job.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <button
                          className="bg-white text-[#8B6F47] hover:bg-white/90 px-6 py-2 rounded-full font-semibold transition-colors"
                          onClick={() => alert(`Apply for ${job.title} - Application form coming soon!`)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Culture & Benefits */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold text-white text-center mb-12">Culture & Benefits</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
                  <h3 className="text-2xl font-semibold text-white mb-6">Our Culture</h3>
                  <ul className="space-y-3 text-white/70">
                    <li>• Collaborative and inclusive work environment</li>
                    <li>• Innovation-driven mindset with room for experimentation</li>
                    <li>• Work-life balance and flexible working arrangements</li>
                    <li>• Continuous learning and professional development</li>
                    <li>• Transparent communication and flat hierarchy</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
                  <h3 className="text-2xl font-semibold text-white mb-6">Benefits</h3>
                  <ul className="space-y-3 text-white/70">
                    <li>• Competitive salary and equity options</li>
                    <li>• Comprehensive health insurance</li>
                    <li>• Learning and development budget</li>
                    <li>• Flexible PTO and sabbatical options</li>
                    <li>• Modern office spaces and remote work flexibility</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
                <h2 className="text-3xl font-semibold text-white mb-6">Don't See Your Role?</h2>
                <p className="text-white/70 mb-6">
                  We're always looking for talented individuals who share our passion for education and technology. Send
                  us your resume and tell us how you'd like to contribute to our mission.
                </p>
                <button
                  className="bg-[#8B6F47] hover:bg-[#8B6F47]/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                  onClick={() => alert("Send your resume to careers@eduvora.in")}
                >
                  Get in Touch
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
