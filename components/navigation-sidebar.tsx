"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, User, FolderOpen, Menu, X } from "lucide-react"

interface NavigationSidebarProps {
  currentPage?: string
  onNavigate?: (page: string) => void
}

export function NavigationSidebar({ currentPage = "home", onNavigate }: NavigationSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "contact", label: "Contact", icon: User },
  ]

  const handleNavigation = (pageId: string) => {
    onNavigate?.(pageId)
    setIsOpen(false) // Close mobile menu after navigation
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 md:hidden bg-black/20 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300"
        size="sm"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-20 md:w-24 bg-black/10 backdrop-blur-md border-r border-cyan-500/20 z-40 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Futuristic background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,255,200,0.02)_49%,rgba(0,255,200,0.02)_51%,transparent_52%)] pointer-events-none" />

        {/* Logo/Brand Area */}
        <div className="flex items-center justify-center h-20 border-b border-cyan-500/20">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 relative group">
            <div className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
              S
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center py-8 space-y-6">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <div key={item.id} className="relative group">
                <Button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-12 h-12 rounded-xl transition-all duration-300 border-2 backdrop-blur-sm ${
                    isActive
                      ? "bg-cyan-500/20 border-cyan-400/60 shadow-lg shadow-cyan-500/25"
                      : "bg-black/20 border-cyan-500/20 hover:border-cyan-400/40 hover:bg-cyan-500/10"
                  } group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-cyan-500/20`}
                  size="sm"
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-cyan-300" : "text-cyan-100 group-hover:text-cyan-300"
                    }`}
                  />
                </Button>

                {/* Tooltip */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-cyan-100 whitespace-nowrap shadow-lg shadow-cyan-500/10">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/80 border-l border-b border-cyan-500/30 rotate-45" />
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse" />
                )}

                {/* Hover ripple effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/10 animate-ping" />
                </div>
              </div>
            )
          })}
        </nav>

        {/* Bottom decorative element */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-8 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-full" />
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
