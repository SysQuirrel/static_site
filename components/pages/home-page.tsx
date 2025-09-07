"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface HomePageProps {
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

export function HomePage({ isLoaded, mousePosition, windowWidth, windowHeight, FloatingElement }: HomePageProps) {
  return (
    <>
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <FloatingElement>
            <h1
              className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                background: "linear-gradient(90deg, #00d4ff 0%, #0099cc 25%, #00d4ff 50%, #0099cc 75%, #00d4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 100%",
                animation: "gradient-shift 3s ease-in-out infinite",
              }}
            >
              Smol Project
            </h1>
          </FloatingElement>

          <FloatingElement delay={0.5}>
            <p
              className={`text-xl md:text-2xl text-cyan-100 mb-8 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {"Discover the path through interactive waves and ripples"}
            </p>
          </FloatingElement>

          <FloatingElement delay={1}>
            <div
              className={`flex gap-4 justify-center transition-all duration-1000 delay-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 text-white border-0"
                style={{
                  transform: `translate(${(mousePosition.x - windowWidth / 2) * 0.02}px, ${(mousePosition.y - windowHeight / 2) * 0.02}px) scale(1)`,
                }}
              >
                Start Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full border-2 border-cyan-400 hover:border-cyan-300 hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-black/50 text-cyan-100 hover:text-white"
              >
                Explore Waves
              </Button>
            </div>
          </FloatingElement>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FloatingElement>
            <h2
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              style={{
                background: "linear-gradient(90deg, #67e8f9 0%, #3b82f6 50%, #67e8f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Interactive Elements
            </h2>
          </FloatingElement>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Wave Interactions", desc: "Ripples follow your every move", delay: 0, icon: "🌊" },
              { title: "Dark Water", desc: "Immersive black water experience", delay: 0.2, icon: "🌙" },
              { title: "Touch Ripples", desc: "Mobile-friendly water effects", delay: 0.4, icon: "✨" },
            ].map((item, index) => (
              <FloatingElement key={index} delay={item.delay}>
                <Card
                  className="p-8 h-64 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer group border-2 hover:border-cyan-500/50 bg-black/40 backdrop-blur-sm border-cyan-500/20"
                  style={{
                    transform: `perspective(1000px) rotateX(${(mousePosition.y - windowHeight / 2) * 0.01}deg) rotateY(${(mousePosition.x - windowWidth / 2) * 0.01}deg)`,
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-6 flex items-center justify-center group-hover:animate-[glow_2s_ease-in-out_infinite] text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-100">{item.title}</h3>
                  <p className="text-cyan-200/70">{item.desc}</p>
                </Card>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FloatingElement>
            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-3xl p-12 backdrop-blur-sm border border-cyan-500/20">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-100">Ready for the Journey?</h3>
              <p className="text-lg text-cyan-200/80 mb-8">
                {
                  "Experience the magic of interactive ripples and waves as you navigate through this digital water realm."
                }
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full border-2 border-cyan-500 hover:bg-cyan-500 hover:text-black transition-all duration-300 transform hover:scale-105 bg-transparent text-cyan-200"
                >
                  Create Ripples
                </Button>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 text-white border-0"
                >
                  Dive Deeper
                </Button>
              </div>
            </div>
          </FloatingElement>
        </div>
      </section>
    </>
  )
}
