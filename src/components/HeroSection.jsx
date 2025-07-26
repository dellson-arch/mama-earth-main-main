"use client"

import { ArrowRight, Sparkles, Leaf, Shield, Award } from "lucide-react"
import { Button } from "./ui/Button"

const HeroSection = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 min-h-screen flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-64 h-64 bg-green-300/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-600/20 text-green-400 border border-green-600/30 rounded-full text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              100% Natural & Toxin-Free
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Natural Beauty,{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                Made Safe
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Discover the goodness of nature with MamaEarth's range of toxin-free, natural products for you and your
              family. Trusted by millions worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button
                onClick={() => onNavigate("analyzer")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Find My Products
              </Button>
              <Button
                onClick={() => onNavigate("products")}
                variant="outline"
                className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105"
              >
                Browse All
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">Dermatologically Tested</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Award className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">Award Winning</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Leaf className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">100% Natural</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative group">
              <img
                src="/placeholder.svg?height=600&width=600&text=Natural+Skincare+Hero"
                alt="Natural skincare products"
                className="w-full h-auto rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                <Leaf className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl shadow-xl animate-pulse">
                <Shield className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
