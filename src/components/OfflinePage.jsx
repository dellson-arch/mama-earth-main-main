"use client"

import { WifiOff, RefreshCw, Home, Smartphone, Play, Pause } from "lucide-react"
import { Button } from "./ui/Button"
import { useState, useRef } from "react"

const OfflinePage = ({ onRetry, onGoHome }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef(null)

  const handleRefresh = () => {
    window.location.reload()
  }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-particles opacity-30">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        {/* Static Grid Pattern */}
        <div className="absolute inset-0 bg-mesh opacity-20"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Offline Video Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="relative mx-auto w-full max-w-2xl mb-6">
            <div className="aspect-video bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 relative group">
              {/* Video placeholder with nature scene */}
              <div className="w-full h-full bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20 flex items-center justify-center relative">
                <img
                  src="/video.mp4"
                  alt="Nature Video"
                  className="w-full h-full object-cover opacity-70"
                />

                {/* Video overlay with play button */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
                  <button
                    onClick={toggleVideo}
                    className="w-16 h-16 bg-green-500/80 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                  >
                    {isVideoPlaying ? (
                      <Pause className="h-8 w-8 text-white ml-0" />
                    ) : (
                      <Play className="h-8 w-8 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Video title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-effect rounded-lg p-3 border border-gray-700/50">
                    <h3 className="text-white font-medium text-sm">🌿 Discover Nature's Beauty</h3>
                    <p className="text-gray-300 text-xs">Watch while you wait to reconnect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offline Icon Animation */}
        <div className="mb-8 animate-bounce-in">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full flex items-center justify-center border-2 border-red-500/30">
              <WifiOff className="h-16 w-16 text-red-400 animate-pulse" />
            </div>

            {/* Disconnected Signal Lines */}
            <div className="absolute -top-4 -right-4">
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-red-500 rounded-full opacity-30"></div>
                <div className="w-1 h-6 bg-red-500 rounded-full opacity-50"></div>
                <div className="w-1 h-8 bg-red-500 rounded-full opacity-70"></div>
                <div className="w-1 h-10 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8 animate-fade-in-up animate-delay-200">
          <h1 className="text-4xl font-bold text-white mb-4">You're Offline</h1>
          <p className="text-xl text-gray-400 mb-6">Oops! It looks like you've lost your internet connection.</p>
          <p className="text-gray-500 mb-8">Don't worry, enjoy the nature video above while you reconnect!</p>
        </div>

        {/* Status Card */}
        <div className="glass-effect rounded-2xl p-6 mb-8 border border-red-500/20 animate-fade-in-up animate-delay-400 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-medium">Connection Lost</span>
          </div>
          <p className="text-sm text-gray-400">Please check your internet connection and try again.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-600 max-w-md mx-auto">
          <Button
            onClick={handleRefresh}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 btn-ripple"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={onGoHome}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800/50 py-4 rounded-xl font-medium transition-all duration-300 bg-transparent"
          >
            <Home className="h-5 w-5 mr-2" />
            Go Home
          </Button>
        </div>

        {/* Helpful Tips */}
        <div className="mt-8 animate-fade-in-up animate-delay-800">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Fixes:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="glass-effect rounded-lg p-4 border border-gray-700/50 hover-lift">
              <div className="flex items-center space-x-3 mb-2">
                <WifiOff className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-white">Check WiFi</span>
              </div>
              <p className="text-xs text-gray-400">Make sure your WiFi is connected and working properly.</p>
            </div>

            <div className="glass-effect rounded-lg p-4 border border-gray-700/50 hover-lift">
              <div className="flex items-center space-x-3 mb-2">
                <Smartphone className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-white">Mobile Data</span>
              </div>
              <p className="text-xs text-gray-400">Try switching to mobile data if available.</p>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-8 animate-fade-in-up animate-delay-1000">
          <div className="glass-effect rounded-xl p-4 border border-green-500/20 max-w-md mx-auto">
            <p className="text-sm text-green-400 font-medium">🌱 Fun Fact</p>
            <p className="text-xs text-gray-400 mt-1">
              While you're offline, remember that MamaEarth products are made with 100% natural ingredients!
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-8 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-12 w-1 h-1 bg-orange-400 rounded-full animate-ping animate-delay-300"></div>
          <div className="absolute bottom-24 left-16 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping animate-delay-700"></div>
          <div className="absolute bottom-32 right-8 w-1 h-1 bg-orange-400 rounded-full animate-ping animate-delay-1000"></div>
        </div>
      </div>
    </div>
  )
}

export default OfflinePage
