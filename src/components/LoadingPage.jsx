"use client"

import { useEffect, useState } from "react"

const LoadingPage = ({ progress = 0 }) => {
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    "🌿 Sourcing natural ingredients from Mother Earth...",
    "🧴 Crafting toxin-free formulations with love...",
    "🌱 Supporting sustainable farming practices...",
    "💚 Testing for perfect skin compatibility...",
    "🌍 Creating eco-friendly beauty solutions...",
    "✨ Preparing your personalized natural journey...",
    "🎋 Loading premium organic products...",
    "🌸 Almost ready for your natural transformation...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [tips.length])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-pulse"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Stylish Logo with Glow Effect */}
        <div className="mb-12 relative">
          <div className="relative mx-auto w-32 h-32 mb-6">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full animate-spin opacity-20 blur-md"></div>

            {/* Main Logo Container */}
            <div className="relative w-full h-full bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
              {/* Inner Glow */}
              <div className="absolute inset-2 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full opacity-50 animate-pulse"></div>

              {/* Logo Icon */}
              <div className="relative z-10">
                <svg className="w-12 h-12 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                </svg>
              </div>

              {/* Sparkle Effects */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-300 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>

          {/* Brand Text with Gradient */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent mb-3 animate-pulse">
            MamaEarth
          </h1>
          <p className="text-gray-400 text-lg font-medium tracking-wide">Natural • Safe • Effective</p>
        </div>

        {/* Stylish Progress Section */}
        <div className="mb-10">
          {/* Progress Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300 font-medium">Loading Experience...</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Advanced Progress Bar */}
          <div className="relative w-full bg-gray-800/50 rounded-full h-4 overflow-hidden shadow-inner border border-gray-700/50">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full"></div>

            {/* Progress Fill */}
            <div
              className="relative h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full"></div>

              {/* Moving Highlight */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-pulse"></div>
            </div>

            {/* Progress Indicator Dot */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-green-500 animate-pulse"
              style={{ left: `calc(${progress}% - 12px)` }}
            >
              <div className="absolute inset-1 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span className={progress >= 25 ? "text-green-400" : ""}>Initializing</span>
            <span className={progress >= 50 ? "text-green-400" : ""}>Loading</span>
            <span className={progress >= 75 ? "text-green-400" : ""}>Preparing</span>
            <span className={progress >= 100 ? "text-green-400" : ""}>Ready</span>
          </div>
        </div>

        {/* Rotating Tips with Style */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-sm"></div>
            <p className="relative text-gray-300 text-base leading-relaxed px-6 py-4 bg-gray-800/30 rounded-xl border border-gray-700/50 backdrop-blur-sm animate-fade-in-up">
              {tips[currentTip]}
            </p>
          </div>
        </div>

        {/* Stylish Loading Animation */}
        <div className="flex justify-center items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce shadow-lg"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-8 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <div
            className="absolute top-16 right-12 w-1 h-1 bg-emerald-400 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-20 left-16 w-3 h-3 bg-teal-400 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 right-8 w-1 h-1 bg-green-300 rounded-full animate-ping"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
