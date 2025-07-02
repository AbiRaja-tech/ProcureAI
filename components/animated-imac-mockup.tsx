"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { X, ZoomIn, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnimatedMockupProps {
  screenshot?: string
  videoSrc?: string
  alt: string
  className?: string
  delay?: number
}

export function AnimatedMockup({ screenshot, videoSrc, alt, className = "", delay = 0 }: AnimatedMockupProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50, scale: 0.9 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              delay: delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        }}
        className={`relative group cursor-pointer ${className}`}
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* iMac Frame with enhanced styling */}
        <motion.div
          className="relative bg-gradient-to-b from-slate-700 via-slate-600 to-slate-800 rounded-2xl p-3 shadow-2xl border border-slate-600/30"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Screen Bezel */}
          <div className="bg-slate-900 rounded-xl p-8 relative overflow-hidden border border-slate-700/50">
            {/* Reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

            {/* Screen Content */}
            <div className="bg-white rounded-lg overflow-hidden relative">
              {videoSrc ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideo()
                    }}
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              ) : (
                <img src={screenshot || "/placeholder.svg"} alt={alt} className="w-full h-auto object-cover" />
              )}

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="bg-white/90 rounded-full p-4 shadow-lg"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <ZoomIn className="w-6 h-6 text-gray-700" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced iMac Stand */}
          <div className="flex justify-center mt-3">
            <div className="w-36 h-8 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-b-xl shadow-inner" />
          </div>
          <div className="flex justify-center mt-1">
            <div className="w-52 h-4 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-full shadow-lg" />
          </div>
        </motion.div>

        {/* Floating Badge */}
        <motion.div
          className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs px-3 py-2 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          Click to expand
        </motion.div>
      </motion.div>

      {/* Enhanced Lightbox */}
      {isLightboxOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-7xl max-h-[90vh] w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            ) : (
              <img
                src={screenshot || "/placeholder.svg"}
                alt={alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
