"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
  onStepClick: (step: number) => void
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: Vertical layout */}
      <div className="block sm:hidden">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.button
              key={index}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-300 ${
                index === currentStep
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : index < currentStep
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-blue-300"
              }`}
              onClick={() => onStepClick(index)}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                    index === currentStep
                      ? "bg-blue-600 border-blue-600 text-white"
                      : index < currentStep
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-300 text-gray-400"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                <span className="text-sm font-medium truncate">{step}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Desktop: Horizontal layout */}
      <div className="hidden sm:block overflow-x-auto pb-2">
        <div className="flex items-center justify-center space-x-2 md:space-x-4 min-w-max px-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.button
                className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-500 ${
                  index <= currentStep
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-400 hover:border-blue-300"
                }`}
                onClick={() => onStepClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundColor: index <= currentStep ? "#2563eb" : "#ffffff",
                  borderColor: index <= currentStep ? "#2563eb" : "#d1d5db",
                  color: index <= currentStep ? "#ffffff" : "#9ca3af",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: index < currentStep ? 1 : index === currentStep ? 1 : 0.8,
                    opacity: index < currentStep ? 1 : index === currentStep ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <span className="text-xs md:text-sm font-semibold">{index + 1}</span>
                  )}
                </motion.div>
              </motion.button>

              {index < steps.length - 1 && (
                <motion.div
                  className="h-0.5 mx-1 md:mx-2 w-6 md:w-12 lg:w-16"
                  animate={{
                    backgroundColor: index < currentStep ? "#2563eb" : "#d1d5db",
                  }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step labels for larger screens */}
        <div className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-8 mt-4 px-4">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center max-w-[200px]">
              <span
                className={`text-xs xl:text-sm font-medium transition-colors duration-300 ${
                  index === currentStep ? "text-blue-600" : index < currentStep ? "text-green-600" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
