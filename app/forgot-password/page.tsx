import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-gradient-to-br from-[#8B6F47] via-[#A67C52] to-[#D4B896] flex w-full items-center justify-center p-6 md:p-10">
      {/* Decorative shapes matching landing page */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#F5F1ED] rounded-full opacity-20"></div>
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[400px] bg-[#D4B896] rounded-full opacity-30"></div>
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#A67C52] rounded-full opacity-15"></div>

      <div className="relative z-10 w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  )}
