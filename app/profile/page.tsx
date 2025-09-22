"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  User,
  Home,
  FileText,
  MessageCircle,
  Settings,
  Trophy,
  Target,
  Calendar,
  Clock,
  Edit,
  Save,
  X,
  Atom,
  Calculator,
  Dna,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "vedant Rokade",
    email: "vedantrokade@gmail.com",
    target: "JEE Advanced 2025",
    joinDate: "January 2024",
  })

  const [editedInfo, setEditedInfo] = useState(userInfo)

  const handleSave = () => {
    setUserInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(userInfo)
    setIsEditing(false)
  }

  const subjectProgress = [
    { name: "Physics", progress: 75, icon: Atom, color: "text-blue-600" },
    { name: "Chemistry", progress: 68, icon: () => <span className="text-green-500">⚗</span>, color: "text-green-600" },
    { name: "Mathematics", progress: 82, icon: Calculator, color: "text-purple-600" },
    { name: "Biology", progress: 45, icon: Dna, color: "text-green-700" },
  ]

  const recentActivity = [
    { type: "Question Solved", subject: "Physics", topic: "Rotational Motion", time: "2 hours ago" },
    { type: "Formula Reviewed", subject: "Chemistry", topic: "Organic Reactions", time: "5 hours ago" },
    { type: "Mock Test", subject: "Mathematics", topic: "Calculus", time: "1 day ago" },
    { type: "Doubt Cleared", subject: "Physics", topic: "Electromagnetic Induction", time: "2 days ago" },
  ]

  const achievements = [
    { title: "Problem Solver", description: "Solved 100+ questions", icon: Trophy },
    { title: "Consistent Learner", description: "7-day learning streak", icon: Target },
    { title: "Formula Master", description: "Memorized 50+ formulas", icon: Lightbulb },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-primary">StudyGpt</h1>
            </Link>

            <nav className="flex items-center gap-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
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
            <Button variant="ghost" size="sm" className="flex items-center gap-2 bg-accent">
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CardTitle className="text-xl">
                    {isEditing ? (
                      <Input
                        value={editedInfo.name}
                        onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                        className="text-center"
                      />
                    ) : (
                      userInfo.name
                    )}
                  </CardTitle>
                  {!isEditing && (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardDescription>
                  {isEditing ? (
                    <Input
                      value={editedInfo.email}
                      onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                      className="text-center"
                    />
                  ) : (
                    userInfo.email
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Exam</Label>
                  {isEditing ? (
                    <Input
                      value={editedInfo.target}
                      onChange={(e) => setEditedInfo({ ...editedInfo, target: e.target.value })}
                    />
                  ) : (
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      {userInfo.target}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Joined {userInfo.joinDate}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1 bg-transparent">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <achievement.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="progress" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="progress" className="space-y-6">
                {/* Subject Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Progress</CardTitle>
                    <CardDescription>Your learning progress across different subjects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {subjectProgress.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {typeof subject.icon === "function" ? (
                              <subject.icon />
                            ) : (
                              <subject.icon className={`w-5 h-5 ${subject.color}`} />
                            )}
                            <span className="font-medium">{subject.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Study Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary">247</div>
                      <p className="text-sm text-muted-foreground">Questions Solved</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary">18</div>
                      <p className="text-sm text-muted-foreground">Study Streak (days)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary">42h</div>
                      <p className="text-sm text-muted-foreground">Total Study Time</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest learning activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.subject} - {activity.topic}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Notification Preferences</Label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">Daily study reminders</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">New question alerts</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Weekly progress reports</span>
                        </label>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Study Preferences</Label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">Show detailed explanations</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">Enable dark mode</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Auto-save progress</span>
                        </label>
                      </div>
                    </div>

                    <Separator />

                    <div className="pt-4">
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
