import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Github, Linkedin, MapPin } from "lucide-react"

export function DeveloperSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7fafd]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-xl md:col-span-1 flex flex-col justify-between">
          <CardContent className="flex flex-col items-center p-8">
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center mb-4 border-4 border-blue-300">
              <span className="text-5xl">👨‍💻</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">Abi Raja</h2>
            <p className="text-base mb-2">Applied AI & Full-Stack Developer </p>
            <div className="flex items-center text-blue-100 mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span>London, UK</span>
            </div>
            <div className="w-full text-left mb-4">
              <h3 className="font-semibold mb-1 text-white">About</h3>
              <p className="text-blue-100 text-sm">
                Passionate full-stack developer with expertise in modern web technologies and AI integration. Specialized in building scalable, user-friendly applications that solve real business problems.
              </p>
            </div>
            <div className="w-full text-left mb-4">
              <h3 className="font-semibold mb-1 text-white">Experience</h3>
              <p className="text-blue-100 text-sm">5+ years in software development</p>
            </div>
            <div className="w-full text-left mb-4">
              <h3 className="font-semibold mb-1 text-white">Connect</h3>
              <div className="flex space-x-2 mb-2">
                <Button variant="outline" size="icon" className="border-white/40 text-white hover:bg-white/10">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-white/40 text-white hover:bg-white/10">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center bg-white/10 rounded px-2 py-1 text-xs">
                <Mail className="w-4 h-4 mr-1" />
                arrssekaran@gmail.com
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills and Achievements */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Technical Skills */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-100 text-blue-700">React & Next.js</Badge>
                <Badge className="bg-blue-100 text-blue-700">TypeScript</Badge>
                <Badge className="bg-blue-100 text-blue-700">Node.js</Badge>
                <Badge className="bg-blue-100 text-blue-700">Python</Badge>
                <Badge className="bg-blue-100 text-blue-700">AI/ML Integration</Badge>
                <Badge className="bg-blue-100 text-blue-700">Google Cloud</Badge>
                <Badge className="bg-blue-100 text-blue-700">Tailwind CSS</Badge>
                <Badge className="bg-blue-100 text-blue-700">Framer Motion</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Expertise & Achievements */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Expertise & Achievements</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-full p-2 mt-1">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M8 21h8m-4-4v4m8-10c0 4.418-4.03 8-9 8s-9-3.582-9-8a9 9 0 1 1 18 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="font-semibold">Full-Stack Development</div>
                  <div className="text-sm text-gray-600">5+ years building scalable web applications</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-full p-2 mt-1">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 20V10m0 0-3 3m3-3 3 3m7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="font-semibold">AI Integration Specialist</div>
                  <div className="text-sm text-gray-600">Expert in implementing AI-powered business solutions</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-full p-2 mt-1">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16.5 7.5v0m0 0A2.5 2.5 0 0 0 14 5m2.5 2.5A2.5 2.5 0 0 1 19 5m-2.5 2.5V12a6.5 6.5 0 1 1-13 0V8.5A2.5 2.5 0 0 1 8 6m0 0A2.5 2.5 0 0 0 5.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="font-semibold">Modern Tech Stack</div>
                  <div className="text-sm text-gray-600">Proficient in latest frameworks and cloud technologies</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 