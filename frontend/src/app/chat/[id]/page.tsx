"use client"

import type React from "react"

import { useState, useRef, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send, Search, MoreVertical, Phone, Video, Settings, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: Date
  senderName?: string
}

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  avatar?: string
  unread?: number
}

export default function ChatPage() {
  const userId = useParams().id as string
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const [chats , setChats] = useState<Chat[]>([])

  const [selectedChat, setSelectedChat] = useState(chats[0])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/auth/login"
    }
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch user profile")
        }
        const data = await response.json()
        setChats(data.chats || [])
        console.log("User profile:", data)
        
      } catch (error) {
        console.error("Error fetching user profile:", error)
        window.location.href = "/auth/login"
      }
    }
    fetchUserProfile()
  }, [userId])


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you soon.",
        sender: "other",
        timestamp: new Date(),
        senderName: selectedChat.name,
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex">
      {/* Sidebar */}
      <div className="w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">UniChat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${
                selectedChat.id === chat.id ? "bg-white/10" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={chat?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                    {chat?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate">{chat?.name}</h3>
                    <span className="text-xs text-gray-400">{chat?.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{chat?.lastMessage}</p>
                </div>
                {chat.unread && (
                  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{chat.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={selectedChat?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                  {selectedChat?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-white">{selectedChat?.name}</h2>
                <p className="text-sm text-gray-300">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                {msg.sender === "other" && <p className="text-xs text-gray-400 mb-1">{msg.senderName}</p>}
                <Card
                  className={`p-3 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                      : "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-gray-100" : "text-gray-400"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </Card>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
