"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Star, Filter, Search, Play, ThumbsUp, X, Eye } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/Badge"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

const CommunitySection = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState(null)

  const filters = [
    { id: "all", label: "All Posts", count: 1247 },
    { id: "reviews", label: "Product Reviews", count: 856 },
    { id: "transformations", label: "Glow Stories", count: 234 },
    { id: "tips", label: "Beauty Tips", count: 157 },
  ]

  const communityPosts = [
    {
      id: 1,
      type: "transformation",
      user: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40&text=PS",
        verified: true,
        location: "Mumbai",
      },
      content: {
        title: "My 3-month skin transformation with MamaEarth Vitamin C range! ✨",
        description:
          "I struggled with dull skin and dark spots for years. After using the Vitamin C face wash, serum, and moisturizer consistently for 3 months, the results are incredible!",
        beforeImage: "/placeholder.svg?height=300&width=300&text=Before",
        afterImage: "/placeholder.svg?height=300&width=300&text=After",
        products: ["Vitamin C Face Wash", "Vitamin C Serum", "Vitamin C Moisturizer"],
      },
      engagement: {
        likes: 1247,
        comments: 89,
        shares: 34,
        views: 5670,
      },
      timestamp: "2 days ago",
      tags: ["skincare", "vitamin-c", "transformation", "glowing-skin"],
    },
    {
      id: 2,
      type: "review",
      user: {
        name: "Ananya Gupta",
        avatar: "/placeholder.svg?height=40&width=40&text=AG",
        verified: false,
        location: "Delhi",
      },
      content: {
        title: "Onion Hair Oil - Game Changer for Hair Fall! 🧅",
        description:
          "I was skeptical about onion oil, but this product has reduced my hair fall by 80%! The smell is mild and it doesn't make my hair greasy.",
        rating: 5,
        images: ["/placeholder.svg?height=200&width=200&text=Hair+Oil"],
        products: ["Onion Hair Oil"],
      },
      engagement: {
        likes: 892,
        comments: 67,
        shares: 23,
        views: 3450,
      },
      timestamp: "1 week ago",
      tags: ["hair-care", "onion-oil", "hair-fall", "review"],
    },
    {
      id: 3,
      type: "video",
      user: {
        name: "Kavya Menon",
        avatar: "/placeholder.svg?height=40&width=40&text=KM",
        verified: true,
        location: "Bangalore",
      },
      content: {
        title: "My Complete MamaEarth Skincare Routine | Morning & Night",
        description: "Sharing my complete skincare routine using only MamaEarth products. Perfect for beginners!",
        thumbnail: "/placeholder.svg?height=200&width=300&text=Video+Thumbnail",
        duration: "8:45",
        products: ["Tea Tree Face Wash", "Vitamin C Serum", "Ubtan Face Pack", "Aloe Vera Gel"],
      },
      engagement: {
        likes: 2156,
        comments: 134,
        shares: 78,
        views: 12340,
      },
      timestamp: "3 days ago",
      tags: ["routine", "skincare", "tutorial", "beginner-friendly"],
    },
    {
      id: 4,
      type: "tip",
      user: {
        name: "Dr. Meera Patel",
        avatar: "/placeholder.svg?height=40&width=40&text=MP",
        verified: true,
        location: "Ahmedabad",
        badge: "Dermatologist",
      },
      content: {
        title: "Pro Tip: How to Layer Your Serums Correctly 💡",
        description:
          "Many people apply serums wrong! Here's the correct order: Vitamin C (morning) → Hyaluronic Acid → Moisturizer → Sunscreen. At night: Cleanser → Niacinamide → Retinol → Night cream.",
        images: ["/placeholder.svg?height=200&width=300&text=Serum+Guide"],
      },
      engagement: {
        likes: 3421,
        comments: 189,
        shares: 156,
        views: 8900,
      },
      timestamp: "5 days ago",
      tags: ["expert-tips", "serums", "skincare-routine", "professional"],
    },
    {
      id: 5,
      type: "transformation",
      user: {
        name: "Riya Singh",
        avatar: "/placeholder.svg?height=40&width=40&text=RS",
        verified: false,
        location: "Pune",
      },
      content: {
        title: "Acne to Clear Skin Journey - 6 months with Tea Tree range 🌿",
        description:
          "Sharing my acne journey! I had severe cystic acne and tried everything. MamaEarth Tea Tree products were the only thing that worked without harsh side effects.",
        beforeImage: "/placeholder.svg?height=300&width=300&text=Acne+Before",
        afterImage: "/placeholder.svg?height=300&width=300&text=Clear+After",
        products: ["Tea Tree Face Wash", "Tea Tree Serum", "Neem Face Pack"],
      },
      engagement: {
        likes: 1876,
        comments: 156,
        shares: 67,
        views: 7890,
      },
      timestamp: "1 week ago",
      tags: ["acne", "tea-tree", "transformation", "clear-skin"],
    },
  ]

  const filteredPosts = communityPosts.filter((post) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "reviews" && post.type === "review") ||
      (activeFilter === "transformations" && post.type === "transformation") ||
      (activeFilter === "tips" && post.type === "tip")

    const matchesSearch =
      searchQuery === "" ||
      post.content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  const PostCard = ({ post }) => (
    <Card
      className="glass-effect border-gray-700 hover:border-green-500/50 transition-all cursor-pointer overflow-hidden"
      onClick={() => setSelectedPost(post)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img
              src={post.user.avatar || "/placeholder.svg"}
              alt={post.user.name}
              className="w-10 h-10 rounded-full border border-gray-600 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 flex-wrap">
                <h3 className="font-semibold text-white truncate">{post.user.name}</h3>
                {post.user.verified && <Badge className="bg-blue-600 text-white text-xs flex-shrink-0">✓</Badge>}
                {post.user.badge && (
                  <Badge className="bg-purple-600 text-white text-xs flex-shrink-0">{post.user.badge}</Badge>
                )}
              </div>
              <p className="text-xs text-gray-400 truncate">
                {post.user.location} • {post.timestamp}
              </p>
            </div>
          </div>
          <Badge
            className={`text-xs flex-shrink-0 ${
              post.type === "transformation"
                ? "bg-pink-600"
                : post.type === "review"
                  ? "bg-blue-600"
                  : post.type === "video"
                    ? "bg-red-600"
                    : "bg-green-600"
            } text-white`}
          >
            {post.type === "transformation"
              ? "Glow Story"
              : post.type === "review"
                ? "Review"
                : post.type === "video"
                  ? "Video"
                  : "Tip"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2">{post.content.title}</h2>
          <p className="text-gray-300 text-sm line-clamp-3">{post.content.description}</p>
        </div>

        {/* Content based on post type */}
        {post.type === "transformation" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs text-gray-400 text-center">Before</p>
              <img
                src={post.content.beforeImage || "/placeholder.svg"}
                alt="Before"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-400 text-center">After</p>
              <img
                src={post.content.afterImage || "/placeholder.svg"}
                alt="After"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        )}

        {post.type === "review" && post.content.rating && (
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < post.content.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">({post.content.rating}/5)</span>
          </div>
        )}

        {post.type === "video" && (
          <div className="relative">
            <img
              src={post.content.thumbnail || "/placeholder.svg"}
              alt="Video thumbnail"
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-white ml-1" />
              </div>
            </div>
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white text-xs">{post.content.duration}</Badge>
          </div>
        )}

        {post.content.images && post.type !== "transformation" && (
          <div className="grid grid-cols-2 gap-2">
            {post.content.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Post image ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Products mentioned */}
        {post.content.products && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400">Products mentioned:</p>
            <div className="flex flex-wrap gap-1">
              {post.content.products.map((product, index) => (
                <Badge key={index} className="bg-green-600/20 text-green-400 text-xs border border-green-600/30">
                  {product}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} className="bg-gray-700 text-gray-300 text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{post.engagement.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.engagement.comments}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
              <Share2 className="h-4 w-4" />
              <span className="text-xs">{post.engagement.shares}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <Eye className="h-4 w-4" />
            <span className="text-xs">{post.engagement.views}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-20">
          <source src="/placeholder.mp4" type="video/mp4" />
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-gray-900/50 to-purple-900/30" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">MamaEarth Community</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of beauty enthusiasts sharing their glow stories, reviews, and tips
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="glass-effect border-gray-700 max-w-6xl mx-auto">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts, products, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
                <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="flex space-x-2 min-w-max">
                  {filters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={activeFilter === filter.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter.id)}
                      className={
                        activeFilter === filter.id
                          ? "bg-green-600 hover:bg-green-700 flex-shrink-0"
                          : "border-gray-600 text-gray-300 hover:bg-gray-800 flex-shrink-0"
                      }
                    >
                      {filter.label} ({filter.count})
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <Card className="glass-effect border-gray-700">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">50K+</div>
              <p className="text-gray-400 text-sm sm:text-base">Active Members</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-gray-700">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">1.2K+</div>
              <p className="text-gray-400 text-sm sm:text-base">Posts This Week</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-gray-700">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-pink-400">234</div>
              <p className="text-gray-400 text-sm sm:text-base">Glow Stories</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-gray-700">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">4.8★</div>
              <p className="text-gray-400 text-sm sm:text-base">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center max-w-6xl mx-auto">
          <Button className="bg-green-600 hover:bg-green-700">Load More Posts</Button>
        </div>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 sm:p-6 z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Post Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <PostCard post={selectedPost} />

              {/* Comments Section */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Comments ({selectedPost.engagement.comments})</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <img
                        src={`/placeholder.svg?height=32&width=32&text=U${i}`}
                        alt="User"
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1 flex-wrap">
                          <span className="text-sm font-medium text-white">User {i}</span>
                          <span className="text-xs text-gray-400">2h ago</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          This is amazing! I've been looking for something like this. Thanks for sharing! 💕
                        </p>
                        <div className="flex items-center space-x-3 mt-2">
                          <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-red-400">
                            <ThumbsUp className="h-3 w-3" />
                            <span>12</span>
                          </button>
                          <button className="text-xs text-gray-400 hover:text-white">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommunitySection
