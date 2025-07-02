"use client"

import { useState } from "react"
import { X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface iMacMockupProps {
  screenshot: string
  alt: string
  className?: string
}

export function iMacMockup({ screenshot, alt, className = "" }: iMacMockupProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  return (
    <>
      <div
        className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 ${className}`}
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* iMac Frame */}
        <div className="relative bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg p-2 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-black rounded-lg p-6 relative overflow-hidden">
            {/* Screen Content */}
            <div className="bg-white rounded-sm overflow-hidden relative">
              <img src={screenshot || "/placeholder.svg"} alt={alt} className="w-full h-auto object-cover" />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>
          </div>

          {/* iMac Stand */}
          <div className="flex justify-center mt-2">
            <div className="w-32 h-6 bg-gradient-to-b from-gray-200 to-gray-400 rounded-b-lg"></div>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-3 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full"></div>
          </div>
        </div>

        {/* Floating Badge */}
        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to expand
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            <img
              src={screenshot || "/placeholder.svg"}
              alt={alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
