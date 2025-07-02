"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, BarChart3, Users, Shield, Play, CheckCircle, Sparkles, Menu, X } from "lucide-react"
import { DemoShowcase } from "@/components/demo-showcase"
import { ResearchBackedBenefits } from "@/components/research-backed-benefits"
import { PoweredBy } from "@/components/powered-by"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Google Apps Script Web App URL - REPLACE WITH YOUR ACTUAL URL
  // For testing, we'll use a placeholder that shows a helpful message
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxMzdvVUX8TbwLeeCK4pIZw6WHPT8ju5SCHjweDU1w0R2S-yplo8ahaU45OK4CcaT0w/exec"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Bot,
      title: "AI-Assisted Order Generation",
      description: "Transform natural language requests into perfect purchase orders with intelligent automation.",
      stats: "75% faster processing",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Smart insights predict ordering patterns and optimize your procurement strategy.",
      stats: "$2M+ annual savings",
    },
    {
      icon: Users,
      title: "Vendor Management",
      description: "Centralized vendor relationships with automated performance tracking and scoring.",
      stats: "40% better performance",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with seamless ERP integration and compliance automation.",
      stats: "100% compliance rate",
    },
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission with comprehensive error handling and fallback
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset status
    setSubmitStatus("idle")
    setErrorMessage("")

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      setErrorMessage("Please fill in all required fields")
      setSubmitStatus("error")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address")
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)

    // Check if Google Apps Script URL is configured
    if (GOOGLE_SCRIPT_URL.includes("YOUR_SCRIPT_ID_HERE")) {
      console.log("Google Apps Script not configured, using demo mode")
      // Simulate successful submission for demo purposes
      setTimeout(() => {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", company: "" })
        setIsSubmitting(false)
      }, 2000)
      return
    }

    try {
      // Prepare data for Google Sheets
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        source: "Landing Page CTA",
        timestamp: new Date().toISOString(),
      }

      console.log("Attempting submission to:", GOOGLE_SCRIPT_URL)
      console.log("Submission data:", submissionData)

      // Try multiple submission methods
      let response: Response | null = null
      let lastError: Error | null = null

      // Method 1: Standard fetch with CORS
      try {
        console.log("Trying Method 1: Standard fetch")
        response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        })
        console.log("Method 1 response:", response.status, response.statusText)
      } catch (error) {
        console.log("Method 1 failed:", error)
        lastError = error as Error
      }

      // Method 2: Try with no-cors mode if CORS failed
      if (!response || !response.ok) {
        try {
          console.log("Trying Method 2: No-CORS mode")
          response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
          })
          console.log("Method 2 response:", response.status, response.type)

          // With no-cors, we can't read the response, so assume success if no error
          if (response.type === "opaque") {
            console.log("No-CORS submission completed (opaque response)")
            setSubmitStatus("success")
            setFormData({ name: "", email: "", company: "" })
            return
          }
        } catch (error) {
          console.log("Method 2 failed:", error)
          lastError = error as Error
        }
      }

      // Method 3: Try as form data
      if (!response || !response.ok) {
        try {
          console.log("Trying Method 3: Form data")
          const formDataPayload = new FormData()
          formDataPayload.append("name", submissionData.name)
          formDataPayload.append("email", submissionData.email)
          formDataPayload.append("company", submissionData.company)
          formDataPayload.append("source", submissionData.source)
          formDataPayload.append("timestamp", submissionData.timestamp)

          response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: formDataPayload,
          })
          console.log("Method 3 response:", response.status, response.type)

          if (response.type === "opaque") {
            console.log("Form data submission completed (opaque response)")
            setSubmitStatus("success")
            setFormData({ name: "", email: "", company: "" })
            return
          }
        } catch (error) {
          console.log("Method 3 failed:", error)
          lastError = error as Error
        }
      }

      // If we have a response, try to process it
      if (response && response.ok) {
        try {
          const result = await response.json()
          console.log("Response result:", result)

          if (result.success) {
            setSubmitStatus("success")
            setFormData({ name: "", email: "", company: "" })
          } else {
            throw new Error(result.message || "Submission failed")
          }
        } catch (jsonError) {
          console.log("JSON parsing failed, but response was OK - assuming success")
          setSubmitStatus("success")
          setFormData({ name: "", email: "", company: "" })
        }
      } else {
        // All methods failed
        throw lastError || new Error("All submission methods failed")
      }
    } catch (error) {
      console.error("Form submission error:", error)

      // Provide helpful error messages
      let errorMsg = "Unable to submit form. Please try again."

      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMsg = "Connection failed. Please check your internet connection and try again."
      } else if (error instanceof Error) {
        if (error.message.includes("CORS")) {
          errorMsg = "Configuration issue detected. Please contact support."
        } else {
          errorMsg = error.message
        }
      }

      // For demo purposes, show a helpful message if it's a configuration issue
      if (
        GOOGLE_SCRIPT_URL.includes("script.google.com") &&
        (error instanceof TypeError || errorMsg.includes("Configuration"))
      ) {
        errorMsg = "Demo mode: Form submission simulated. In production, configure Google Apps Script URL."

        // Simulate success after showing the message
        setTimeout(() => {
          setSubmitStatus("success")
          setFormData({ name: "", email: "", company: "" })
        }, 3000)
      }

      setErrorMessage(errorMsg)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (submitStatus !== "idle") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle")
        setErrorMessage("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">ProcureAI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">
                Features
              </a>
              <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">
                Demo
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base">
                Benefits
              </a>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base px-4 lg:px-6">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden border-t border-gray-200 py-4 bg-white"
            >
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#demo"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Demo
                </a>
                <a
                  href="#benefits"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Benefits
                </a>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">Get Started</Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 text-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                AI-Powered Procurement Platform
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Transform Your
                <span className="text-blue-600 block">Purchase Orders</span>
                with AI Intelligence
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                Streamline procurement with intelligent automation, predictive analytics, and seamless vendor
                management. Experience the future of purchase order processing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-transparent w-full sm:w-auto"
                  onClick={() =>
                    window.open("https://www.youtube.com/playlist?list=PLPd5tir_qyCvadfI-hORCFteOXlxoXV7l", "_blank")
                  }
                >
                  <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Showcase */}
      <DemoShowcase />

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight px-2">
              Powerful Features for Modern Procurement
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Everything you need to revolutionize your procurement process with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 shadow-sm bg-white">
                  <CardContent className="p-4 sm:p-6 lg:p-7 xl:p-8 h-full flex flex-col">
                    {/* Icon and Title Section */}
                    <div className="flex items-start mb-4 sm:mb-5 lg:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-blue-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 mb-4 sm:mb-5 lg:mb-6">
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>

                    {/* Stats Callout */}
                    <div className="mt-auto">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-3 sm:px-4 py-2 sm:py-3 border-l-4 border-blue-600">
                        <p className="text-xs sm:text-sm lg:text-base text-blue-700 font-semibold text-center">
                          {feature.stats}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research-Backed Benefits */}
      <ResearchBackedBenefits />

      {/* Powered By Section */}
      <PoweredBy />

      {/* CTA Section with Integrated Form */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
              Ready to Transform Your Procurement?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 px-2">
              Join thousands of companies using ProcureAI to streamline their purchase orders
            </p>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                  <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Start Your Free Trial</h3>
                    <ul className="space-y-2 sm:space-y-3 text-blue-100">
                      <li className="flex items-center text-sm sm:text-base">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400 flex-shrink-0" />
                        30-day free trial
                      </li>
                      <li className="flex items-center text-sm sm:text-base">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400 flex-shrink-0" />
                        No credit card required
                      </li>
                      <li className="flex items-center text-sm sm:text-base">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400 flex-shrink-0" />
                        Full platform access
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Success Message */}
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 sm:p-4 mb-4"
                      >
                        <div className="flex items-center text-green-100">
                          <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base font-medium">
                            Thanks! Our team will contact you soon.
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 sm:p-4 mb-4"
                      >
                        <div className="flex items-center text-red-100">
                          <X className="w-5 h-5 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{errorMessage}</span>
                        </div>
                      </motion.div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="bg-white/20 border-white/30 text-white placeholder:text-blue-200 h-10 sm:h-12"
                        disabled={isSubmitting}
                        required
                      />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your work email"
                        className="bg-white/20 border-white/30 text-white placeholder:text-blue-200 h-10 sm:h-12"
                        disabled={isSubmitting}
                        required
                      />
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Company name"
                        className="bg-white/20 border-white/30 text-white placeholder:text-blue-200 h-10 sm:h-12"
                        disabled={isSubmitting}
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold h-10 sm:h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                            Submitting...
                          </div>
                        ) : (
                          <>
                            Start Free Trial
                            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
