"use client"

import { ArrowLeft, Star, ShoppingCart, Heart, Sparkles } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/Badge"

const RecommendationsPage = ({
  onNavigate,
  addToCart,
  addToWishlist,
  userProfile,
  wishlistItems = [],
  recommendations = [],
}) => {
  // Default recommendations if none provided
  const defaultRecommendations = [
    {
      id: "rec1",
      name: "Vitamin C Face Serum with Vitamin C & Turmeric",
      price: 599,
      originalPrice: 799,
      image: "/placeholder.svg?height=200&width=200&text=Vitamin+C+Serum",
      rating: 4.5,
      reviews: 1250,
      reason: "Perfect for brightening and anti-aging based on your skin analysis",
    },
    {
      id: "rec2",
      name: "Onion Hair Oil for Hair Regrowth & Hair Fall Control",
      price: 399,
      originalPrice: 499,
      image: "/placeholder.svg?height=200&width=200&text=Onion+Hair+Oil",
      rating: 4.3,
      reviews: 890,
      reason: "Ideal for hair growth and strength based on your hair concerns",
    },
    {
      id: "rec3",
      name: "Tea Tree Face Wash with Tea Tree & Neem",
      price: 249,
      originalPrice: 299,
      image: "/placeholder.svg?height=200&width=200&text=Tea+Tree+Face+Wash",
      rating: 4.4,
      reviews: 2100,
      reason: "Great for controlling acne and oil based on your skin type",
    },
    {
      id: "rec4",
      name: "Argan Hair Mask with Argan Oil & Vanilla",
      price: 449,
      originalPrice: 599,
      image: "/placeholder.svg?height=200&width=200&text=Argan+Hair+Mask",
      rating: 4.6,
      reviews: 750,
      reason: "Perfect for deep conditioning and frizz control",
    },
  ]

  const displayRecommendations = recommendations.length > 0 ? recommendations : defaultRecommendations

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate("analyzer")}
            className="mb-4 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analyzer
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Your Personalized Recommendations</h1>
            <p className="text-gray-400">Based on your skin and hair analysis, here are the perfect products for you</p>
          </div>
        </div>

        {/* Analysis Summary */}
        {userProfile && (
          <Card className="mb-8 glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Your Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Skin Profile</h4>
                  <div className="space-y-1">
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      {userProfile.skinType || "Not specified"}
                    </Badge>
                    <div className="text-sm text-gray-400">
                      Concerns: {userProfile.skinConcerns?.join(", ") || "None specified"}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Hair Profile</h4>
                  <div className="space-y-1">
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      {userProfile.hairType || "Not specified"}
                    </Badge>
                    <div className="text-sm text-gray-400">
                      Concerns: {userProfile.hairConcerns?.join(", ") || "None specified"}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Lifestyle</h4>
                  <div className="space-y-1">
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      Age: {userProfile.age || "Not specified"}
                    </Badge>
                    <div className="text-sm text-gray-400">{userProfile.lifestyle || "Not specified"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommended Products */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayRecommendations.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden glass-effect border-gray-700"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI Recommended
                    </Badge>
                    <button
                      onClick={() => addToWishlist(product)}
                      className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                        isInWishlist(product.id) ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-red-500"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-white line-clamp-2 group-hover:text-green-400 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-current" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">({product.rating || 4.5})</span>
                        <span className="text-xs text-gray-500">• {product.reviews || 1000} reviews</span>
                      </div>

                      <div className="bg-green-600/10 border border-green-600/20 p-3 rounded-lg">
                        <p className="text-sm text-green-400 font-medium">Why it's perfect for you:</p>
                        <p className="text-sm text-gray-300 mt-1">{product.reason}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-white">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs bg-green-600 text-white">
                          Free Shipping
                        </Badge>
                      </div>

                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate("products")}
              className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
            >
              Explore More Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationsPage
