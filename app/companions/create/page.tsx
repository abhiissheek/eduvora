import { CreateCompanionForm } from "@/components/CreateCompanionForm"

export default function CreateCompanionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create AI Companion</h1>
            <p className="text-gray-600 mt-2">Design your personalized learning partner</p>
          </div>
          <CreateCompanionForm />
        </div>
      </div>
    </div>
  )
}
