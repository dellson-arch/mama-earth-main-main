"use client"
import { Button } from "./ui/Button"
import { ArrowRight, Leaf, Sparkles } from "lucide-react"

const HeroSection = ({ onNavigate }) => {
  return (
    <section className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements for visual depth */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
          Discover{" "}
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Nature's Goodness
          </span>{" "}
          for You & Your Family
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Toxin-free, natural products for baby care, beauty, and personal care. Because you deserve the best,
          naturally.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => onNavigate("products")}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center"
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={() => onNavigate("analyzer")}
            variant="outline"
            className="border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300 font-semibold py-3 px-8 rounded-full shadow-lg shadow-green-500/10 transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center"
          >
            <Sparkles className="h-5 w-5 mr-2" /> Skin Analyzer
          </Button>
        </div>
        <div className="mt-12 flex items-center justify-center space-x-6 text-gray-300">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-400" />
            <span className="font-medium">MadeSafe™ Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="/placeholder.svg?height=24&width=24" alt="Tree Planted" className="h-6 w-6" />
            <span className="font-medium">Trees Planted for Every Order</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
