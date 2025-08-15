"use client"

import { Button } from "@/components/ui/button"

export default function DashboardClientActions() {
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

  return (
    <Button
      variant="outline"
      className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
      onClick={handleSearch}
    >
      Search
    </Button>
  )
}
