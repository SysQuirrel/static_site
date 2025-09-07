"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { HomePage } from "@/components/pages/home-page"
import { ProjectsPage } from "@/components/pages/projects-page"
import { ContactPage } from "@/components/pages/contact-page"
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
  frequency: number
  amplitude: number
  damping: number
  phase: number
}

function FuturisticLandingComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRipplesRef = useRef<Ripple[]>([])
  const physicsIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setIsMounted(true)

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    if (typeof window === "undefined") return () => clearTimeout(timer)

    const createRipple = (x: number, y: number, isLarge = false, intensity = 1) => {
      if (!containerRef.current) return

      try {
        const ripple = document.createElement("div")
        const id = Math.random().toString(36).substr(2, 9)

        const baseSize = isLarge ? 40 + Math.random() * 60 * intensity : 15 + Math.random() * 35 * intensity

        const maxRadius = baseSize * (2.5 + Math.random() * 2) * intensity

        const speed = (0.6 + Math.random() * 0.8) * Math.sqrt(baseSize / 20)

        const animationDuration = maxRadius / 30 + Math.random() * 1.5

        const opacity = Math.min(0.4 + Math.random() * 0.4 * intensity, 0.9)

        const frequency = 0.8 + Math.random() * 0.4
        const amplitude = 0.3 + Math.random() * 0.4
        const damping = 0.95 + Math.random() * 0.04
        const phase = Math.random() * Math.PI * 2

        ripple.className = isLarge ? "water-ripple-large" : "water-ripple"
        ripple.style.left = `${x - baseSize / 2}px`
        ripple.style.top = `${y - baseSize / 2}px`
        ripple.style.animationDuration = `${animationDuration}s`
        ripple.style.setProperty("--ripple-opacity", opacity.toString())
        ripple.style.setProperty("--ripple-size", `${baseSize}px`)
        ripple.style.setProperty("--ripple-max-size", `${maxRadius}px`)

        ripple.style.setProperty("--random-scale", (Math.random() * 0.8 + 0.6).toString())
        ripple.style.setProperty("--random-border", (Math.random() * 2 + 0.5).toString())

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
          frequency,
          amplitude,
          damping,
          phase,
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

          const naturalGrowth = ripple.speed * 8 * Math.pow(ripple.damping, elapsed)
          ripple.radius = Math.min(ripple.radius + naturalGrowth, ripple.maxRadius)

          const ageRatio = elapsed / 3
          ripple.opacity *= Math.pow(ripple.damping, 0.1)

          activeRipplesRef.current.forEach((otherRipple) => {
            if (ripple.id !== otherRipple.id) {
              const distance = Math.sqrt(Math.pow(ripple.x - otherRipple.x, 2) + Math.pow(ripple.y - otherRipple.y, 2))

              const rippleEdge = ripple.radius
              const otherEdge = otherRipple.radius
              const interferenceThreshold = 20

              if (Math.abs(distance - rippleEdge - otherEdge) < interferenceThreshold) {
                if (Math.random() > 0.85) {
                  const interferenceX = ripple.x + (otherRipple.x - ripple.x) * (rippleEdge / distance)
                  const interferenceY = ripple.y + (otherRipple.y - ripple.y) * (rippleEdge / distance)

                  const phaseDiff = Math.abs(ripple.phase - otherRipple.phase)
                  const constructiveInterference = Math.cos(phaseDiff) > 0
                  const interferenceIntensity = constructiveInterference ? 1.3 : 0.7

                  const interferenceRipple = document.createElement("div")
                  interferenceRipple.className = "water-ripple-interference"
                  const size = (15 + Math.random() * 20) * interferenceIntensity

                  interferenceRipple.style.left = `${interferenceX - size / 2}px`
                  interferenceRipple.style.top = `${interferenceY - size / 2}px`
                  interferenceRipple.style.setProperty("--ripple-size", `${size}px`)
                  interferenceRipple.style.setProperty("--ripple-opacity", (0.4 * interferenceIntensity).toString())

                  containerRef.current?.appendChild(interferenceRipple)

                  setTimeout(() => {
                    try {
                      if (containerRef.current && containerRef.current.contains(interferenceRipple)) {
                        containerRef.current.removeChild(interferenceRipple)
                      }
                    } catch (error) {
                      console.error("Interference cleanup error:", error)
                    }
                  }, 1200)
                }

                ripple.speed *= 0.96
                otherRipple.speed *= 0.96
              }
            }
          })
        })
      } catch (error) {
        console.error("Physics update error:", error)
      }
    }

    physicsIntervalRef.current = setInterval(updateRipplePhysics, 40)

    let lastMouseTime = 0
    let lastMousePos = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      try {
        const currentTime = Date.now()
        const deltaTime = currentTime - lastMouseTime

        if (deltaTime > 0) {
          const deltaX = e.clientX - lastMousePos.x
          const deltaY = e.clientY - lastMousePos.y
          const velocity = (Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime) * 1000

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

          const rippleChance = Math.min(0.95, 0.75 + velocity / 2000)
          if (Math.random() > rippleChance) {
            const intensity = Math.min(2, 0.5 + velocity / 1000)
            createRipple(e.clientX, e.clientY, false, intensity)
          }
        }

        lastMouseTime = currentTime
        lastMousePos = { x: e.clientX, y: e.clientY }
      } catch (error) {
        console.error("Mouse move error:", error)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      try {
        const touch = e.touches[0]
        if (touch) {
          setMousePosition({ x: touch.clientX, y: touch.clientY })

          if (Math.random() > 0.95) {
            createRipple(touch.clientX, touch.clientY, false, 0.8)
          }
        }
      } catch (error) {
        console.error("Touch move error:", error)
      }
    }

    const handleClick = (e: MouseEvent) => {
      try {
        const numRipples = 3 + Math.floor(Math.random() * 3)
        const baseIntensity = 1.2 + Math.random() * 0.8

        for (let i = 0; i < numRipples; i++) {
          setTimeout(
            () => {
              const offsetX = (Math.random() - 0.5) * 25
              const offsetY = (Math.random() - 0.5) * 25
              const intensity = baseIntensity * (1 - i * 0.2)
              createRipple(e.clientX + offsetX, e.clientY + offsetY, i === 0, intensity)
            },
            i * (80 + Math.random() * 60),
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
          const baseIntensity = 1.0 + Math.random() * 0.6

          for (let i = 0; i < numRipples; i++) {
            setTimeout(
              () => {
                const offsetX = (Math.random() - 0.5) * 20
                const offsetY = (Math.random() - 0.5) * 20
                const intensity = baseIntensity * (1 - i * 0.25)
                createRipple(touch.clientX + offsetX, touch.clientY + offsetY, i === 0, intensity)
              },
              i * (70 + Math.random() * 50),
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

  const renderCurrentPage = () => {
    const pageProps = {
      isLoaded,
      mousePosition,
      windowWidth,
      windowHeight,
      FloatingElement,
    }

    switch (currentPage) {
      case "projects":
        return <ProjectsPage {...pageProps} />
      case "contact":
        return <ContactPage {...pageProps} />
      default:
        return <HomePage {...pageProps} />
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden dark bg-black text-white">
      <div className="water-background" />
      <NavigationSidebar currentPage={currentPage} onNavigate={handleNavigation} />

      <div className="ml-0 md:ml-24 transition-all duration-300">
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

        {renderCurrentPage()}
      </div>
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
