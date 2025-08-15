"use client"

export default function AboutPage() {
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
            <h1 className="text-5xl font-bold text-white text-center mb-8">About Eduvora</h1>

            <div className="space-y-12">
              <section className="text-center">
                <p className="text-xl text-white/80 leading-relaxed">
                  Eduvora is revolutionizing education in India through AI-powered learning companions. Our platform
                  creates personalized tutoring experiences specifically designed for Indian curriculum and competitive
                  exams.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
                  <h2 className="text-3xl font-semibold text-white mb-6">Our Mission</h2>
                  <p className="text-white/70 leading-relaxed">
                    To democratize quality education across India through innovative AI technology that provides
                    personalized, affordable, and effective learning experiences for every Indian student, regardless of
                    their location or economic background.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
                  <h2 className="text-3xl font-semibold text-white mb-6">Our Vision</h2>
                  <p className="text-white/70 leading-relaxed">
                    A future where every Indian student has access to world-class AI tutoring that understands their
                    unique needs, learning style, and helps them excel in competitive exams and academics with
                    confidence and clarity.
                  </p>
                </div>
              </div>

              <section className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
                <h2 className="text-3xl font-semibold text-white mb-6 text-center">Our Story</h2>
                <p className="text-white/70 leading-relaxed text-center max-w-3xl mx-auto">
                  Founded by educators and technologists who experienced the challenges of the Indian education system
                  firsthand, Eduvora was born from the belief that every student deserves personalized attention and
                  guidance. We combine cutting-edge AI technology with deep understanding of Indian curricula to create
                  learning companions that truly understand and support each student's journey.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-white mb-8 text-center">Our Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#8B6F47] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🎯</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Personalization</h3>
                    <p className="text-white/70">
                      Every student is unique, and our AI adapts to individual learning styles and pace.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#A67C52] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
                    <p className="text-white/70">
                      We continuously push the boundaries of educational technology to serve students better.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#D4B896] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🤝</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Accessibility</h3>
                    <p className="text-white/70">
                      Quality education should be accessible to all, regardless of location or background.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
