"use client"

import { Leaf, Sparkles, Shield, Award, ArrowRight } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const AboutUsPage = ({ onNavigate }) => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section: Founder's Story */}
      <Card className="glass-effect border-gray-700/50 overflow-hidden shadow-2xl">
        <div className="relative bg-gradient-to-br from-green-600/20 to-blue-600/20 p-8 sm:p-12 text-center">
          <div className="absolute inset-0 opacity-10">
            <Leaf className="h-full w-full text-green-500 animate-float-slow" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-green-500 shadow-lg animate-bounceIn">
              <img
                src="/placeholder.svg?height=128&width=128&text=Meera+Sharma"
                alt="Meera Sharma, Founder of MamaEarth"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Meet Our Founder,{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                Meera Sharma
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The visionary behind MamaEarth's natural revolution, driven by a mother's love and a passion for safe,
              toxin-free products.
            </p>
            <Button
              onClick={() => onNavigate("products")}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Explore Our Products
            </Button>
          </div>
        </div>
      </Card>

      {/* The Inspiration Story */}
      <Card className="glass-effect border-gray-700/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-white text-2xl">
            <Leaf className="h-6 w-6 mr-3 text-green-400" />
            The Seed of Inspiration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            MamaEarth was born from a very personal journey. As new parents, Meera and her husband struggled to find
            safe, toxin-free baby products in India. Concerned about the harmful chemicals prevalent in most brands,
            they realized there was a significant gap in the market for genuinely natural and safe alternatives.
          </p>
          <p>
            This personal struggle ignited a mission: to create a brand that parents could trust implicitly. Meera
            envisioned a world where families wouldn't have to compromise on safety or quality when it came to their
            daily essentials. She embarked on a journey to formulate products using the purest natural ingredients,
            backed by science, and certified by international standards like MadeSafe.
          </p>
          <p>
            From baby care, MamaEarth expanded into skincare and haircare for adults, always adhering to the philosophy
            of "Goodness Inside." Every product is a testament to Meera's unwavering commitment to health, safety, and
            the environment.
          </p>
        </CardContent>
      </Card>

      {/* Our Core Values */}
      <Card className="glass-effect border-gray-700/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-white text-2xl">
            <Award className="h-6 w-6 mr-3 text-yellow-400" />
            Our Unwavering Commitments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-600/10 to-green-800/10 border border-green-600/30 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">MadeSafe Certified</h3>
              <p className="text-gray-300 text-sm">
                India's first brand to be certified by MadeSafe, ensuring our products are free from harmful toxins.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-800/10 border border-blue-600/30 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <Leaf className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Planting Goodness</h3>
              <p className="text-gray-300 text-sm">
                For every order, we plant a tree, contributing to a greener planet and a sustainable future.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-600/10 to-purple-800/10 border border-purple-600/30 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Natural & Effective</h3>
              <p className="text-gray-300 text-sm">
                Harnessing the power of nature with scientifically proven formulations for visible results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Join Our Mission Call to Action */}
      <Card className="glass-effect border-gray-700/50 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10 relative overflow-hidden shadow-lg">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-3xl font-bold text-white">Be a Part of Our Story</h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Join the MamaEarth family and experience the goodness of nature while contributing to a healthier planet.
          </p>
          <Button
            onClick={() => onNavigate("impact")}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-10 py-4 rounded-2xl shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            See Our Impact
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutUsPage
