"use client"

import { Leaf, Globe, Recycle, Users } from "lucide-react"
import { Card, CardContent, CardTitle } from "./ui/card"
import { Button } from "./ui/Button"

const TreeTracker = ({ user, onNavigate }) => {
  const treesPlanted = user?.treesPlanted || 0
  const plasticRecycled = treesPlanted * 0.5 // Example: 0.5kg plastic per tree
  const happyFamilies = 2000000 + treesPlanted * 10 // Example: 10 new families per tree

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
            Your Impact on Earth
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how your choices are helping us build a greener planet.
          </p>
        </div>

        {user ? (
          <div className="space-y-8">
            <Card className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl text-center p-8">
              <CardTitle className="text-3xl font-bold mb-4 flex items-center justify-center text-white">
                <Leaf className="h-8 w-8 mr-3 text-emerald-400" />
                Trees Planted
              </CardTitle>
              <CardContent className="p-0">
                <p className="text-6xl font-extrabold text-emerald-400 mb-4 animate-pulse">{treesPlanted}</p>
                <p className="text-gray-300 text-lg">
                  Thank you for helping us plant {treesPlanted} trees! Every purchase contributes to reforestation.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl text-center p-6">
                <CardTitle className="text-2xl font-bold mb-3 flex items-center justify-center text-white">
                  <Recycle className="h-6 w-6 mr-2 text-teal-400" />
                  Plastic Recycled
                </CardTitle>
                <CardContent className="p-0">
                  <p className="text-4xl font-bold text-teal-400 mb-2">{plasticRecycled.toFixed(1)} kg</p>
                  <p className="text-gray-300 text-sm">
                    We are a plastic-positive brand, recycling more plastic than we use.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl text-center p-6">
                <CardTitle className="text-2xl font-bold mb-3 flex items-center justify-center text-white">
                  <Users className="h-6 w-6 mr-2 text-blue-400" />
                  Happy Families
                </CardTitle>
                <CardContent className="p-0">
                  <p className="text-4xl font-bold text-blue-400 mb-2">{happyFamilies.toLocaleString()}+</p>
                  <p className="text-gray-300 text-sm">
                    Join millions of families who trust MamaEarth for natural products.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl text-center p-8">
              <CardTitle className="text-3xl font-bold mb-4 flex items-center justify-center text-white">
                <Globe className="h-8 w-8 mr-3 text-purple-400" />
                Our Global Footprint
              </CardTitle>
              <CardContent className="p-0">
                <p className="text-gray-300 text-lg mb-4">
                  MamaEarth is committed to making a positive impact not just in India, but globally. We aim to inspire
                  sustainable living worldwide.
                </p>
                <Button
                  onClick={() => onNavigate("about")}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  Learn More About Us
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl text-center p-8">
            <CardTitle className="text-3xl font-bold mb-4 text-white">Make Your Impact!</CardTitle>
            <CardContent className="p-0">
              <p className="text-gray-300 text-lg mb-6">
                Sign in or create an account to track your personal environmental impact with MamaEarth.
              </p>
              <Button
                onClick={() => onNavigate("signin")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
              >
                Sign In / Sign Up
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default TreeTracker
