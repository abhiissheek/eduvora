"use client"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of AI in Indian Education",
      excerpt:
        "Exploring how artificial intelligence is transforming the educational landscape in India and what it means for students and educators.",
      author: "Dr. Priya Sharma",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "AI & Education",
      image: "/ai-education-classroom.png",
    },
    {
      title: "Personalized Learning: One Size Doesn't Fit All",
      excerpt:
        "Why personalized learning approaches are crucial for student success and how AI companions adapt to individual learning styles.",
      author: "Rajesh Kumar",
      date: "January 10, 2025",
      readTime: "7 min read",
      category: "Learning Science",
      image: "/personalized-learning-student.png",
    },
    {
      title: "Competitive Exam Preparation in the Digital Age",
      excerpt:
        "How technology is revolutionizing competitive exam preparation and helping students achieve better results with smart study strategies.",
      author: "Anita Desai",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Exam Prep",
      image: "/student-competitive-exams.png",
    },
    {
      title: "Building Confidence Through AI Tutoring",
      excerpt:
        "How AI-powered tutoring systems help students build confidence by providing patient, personalized guidance and instant feedback.",
      author: "Vikram Singh",
      date: "December 28, 2024",
      readTime: "4 min read",
      category: "Student Success",
      image: "/confident-student-ai-tutor.png",
    },
    {
      title: "The Science Behind Effective Learning",
      excerpt:
        "Understanding cognitive science principles that make learning more effective and how Eduvora incorporates these insights.",
      author: "Dr. Meera Patel",
      date: "December 20, 2024",
      readTime: "8 min read",
      category: "Learning Science",
      image: "/brain-science-learning-neuroscience.png",
    },
    {
      title: "Bridging the Education Gap in Rural India",
      excerpt:
        "How AI-powered learning platforms are making quality education accessible to students in remote areas of India.",
      author: "Arjun Reddy",
      date: "December 15, 2024",
      readTime: "6 min read",
      category: "Social Impact",
      image: "/placeholder-ecdof.png",
    },
  ]

  const categories = ["All", "AI & Education", "Learning Science", "Exam Prep", "Student Success", "Social Impact"]

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
          <button onClick={() => (window.location.href = "/careers")} className="hover:text-white transition-colors">
            Careers
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
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">Eduvora Blog</h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Insights, research, and stories about the future of AI-powered education in India. Stay updated with the
                latest trends in educational technology and learning science.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                  onClick={() => console.log(`Filter by: ${category}`)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured Post */}
            <div className="mb-16">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={blogPosts[0].image || "/placeholder.svg"}
                      alt={blogPosts[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-[#8B6F47] text-white px-3 py-1 rounded-full text-sm">Featured</span>
                      <span className="bg-[#A67C52] text-white px-3 py-1 rounded-full text-sm">
                        {blogPosts[0].category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{blogPosts[0].title}</h2>
                    <p className="text-white/70 mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-white/60 text-sm">
                        <span>{blogPosts[0].author}</span> • <span>{blogPosts[0].date}</span> •{" "}
                        <span>{blogPosts[0].readTime}</span>
                      </div>
                      <button
                        className="bg-white text-[#8B6F47] hover:bg-white/90 px-6 py-2 rounded-full font-semibold transition-colors"
                        onClick={() => alert(`Reading: ${blogPosts[0].title}`)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-colors cursor-pointer"
                  onClick={() => alert(`Reading: ${post.title}`)}
                >
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#A67C52] text-white px-2 py-1 rounded-full text-xs">{post.category}</span>
                      <span className="text-white/60 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="text-white/60 text-xs">
                      <span>{post.author}</span> • <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-16">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl text-center">
                <h2 className="text-3xl font-semibold text-white mb-4">Stay Updated</h2>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  Subscribe to our newsletter to get the latest insights on AI-powered education, learning science, and
                  student success stories delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                  />
                  <button
                    className="bg-[#8B6F47] hover:bg-[#8B6F47]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => alert("Thank you for subscribing! You'll receive our latest updates soon.")}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
