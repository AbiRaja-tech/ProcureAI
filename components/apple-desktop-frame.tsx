"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DesktopFrameProps {
  images: string[]
  titles: string[]
  descriptions: string[]
  currentStep: number
  onStepChange: (step: number) => void
  className?: string
}

export function AppleDesktopFrame({
  images,
  titles,
  descriptions,
  currentStep,
  onStepChange,
  className = "",
}: DesktopFrameProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")

  const nextStep = () => {
    if (currentStep < images.length - 1) {
      onStepChange(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1)
    }
  }

  const openLightbox = (image: string) => {
    setLightboxImage(image)
    setIsLightboxOpen(true)
  }

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Desktop Frame */}
        <div className="relative bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-2xl p-3 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-black rounded-xl p-6 relative overflow-hidden">
            {/* macOS Traffic Lights */}
            <div className="absolute top-4 left-4 flex space-x-2 z-10">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            {/* Screen Content */}
            <div className="bg-white rounded-lg overflow-hidden relative min-h-[400px] md:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative h-full"
                >
                  <img
                    src={images[currentStep] || "/placeholder.svg?height=500&width=800&text=Demo+Screenshot"}
                    alt={titles[currentStep]}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openLightbox(images[currentStep])}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="bg-white/90 rounded-full p-3 shadow-lg">
                      <ZoomIn className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 shadow-md"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 shadow-md"
                onClick={nextStep}
                disabled={currentStep === images.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* iMac Stand */}
          <div className="flex justify-center mt-3">
            <div className="w-32 h-6 bg-gradient-to-b from-gray-200 to-gray-400 rounded-b-lg"></div>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-3 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full"></div>
          </div>
        </div>

        {/* Step Counter */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border">
          <span className="text-sm font-medium text-gray-600">
            {currentStep + 1} of {images.length}
          </span>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              <img
                src={lightboxImage || "/placeholder.svg"}
                alt="Expanded view"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
