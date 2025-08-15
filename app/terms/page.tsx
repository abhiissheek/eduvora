"use client"

export default function TermsOfServicePage() {
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
          <button onClick={() => (window.location.href = "/privacy")} className="hover:text-white transition-colors">
            Privacy
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
              <h1 className="text-5xl font-bold text-white mb-6">Terms of Service</h1>
              <p className="text-white/80 text-lg">Last updated: January 16, 2025</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 lg:p-12">
              <div className="prose prose-lg max-w-none text-white/90 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="leading-relaxed">
                    Welcome to Eduvora. These Terms of Service ("Terms") govern your use of the Eduvora platform,
                    website, and services (collectively, the "Service") operated by Eduvora ("we," "us," or "our"). By
                    accessing or using our Service, you agree to be bound by these Terms.
                  </p>
                  <p className="leading-relaxed">
                    If you disagree with any part of these Terms, then you may not access the Service. These Terms apply
                    to all visitors, users, and others who access or use the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
                  <p className="leading-relaxed mb-4">
                    Eduvora is an AI-powered learning platform that provides personalized tutoring through AI
                    companions. Our Service includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>AI-powered learning companions for various subjects</li>
                    <li>Personalized learning experiences and progress tracking</li>
                    <li>Interactive learning sessions and doubt resolution</li>
                    <li>Educational content aligned with Indian curricula</li>
                    <li>Subscription-based access to premium features</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>

                  <h3 className="text-xl font-semibold text-white mb-3">3.1 Account Creation</h3>
                  <p className="leading-relaxed mb-4">
                    To access certain features of the Service, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your account information</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">3.2 Age Requirements</h3>
                  <p className="leading-relaxed">
                    You must be at least 13 years old to use our Service. Users under 18 must have parental consent. By
                    using the Service, you represent that you meet these age requirements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Acceptable Use</h2>

                  <h3 className="text-xl font-semibold text-white mb-3">4.1 Permitted Use</h3>
                  <p className="leading-relaxed mb-4">
                    You may use our Service for legitimate educational purposes only.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">4.2 Prohibited Activities</h3>
                  <p className="leading-relaxed mb-4">You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Use the Service for any unlawful purpose or in violation of any laws</li>
                    <li>Share your account credentials with others</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the Service or servers</li>
                    <li>Use automated tools to access the Service without permission</li>
                    <li>Upload malicious code, viruses, or harmful content</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Violate intellectual property rights</li>
                    <li>Use the Service to cheat on exams or assignments</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Subscription and Payment</h2>

                  <h3 className="text-xl font-semibold text-white mb-3">5.1 Subscription Plans</h3>
                  <p className="leading-relaxed mb-4">We offer various subscription plans:</p>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Free Plan: Limited features with basic access</li>
                    <li>Core Plan: Enhanced features for ₹499/month</li>
                    <li>Pro Plan: Full access to all features for ₹999/month</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">5.2 Payment Terms</h3>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Subscription fees are billed in advance on a monthly basis</li>
                    <li>All fees are non-refundable except as required by law</li>
                    <li>We may change subscription fees with 30 days' notice</li>
                    <li>Failed payments may result in service suspension</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">5.3 Cancellation</h3>
                  <p className="leading-relaxed">
                    You may cancel your subscription at any time through your account settings. Cancellation will be
                    effective at the end of your current billing period. You will retain access to paid features until
                    the end of the paid period.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>

                  <h3 className="text-xl font-semibold text-white mb-3">6.1 Our Content</h3>
                  <p className="leading-relaxed mb-4">
                    The Service and its original content, features, and functionality are owned by Eduvora and are
                    protected by international copyright, trademark, patent, trade secret, and other intellectual
                    property laws.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">6.2 User Content</h3>
                  <p className="leading-relaxed mb-4">
                    You retain ownership of content you submit to the Service. By submitting content, you grant us a
                    worldwide, non-exclusive, royalty-free license to use, reproduce, and display your content for the
                    purpose of providing the Service.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">6.3 AI-Generated Content</h3>
                  <p className="leading-relaxed">
                    Content generated by our AI companions is provided for educational purposes. While you may use this
                    content for learning, you should not rely solely on AI-generated content for critical decisions or
                    submit it as your own work.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Privacy and Data Protection</h2>
                  <p className="leading-relaxed">
                    Your privacy is important to us. Our collection and use of personal information is governed by our
                    Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you
                    consent to the collection and use of information as described in our Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Disclaimers and Limitations</h2>

                  <h3 className="text-xl font-semibold text-white mb-3">8.1 Educational Purpose</h3>
                  <p className="leading-relaxed mb-4">
                    Our Service is designed to supplement, not replace, traditional education. AI-generated content
                    should be used as a learning aid and verified through additional sources when necessary.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">8.2 Service Availability</h3>
                  <p className="leading-relaxed mb-4">
                    We strive to maintain high service availability but cannot guarantee uninterrupted access. The
                    Service is provided "as is" without warranties of any kind.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">8.3 Limitation of Liability</h3>
                  <p className="leading-relaxed">
                    To the maximum extent permitted by law, Eduvora shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, including loss of profits, data, or other intangible
                    losses.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Termination</h2>
                  <p className="leading-relaxed mb-4">
                    We may terminate or suspend your account and access to the Service immediately, without prior
                    notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third
                    parties.
                  </p>
                  <p className="leading-relaxed">
                    Upon termination, your right to use the Service will cease immediately. All provisions of these
                    Terms that should survive termination shall survive, including ownership provisions, warranty
                    disclaimers, and limitations of liability.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
                  <p className="leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of India, without regard
                    to conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject
                    to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Terms</h2>
                  <p className="leading-relaxed">
                    We reserve the right to modify these Terms at any time. We will notify users of material changes by
                    posting the updated Terms on our website and updating the "Last updated" date. Your continued use of
                    the Service after such changes constitutes acceptance of the new Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Information</h2>
                  <p className="leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-white/10 border border-white/20 rounded-lg p-6">
                    <p className="mb-2">
                      <strong>Email:</strong> legal@eduvora.in
                    </p>
                    <p className="mb-2">
                      <strong>Address:</strong> 123 Tech Park, Bangalore, Karnataka 560001, India
                    </p>
                    <p>
                      <strong>Phone:</strong> +91 98765 43210
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">13. Severability</h2>
                  <p className="leading-relaxed">
                    If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions
                    will remain in full force and effect. The invalid provision will be replaced with a valid provision
                    that most closely matches the intent of the original provision.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">14. Entire Agreement</h2>
                  <p className="leading-relaxed">
                    These Terms, together with our Privacy Policy, constitute the entire agreement between you and
                    Eduvora regarding the use of the Service and supersede all prior agreements and understandings.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
