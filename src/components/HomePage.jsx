"use client"

import { useState } from "react"
import { ArrowRight, Sparkles, Leaf, Shield, Award, Star, Heart, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

const HomePage = ({ onNavigate, addToCart, addToWishlist, wishlistItems = [], onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState("face-care")

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

  const categories = [
    {
      id: "face-care",
      name: "Face Care",
      description: "Natural face wash, serums & moisturizers",
      image: "/placeholder.svg?height=200&width=200&text=Face+Care",
      products: 50,
      icon: "✨",
    },
    {
      id: "hair-care",
      name: "Hair Care",
      description: "Onion shampoos, oils & treatments",
      image: "/placeholder.svg?height=200&width=200&text=Hair+Care",
      products: 30,
      icon: "💇‍♀️",
    },
    {
      id: "body-care",
      name: "Body Care",
      description: "Body lotions, scrubs & moisturizers",
      image: "/placeholder.svg?height=200&width=200&text=Body+Care",
      products: 25,
      icon: "🧴",
    },
    {
      id: "baby-care",
      name: "Baby Care",
      description: "Gentle & safe baby products",
      image: "/placeholder.svg?height=200&width=200&text=Baby+Care",
      products: 20,
      icon: "👶",
    },
  ]

  const stats = [
    { label: "Happy Families", value: "2M+", icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Customer Rating", value: "4.8★", icon: Star, color: "from-yellow-500 to-yellow-600" },
    { label: "Toxin Free", value: "100%", icon: Shield, color: "from-green-500 to-green-600" },
    { label: "Natural Products", value: "125+", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Amazing products! My skin has never looked better. The vitamin C serum is a game-changer.",
      image: "/placeholder.svg?height=60&width=60&text=PS",
    },
    {
      name: "Rahul Gupta",
      location: "Delhi",
      rating: 5,
      comment: "The onion hair oil really works! Noticed less hair fall within 2 weeks of use.",
      image: "/placeholder.svg?height=60&width=60&text=RG",
    },
    {
      name: "Anjali Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Love the natural ingredients. Finally found products that don't irritate my sensitive skin.",
      image: "/placeholder.svg?height=60&width=60&text=AP",
    },
  ]

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-64 h-64 bg-green-300/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "6s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-600/20 text-green-400 border border-green-600/30 rounded-full text-sm font-medium backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                100% Natural & Toxin-Free
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Natural Beauty,{" "}
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Made Safe
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Discover the goodness of nature with MamaEarth's range of toxin-free, natural products for you and your
                family. Trusted by millions worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button
                  onClick={() => onNavigate("analyzer")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Find My Products
                </Button>
                <Button
                  onClick={() => onNavigate("products")}
                  variant="outline"
                  className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Browse All
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-8">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium">Dermatologically Tested</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Award className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium">Award Winning</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Leaf className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium">100% Natural</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative group">
                <img
                  src="/placeholder.svg?height=600&width=600&text=Natural+Skincare+Hero"
                  alt="Natural skincare products"
                  className="w-full h-auto rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                  <Leaf className="h-8 w-8" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl shadow-xl animate-pulse">
                  <Shield className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-purple-400 text-sm font-medium border border-purple-500/30">
                🛍️ Shop by Category
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Discover Your Perfect Match
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore our carefully curated categories of natural products designed for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate("products")}
              >
                <div className="glass-effect rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-gray-700/50 hover:border-purple-500/30">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{category.description}</p>
                  <Badge
                    variant="outline"
                    className="text-purple-400 border-purple-600/50 bg-purple-600/10 group-hover:bg-purple-600/20 transition-all duration-300"
                  >
                    {category.products} Products
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
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

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-green-700/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Customers Say</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Join millions of happy customers who trust MamaEarth for their natural beauty needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white/20"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white mb-4 italic leading-relaxed">"{testimonial.comment}"</p>
                <h4 className="font-bold text-white">{testimonial.name}</h4>
                <p className="text-green-100 text-sm">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full text-blue-400 text-sm font-medium border border-blue-500/30">
                🏆 Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Trusted by Millions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Committed to natural, safe, and effective products for your entire family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:scale-105 border border-gray-700/50 hover:border-green-500/30">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">100% Natural</h3>
              <p className="text-gray-400 leading-relaxed">
                Made with natural ingredients, free from harmful chemicals and toxins. Safe for your skin and the
                environment.
              </p>
            </div>

            <div className="glass-effect rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 border border-gray-700/50 hover:border-blue-500/30">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Dermatologically Tested</h3>
              <p className="text-gray-400 leading-relaxed">
                All products are rigorously tested by dermatologists to ensure safety and effectiveness for all skin
                types.
              </p>
            </div>

            <div className="glass-effect rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 border border-gray-700/50 hover:border-purple-500/30">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Award Winning</h3>
              <p className="text-gray-400 leading-relaxed">
                Recognized and trusted by millions of families across India. Multiple awards for quality and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/95 to-emerald-600/95"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Updated with Nature's Best</h2>
            <p className="text-xl text-green-100 leading-relaxed">
              Get the latest updates on new products, exclusive offers, and natural beauty tips delivered to your inbox
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-white/30 text-gray-900 placeholder-gray-500 font-medium shadow-lg"
            />
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Subscribe Now
            </Button>
          </div>

          <p className="text-green-100 text-sm">Join 500,000+ subscribers. No spam, unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}

export default HomePage
