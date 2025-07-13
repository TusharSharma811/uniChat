"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Camera, Bell, Shield, Moon, Globe, MessageCircle, Save } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software developer passionate about creating amazing user experiences.",
    avatar: "",
  })

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    onlineStatus: true,
    readReceipts: true,
    language: "en", // Add this line
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Profile updated successfully!")
    }, 1000)
  }

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleLanguageChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      language: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/chat">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chat
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded-md flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Profile Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-white/10 border-white/20">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white/20 text-white">
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white/20 text-white">
                Settings
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-white/20 text-white">
                Privacy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-300">Update your profile details and avatar</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white text-2xl">
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Change Avatar
                        </Button>
                        <p className="text-sm text-gray-400 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-white">
                        Bio
                      </Label>
                      <textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        className="w-full min-h-[100px] px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800"
                      disabled={isLoading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">App Settings</CardTitle>
                  <CardDescription className="text-gray-300">Customize your UniChat experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-400">Receive notifications for new messages</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={() => handleSettingChange("notifications")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Moon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-400">Use dark theme across the app</p>
                      </div>
                    </div>
                    <Switch checked={settings.darkMode} onCheckedChange={() => handleSettingChange("darkMode")} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Online Status</p>
                        <p className="text-sm text-gray-400">Show when you're online to others</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.onlineStatus}
                      onCheckedChange={() => handleSettingChange("onlineStatus")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Read Receipts</p>
                        <p className="text-sm text-gray-400">Let others know when you've read their messages</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.readReceipts}
                      onCheckedChange={() => handleSettingChange("readReceipts")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Preferred Language</p>
                        <p className="text-sm text-gray-400">Choose your preferred language for the app</p>
                      </div>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm min-w-[120px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <option value="en" className="bg-gray-800 text-white">
                        English
                      </option>
                      <option value="es" className="bg-gray-800 text-white">
                        Español
                      </option>
                      <option value="fr" className="bg-gray-800 text-white">
                        Français
                      </option>
                      <option value="de" className="bg-gray-800 text-white">
                        Deutsch
                      </option>
                      <option value="it" className="bg-gray-800 text-white">
                        Italiano
                      </option>
                      <option value="pt" className="bg-gray-800 text-white">
                        Português
                      </option>
                      <option value="ru" className="bg-gray-800 text-white">
                        Русский
                      </option>
                      <option value="ja" className="bg-gray-800 text-white">
                        日本語
                      </option>
                      <option value="ko" className="bg-gray-800 text-white">
                        한국어
                      </option>
                      <option value="zh" className="bg-gray-800 text-white">
                        中文
                      </option>
                      <option value="ar" className="bg-gray-800 text-white">
                        العربية
                      </option>
                      <option value="hi" className="bg-gray-800 text-white">
                        हिन्दी
                      </option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Privacy & Security</CardTitle>
                  <CardDescription className="text-gray-300">Manage your privacy and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Shield className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-white font-medium">End-to-End Encryption</p>
                      <p className="text-sm text-gray-400">Your messages are secured with end-to-end encryption</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Two-Factor Authentication
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Download My Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
