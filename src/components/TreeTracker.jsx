"use client"

import { useState, useEffect } from "react"
import {
  TreePine,
  Globe,
  Leaf,
  TrendingUp,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  Calendar,
  Trophy,
  Zap,
  Star,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/Badge"
import { Button } from "./ui/Button"

const TreeTracker = ({ user, onNavigate }) => {
  const [stats, setStats] = useState({
    globalTrees: 5234567,
    userTrees: user?.treesPlanted || 0,
    co2Saved: 0,
    waterSaved: 0,
    monthlyGoal: 10,
    achievements: [],
    streak: 7,
    rank: "Eco Warrior",
    nextMilestone: 25,
  })

  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedTab, setSelectedTab] = useState("impact")

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
    {
      id: 1,
      name: "First Sprout",
      icon: "🌱",
      unlocked: stats.userTrees >= 1,
      requirement: "Plant your first tree",
      description: "Welcome to the green revolution!",
      rarity: "common",
    },
    {
      id: 2,
      name: "Green Guardian",
      icon: "🌿",
      unlocked: stats.userTrees >= 5,
      requirement: "Plant 5 trees",
      description: "You're making a real difference!",
      rarity: "uncommon",
    },
    {
      id: 3,
      name: "Forest Protector",
      icon: "🌳",
      unlocked: stats.userTrees >= 10,
      requirement: "Plant 10 trees",
      description: "A true environmental champion!",
      rarity: "rare",
    },
    {
      id: 4,
      name: "Eco Champion",
      icon: "🏆",
      unlocked: stats.userTrees >= 25,
      requirement: "Plant 25 trees",
      description: "Leading by example!",
      rarity: "epic",
    },
    {
      id: 5,
      name: "Planet Savior",
      icon: "🌍",
      unlocked: stats.userTrees >= 50,
      requirement: "Plant 50 trees",
      description: "You're saving the world!",
      rarity: "legendary",
    },
  ]

  const impactData = [
    {
      icon: TreePine,
      label: "Trees Planted",
      value: stats.userTrees,
      suffix: "",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      description: "Your personal forest",
    },
    {
      icon: Globe,
      label: "CO₂ Absorbed",
      value: stats.co2Saved,
      suffix: "kg/year",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      description: "Carbon footprint reduced",
    },
    {
      icon: Leaf,
      label: "Water Conserved",
      value: stats.waterSaved,
      suffix: "L/year",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      description: "Water cycle supported",
    },
    {
      icon: Users,
      label: "Global Rank",
      value: "#" + Math.floor(Math.random() * 1000 + 100),
      suffix: "",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      description: "Among all eco warriors",
    },
  ]

  const monthlyProgress = ((stats.userTrees % stats.monthlyGoal) / stats.monthlyGoal) * 100

  const tabs = [
    { id: "impact", label: "My Impact", icon: TreePine },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "leaderboard", label: "Community", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-teal-900/20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-8">
            {/* User Avatar & Stats */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-3xl font-bold text-white">{user?.name?.charAt(0) || "U"}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{user?.name || "Eco Warrior"}</h1>
                <div className="flex items-center justify-center space-x-4">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
                    <Zap className="h-4 w-4 mr-2" />
                    {stats.rank}
                  </Badge>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {stats.streak} day streak
                  </Badge>
                </div>
              </div>
            </div>

            {/* Main Tree Counter */}
            <div className="relative">
              <div className="glass-effect rounded-3xl p-8 border border-emerald-500/20 shadow-2xl max-w-md mx-auto">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <TreePine className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 animate-ping"></div>
                  </div>
                  <div>
                    <div className={`text-6xl font-bold text-white mb-2 ${isAnimating ? "animate-pulse" : ""}`}>
                      {stats.userTrees}
                    </div>
                    <p className="text-emerald-400 text-xl font-semibold">Trees Planted</p>
                    <p className="text-gray-400 text-sm">Your contribution to a greener planet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="glass-effect rounded-2xl p-2 border border-gray-700/50 shadow-xl">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedTab === tab.id
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedTab === "impact" && (
          <div className="space-y-12">
            {/* Impact Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactData.map((item, index) => (
                <Card
                  key={index}
                  className={`glass-effect ${item.borderColor} hover:border-emerald-500/50 transition-all duration-300 group hover:scale-105`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                        <p className={`text-2xl font-bold ${item.color} ${isAnimating ? "animate-pulse" : ""}`}>
                          {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                          <span className="text-sm ml-1">{item.suffix}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Monthly Goal Progress */}
            <Card className="glass-effect border-gray-700/50 hover:border-emerald-500/30 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="h-6 w-6 mr-3 text-emerald-400" />
                  Monthly Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">{stats.userTrees % stats.monthlyGoal}</span>
                    <span className="text-gray-400 mx-2">/</span>
                    <span className="text-xl text-gray-300">{stats.monthlyGoal} trees</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {Math.round(monthlyProgress)}% Complete
                  </Badge>
                </div>

                <div className="relative">
                  <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 h-4 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {stats.monthlyGoal - (stats.userTrees % stats.monthlyGoal) > 0
                      ? `${stats.monthlyGoal - (stats.userTrees % stats.monthlyGoal)} more trees to reach your goal!`
                      : "🎉 Monthly goal achieved! You're amazing!"}
                  </span>
                  <span className="text-emerald-400 font-semibold">Next: {stats.nextMilestone} trees</span>
                </div>
              </CardContent>
            </Card>

            {/* Global Impact */}
            <Card className="glass-effect border-gray-700/50 bg-gradient-to-br from-emerald-900/10 to-green-900/10">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl">
                  <Globe className="h-8 w-8 mr-3 text-blue-400" />
                  Global MamaEarth Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto">
                      <TreePine className="h-10 w-10 text-emerald-400" />
                    </div>
                    <div className="text-4xl font-bold text-emerald-400">
                      {(stats.globalTrees / 1000000).toFixed(1)}M+
                    </div>
                    <p className="text-gray-400 font-medium">Trees Planted Globally</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Globe className="h-10 w-10 text-blue-400" />
                    </div>
                    <div className="text-4xl font-bold text-blue-400">115K+</div>
                    <p className="text-gray-400 font-medium">Tons CO₂ Absorbed</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Leaf className="h-10 w-10 text-cyan-400" />
                    </div>
                    <div className="text-4xl font-bold text-cyan-400">6.2B+</div>
                    <p className="text-gray-400 font-medium">Liters Water Conserved</p>
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-6 bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-500/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Growing Every Day!</h3>
                      <p className="text-gray-300">
                        Our community plants an average of{" "}
                        <span className="text-emerald-400 font-bold">1,247 trees</span> daily. Together, we're making a
                        real difference for our planet! 🌍
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "achievements" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Your Achievements</h2>
              <p className="text-gray-400">Unlock badges as you plant more trees and help the environment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`glass-effect transition-all duration-300 hover:scale-105 ${
                    achievement.unlocked
                      ? "border-yellow-500/50 bg-gradient-to-br from-yellow-900/10 to-orange-900/10"
                      : "border-gray-700/50 opacity-75"
                  }`}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`text-6xl ${achievement.unlocked ? "animate-bounce" : "grayscale"}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold mb-2 ${achievement.unlocked ? "text-yellow-400" : "text-gray-400"}`}
                      >
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.requirement}</p>
                    </div>
                    {achievement.unlocked ? (
                      <Badge className="bg-yellow-600 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Unlocked!
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-700 text-gray-400">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "leaderboard" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Community Leaderboard</h2>
              <p className="text-gray-400">See how you rank among other eco warriors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-effect border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Top Eco Warriors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Priya S.", trees: 156, rank: 1 },
                    { name: "Rahul K.", trees: 134, rank: 2 },
                    { name: "Ananya M.", trees: 98, rank: 3 },
                    { name: user?.name || "You", trees: stats.userTrees, rank: Math.floor(Math.random() * 50 + 4) },
                  ].map((person, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-3 rounded-lg ${
                        person.name === (user?.name || "You")
                          ? "bg-emerald-600/20 border border-emerald-500/30"
                          : "bg-gray-800/30"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          person.rank === 1
                            ? "bg-yellow-500 text-black"
                            : person.rank === 2
                              ? "bg-gray-400 text-black"
                              : person.rank === 3
                                ? "bg-orange-500 text-white"
                                : "bg-gray-600 text-white"
                        }`}
                      >
                        {person.rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{person.name}</div>
                        <div className="text-sm text-gray-400">{person.trees} trees planted</div>
                      </div>
                      {person.rank <= 3 && (
                        <Trophy
                          className={`h-5 w-5 ${
                            person.rank === 1
                              ? "text-yellow-500"
                              : person.rank === 2
                                ? "text-gray-400"
                                : "text-orange-500"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-effect border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Active Members</span>
                      <span className="text-2xl font-bold text-emerald-400">50K+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Trees This Month</span>
                      <span className="text-2xl font-bold text-blue-400">12.5K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Your Contribution</span>
                      <span className="text-2xl font-bold text-purple-400">
                        {((stats.userTrees / 12500) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card className="glass-effect border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 to-green-600/10 overflow-hidden">
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white">Plant More Trees!</h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Every product you buy plants a tree. Shop more MamaEarth products to increase your environmental impact
                and unlock new achievements!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate("products")}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <TreePine className="h-5 w-5 mr-2" />
                Shop & Plant Trees
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <Button
                onClick={() => onNavigate("analyzer")}
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Find My Products
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">🌱</div>
                <div className="text-sm text-gray-400">Every Purchase</div>
              </div>
              <div className="text-2xl text-gray-600">→</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">🌳</div>
                <div className="text-sm text-gray-400">Plants a Tree</div>
              </div>
              <div className="text-2xl text-gray-600">→</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">🌍</div>
                <div className="text-sm text-gray-400">Saves Planet</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TreeTracker
