"use client"

import { ArrowRight, Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

const FeaturedProducts = ({ onNavigate, addToCart, addToWishlist, wishlistItems = [], onProductClick }) => {
  const featuredProducts = [
    {
      id: 1,
      name: "Vitamin C Face Serum with Vitamin C & Turmeric",
      price: 599,
      originalPrice: 799,
      rating: 4.8,
      reviews: 2847,
      isBestseller: true,
      category: "face-care",
      image: "/placeholder.svg?height=300&width=300&text=Vitamin+C+Serum",
      description: "Brightening serum with natural vitamin C for radiant, glowing skin",
      tags: ["Brightening", "Anti-aging"],
      benefits: ["Reduces dark spots", "Brightens complexion", "Anti-aging properties", "Natural ingredients"],
      ingredients: ["Vitamin C", "Turmeric", "Hyaluronic Acid", "Niacinamide"],
    },
    {
      id: 2,
      name: "Onion Hair Oil for Hair Regrowth & Hair Fall Control",
      price: 349,
      originalPrice: 449,
      rating: 4.6,
      reviews: 1923,
      isNew: true,
      category: "hair-care",
      image: "/placeholder.svg?height=300&width=300&text=Onion+Hair+Oil",
      description: "Nourishing hair oil with onion extract for stronger, healthier hair",
      tags: ["Hair Growth", "Natural"],
      benefits: ["Reduces hair fall", "Promotes growth", "Strengthens roots", "Natural formula"],
      ingredients: ["Onion Extract", "Coconut Oil", "Argan Oil", "Rosemary Oil"],
    },
    {
      id: 3,
      name: "Ubtan Face Wash with Turmeric & Saffron",
      price: 199,
      originalPrice: 249,
      rating: 4.7,
      reviews: 3421,
      isBestseller: true,
      category: "face-care",
      image: "/placeholder.svg?height=300&width=300&text=Ubtan+Face+Wash",
      description: "Traditional face wash with turmeric and gram flour for natural glow",
      tags: ["Cleansing", "Ayurvedic"],
      benefits: ["Deep cleansing", "Natural glow", "Removes tan", "Gentle formula"],
      ingredients: ["Turmeric", "Saffron", "Chickpea Flour", "Rose Water"],
    },
    {
      id: 4,
      name: "Aloe Vera Gel with Pure Aloe Vera & Vitamin E",
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      reviews: 3245,
      isBestseller: true,
      category: "body-care",
      image: "/placeholder.svg?height=300&width=300&text=Aloe+Vera+Gel",
      description: "Pure aloe vera gel for skin and hair with vitamin E",
      tags: ["Soothing", "Multi-purpose"],
      benefits: ["Soothes skin", "Moisturizes", "Heals minor cuts", "Multi-purpose use"],
      ingredients: ["Aloe Vera", "Vitamin E", "Glycerin", "Natural Extracts"],
    },
  ]

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full text-green-400 text-sm font-medium border border-green-500/30">
              ⭐ Bestsellers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
            Most Loved Products
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our bestselling natural beauty essentials trusted by millions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onProductClick && onProductClick(product)}
            >
              <div className="glass-effect rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 border border-gray-700/50 hover:border-green-500/30">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToWishlist(product)
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-black/70 transition-all duration-300 group-hover:scale-110"
                  >
                    <Heart
                      className={`h-4 w-4 ${isInWishlist(product.id) ? "text-red-500 fill-current" : "text-white"}`}
                    />
                  </button>
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  {product.isBestseller && (
                    <Badge className="absolute bottom-3 left-3 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
                      Bestseller
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
                      New
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-600/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-bold text-white text-lg leading-tight group-hover:text-green-400 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white ml-1 font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-400">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            onClick={() => onNavigate("products")}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-12 py-4 rounded-2xl shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            View All Products
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
