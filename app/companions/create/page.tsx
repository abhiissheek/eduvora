import { CreateCompanionForm } from "@/components/CreateCompanionForm"

export default function CreateCompanionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B6F47] via-[#A67C52] to-[#D4B896]">
      {/* Decorative shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#F5F1ED] rounded-full opacity-20 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#D4B896] rounded-full opacity-30 translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#A67C52] rounded-full opacity-15"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-12 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Create AI Companion</h1>
            <p className="text-xl text-white/80">Design your personalized learning partner</p>
          </div>
          <CreateCompanionForm />
        </div>
      </div>
    </div>
  )
}
