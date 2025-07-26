"use client"

import { MessageSquare, Heart, Share2, UserPlus, TrendingUp } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { useState } from "react"

const CommunitySection = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
      time: "2 hours ago",
      content:
        "Just tried the new Rice Face Wash! My skin feels incredibly soft and bright. Highly recommend it for sensitive skin types. #MamaEarth #SkincareRoutine",
      likes: 120,
      comments: 35,
      shares: 10,
      tags: ["skincare", "newproduct", "sensitiveskin"],
    },
    {
      id: 2,
      author: "Rahul Gupta",
      avatar: "/placeholder.svg?height=40&width=40&text=RG",
      time: "5 hours ago",
      content:
        "My hair fall has significantly reduced after using MamaEarth Onion Hair Oil for a month. This product is a lifesaver! #Haircare #OnionHairOil #NaturalProducts",
      likes: 98,
      comments: 21,
      shares: 7,
      tags: ["haircare", "hairfall", "natural"],
    },
    {
      id: 3,
      author: "Anjali Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=AP",
      time: "1 day ago",
      content:
        "Loving the Ubtan Face Mask! It gives an instant glow and feels so refreshing. Perfect for a weekend pamper session. ✨ #Ubtan #FaceMask #Glowingskin",
      likes: 150,
      comments: 40,
      shares: 15,
      tags: ["facemask", "ubtan", "glow"],
    },
  ])

  const [newPostContent, setNewPostContent] = useState("")

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: "You (Guest User)", // Placeholder for logged-in user
        avatar: "/placeholder.svg?height=40&width=40&text=GU",
        time: "Just now",
        content: newPostContent.trim(),
        likes: 0,
        comments: 0,
        shares: 0,
        tags: ["community", "newpost"],
      }
      setPosts([newPost, ...posts])
      setNewPostContent("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            MamaEarth Community
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with other natural beauty enthusiasts, share tips, and discover new favorites!
          </p>
        </div>

        {/* Create Post Section */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <Input
                placeholder="What's on your mind about natural beauty?"
                className="w-full bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl py-3 px-4"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Post to Community
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Community Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={post.avatar || "/placeholder.svg"}
                    alt={post.author}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-purple-500"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{post.author}</h4>
                    <p className="text-gray-400 text-sm">{post.time}</p>
                  </div>
                </div>
                <p className="text-gray-200 mb-4 leading-relaxed">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} className="bg-purple-600/20 text-purple-400 border border-purple-600/30">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center hover:text-white transition-colors duration-200">
                      <Heart className="h-4 w-4 mr-1" /> {post.likes} Likes
                    </button>
                    <button className="flex items-center hover:text-white transition-colors duration-200">
                      <MessageSquare className="h-4 w-4 mr-1" /> {post.comments} Comments
                    </button>
                    <button className="flex items-center hover:text-white transition-colors duration-200">
                      <Share2 className="h-4 w-4 mr-1" /> {post.shares} Shares
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-white hover:bg-purple-400/10">
                    View Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trending Topics */}
        <Card className="mt-12 bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-pink-400" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30 cursor-pointer hover:bg-blue-600/30">
              #NaturalSkincare
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30 cursor-pointer hover:bg-blue-600/30">
              #HairGrowthTips
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30 cursor-pointer hover:bg-blue-600/30">
              #ToxinFree
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30 cursor-pointer hover:bg-blue-600/30">
              #BabyCareEssentials
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30 cursor-pointer hover:bg-blue-600/30">
              #MamaEarthReviews
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CommunitySection
