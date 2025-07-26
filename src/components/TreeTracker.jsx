"use client"

import { useState, useEffect } from "react"
import { TreePine, Award, Globe, Leaf, TrendingUp, Users, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/Badge"
import { Button } from "./ui/Button"

const TreeTracker = ({ user }) => {
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
      co2Saved: Math.round(prev.userTrees * co2PerTree),
      waterSaved: Math.round(prev.userTrees * waterPerTree),
    }))

    // Animate numbers on load
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
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
    },
    {
      icon: Globe,
      label: "CO₂ Absorbed",
      value: stats.co2Saved,
      suffix: "kg/year",
      color: "text-blue-400",
      bgColor: "bg-blue-600/20",
    },
    {
      icon: Leaf,
      label: "Water Conserved",
      value: stats.waterSaved,
      suffix: "L/year",
      color: "text-cyan-400",
      bgColor: "bg-cyan-600/20",
    },
    {
      icon: Users,
      label: "Global Impact",
      value: Math.floor(stats.globalTrees / 1000000),
      suffix: "M trees",
      color: "text-purple-400",
      bgColor: "bg-purple-600/20",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="glass-effect border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
              <TreePine className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Your Environmental Impact</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every MamaEarth purchase plants a tree! Track your contribution to a greener planet and see the real
              impact you're making.
            </p>
          </div>
        </div>
      </Card>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactData.map((item, index) => (
          <Card key={index} className="glass-effect border-gray-700 hover:border-green-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color} ${isAnimating ? "animate-pulse" : ""}`}>
                    {item.value.toLocaleString()}
                    {item.suffix}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Goal Progress */}
      <Card className="glass-effect border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Target className="h-5 w-5 mr-2 text-green-400" />
            Monthly Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Trees planted this month</span>
            <span className="text-white font-semibold">
              {stats.userTrees % 10} / {stats.monthlyGoal}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(((stats.userTrees % 10) / stats.monthlyGoal) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">
            {stats.monthlyGoal - (stats.userTrees % 10) > 0
              ? `${stats.monthlyGoal - (stats.userTrees % 10)} more trees to reach your monthly goal!`
              : "🎉 Monthly goal achieved! Keep going!"}
          </p>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="glass-effect border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Award className="h-5 w-5 mr-2 text-yellow-400" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked ? "border-yellow-500 bg-yellow-600/10" : "border-gray-700 bg-gray-800/50"
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">{achievement.icon}</div>
                  <h3 className={`font-semibold ${achievement.unlocked ? "text-yellow-400" : "text-gray-400"}`}>
                    {achievement.name}
                  </h3>
                  <p className="text-xs text-gray-500">{achievement.requirement}</p>
                  {achievement.unlocked && <Badge className="bg-yellow-600 text-white text-xs">Unlocked!</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Global Impact */}
      <Card className="glass-effect border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Globe className="h-5 w-5 mr-2 text-blue-400" />
            Global MamaEarth Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-400">{(stats.globalTrees / 1000000).toFixed(1)}M+</div>
              <p className="text-gray-400">Trees Planted Globally</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">115K+</div>
              <p className="text-gray-400">Tons CO₂ Absorbed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-cyan-400">6.2B+</div>
              <p className="text-gray-400">Liters Water Conserved</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Growing Every Day!</h3>
                <p className="text-gray-300">
                  Our community plants an average of 1,247 trees daily. Together, we're making a real difference!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="glass-effect border-gray-700 bg-gradient-to-r from-green-600/10 to-blue-600/10">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Plant More Trees!</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Every product you buy plants a tree. Shop more MamaEarth products to increase your environmental impact!
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            <TreePine className="h-4 w-4 mr-2" />
            Shop & Plant Trees
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default TreeTracker
