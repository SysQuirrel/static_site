"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"

interface Ripple {
  id: string
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
  element: HTMLDivElement
  startTime: number
}

function FuturisticLandingComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRipplesRef = useRef<Ripple[]>([])
  const physicsIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    if (typeof window === "undefined") return () => clearTimeout(timer)

    const createRipple = (x: number, y: number, isLarge = false) => {
      if (!containerRef.current) return

      try {
        const ripple = document.createElement("div")
        const id = Math.random().toString(36).substr(2, 9)

        const baseSize = isLarge ? 60 + Math.random() * 80 : 20 + Math.random() * 60
        const maxRadius = baseSize + Math.random() * 100
        const speed = 0.8 + Math.random() * 1.2
        const animationDuration = maxRadius / 50 + Math.random() * 2
        const opacity = 0.3 + Math.random() * 0.5

        ripple.className = isLarge ? "water-ripple-large" : "water-ripple"
        ripple.style.left = `${x - baseSize / 2}px`
        ripple.style.top = `${y - baseSize / 2}px`
        ripple.style.animationDuration = `${animationDuration}s`
        ripple.style.setProperty("--ripple-opacity", opacity.toString())
        ripple.style.setProperty("--ripple-size", `${baseSize}px`)
        ripple.style.setProperty("--ripple-max-size", `${maxRadius}px`)

        containerRef.current.appendChild(ripple)

        const rippleData: Ripple = {
          id,
          x,
          y,
          radius: baseSize / 2,
          maxRadius: maxRadius / 2,
          opacity,
          speed,
          element: ripple,
          startTime: Date.now(),
        }

        activeRipplesRef.current.push(rippleData)

        setTimeout(() => {
          try {
            if (containerRef.current && containerRef.current.contains(ripple)) {
              containerRef.current.removeChild(ripple)
            }
            activeRipplesRef.current = activeRipplesRef.current.filter((r) => r.id !== id)
          } catch (error) {
            console.error("Ripple cleanup error:", error)
          }
        }, animationDuration * 1000)
      } catch (error) {
        console.error("Create ripple error:", error)
      }
    }

    const updateRipplePhysics = () => {
      if (!containerRef.current) return

      try {
        const now = Date.now()

        activeRipplesRef.current.forEach((ripple) => {
          const elapsed = (now - ripple.startTime) / 1000
          ripple.radius = Math.min(ripple.radius + ripple.speed * 10, ripple.maxRadius)

          activeRipplesRef.current.forEach((otherRipple) => {
            if (ripple.id !== otherRipple.id) {
              const distance = Math.sqrt(Math.pow(ripple.x - otherRipple.x, 2) + Math.pow(ripple.y - otherRipple.y, 2))

              if (
                distance < ripple.radius + otherRipple.radius &&
                distance > Math.abs(ripple.radius - otherRipple.radius)
              ) {
                if (Math.random() > 0.95) {
                  const intersectionX = (ripple.x + otherRipple.x) / 2
                  const intersectionY = (ripple.y + otherRipple.y) / 2

                  const interferenceRipple = document.createElement("div")
                  interferenceRipple.className = "water-ripple-interference"
                  const size = 15 + Math.random() * 25

                  interferenceRipple.style.left = `${intersectionX - size / 2}px`
                  interferenceRipple.style.top = `${intersectionY - size / 2}px`
                  interferenceRipple.style.setProperty("--ripple-size", `${size}px`)
                  interferenceRipple.style.setProperty("--ripple-opacity", "0.6")

                  containerRef.current?.appendChild(interferenceRipple)

                  setTimeout(() => {
                    try {
                      if (containerRef.current && containerRef.current.contains(interferenceRipple)) {
                        containerRef.current.removeChild(interferenceRipple)
                      }
                    } catch (error) {
                      console.error("Interference cleanup error:", error)
                    }
                  }, 800)
                }

                ripple.speed *= 0.98
                otherRipple.speed *= 0.98
              }
            }
          })
        })
      } catch (error) {
        console.error("Physics update error:", error)
      }
    }

    physicsIntervalRef.current = setInterval(updateRipplePhysics, 50)

    const handleMouseMove = (e: MouseEvent) => {
      try {
        setMousePosition({ x: e.clientX, y: e.clientY })

        if (!containerRef.current) return

        const trail = document.createElement("div")
        trail.className = "cursor-trail"
        trail.style.left = `${e.clientX - 10}px`
        trail.style.top = `${e.clientY - 10}px`
        containerRef.current.appendChild(trail)

        setTimeout(() => {
          try {
            if (containerRef.current && containerRef.current.contains(trail)) {
              containerRef.current.removeChild(trail)
            }
          } catch (error) {
            console.error("Trail cleanup error:", error)
          }
        }, 800)

        if (Math.random() > 0.82) {
          createRipple(e.clientX, e.clientY)
        }
      } catch (error) {
        console.error("Mouse move error:", error)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      try {
        const touch = e.touches[0]
        if (touch) {
          setMousePosition({ x: touch.clientX, y: touch.clientY })

          if (Math.random() > 0.97) {
            createRipple(touch.clientX, touch.clientY)
          }
        }
      } catch (error) {
        console.error("Touch move error:", error)
      }
    }

    const handleClick = (e: MouseEvent) => {
      try {
        const numRipples = 2 + Math.floor(Math.random() * 4)
        for (let i = 0; i < numRipples; i++) {
          setTimeout(
            () => {
              const offsetX = (Math.random() - 0.5) * 40
              const offsetY = (Math.random() - 0.5) * 40
              createRipple(e.clientX + offsetX, e.clientY + offsetY, true)
            },
            i * (100 + Math.random() * 100),
          )
        }
      } catch (error) {
        console.error("Click error:", error)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      try {
        const touch = e.touches[0]
        if (touch) {
          const numRipples = 2 + Math.floor(Math.random() * 3)
          for (let i = 0; i < numRipples; i++) {
            setTimeout(
              () => {
                const offsetX = (Math.random() - 0.5) * 30
                const offsetY = (Math.random() - 0.5) * 30
                createRipple(touch.clientX + offsetX, touch.clientY + offsetY, true)
              },
              i * (80 + Math.random() * 80),
            )
          }
        }
      } catch (error) {
        console.error("Touch start error:", error)
      }
    }

    try {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchmove", handleTouchMove, { passive: true })
      window.addEventListener("click", handleClick)
      window.addEventListener("touchstart", handleTouchStart, { passive: true })
    } catch (error) {
      console.error("Event listener setup error:", error)
    }

    return () => {
      clearTimeout(timer)
      try {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("touchmove", handleTouchMove)
        window.removeEventListener("click", handleClick)
        window.removeEventListener("touchstart", handleTouchStart)

        if (physicsIntervalRef.current) {
          clearInterval(physicsIntervalRef.current)
          physicsIntervalRef.current = null
        }

        activeRipplesRef.current = []
      } catch (error) {
        console.error("Cleanup error:", error)
      }
    }
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl text-cyan-100">Loading...</div>
      </div>
    )
  }

  const FloatingElement = ({
    children,
    delay = 0,
    className = "",
  }: {
    children: React.ReactNode
    delay?: number
    className?: string
  }) => (
    <div className={`animate-[float_6s_ease-in-out_infinite] ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )

  const getWindowDimensions = () => {
    if (typeof window === "undefined") return { width: 1920, height: 1080 }
    return { width: window.innerWidth, height: window.innerHeight }
  }

  const { width: windowWidth, height: windowHeight } = getWindowDimensions()

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden dark bg-black text-white">
      <div className="water-background" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(0,200,255,0.1)_25%,rgba(0,200,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,200,255,0.1)_75%,rgba(0,200,255,0.1)_76%,transparent_77%,transparent),linear-gradient(0deg,transparent_24%,rgba(0,200,255,0.1)_25%,rgba(0,200,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,200,255,0.1)_75%,rgba(0,200,255,0.1)_76%,transparent_77%,transparent)] bg-[size:100px_100px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement delay={0} className="absolute top-20 left-20">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-xl animate-[glow_4s_ease-in-out_infinite]" />
        </FloatingElement>
        <FloatingElement delay={2} className="absolute top-40 right-32">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400/40 to-cyan-400/40 blur-lg animate-[glow_3s_ease-in-out_infinite]" />
        </FloatingElement>
        <FloatingElement delay={1} className="absolute bottom-32 left-1/4">
          <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-500/25 to-blue-500/25 blur-2xl animate-[glow_5s_ease-in-out_infinite]" />
        </FloatingElement>
        <FloatingElement delay={3} className="absolute top-1/2 right-1/4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-400/35 to-cyan-400/35 blur-lg animate-[glow_4s_ease-in-out_infinite]" />
        </FloatingElement>
      </div>

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
              My Journey
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
    </div>
  )
}

export default dynamic(() => Promise.resolve(FuturisticLandingComponent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-2xl text-cyan-100">Loading...</div>
    </div>
  ),
})
