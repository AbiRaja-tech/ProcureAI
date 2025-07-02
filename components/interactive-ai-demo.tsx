"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Sparkles, CheckCircle } from "lucide-react"

const sampleQueries = [
  "Order 25 laptops from Dell for the marketing team",
  "I need office supplies for our new branch in Austin",
  "Get 10 standing desks and ergonomic chairs for the design team",
  "Order catering for 50 people for next week's conference",
]

const mockResponses = {
  "Order 25 laptops from Dell for the marketing team": {
    analysis: "I found Dell as your preferred vendor with excellent ratings.",
    items: [{ name: "Dell Latitude 5520", quantity: 25, price: "$899", total: "$22,475" }],
    vendor: "Dell Technologies",
    rating: "4.9/5",
    delivery: "3-5 business days",
    savings: "$1,250 (bulk discount applied)",
  },
  "I need office supplies for our new branch in Austin": {
    analysis: "Based on your Austin branch size (30 employees), I've prepared a comprehensive supply list.",
    items: [
      { name: "Office Desk Set", quantity: 30, price: "$245", total: "$7,350" },
      { name: "Ergonomic Chairs", quantity: 35, price: "$189", total: "$6,615" },
      { name: "Supply Starter Kit", quantity: 1, price: "$890", total: "$890" },
    ],
    vendor: "OfficeMax Business",
    rating: "4.7/5",
    delivery: "5-7 business days",
    savings: "$2,100 (new branch discount)",
  },
}

export function InteractiveAIDemo() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [showResponse, setShowResponse] = useState(false)

  const handleSubmit = async (inputQuery?: string) => {
    const queryToProcess = inputQuery || query
    if (!queryToProcess.trim()) return

    setIsProcessing(true)
    setShowResponse(false)
    setResponse(null)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResponse = mockResponses[queryToProcess as keyof typeof mockResponses] || {
      analysis: "I've analyzed your request and found the best options for you.",
      items: [{ name: "Custom Item", quantity: 1, price: "$299", total: "$299" }],
      vendor: "Preferred Vendor",
      rating: "4.8/5",
      delivery: "2-4 business days",
      savings: "$150 (optimized pricing)",
    }

    setResponse(mockResponse)
    setIsProcessing(false)
    setShowResponse(true)
    setQuery("")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Try Our AI Assistant</h3>
            </div>
            <p className="text-slate-600">
              Type a procurement request and watch our AI generate a complete purchase order
            </p>
          </div>

          {/* Sample Queries */}
          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-white hover:bg-blue-50 border-blue-200"
                  onClick={() => handleSubmit(sample)}
                >
                  {sample}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-3 mb-6">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you need to order..."
              className="flex-1 bg-white border-blue-200"
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Button
              onClick={() => handleSubmit()}
              disabled={isProcessing || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Processing Animation */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg p-6 mb-6 border border-blue-200"
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mr-3"
                  />
                  <span className="text-slate-700">AI is analyzing your request...</span>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    ✓ Processing natural language
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                    ✓ Finding optimal vendors
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                    ✓ Calculating best pricing
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Response */}
          <AnimatePresence>
            {showResponse && response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg p-6 border border-green-200"
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <h4 className="text-lg font-semibold text-slate-900">Purchase Order Generated</h4>
                </div>

                <p className="text-slate-600 mb-6">{response.analysis}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-3">Order Items</h5>
                    <div className="space-y-2">
                      {response.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-slate-600">
                              Qty: {item.quantity} × {item.price}
                            </div>
                          </div>
                          <div className="font-semibold text-blue-600">{item.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-slate-900 mb-3">Vendor Details</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Vendor:</span>
                        <span className="font-medium">{response.vendor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Rating:</span>
                        <Badge className="bg-green-100 text-green-700">{response.rating}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Delivery:</span>
                        <span className="font-medium">{response.delivery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Savings:</span>
                        <span className="font-medium text-green-600">{response.savings}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve & Send Purchase Order
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
