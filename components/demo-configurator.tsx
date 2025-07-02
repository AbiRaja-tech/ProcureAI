"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Brain, BarChart3, Users, Shield, FileText, Zap, ArrowRight, CheckCircle } from "lucide-react"

const features = [
  {
    id: "ai-assistant",
    name: "AI Assistant",
    icon: Brain,
    description: "Natural language order generation",
    popular: true,
  },
  {
    id: "analytics",
    name: "Predictive Analytics",
    icon: BarChart3,
    description: "Smart insights and forecasting",
    popular: true,
  },
  {
    id: "vendor-management",
    name: "Vendor Management",
    icon: Users,
    description: "Centralized vendor relationships",
    popular: false,
  },
  {
    id: "order-automation",
    name: "Order Automation",
    icon: FileText,
    description: "Automated purchase order workflows",
    popular: true,
  },
  {
    id: "integrations",
    name: "ERP Integrations",
    icon: Zap,
    description: "Connect with your existing systems",
    popular: false,
  },
  {
    id: "security",
    name: "Enterprise Security",
    icon: Shield,
    description: "Advanced security and compliance",
    popular: false,
  },
]

export function DemoConfigurator() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["ai-assistant", "analytics", "order-automation"])
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
  })

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
    )
  }

  const handleSubmit = () => {
    // In a real app, this would send the configuration to your backend
    console.log("Demo configuration:", { selectedFeatures, companyInfo })
    alert("Your custom demo has been configured! Our team will contact you shortly.")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white shadow-xl border-blue-200">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-slate-900 mb-4">Build Your Custom Demo</CardTitle>
          <p className="text-xl text-slate-600">
            Select the features most relevant to your business and we'll create a personalized demonstration
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature Selection */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Choose Your Features</h3>
              <div className="space-y-4">
                {features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedFeatures.includes(feature.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleFeatureToggle(feature.id)}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={selectedFeatures.includes(feature.id)}
                        onChange={() => handleFeatureToggle(feature.id)}
                        className="mr-4"
                      />
                      <div className="flex items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                            selectedFeatures.includes(feature.id)
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium text-slate-900">{feature.name}</span>
                            {feature.popular && (
                              <Badge className="ml-2 bg-orange-100 text-orange-700 text-xs">Popular</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Your Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <Input
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="John Smith"
                    className="border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Work Email *</label>
                  <Input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="john@company.com"
                    className="border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                  <Input
                    value={companyInfo.company}
                    onChange={(e) => setCompanyInfo((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="Acme Corporation"
                    className="border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Size</label>
                  <select
                    className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={companyInfo.employees}
                    onChange={(e) => setCompanyInfo((prev) => ({ ...prev, employees: e.target.value }))}
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              {/* Selected Features Summary */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-slate-900 mb-3">Your Demo Will Include:</h4>
                <div className="space-y-2">
                  {selectedFeatures.map((featureId) => {
                    const feature = features.find((f) => f.id === featureId)
                    return feature ? (
                      <div key={featureId} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-slate-700">{feature.name}</span>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <Button
              onClick={handleSubmit}
              disabled={
                !companyInfo.name || !companyInfo.email || !companyInfo.company || selectedFeatures.length === 0
              }
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg"
            >
              Create My Custom Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-center text-sm text-slate-600 mt-3">
              Our team will contact you within 24 hours to schedule your personalized demo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
