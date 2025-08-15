"use client"

export default function PrivacyPolicyPage() {
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
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-6">Privacy Policy</h1>
              <p className="text-white/80 text-lg">Last updated: January 16, 2025</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 lg:p-12">
              <div className="prose prose-lg max-w-none text-white/90 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                  <p className="leading-relaxed">
                    Welcome to Eduvora ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
                    the security of your personal information. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our AI-powered learning platform and services.
                  </p>
                  <p className="leading-relaxed">
                    By using Eduvora, you agree to the collection and use of information in accordance with this policy.
                    If you do not agree with our policies and practices, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>

                  <h3 className="text-xl font-semibold text-white mb-3">2.1 Personal Information</h3>
                  <p className="leading-relaxed mb-4">We collect information you provide directly to us, including:</p>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Name, email address, and contact information</li>
                    <li>Account credentials and profile information</li>
                    <li>Payment and billing information</li>
                    <li>Educational background and learning preferences</li>
                    <li>Communications with our support team</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">2.2 Learning Data</h3>
                  <p className="leading-relaxed mb-4">To provide personalized AI tutoring, we collect:</p>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Learning session interactions and conversations</li>
                    <li>Progress tracking and performance analytics</li>
                    <li>Study patterns and learning preferences</li>
                    <li>AI companion customizations and settings</li>
                    <li>Questions asked and topics studied</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">2.3 Technical Information</h3>
                  <p className="leading-relaxed mb-4">We automatically collect certain technical information:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Usage patterns and feature interactions</li>
                    <li>Log files and error reports</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                  <p className="leading-relaxed mb-4">We use the collected information for the following purposes:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Providing and personalizing our AI tutoring services</li>
                    <li>Creating and managing your AI learning companions</li>
                    <li>Tracking your learning progress and providing analytics</li>
                    <li>Processing payments and managing subscriptions</li>
                    <li>Communicating with you about our services</li>
                    <li>Improving our platform and developing new features</li>
                    <li>Ensuring platform security and preventing fraud</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing and Disclosure</h2>
                  <p className="leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information only in the following circumstances:
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">4.1 Service Providers</h3>
                  <p className="leading-relaxed mb-4">
                    We may share information with trusted third-party service providers who assist us in:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Payment processing and billing</li>
                    <li>Cloud hosting and data storage</li>
                    <li>Analytics and performance monitoring</li>
                    <li>Customer support services</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">4.2 Legal Requirements</h3>
                  <p className="leading-relaxed mb-4">
                    We may disclose your information if required by law or in response to:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Legal processes or government requests</li>
                    <li>Protection of our rights and property</li>
                    <li>Safety concerns for users or the public</li>
                    <li>Investigation of potential violations of our terms</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
                  <p className="leading-relaxed mb-4">
                    We implement appropriate technical and organizational measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Employee training on data protection</li>
                    <li>Incident response and breach notification procedures</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    However, no method of transmission over the internet or electronic storage is 100% secure. While we
                    strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights and Choices</h2>
                  <p className="leading-relaxed mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Access:</strong> Request access to your personal information
                    </li>
                    <li>
                      <strong>Correction:</strong> Update or correct inaccurate information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your personal information
                    </li>
                    <li>
                      <strong>Portability:</strong> Request a copy of your data in a portable format
                    </li>
                    <li>
                      <strong>Restriction:</strong> Limit how we process your information
                    </li>
                    <li>
                      <strong>Objection:</strong> Object to certain types of processing
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    To exercise these rights, please contact us at privacy@eduvora.in. We will respond to your request
                    within 30 days.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Data Retention</h2>
                  <p className="leading-relaxed">
                    We retain your personal information for as long as necessary to provide our services and fulfill the
                    purposes outlined in this policy. Learning data and progress information are retained to maintain
                    continuity of your educational experience. You may request deletion of your account and associated
                    data at any time, subject to legal retention requirements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Children's Privacy</h2>
                  <p className="leading-relaxed">
                    Our services are designed for users aged 13 and above. We do not knowingly collect personal
                    information from children under 13. If we become aware that we have collected information from a
                    child under 13, we will take steps to delete such information promptly. Parents or guardians who
                    believe their child has provided us with personal information should contact us immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
                  <p className="leading-relaxed">
                    Your information may be transferred to and processed in countries other than your country of
                    residence. We ensure that such transfers comply with applicable data protection laws and implement
                    appropriate safeguards to protect your information during international transfers.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Privacy Policy</h2>
                  <p className="leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or
                    applicable laws. We will notify you of any material changes by posting the updated policy on our
                    website and updating the "Last updated" date. Your continued use of our services after such changes
                    constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
                  <p className="leading-relaxed mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                    practices, please contact us:
                  </p>
                  <div className="bg-white/10 border border-white/20 rounded-lg p-6">
                    <p className="mb-2">
                      <strong>Email:</strong> privacy@eduvora.in
                    </p>
                    <p className="mb-2">
                      <strong>Address:</strong> 123 Tech Park, Bangalore, Karnataka 560001, India
                    </p>
                    <p>
                      <strong>Phone:</strong> +91 98765 43210
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
