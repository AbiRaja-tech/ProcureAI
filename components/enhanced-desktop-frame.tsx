"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Maximize2, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaItem {
  type: "video" | "image" | "youtube"
  src: string
}

interface EnhancedDesktopFrameProps {
  media: MediaItem[]
  titles: string[]
  descriptions: string[]
  currentStep: number
  onStepChange: (step: number) => void
  className?: string
}

export function EnhancedDesktopFrame({
  media,
  titles,
  descriptions,
  currentStep,
  onStepChange,
  className = "",
}: EnhancedDesktopFrameProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null)
  const [videoStates, setVideoStates] = useState<{
    [key: number]: { isPlaying: boolean; isMuted: boolean; hasError: boolean }
  }>({})
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

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

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index]
    if (video && !videoStates[index]?.hasError) {
      if (video.paused) {
        video.play().catch(() => {
          setVideoStates((prev) => ({
            ...prev,
            [index]: { ...prev[index], hasError: true },
          }))
        })
      } else {
        video.pause()
      }
    }
  }

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      video.muted = !video.muted
      setVideoStates((prev) => ({
        ...prev,
        [index]: { ...prev[index], isMuted: video.muted },
      }))
    }
  }

  const handleVideoError = (index: number) => {
    setVideoStates((prev) => ({
      ...prev,
      [index]: { isPlaying: false, isMuted: true, hasError: true },
    }))
  }

  const handleVideoPlay = (index: number) => {
    setVideoStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isPlaying: true },
    }))
  }

  const handleVideoPause = (index: number) => {
    setVideoStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isPlaying: false },
    }))
  }

  // Initialize video states
  useEffect(() => {
    const initialStates: { [key: number]: { isPlaying: boolean; isMuted: boolean; hasError: boolean } } = {}
    media.forEach((_, index) => {
      initialStates[index] = { isPlaying: false, isMuted: true, hasError: false }
    })
    setVideoStates(initialStates)
  }, [media])

  // Handle video playback when step changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && !videoStates[index]?.hasError) {
        if (index === currentStep) {
          // Auto-play current video
          video.play().catch(() => {
            setVideoStates((prev) => ({
              ...prev,
              [index]: { ...prev[index], isPlaying: false },
            }))
          })
        } else {
          // Pause other videos
          video.pause()
        }
      }
    })
  }, [currentStep, videoStates])

  return (
    <>
      <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
        {/* Enhanced Desktop Frame */}
        <div className="relative px-2 sm:px-0">
          {/* Monitor Base - Hidden on mobile for cleaner look */}
          <div className="hidden sm:block absolute -bottom-3 lg:-bottom-4 xl:-bottom-6 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-28 h-3 sm:h-4 lg:h-6 bg-gradient-to-b from-gray-300 to-gray-500 rounded-b-2xl shadow-lg"></div>
          <div className="hidden sm:block absolute -bottom-4 lg:-bottom-6 xl:-bottom-8 left-1/2 transform -translate-x-1/2 w-20 sm:w-28 lg:w-40 h-2 sm:h-2 lg:h-3 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-xl"></div>

          {/* Monitor Frame */}
          <div className="relative bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-xl sm:rounded-2xl lg:rounded-3xl p-1.5 sm:p-2 lg:p-3 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-300">
            {/* Screen Bezel */}
            <div className="bg-black rounded-lg sm:rounded-xl lg:rounded-2xl p-1 relative overflow-hidden shadow-inner">
              {/* Screen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-lg sm:rounded-xl lg:rounded-2xl"></div>

              {/* macOS Menu Bar */}
              <div className="bg-gray-100 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 flex items-center justify-between rounded-t-md sm:rounded-t-lg lg:rounded-t-xl border-b border-gray-200">
                <div className="flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full shadow-sm"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full shadow-sm"></div>
                </div>
                <div className="flex-1 text-center px-2">
                  <div className="bg-white rounded-md px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-600 max-w-xs mx-auto truncate">
                    <span className="hidden sm:inline">ProcureAI - </span>
                    <span className="text-xs">{titles[currentStep]}</span>
                  </div>
                </div>
                <div className="w-6 sm:w-8 lg:w-16"></div>
              </div>

              {/* Screen Content */}
              <div className="bg-white relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[450px] rounded-b-md sm:rounded-b-lg lg:rounded-b-xl overflow-hidden">
                <div className="relative h-full">
                  {media.map((mediaItem, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: index === currentStep ? 1 : 0,
                        scale: index === currentStep ? 1 : 0.98,
                        zIndex: index === currentStep ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.5 },
                      }}
                    >
                      {mediaItem.type === "youtube" ? (
                        <div className="relative w-full h-full">
                          <iframe
                            src={`${mediaItem.src}?autoplay=1&mute=1&loop=1&controls=1&modestbranding=1&rel=0&enablejsapi=1`}
                            className="w-full h-full object-cover"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title={titles[index]}
                            loading="lazy"
                          />

                          {/* YouTube Overlay for Lightbox */}
                          <div
                            className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer"
                            onClick={() => openLightbox(mediaItem)}
                          >
                            <div className="bg-white/95 rounded-full p-2 sm:p-3 lg:p-4 shadow-xl border border-gray-200">
                              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-gray-700" />
                            </div>
                          </div>
                        </div>
                      ) : mediaItem.type === "video" && !videoStates[index]?.hasError ? (
                        <div className="relative w-full h-full">
                          <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            className="w-full h-full object-cover cursor-pointer"
                            loop
                            muted={videoStates[index]?.isMuted !== false}
                            playsInline
                            onClick={() => openLightbox(mediaItem)}
                            onError={() => handleVideoError(index)}
                            onPlay={() => handleVideoPlay(index)}
                            onPause={() => handleVideoPause(index)}
                            poster="/placeholder.svg?height=350&width=600&text=Loading+Video"
                          >
                            <source src={mediaItem.src} type="video/mp4" />
                            <source src={mediaItem.src} type="video/webm" />
                            Your browser does not support the video tag.
                          </video>

                          {/* Video Controls Overlay */}
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                            <div className="bg-white/95 rounded-full p-2 sm:p-3 lg:p-4 shadow-xl border border-gray-200">
                              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-gray-700" />
                            </div>
                          </div>

                          {/* Video Control Buttons */}
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex gap-1 sm:gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="bg-black/50 text-white hover:bg-black/70 w-6 h-6 sm:w-8 sm:h-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleVideo(index)
                              }}
                            >
                              {videoStates[index]?.isPlaying ? (
                                <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                              ) : (
                                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                              )}
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="bg-black/50 text-white hover:bg-black/70 w-6 h-6 sm:w-8 sm:h-8 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleMute(index)
                              }}
                            >
                              {videoStates[index]?.isMuted ? (
                                <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                              ) : (
                                <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={
                              mediaItem.type === "image"
                                ? mediaItem.src
                                : "/placeholder.svg?height=350&width=600&text=Demo+Screenshot"
                            }
                            alt={titles[index]}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => openLightbox({ type: "image", src: mediaItem.src })}
                          />

                          {/* Hover Overlay - Only show on larger screens */}
                          <div className="hidden sm:flex absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 items-center justify-center opacity-0 hover:opacity-100">
                            <div className="bg-white/95 rounded-full p-2 sm:p-3 lg:p-4 shadow-xl border border-gray-200">
                              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-gray-700" />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-1 sm:bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 sm:space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 shadow-lg border border-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 p-0 hover:bg-gray-100"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                  </Button>

                  <div className="flex items-center space-x-0.5 sm:space-x-1">
                    {media.map((_, index) => (
                      <motion.button
                        key={index}
                        className={`h-1 sm:h-1.5 lg:h-2 rounded-full transition-all duration-300 ${
                          index === currentStep ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        animate={{
                          width: index === currentStep ? 16 : 6,
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => onStepChange(index)}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 p-0 hover:bg-gray-100"
                    onClick={nextStep}
                    disabled={currentStep === media.length - 1}
                  >
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && lightboxMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-6 sm:-top-8 lg:-top-12 right-0 text-white hover:bg-white/20"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </Button>

              {lightboxMedia.type === "youtube" ? (
                <iframe
                  src={`${lightboxMedia.src}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                  className="w-full h-auto max-h-[85vh] aspect-video rounded-lg sm:rounded-xl shadow-2xl"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                />
              ) : lightboxMedia.type === "video" ? (
                <video
                  src={lightboxMedia.src}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg sm:rounded-xl shadow-2xl"
                  controls
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={lightboxMedia.src || "/placeholder.svg"}
                  alt="Expanded view"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg sm:rounded-xl shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
