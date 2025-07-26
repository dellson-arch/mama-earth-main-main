"use client"

import { useState, useEffect } from "react"
import { TreePine, Award, Globe, Leaf, TrendingUp, Users, Target, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/Badge"
import { Button } from "./ui/Button"
import { cn } from "../lib/utils" // Import cn for conditional class names

const TreeTracker = ({ user, onNavigate }) => {
  const [stats, setStats] = useState({
    globalTrees: 5234567,
    userTrees: user?.treesPlanted || 0,
    co2Saved: 0,
    waterSaved: 0,
    monthlyGoal: 10,
    achievements: [],
  })

  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Calculate environmental impact
    const co2PerTree = 22 // kg per year
    const waterPerTree = 1200 // liters per year

    setStats((prev) => ({
      ...prev,
      userTrees: user?.treesPlanted || 0, // Ensure userTrees updates if user prop changes
      co2Saved: Math.round((user?.treesPlanted || 0) * co2PerTree),
      waterSaved: Math.round((user?.treesPlanted || 0) * waterPerTree),
    }))

    // Animate numbers on load
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 2000)
    return () => clearTimeout(timer)
  }, [user])

  const achievements = [
    { id: 1, name: "First Tree", icon: "🌱", unlocked: stats.userTrees >= 1, requirement: "Plant your first tree" },
    { id: 2, name: "Green Warrior", icon: "🌿", unlocked: stats.userTrees >= 5, requirement: "Plant 5 trees" },
    { id: 3, name: "Forest Guardian", icon: "🌳", unlocked: stats.userTrees >= 10, requirement: "Plant 10 trees" },
    { id: 4, name: "Eco Champion", icon: "🏆", unlocked: stats.userTrees >= 25, requirement: "Plant 25 trees" },
    { id: 5, name: "Planet Saver", icon: "🌍", unlocked: stats.userTrees >= 50, requirement: "Plant 50 trees" },
  ]

  const impactData = [
    {
      icon: TreePine,
      label: "Trees Planted",
      value: stats.userTrees,
      suffix: "",
      color: "text-green-400",
      bgColor: "bg-green-600/20",
      gradient: "from-green-600 to-green-700",
    },
    {
      icon: Globe,
      label: "CO₂ Absorbed",
      value: stats.co2Saved,
      suffix: "kg/year",
      color: "text-blue-400",
      bgColor: "bg-blue-600/20",
      gradient: "from-blue-600 to-blue-700",
    },
    {
      icon: Leaf,
      label: "Water Conserved",
      value: stats.waterSaved,
      suffix: "L/year",
      color: "text-cyan-400",
      bgColor: "bg-cyan-600/20",
      gradient: "from-cyan-600 to-cyan-700",
    },
    {
      icon: Users,
      label: "Global Impact",
      value: Math.floor(stats.globalTrees / 1000000),
      suffix: "M trees",
      color: "text-purple-400",
      bgColor: "bg-purple-600/20",
      gradient: "from-purple-600 to-purple-700",
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {" "}
      {/* Removed redundant background and min-h-screen */}
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
      <div className="relative z-10 space-y-12 p-4 sm:p-6 lg:p-8 animate-fade-in">
        {" "}
        {/* Added animate-fade-in */}
        {/* Hero Section */}
        <Card className="glass-effect border-gray-700/50 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-8 sm:p-12 text-center relative">
            <div className="absolute inset-0 opacity-20">
              <TreePine className="h-full w-full text-green-500 animate-float-slow" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl animate-bounceIn">
                <TreePine className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Your Environmental Impact</h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Every MamaEarth purchase plants a tree! Track your contribution to a greener planet and see the real
                difference you're making.
              </p>
            </div>
          </div>
        </Card>
        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactData.map((item, index) => {
            const IconComponent = item.icon
            return (
              <Card
                key={index}
                className="glass-effect border-gray-700/50 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20"
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br ${item.gradient}`}
                  >
                    <IconComponent className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className={`text-2xl font-bold ${item.color} ${isAnimating ? "animate-pulse" : ""}`}>
                      {item.value.toLocaleString()}
                      {item.suffix}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {/* Monthly Goal Progress */}
        <Card className="glass-effect border-gray-700/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-white text-2xl">
              <Target className="h-6 w-6 mr-3 text-green-400" />
              Monthly Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-lg">Trees planted this month</span>
              <span className="text-white font-bold text-xl">
                {stats.userTrees % stats.monthlyGoal} / {stats.monthlyGoal}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000 shadow-md"
                style={{
                  width: `${Math.min(((stats.userTrees % stats.monthlyGoal) / stats.monthlyGoal) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-400">
              {stats.monthlyGoal - (stats.userTrees % stats.monthlyGoal) > 0
                ? `${stats.monthlyGoal - (stats.userTrees % stats.monthlyGoal)} more trees to reach your monthly goal!`
                : "🎉 Monthly goal achieved! Keep going for more!"}
            </p>
          </CardContent>
        </Card>
        {/* Achievements */}
        <Card className="glass-effect border-gray-700/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-white text-2xl">
              <Award className="h-6 w-6 mr-3 text-yellow-400" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={cn(
                    // Using cn for conditional classes
                    "p-6 rounded-xl border-2 transition-all duration-300 text-center",
                    achievement.unlocked
                      ? "border-yellow-500 bg-yellow-600/10 shadow-lg shadow-yellow-500/20 animate-fadeIn" // Added animate-fadeIn
                      : "border-gray-700 bg-gray-800/50 hover:border-gray-600",
                  )}
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className={cn("font-bold text-lg", achievement.unlocked ? "text-yellow-400" : "text-gray-300")}>
                    {achievement.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{achievement.requirement}</p>
                  {achievement.unlocked && (
                    <Badge className="bg-yellow-600 text-white text-xs px-3 py-1 animate-bounceIn">
                      {" "}
                      {/* Changed animate-fadeIn to animate-bounceIn for more pop */}
                      Unlocked!
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Global Impact */}
        <Card className="glass-effect border-gray-700/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-white text-2xl">
              <Globe className="h-6 w-6 mr-3 text-blue-400" />
              MamaEarth Global Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-green-400">{(stats.globalTrees / 1000000).toFixed(1)}M+</div>
                <p className="text-gray-400">Trees Planted Globally</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-blue-400">115K+</div>
                <p className="text-gray-400">Tons CO₂ Absorbed</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-cyan-400">6.2B+</div>
                <p className="text-gray-400">Liters Water Conserved</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-6 flex items-center space-x-4 shadow-md">
              <TrendingUp className="h-10 w-10 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Growing Every Day!</h3>
                <p className="text-gray-300">
                  Our community plants an average of 1,247 trees daily. Together, we're making a real difference!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Call to Action */}
        <Card className="glass-effect border-gray-700/50 bg-gradient-to-r from-green-600/10 to-blue-600/10 shadow-lg">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-3xl font-bold text-white">Ready to Make a Bigger Impact?</h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Every product you buy plants a tree. Shop more MamaEarth products to increase your environmental footprint
              and help us grow our global forest!
            </p>
            <Button
              onClick={() => onNavigate("products")}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-10 py-4 rounded-2xl shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shop & Plant Trees
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TreeTracker
