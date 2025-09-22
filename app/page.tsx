"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BookOpen,
  Calculator,
  Atom,
  Dna,
  Send,
  Moon,
  Sun,
  User,
  Home,
  FileText,
  MessageCircle,
  ChevronRight,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function StudyGPTPage() {
  const [message, setMessage] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState({
    physics: true,
    chemistry: true,
    biology: false,
    mathematics: false,
    formulas: false,
  })

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [subject]: checked,
    }))
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-primary">StudyGpt</h1>
            </div>

            <nav className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
              <Link href="/subjects">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Subjects
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Ask Doubts
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login/Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Subject Selection */}
        <aside className="w-64 border-r border-border bg-card p-6 min-h-[calc(100vh-73px)]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Atom className="w-5 h-5 text-primary" />
              <Checkbox
                checked={selectedSubjects.physics}
                onCheckedChange={(checked) => handleSubjectChange("physics", checked as boolean)}
              />
              <label className="text-sm font-medium">Physics</label>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">⚗</span>
              </div>
              <Checkbox
                checked={selectedSubjects.chemistry}
                onCheckedChange={(checked) => handleSubjectChange("chemistry", checked as boolean)}
              />
              <label className="text-sm font-medium">Chemistry</label>
            </div>

            <div className="flex items-center gap-3">
              <Dna className="w-5 h-5 text-green-600" />
              <Checkbox
                checked={selectedSubjects.biology}
                onCheckedChange={(checked) => handleSubjectChange("biology", checked as boolean)}
              />
              <label className="text-sm font-medium">Biology (NEET)</label>
            </div>

            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-blue-600" />
              <Checkbox
                checked={selectedSubjects.mathematics}
                onCheckedChange={(checked) => handleSubjectChange("mathematics", checked as boolean)}
              />
              <label className="text-sm font-medium">Mathematics (JEE)</label>
            </div>

            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <Checkbox
                checked={selectedSubjects.formulas}
                onCheckedChange={(checked) => handleSubjectChange("formulas", checked as boolean)}
              />
              <label className="text-sm font-medium">Formulas & Shortcuts</label>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-h-[calc(100vh-73px)]">
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Welcome to JEE-NEET GPT</h2>
                <p className="text-muted-foreground">
                  {
                    "Hi! I'm your AI tutor for JEE & NEET. Ask me anything - formulas, concepts, PYQs, or even solve questions together!"
                  }
                </p>
              </div>

              {/* Sample Conversation */}
              <div className="space-y-6 mb-8">
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-md">
                    Can you give me a quick tip for organic chemistry reactions?
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-3 max-w-2xl">
                    <p className="text-sm">
                      For organic chemistry, focusing on reaction mechanisms and recognizing common functional groups is
                      key. Instead of memorizing every single reaction, understand the 'why' behind them - electron
                      movement, nucleophiles, electrophiles. Practice identifying reagents and their roles!
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Quick Resources */}
        <aside className="w-80 border-l border-border bg-card p-6 min-h-[calc(100vh-73px)]">
          <div className="space-y-6">
            {/* Quick Resources */}
            <div>
              <h3 className="font-semibold mb-3">Quick Resources</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-between text-sm">
                  NEET Bio MCQ on Photosynthesis (Advanced)
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-sm">
                  JEE Physics numerical on Rotational Motion
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-sm">
                  Chemistry reaction mechanism: SN1 vs SN2
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Recommended Questions */}
            <div>
              <h3 className="font-semibold mb-3">Recommended Questions</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-between text-sm">
                  NEET Bio MCQ on Photosynthesis (Advanced)
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-sm">
                  JEE Physics numerical on Rotational Motion
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-sm">
                  Chemistry reaction mechanism: SN1 vs SN2
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Formulas */}
            <div>
              <h3 className="font-semibold mb-3">Quick Formulas</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-between text-sm">
                  Quadratic Formula
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-sm">
                  {"Newton's Second Law"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-sm">
                  Ideal Gas Law
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* AI Suggestions */}
            <div>
              <h3 className="font-semibold mb-3">AI Suggestions</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-between text-sm">
                  Try solving this NEET Bio MCQ on Human Physiology.
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-sm">
                  Practice JEE Main 2023 Physics questions.
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-sm">
                  Review common organic naming conventions.
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
