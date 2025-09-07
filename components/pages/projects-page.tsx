"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

interface ProjectsPageProps {
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

export function ProjectsPage({
  isLoaded,
  mousePosition,
  windowWidth,
  windowHeight,
  FloatingElement,
}: ProjectsPageProps) {
  const projects = [
    {
      title: "Aqua Dynamics",
      description: "Advanced water simulation with realistic physics and particle systems",
      tech: ["React", "WebGL", "Three.js"],
      status: "Live",
      delay: 0,
    },
    {
      title: "Neural Waves",
      description: "AI-powered wave pattern generation using machine learning algorithms",
      tech: ["Python", "TensorFlow", "WebAssembly"],
      status: "Beta",
      delay: 0.2,
    },
    {
      title: "Ripple Engine",
      description: "High-performance ripple effect library for web applications",
      tech: ["TypeScript", "Canvas API", "Web Workers"],
      status: "Open Source",
      delay: 0.4,
    },
    {
      title: "Fluid Interface",
      description: "Experimental UI components with liquid-like interactions",
      tech: ["Next.js", "Framer Motion", "CSS Houdini"],
      status: "Concept",
      delay: 0.6,
    },
    {
      title: "Ocean Depths",
      description: "Immersive underwater exploration experience with VR support",
      tech: ["Unity", "C#", "WebXR"],
      status: "Development",
      delay: 0.8,
    },
    {
      title: "Hydro Analytics",
      description: "Real-time water quality monitoring dashboard with IoT integration",
      tech: ["Vue.js", "Node.js", "MongoDB"],
      status: "Live",
      delay: 1.0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "text-green-400 border-green-400/50 bg-green-400/10"
      case "Beta":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10"
      case "Development":
        return "text-blue-400 border-blue-400/50 bg-blue-400/10"
      case "Open Source":
        return "text-purple-400 border-purple-400/50 bg-purple-400/10"
      default:
        return "text-gray-400 border-gray-400/50 bg-gray-400/10"
    }
  }

  return (
    <>
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
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
                Projects
              </h1>
              <p
                className={`text-xl md:text-2xl text-cyan-100 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                {"Exploring the depths of interactive water experiences"}
              </p>
            </div>
          </FloatingElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <FloatingElement key={index} delay={project.delay}>
                <Card
                  className="p-6 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer group border-2 hover:border-cyan-500/50 bg-black/40 backdrop-blur-sm border-cyan-500/20"
                  style={{
                    transform: `perspective(1000px) rotateX(${(mousePosition.y - windowHeight / 2) * 0.005}deg) rotateY(${(mousePosition.x - windowWidth / 2) * 0.005}deg)`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-cyan-100 group-hover:text-cyan-50 transition-colors">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-cyan-200/80 mb-6 flex-grow">{project.description}</p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-md border border-cyan-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-200 hover:text-cyan-100 bg-transparent"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 text-white border-0"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </Card>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
