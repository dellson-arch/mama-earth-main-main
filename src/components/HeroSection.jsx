"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Sparkles, Leaf, Heart, Star, Play, ChevronDown } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

const HeroSection = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    // Auto-slide functionality
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const heroSlides = [
    {
      id: 1,
      title: "Discover Your Natural Glow",
      subtitle: "AI-Powered Skincare Revolution",
      description:
        "Get personalized product recommendations using our advanced AI skin analyzer. Transform your skincare routine with nature's best ingredients.",
      cta: "Start AI Analysis",
      ctaAction: () => onNavigate("analyzer"),
      image: "/placeholder.svg?height=600&width=800&text=AI+Skincare+Analysis",
      gradient: "from-pink-600/20 via-purple-600/20 to-blue-600/20",
      stats: [
        { label: "Happy Customers", value: "50K+" },
        { label: "Products", value: "200+" },
        { label: "Success Rate", value: "98%" },
      ],
    },
    {
      id: 2,
      title: "100% Natural & Organic",
      subtitle: "Pure. Safe. Effective.",
      description:
        "Every product is crafted with certified organic ingredients. No harmful chemicals, no compromises - just pure natural goodness for your skin and hair.",
      cta: "Shop Natural Products",
      ctaAction: () => onNavigate("products"),
      image: "/placeholder.svg?height=600&width=800&text=Natural+Organic+Products",
      gradient: "from-green-600/20 via-emerald-600/20 to-teal-600/20",
      stats: [
        { label: "Organic Certified", value: "100%" },
        { label: "Chemical Free", value: "Always" },
        { label: "Cruelty Free", value: "Certified" },
      ],
    },
    {
      id: 3,
      title: "Plant a Tree with Every Purchase",
      subtitle: "Beauty that Gives Back",
      description:
        "Join our mission to make the world greener. Every purchase plants a tree and supports sustainable beauty practices for a better tomorrow.",
      cta: "See Your Impact",
      ctaAction: () => onNavigate("impact"),
      image: "/placeholder.svg?height=600&width=800&text=Plant+Trees+Impact",
      gradient: "from-green-600/20 via-lime-600/20 to-emerald-600/20",
      stats: [
        { label: "Trees Planted", value: "1M+" },
        { label: "CO2 Reduced", value: "500T" },
        { label: "Communities Helped", value: "100+" },
      ],
    },
  ]

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentHero.gradient} transition-all duration-1000`} />

        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <div
            className="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"
            style={{
              left: `${20 + (mousePosition.x / window.innerWidth) * 10}%`,
              top: `${10 + (mousePosition.y / window.innerHeight) * 10}%`,
            }}
          />
          <div
            className="absolute w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float animation-delay-1000"
            style={{
              right: `${15 + (mousePosition.x / window.innerWidth) * 8}%`,
              bottom: `${20 + (mousePosition.y / window.innerHeight) * 8}%`,
            }}
          />
          <div
            className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"
            style={{
              left: `${60 + (mousePosition.x / window.innerWidth) * 5}%`,
              top: `${60 + (mousePosition.y / window.innerHeight) * 5}%`,
            }}
          />
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            {/* Badge */}
            <div className="animate-bounce-in animation-delay-300">
              <Badge className="bg-green-600/20 text-green-400 border border-green-600/30 px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                {currentHero.subtitle}
              </Badge>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight animate-fade-in-up animation-delay-500">
              <span className="gradient-text">{currentHero.title}</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-700">
              {currentHero.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 animate-fade-in-up animation-delay-900">
              {currentHero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1000">
              <Button onClick={currentHero.ctaAction} className="btn-primary group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  {currentHero.cta}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button
                onClick={() => onNavigate("products")}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 group"
              >
                <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 animate-fade-in-up animation-delay-1200">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">4.9/5 from 10K+ reviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-sm text-gray-400">Loved by 50K+ customers</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className={`relative ${isVisible ? "animate-scale-in animation-delay-800" : "opacity-0"}`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={currentHero.image || "/placeholder.svg"}
                  alt={currentHero.title}
                  className="w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-float">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-400" />
                    <span className="text-white font-medium">100% Natural</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 animate-float animation-delay-1000">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <span className="text-white font-medium">AI Powered</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse animation-delay-1000" />
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-green-400 w-8" : "bg-gray-600 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-gray-400">
          <span className="text-sm">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>

      {/* Custom CSS for grid animation */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection
