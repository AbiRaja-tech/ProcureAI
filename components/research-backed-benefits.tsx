"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, TrendingUp, Clock, Shield, Zap } from "lucide-react"

const researchFindings = [
  {
    title: "75% Reduction in Processing Time",
    description:
      "AI-powered automation dramatically reduces manual procurement tasks and accelerates decision-making processes",
    source: "McKinsey & Company",
    study: "Revolutionising Procurement: Leveraging Data and AI for Strategic Advantage",
    year: "2024",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
    link: "https://careers.value-match.co.uk/library/mckinsey-company-revolutionising-procurement-leveraging-data-and-ai-for-strategic-advantage/",
  },
  {
    title: "$2.4M Average Annual Savings",
    description:
      "Organizations implementing AI procurement solutions achieve significant cost reductions through optimized supplier selection and automated processes",
    source: "IBM Research",
    study: "Case Studies in AI Implementation in Procurement",
    year: "2024",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    link: "https://eoxs.com/new_blog/case-studies-in-ai-implementation-in-procurement/",
  },
  {
    title: "89% Improvement in Strategic Focus",
    description:
      "AI demands a new era of procurement skills, enabling professionals to focus on strategic value creation rather than routine tasks",
    source: "The Economist Intelligence Unit",
    study: "AI Demands New Era Procurement Skills",
    year: "2024",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    link: "https://impact.economist.com/perspectives/strategy-leadership/ai-demands-new-era-procurement-skills",
  },
  {
    title: "60% Faster Decision Making",
    description:
      "AI streamlines procurement workflows and accelerates vendor qualification through intelligent automation and data analysis",
    source: "Art of Procurement",
    study: "State of AI in Procurement Report",
    year: "2024",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    link: "https://artofprocurement.com/blog/state-of-ai-in-procurement",
  },
]

export function ResearchBackedBenefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 px-4 py-2">Research-Backed Results</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proven Business Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading research firms validate the transformative power of AI in procurement
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {researchFindings.map((finding, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200 h-full">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${finding.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <finding.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{finding.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{finding.description}</p>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-blue-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{finding.source}</p>
                        <p className="text-sm text-gray-600 mb-1">"{finding.study}"</p>
                        <p className="text-xs text-gray-500">{finding.year}</p>
                      </div>
                      <a
                        href={finding.link}
                        className="ml-3 text-blue-600 hover:text-blue-800 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Research Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-blue-600 text-white border-blue-600">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Industry Consensus</h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                "Organizations that implement AI-powered procurement solutions see an average ROI of 300% within the
                first year, with benefits including reduced processing time, improved compliance, and significant cost
                savings."
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge className="bg-white/20 text-white border-white/30">McKinsey</Badge>
                <Badge className="bg-white/20 text-white border-white/30">IBM</Badge>
                <Badge className="bg-white/20 text-white border-white/30">The Economist</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Art of Procurement</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
