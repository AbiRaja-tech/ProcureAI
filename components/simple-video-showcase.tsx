"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface MediaItem {
  type: "video" | "image" | "youtube"
  src: string
}

interface SimpleVideoShowcaseProps {
  media: MediaItem[]
  titles: string[]
  descriptions: string[]
  currentStep: number
  onStepChange: (step: number) => void
  className?: string
}

export function SimpleVideoShowcase({
  media,
  titles,
  descriptions,
  currentStep,
  onStepChange,
  className = "",
}: SimpleVideoShowcaseProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null)

  const nextStep = () => {
    if (currentStep < media.length - 1) {
      onStepChange(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1)
    }
  }

  const openLightbox = (mediaItem: MediaItem) => {
    setLightboxMedia(mediaItem)
    setIsLightboxOpen(true)
  }

  return (
    <>
      <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
        <Card className="overflow-hidden shadow-xl border-0 bg-white">
          <CardContent className="p-0">
            {/* Video Container */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              {media.map((mediaItem, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: index === currentStep ? 1 : 0,
                    zIndex: index === currentStep ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {mediaItem.type === "youtube" ? (
                    <div className="relative w-full h-full group">
                      <iframe
                        src={`${mediaItem.src}?autoplay=1&mute=1&loop=1&controls=1&modestbranding=1&rel=0`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={titles[index]}
                      />

                      {/* Expand Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => openLightbox(mediaItem)}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : mediaItem.type === "video" ? (
                    <div className="relative w-full h-full group">
                      <video className="w-full h-full object-cover" autoPlay loop muted playsInline controls>
                        <source src={mediaItem.src} type="video/mp4" />
                        <source src={mediaItem.src} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Expand Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => openLightbox(mediaItem)}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="relative w-full h-full group cursor-pointer"
                      onClick={() => openLightbox(mediaItem)}
                    >
                      <img
                        src={mediaItem.src || "/placeholder.svg"}
                        alt={titles[index]}
                        className="w-full h-full object-cover"
                      />

                      {/* Play Overlay for Images */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full p-4 shadow-lg">
                          <Play className="w-8 h-8 text-gray-700" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10 rounded-full"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10 rounded-full"
                onClick={nextStep}
                disabled={currentStep === media.length - 1}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Video Info Bar */}
            <div className="bg-white p-4 sm:p-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{titles[currentStep]}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{descriptions[currentStep]}</p>
                </div>

                {/* Step Counter */}
                <div className="ml-4 text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    {currentStep + 1} of {media.length}
                  </div>
                  <div className="flex gap-1">
                    {media.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentStep ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        onClick={() => onStepChange(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && lightboxMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
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

              {lightboxMedia.type === "youtube" ? (
                <iframe
                  src={`${lightboxMedia.src}?autoplay=1&controls=1`}
                  className="w-full aspect-video rounded-lg shadow-2xl"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video player"
                />
              ) : lightboxMedia.type === "video" ? (
                <video
                  src={lightboxMedia.src}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={lightboxMedia.src || "/placeholder.svg"}
                  alt="Expanded view"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
