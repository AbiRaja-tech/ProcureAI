"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, FileText, BarChart3, Users, Menu, X, ChevronRight } from "lucide-react"

const sections = [
  { id: "hero", label: "Overview", icon: Menu },
  { id: "ai-assistant", label: "AI Assistant", icon: Brain },
  { id: "order-generator", label: "Order Generator", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "vendor-management", label: "Vendor Hub", icon: Users },
]

export function FloatingNavigator() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <Card className="glass-card shadow-xl border-blue-500/20">
              <CardContent className="p-4 w-64">
                <div className="space-y-2">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "ghost"}
                      className={`w-full justify-start text-left ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:text-blue-400 hover:bg-blue-500/10"
                      }`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      <section.icon className="w-4 h-4 mr-3" />
                      {section.label}
                      {activeSection === section.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass shadow-lg hover:shadow-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
    </div>
  )
}
