"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, MessageSquare, Send, Globe } from "lucide-react"

interface ContactPageProps {
  isLoaded: boolean
  mousePosition: { x: number; y: number }
  windowWidth: number
  windowHeight: number
  FloatingElement: React.ComponentType<{
    children: React.ReactNode
    delay?: number
    className?: string
  }>
}

export function ContactPage({ isLoaded, mousePosition, windowWidth, windowHeight, FloatingElement }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@smolproject.dev",
      delay: 0,
    },
    {
      icon: MessageSquare,
      label: "Discord",
      value: "SmolProject#1234",
      delay: 0.2,
    },
    {
      icon: Globe,
      label: "Website",
      value: "smol.qzz.io",
      delay: 0.4,
    },
  ]

  return (
    <>
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto w-full">
          <FloatingElement>
            <div className="text-center mb-16">
              <h1
                className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{
                  background: "linear-gradient(90deg, #00d4ff 0%, #0099cc 25%, #00d4ff 50%, #0099cc 75%, #00d4ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 100%",
                  animation: "gradient-shift 3s ease-in-out infinite",
                }}
              >
                Contact
              </h1>
              <p
                className={`text-xl md:text-2xl text-cyan-100 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                {"Let's create something amazing together"}
              </p>
            </div>
          </FloatingElement>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FloatingElement delay={0.5}>
              <Card className="p-8 bg-black/40 backdrop-blur-sm border-2 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-cyan-100 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-cyan-200 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cyan-200 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-200 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-200 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white border-0 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </FloatingElement>

            {/* Contact Info */}
            <div className="space-y-8">
              <FloatingElement delay={0.7}>
                <Card className="p-8 bg-black/40 backdrop-blur-sm border-2 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <h2 className="text-2xl font-semibold text-cyan-100 mb-6">Get in Touch</h2>
                  <p className="text-cyan-200/80 mb-8">
                    Ready to dive into your next project? I'm always excited to collaborate on innovative ideas and
                    bring creative visions to life.
                  </p>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon
                      return (
                        <FloatingElement key={index} delay={info.delay + 0.8}>
                          <div className="flex items-center space-x-4 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                              <Icon className="w-6 h-6 text-cyan-300" />
                            </div>
                            <div>
                              <p className="text-sm text-cyan-400 font-medium">{info.label}</p>
                              <p className="text-cyan-100 group-hover:text-cyan-50 transition-colors">{info.value}</p>
                            </div>
                          </div>
                        </FloatingElement>
                      )
                    })}
                  </div>
                </Card>
              </FloatingElement>

              <FloatingElement delay={1.2}>
                <Card className="p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-2 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-cyan-100 mb-4">Let's Build Something Amazing</h3>
                  <p className="text-cyan-200/80 mb-6">
                    Whether you have a specific project in mind or just want to explore possibilities, I'm here to help
                    bring your ideas to life with cutting-edge technology and creative solutions.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-200 hover:text-cyan-100 bg-transparent"
                    >
                      View Portfolio
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 text-white border-0">
                      Schedule Call
                    </Button>
                  </div>
                </Card>
              </FloatingElement>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
