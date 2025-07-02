"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Brain } from "lucide-react"

export function PoweredBy() {
  const technologies = [
    {
      name: "Google Cloud",
      description: "Enterprise-grade cloud infrastructure and AI services",
      icon: Cloud,
      color: "from-blue-500 to-blue-600",
      features: ["Vertex AI", "Cloud Run", "BigQuery", "Cloud Storage"],
    },
    {
      name: "LangChain",
      description: "Advanced language model orchestration and AI workflows",
      icon: Brain,
      color: "from-green-500 to-green-600",
      features: ["LLM Integration", "Chain Orchestration", "Memory Management", "Tool Integration"],
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gray-100 text-gray-700 px-4 py-2">Powered By</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Built on Industry-Leading Technology</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform leverages cutting-edge AI and cloud technologies to deliver enterprise-grade procurement
            solutions
          </p>
        </motion.div>

        {/* Main Technology Partners */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-gray-200 h-full">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <tech.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tech.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Key Capabilities:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tech.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
