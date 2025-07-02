"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, CheckCircle, X } from "lucide-react"

interface ComparisonItem {
  feature: string
  manual: string | { text: string; negative?: boolean }
  ai: string | { text: string; positive?: boolean }
}

interface ComparisonBlockProps {
  title: string
  subtitle: string
  items: ComparisonItem[]
}

export function ComparisonBlock({ title, subtitle, items }: ComparisonBlockProps) {
  const [activeView, setActiveView] = useState<"manual" | "ai">("manual")

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600">{subtitle}</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 rounded-lg p-1 flex">
          <Button
            variant={activeView === "manual" ? "default" : "ghost"}
            className={`px-6 py-2 rounded-md transition-all ${
              activeView === "manual" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"
            }`}
            onClick={() => setActiveView("manual")}
          >
            <Clock className="w-4 h-4 mr-2" />
            Manual Process
          </Button>
          <Button
            variant={activeView === "ai" ? "default" : "ghost"}
            className={`px-6 py-2 rounded-md transition-all ${
              activeView === "ai" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
            onClick={() => setActiveView("ai")}
          >
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Flow
          </Button>
        </div>
      </div>

      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-white shadow-lg border-2 border-blue-100">
          <CardContent className="p-6">
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50"
                >
                  <div className="flex items-center">
                    <div className="font-medium text-slate-900 mr-4 min-w-[120px]">{item.feature}</div>
                    <div className="flex items-center">
                      {activeView === "manual" ? (
                        <>
                          <X className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-slate-600">
                            {typeof item.manual === "string" ? item.manual : item.manual.text}
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-slate-600">{typeof item.ai === "string" ? item.ai : item.ai.text}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {activeView === "ai" && <Badge className="bg-green-100 text-green-700 ml-4">Improved</Badge>}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
