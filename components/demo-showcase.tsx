"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SimpleVideoShowcase } from "./simple-video-showcase"
import { StepIndicator } from "./step-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const demoSteps = [
  {
    title: "AI-Powered Order Creation",
    description:
      "Watch how our AI assistant transforms natural language requests into complete purchase orders in seconds.",
    type: "youtube",
    media: "https://www.youtube.com/embed/bZqgWCU1Y8U",
    features: ["Natural language processing", "Smart vendor matching", "Automated compliance checks"],
  },
  {
    title: "Intelligent Form Auto-completion",
    description:
      "See how our smart forms automatically populate vendor information, pricing, and quantity optimization.",
    type: "youtube",
    media: "https://www.youtube.com/embed/bZqgWCU1Y8U",
    features: ["Auto-complete vendor data", "Historical pricing insights", "Quantity optimization"],
  },
  {
    title: "Predictive Analytics Dashboard",
    description:
      "Explore our advanced analytics that predict ordering patterns and identify cost-saving opportunities.",
    type: "youtube",
    media: "https://www.youtube.com/embed/0WX1FRMhoD8",
    features: ["Demand forecasting", "Spend analysis", "Performance metrics"],
  },
  {
    title: "Vendor Management Portal",
    description: "Discover how we centralize vendor relationships with performance tracking and automated scoring.",
    type: "youtube",
    media: "https://www.youtube.com/embed/0WX1FRMhoD8",
    features: ["Performance tracking", "Vendor scoring", "Relationship management"],
  },
]

export function DemoShowcase() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <section id="demo" className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 lg:mb-12"
        >
          <Badge className="mb-3 sm:mb-4 bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 text-sm">
            Interactive Demo
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            See ProcureAI in Action
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Take a guided tour through our platform's key features and discover how AI transforms procurement
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <StepIndicator
            steps={demoSteps.map((step) => step.title)}
            currentStep={currentStep}
            onStepClick={handleStepChange}
          />
        </div>

        {/* Main Demo Content */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12 items-start mb-8 sm:mb-12 lg:mb-16">
          {/* Video Showcase */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <SimpleVideoShowcase
              media={demoSteps.map((step) => ({ type: step.type as "video" | "image" | "youtube", src: step.media }))}
              titles={demoSteps.map((step) => step.title)}
              descriptions={demoSteps.map((step) => step.description)}
              currentStep={currentStep}
              onStepChange={handleStepChange}
              className="mx-auto"
            />
          </div>

          {/* Step Content */}
          <div className="lg:col-span-1 order-1 lg:order-2 relative min-h-[280px] sm:min-h-[320px] lg:min-h-[400px]">
            {demoSteps.map((step, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: index === currentStep ? 1 : 0,
                  x: index === currentStep ? 0 : index < currentStep ? -20 : 20,
                  zIndex: index === currentStep ? 1 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="space-y-4 sm:space-y-6 px-2 sm:px-0 h-full flex flex-col">
                  <div className="flex-1">
                    <Badge className="mb-3 sm:mb-4 bg-blue-600 text-white text-sm">Step {index + 1}</Badge>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                      {step.description}
                    </p>

                    <Card className="border-blue-200 bg-blue-50 mb-4 sm:mb-6">
                      <CardContent className="p-3 sm:p-4 lg:p-6">
                        <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Key Features:</h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {step.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              className="flex items-start text-gray-700 text-sm sm:text-base"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{
                                opacity: index === currentStep ? 1 : 0,
                                x: index === currentStep ? 0 : -20,
                              }}
                              transition={{
                                duration: 0.3,
                                delay: index === currentStep ? featureIndex * 0.1 + 0.1 : 0,
                              }}
                            >
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                              <span className="leading-relaxed">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-auto">
                    <Button
                      onClick={nextStep}
                      disabled={currentStep === demoSteps.length - 1}
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                    >
                      {currentStep === demoSteps.length - 1 ? "Demo Complete" : "Next Step"}
                      {currentStep !== demoSteps.length - 1 && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
