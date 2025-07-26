"use client"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Leaf, Gift, Users } from "lucide-react"
import { Button } from "./ui/Button"

const TreeTracker = ({ user, onNavigate }) => {
  const treesPlanted = user?.treesPlanted || 0
  const nextMilestone = 10 // Example milestone

  return (
    <div className="py-12 text-white">
      <Card className="glass-effect border border-gray-700/50 shadow-2xl p-8 text-center">
        <CardHeader className="mb-6">
          <Leaf className="h-20 w-20 text-green-500 mx-auto mb-4 animate-pulse-slow" />
          <CardTitle className="text-4xl font-bold text-white mb-2">Your Impact on Earth</CardTitle>
          <p className="text-lg text-gray-300">Every purchase helps us plant a tree. See your contribution grow!</p>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <p className="text-6xl font-extrabold text-green-400 mb-4">{treesPlanted}</p>
            <p className="text-2xl font-semibold text-gray-200">Trees Planted by You!</p>
          </div>

          {treesPlanted < nextMilestone && (
            <div className="mb-8">
              <p className="text-lg text-gray-300 mb-2">
                You're just <span className="font-bold text-green-400">{nextMilestone - treesPlanted}</span> more trees
                away from your next milestone!
              </p>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(treesPlanted / nextMilestone) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-800/50 rounded-xl p-5 flex items-center space-x-4 border border-gray-700/50 shadow-md">
              <Gift className="h-10 w-10 text-blue-400" />
              <div>
                <h4 className="text-xl font-semibold text-white">Milestone Rewards</h4>
                <p className="text-gray-300 text-sm">Unlock special discounts and gifts as you plant more trees.</p>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-5 flex items-center space-x-4 border border-gray-700/50 shadow-md">
              <Users className="h-10 w-10 text-purple-400" />
              <div>
                <h4 className="text-xl font-semibold text-white">Community Impact</h4>
                <p className="text-gray-300 text-sm">See the collective impact of the MamaEarth community.</p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => onNavigate("products")}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Plant More Trees by Shopping
          </Button>
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Our Commitment to Sustainability</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          MamaEarth is proud to be a plastic-positive brand. We recycle more plastic than we use, ensuring a healthier
          planet for future generations.
        </p>
        <img
          src="/placeholder.svg?height=150&width=300"
          alt="Plastic Positive Certification"
          className="mx-auto mt-8 opacity-80"
        />
      </div>
    </div>
  )
}

export default TreeTracker
