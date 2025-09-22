"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Calculator,
  Atom,
  Dna,
  User,
  Home,
  FileText,
  MessageCircle,
  ChevronRight,
  Lightbulb,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function SubjectsPage() {
  const [selectedSubject, setSelectedSubject] = useState("physics")

  const subjects = {
    physics: {
      name: "Physics",
      icon: <Atom className="w-6 h-6 text-primary" />,
      progress: 75,
      totalTopics: 45,
      completedTopics: 34,
      chapters: [
        { name: "Mechanics", topics: 12, completed: 10, difficulty: "Medium" },
        { name: "Thermodynamics", topics: 8, completed: 6, difficulty: "Hard" },
        { name: "Waves & Oscillations", topics: 10, completed: 8, difficulty: "Medium" },
        { name: "Electromagnetism", topics: 15, completed: 10, difficulty: "Hard" },
      ],
      recentTopics: ["Newton's Laws of Motion", "Work Energy Theorem", "Simple Harmonic Motion"],
    },
    chemistry: {
      name: "Chemistry",
      icon: (
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white">⚗</span>
        </div>
      ),
      progress: 60,
      totalTopics: 52,
      completedTopics: 31,
      chapters: [
        { name: "Organic Chemistry", topics: 18, completed: 12, difficulty: "Hard" },
        { name: "Inorganic Chemistry", topics: 16, completed: 10, difficulty: "Medium" },
        { name: "Physical Chemistry", topics: 18, completed: 9, difficulty: "Hard" },
      ],
      recentTopics: ["Alkanes and Alkenes", "Chemical Bonding", "Thermochemistry"],
    },
    biology: {
      name: "Biology (NEET)",
      icon: <Dna className="w-6 h-6 text-green-600" />,
      progress: 45,
      totalTopics: 38,
      completedTopics: 17,
      chapters: [
        { name: "Cell Biology", topics: 10, completed: 6, difficulty: "Medium" },
        { name: "Genetics", topics: 12, completed: 5, difficulty: "Hard" },
        { name: "Human Physiology", topics: 16, completed: 6, difficulty: "Medium" },
      ],
      recentTopics: ["Cell Structure", "Photosynthesis", "Respiratory System"],
    },
    mathematics: {
      name: "Mathematics (JEE)",
      icon: <Calculator className="w-6 h-6 text-blue-600" />,
      progress: 80,
      totalTopics: 42,
      completedTopics: 34,
      chapters: [
        { name: "Calculus", topics: 15, completed: 13, difficulty: "Hard" },
        { name: "Algebra", topics: 12, completed: 10, difficulty: "Medium" },
        { name: "Coordinate Geometry", topics: 15, completed: 11, difficulty: "Medium" },
      ],
      recentTopics: ["Limits and Derivatives", "Integration", "Conic Sections"],
    },
  }

  const currentSubject = subjects[selectedSubject as keyof typeof subjects]

  return (
    <div className="min-h-screen bg-background">
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
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 bg-muted">
                <BookOpen className="w-4 h-4" />
                Subjects
              </Button>
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
          <h2 className="font-semibold mb-4">Select Subject</h2>
          <div className="space-y-3">
            {Object.entries(subjects).map(([key, subject]) => (
              <Button
                key={key}
                variant={selectedSubject === key ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => setSelectedSubject(key)}
              >
                {subject.icon}
                <span className="text-sm">{subject.name}</span>
              </Button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 min-h-[calc(100vh-73px)]">
          <div className="max-w-6xl mx-auto">
            {/* Subject Header */}
            <div className="flex items-center gap-4 mb-8">
              {currentSubject.icon}
              <div>
                <h1 className="text-3xl font-bold">{currentSubject.name}</h1>
                <p className="text-muted-foreground">
                  {currentSubject.completedTopics} of {currentSubject.totalTopics} topics completed
                </p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Overall Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{currentSubject.progress}%</div>
                  <Progress value={currentSubject.progress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {currentSubject.completedTopics}/{currentSubject.totalTopics} topics
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Study Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">24h</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">85%</div>
                  <p className="text-xs text-muted-foreground">Average score</p>
                </CardContent>
              </Card>
            </div>

            {/* Chapters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Chapters</h2>
                <div className="space-y-4">
                  {currentSubject.chapters.map((chapter, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{chapter.name}</CardTitle>
                          <Badge variant={chapter.difficulty === "Hard" ? "destructive" : "secondary"}>
                            {chapter.difficulty}
                          </Badge>
                        </div>
                        <CardDescription>
                          {chapter.completed} of {chapter.topics} topics completed
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Progress value={(chapter.completed / chapter.topics) * 100} className="mb-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {Math.round((chapter.completed / chapter.topics) * 100)}% complete
                          </span>
                          <Button size="sm" variant="outline">
                            Continue <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Topics</h2>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {currentSubject.recentTopics.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-sm font-medium">{topic}</span>
                          <Button size="sm" variant="ghost">
                            Review <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Practice Questions
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Notes
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask AI Tutor
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
