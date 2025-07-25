"use client"

import { useState, useEffect } from "react"
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Shield,
  Award,
  Star,
  Heart,
  ShoppingCart,
  TrendingUp,
  Zap,
  Users,
  Globe,
  TreePine,
  CheckCircle,
  Play,
  ChevronRight,
  Microscope,
  Beaker,
  Atom,
} from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { getBestsellers, getNewProducts } from "../data/product"

const HomePage = ({ onNavigate, addToCart, addToWishlist, wishlistItems = [], onProductClick }) => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newProducts, setNewProducts] = useState([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    // Load dynamic products
    setFeaturedProducts(getBestsellers().slice(0, 4))
    setNewProducts(getNewProducts().slice(0, 3))
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % liveStats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const categories = [
    {
      id: "face-care",
      name: "Face Care",
      description: "Clinical-grade natural formulations",
      image: "/placeholder.svg?height=200&width=200&text=Face+Care",
      products: 50,
      gradient: "from-rose-500/20 via-pink-500/20 to-fuchsia-500/20",
      icon: "✨",
      bgPattern: "radial-gradient(circle at 20% 80%, rgba(244, 63, 94, 0.15) 0%, transparent 50%)",
    },
    {
      id: "hair-care",
      name: "Hair Care",
      description: "Advanced botanical hair science",
      image: "/placeholder.svg?height=200&width=200&text=Hair+Care",
      products: 30,
      gradient: "from-violet-500/20 via-purple-500/20 to-indigo-500/20",
      icon: "💇‍♀️",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
    },
    {
      id: "body-care",
      name: "Body Care",
      description: "Luxurious body wellness rituals",
      image: "/placeholder.svg?height=200&width=200&text=Body+Care",
      products: 25,
      gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
      icon: "🧴",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
    },
    {
      id: "baby-care",
      name: "Baby Care",
      description: "Pediatrician-approved gentle care",
      image: "/placeholder.svg?height=200&width=200&text=Baby+Care",
      products: 20,
      gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
      icon: "👶",
      bgPattern: "radial-gradient(circle at 30% 70%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)",
    },
  ]

  const stats = [
    { label: "Happy Families", value: "2M+", icon: Users, color: "text-blue-400", description: "Trusted globally" },
    { label: "Customer Rating", value: "4.8★", icon: Star, color: "text-yellow-400", description: "Verified reviews" },
    { label: "Toxin Free", value: "100%", icon: Leaf, color: "text-green-400", description: "MadeSafe certified" },
    {
      label: "Natural Products",
      value: "125+",
      icon: Sparkles,
      color: "text-purple-400",
      description: "Premium range",
    },
  ]

  const liveStats = [
    { label: "Trees Planted Today", value: "1,247", icon: TreePine, color: "text-emerald-400" },
    { label: "CO₂ Saved This Month", value: "2.3T", icon: Globe, color: "text-blue-400" },
    { label: "Active Community", value: "50K+", icon: Users, color: "text-purple-400" },
    { label: "Products Sold Today", value: "3,892", icon: ShoppingCart, color: "text-orange-400" },
  ]

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      title: "Dermatologist",
      location: "Mumbai",
      rating: 5,
      text: "As a dermatologist, I'm impressed by MamaEarth's scientific approach to natural skincare. The formulations are clinically sound and deliver real results.",
      image: "/placeholder.svg?height=80&width=80&text=PS",
      verified: true,
    },
    {
      name: "Ananya Gupta",
      title: "Beauty Influencer",
      location: "Delhi",
      rating: 5,
      text: "I've tried hundreds of products, but MamaEarth's consistency in quality and effectiveness is unmatched. My skin has never looked better!",
      image: "/placeholder.svg?height=80&width=80&text=AG",
      verified: true,
    },
    {
      name: "Kavya Menon",
      title: "Working Mother",
      location: "Bangalore",
      rating: 5,
      text: "Finding safe, effective products for my family was challenging until I discovered MamaEarth. Now it's our go-to brand for everything!",
      image: "/placeholder.svg?height=80&width=80&text=KM",
      verified: true,
    },
  ]

  const certifications = [
    { name: "MadeSafe", icon: Shield, description: "Certified non-toxic" },
    { name: "Cruelty Free", icon: Heart, description: "Never tested on animals" },
    { name: "Dermatologist Tested", icon: Microscope, description: "Clinically validated" },
    { name: "Natural Ingredients", icon: Leaf, description: "Plant-based formulas" },
  ]

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden mb-32">
        {/* Advanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95" />

          {/* Animated Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/8 to-rose-500/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="text-center lg:text-left space-y-12">
              <div className="space-y-10">
                {/* Premium Badge */}
                <div className="inline-flex items-center">
                  <Badge className="bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-3 text-sm font-semibold backdrop-blur-xl">
                    <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                    India's #1 Natural Beauty Brand
                  </Badge>
                </div>

                {/* Hero Title */}
                <div className="space-y-8">
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
                    <span className="block">Natural</span>
                    <span className="block gradient-text">Beauty,</span>
                    <span className="block text-5xl sm:text-6xl lg:text-7xl font-light text-gray-300">Made Safe</span>
                  </h1>

                  <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                    Experience the perfect fusion of{" "}
                    <span className="text-emerald-400 font-semibold">ancient wisdom</span> and
                    <span className="text-blue-400 font-semibold"> modern science</span>. Discover toxin-free,
                    clinically-proven formulations crafted for your family's wellbeing.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button
                  onClick={() => onNavigate("analyzer")}
                  className="group relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 text-white px-10 py-5 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Sparkles className="h-6 w-6 mr-3 animate-pulse" />
                  Discover Your Perfect Match
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  onClick={() => onNavigate("products")}
                  variant="outline"
                  className="group text-white border-2 border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 px-10 py-5 text-lg font-bold rounded-2xl backdrop-blur-xl transition-all duration-500"
                >
                  <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  Explore Collection
                </Button>
              </div>

              {/* Live Stats Ticker */}
              <div className="glass-effect-strong rounded-2xl p-6 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-400 font-medium">LIVE</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${liveStats[currentStat].color} transition-all duration-500`}>
                      {liveStats[currentStat].value}
                    </div>
                    <div className="text-sm text-gray-400">{liveStats[currentStat].label}</div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators - FIXED SPACING */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="glass-effect rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300 group-hover:scale-105 h-full flex flex-col items-center justify-center space-y-4">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-800/50 mb-2 group-hover:scale-110 transition-transform`}
                      >
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                      <div className={`text-3xl font-bold ${stat.color} leading-none`}>{stat.value}</div>
                      <div className="text-sm text-gray-300 font-semibold text-center leading-tight">{stat.label}</div>
                      <div className="text-xs text-gray-500 text-center leading-tight">{stat.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative lg:pl-10">
              <div className="relative z-10">
                {/* Main Product Showcase */}
                <div className="relative overflow-hidden rounded-3xl glass-effect-strong p-8 border border-emerald-500/20 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />

                  <img
                    src="/placeholder.svg?height=600&width=500&text=Premium+Natural+Skincare"
                    alt="Premium natural skincare collection"
                    className="w-full h-auto rounded-2xl shadow-2xl relative z-10"
                  />

                  {/* Floating Elements */}
                  {/* <div className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-2xl shadow-xl animate-float">
                    <Leaf className="h-8 w-8" />
                  </div>

                  <div
                    className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl shadow-xl animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <Shield className="h-6 w-6" />
                  </div>

                  <div className="absolute top-30 -right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-full shadow-xl animate-bounce">
                    <Star className="h-5 w-5" />
                  </div> */}
                </div>

                {/* Certification Badges */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  {certifications.slice(0, 2).map((cert, index) => (
                    <div
                      key={index}
                      className="glass-effect rounded-xl p-3 border border-gray-700/50 hover:border-emerald-500/30 transition-all"
                    >
                      <cert.icon className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-300 font-medium text-center">{cert.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-8">
              <Beaker className="h-4 w-4 mr-2" />
              Scientific Formulations
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tight">
              Precision <span className="gradient-text">Skincare</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Each category represents years of research, combining traditional botanicals with cutting-edge
              dermatological science
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                onClick={() => onNavigate("products")}
              >
                <div className="relative overflow-hidden rounded-3xl glass-effect-strong border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-500 h-full">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-50" style={{ background: category.bgPattern }} />

                  <div className="relative p-10 text-center space-y-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-4">
                        {category.name}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        {category.products} Premium Products
                      </Badge>

                      <div className="flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        <span className="text-sm font-medium mr-2">Explore Range</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-8">
              <TrendingUp className="h-4 w-4 mr-2" />
              Customer Favorites
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tight">
              Most <span className="gradient-text">Loved</span> Products
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover why millions trust these scientifically-formulated, nature-powered essentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                onClick={() => onProductClick(product)}
              >
                <div className="glass-effect-strong rounded-3xl p-8 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 border border-gray-700/50 hover:border-emerald-500/30 h-full flex flex-col">
                  <div className="relative mb-8 overflow-hidden rounded-2xl">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Product Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.originalPrice > product.price && (
                        <Badge className="bg-red-500/90 text-white backdrop-blur-sm">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-yellow-500/90 text-white backdrop-blur-sm">⭐ Bestseller</Badge>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToWishlist(product)
                      }}
                      className="absolute top-3 right-3 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-red-500 transition-all duration-300 group"
                    >
                      <Heart
                        className={`h-5 w-5 ${isInWishlist(product.id) ? "text-red-500 fill-current" : "text-white"}`}
                      />
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black">
                        Quick View
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col space-y-6">
                    <h3 className="font-bold text-white text-lg line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">({product.rating})</span>
                      <span className="text-xs text-gray-500">• {product.reviews} reviews</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                        Free Shipping
                      </Badge>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(product)
                      }}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 group"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Button
              onClick={() => onNavigate("products")}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-12 py-5 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              View Complete Collection
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-8">
                <Zap className="h-4 w-4 mr-2" />
                Innovation Lab
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tight">
                Latest <span className="gradient-text">Breakthroughs</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Be among the first to experience our newest scientific formulations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {newProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                  onClick={() => onProductClick(product)}
                >
                  <div className="glass-effect-strong rounded-3xl p-10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-gray-700/50 hover:border-blue-500/30 h-full flex flex-col">
                    <div className="relative mb-8 overflow-hidden rounded-2xl">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <Badge className="absolute top-4 left-4 bg-blue-500/90 text-white backdrop-blur-sm">
                        🆕 New Launch
                      </Badge>
                    </div>

                    <div className="flex-1 flex flex-col space-y-6">
                      <h3 className="font-bold text-white text-xl line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 flex-1">{product.description}</p>

                      <div className="flex items-center justify-between pt-6">
                        <span className="text-2xl font-bold text-white">₹{product.price}</span>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product)
                          }}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300"
                        >
                          Try First
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/50" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-8">
              <Users className="h-4 w-4 mr-2" />
              Expert Testimonials
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tight">
              Trusted by <span className="gradient-text">Professionals</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Hear from dermatologists, beauty experts, and satisfied customers worldwide
            </p>
          </div>

          <div className="relative">
            <div className="glass-effect-strong rounded-3xl p-16 border border-gray-700/50 shadow-2xl">
              <div className="text-center space-y-10">
                <div className="flex justify-center mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-2xl text-gray-300 italic leading-relaxed font-light max-w-4xl mx-auto">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-8">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full border-2 border-emerald-500 shadow-lg"
                  />
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <div className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</div>
                      {testimonials[currentTestimonial].verified && <CheckCircle className="h-5 w-5 text-blue-400" />}
                    </div>
                    <div className="text-emerald-400 font-semibold">{testimonials[currentTestimonial].title}</div>
                    <div className="text-sm text-gray-400">{testimonials[currentTestimonial].location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-emerald-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-8">
              <Atom className="h-4 w-4 mr-2" />
              Scientific Excellence
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tight">
              Why Choose <span className="gradient-text">MamaEarth</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Uncompromising commitment to natural, safe, and scientifically-proven formulations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Leaf,
                title: "100% Natural Formulations",
                description:
                  "Meticulously crafted with premium botanical ingredients, free from harmful chemicals, parabens, and synthetic additives.",
                color: "text-emerald-400",
                bgColor: "bg-emerald-500/10",
                borderColor: "border-emerald-500/20",
              },
              {
                icon: Shield,
                title: "MadeSafe Certified",
                description:
                  "Rigorously tested and certified by independent laboratories to ensure the highest safety standards for your family.",
                color: "text-blue-400",
                bgColor: "bg-blue-500/10",
                borderColor: "border-blue-500/20",
              },
              {
                icon: Award,
                title: "Award-Winning Excellence",
                description:
                  "Recognized globally for innovation in natural beauty, trusted by millions of families across 50+ countries.",
                color: "text-yellow-400",
                bgColor: "bg-yellow-500/10",
                borderColor: "border-yellow-500/20",
              },
            ].map((feature, index) => (
              <div key={index} className="group text-center">
                <div
                  className={`glass-effect-strong rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 border ${feature.borderColor} hover:border-emerald-500/30 group-hover:scale-105 h-full flex flex-col`}
                >
                  <div
                    className={`w-24 h-24 ${feature.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`h-12 w-12 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-8 group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors flex-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seamless CTA Section */}
      <section className="py-40 relative overflow-hidden">
        {/* Consistent Background with rest of the site */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-black/50" />

          {/* Same animated orbs as hero section for consistency */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-500/8 to-green-500/8 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/6 to-purple-500/6 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/6 to-rose-500/6 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />

          {/* Same grid pattern for consistency */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="space-y-16">
            {/* Badge matching other sections */}
            <div className="inline-flex items-center">
              <Badge className="bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 px-8 py-4 text-lg font-bold backdrop-blur-xl">
                <TreePine className="h-6 w-6 mr-3 animate-pulse" />
                Join the Natural Beauty Revolution
              </Badge>
            </div>

            {/* Title matching the design language */}
            <div className="space-y-10">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                <span className="block">Ready to Transform</span>
                <span className="block gradient-text">Your Beauty Routine?</span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                Join over <span className="text-emerald-400 font-bold">2 million families</span> who have discovered the
                perfect harmony of <span className="text-blue-400 font-bold">science and nature</span>. Experience
                skincare that's as gentle on your skin as it is on the planet.
              </p>
            </div>

            {/* CTA Buttons matching hero section style */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button
                onClick={() => onNavigate("analyzer")}
                className="group relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="relative flex items-center">
                  <Sparkles className="h-7 w-7 mr-4 animate-pulse" />
                  Get Your Personal Analysis
                  <ArrowRight className="h-7 w-7 ml-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Button>

              <Button
                onClick={() => onNavigate("products")}
                variant="outline"
                className="group text-white border-2 border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-xl transition-all duration-500"
              >
                <div className="flex items-center">
                  <ShoppingCart className="h-6 w-6 mr-4 group-hover:scale-110 transition-transform" />
                  Shop Premium Collection
                </div>
              </Button>
            </div>

            {/* Trust indicators matching the glass effect style */}
            <div className="glass-effect-strong rounded-3xl p-10 border border-emerald-500/20 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TreePine className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div className="text-lg font-bold text-white">Every Purchase Plants a Tree</div>
                  <div className="text-sm text-gray-400">Contributing to a greener planet</div>
                </div>

                <div className="text-4xl text-gray-600 hidden md:block text-center">→</div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="text-lg font-bold text-white">Sustainable Future</div>
                  <div className="text-sm text-gray-400">For generations to come</div>
                </div>
              </div>
            </div>

            {/* Social proof matching other sections */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-16 text-gray-400">
              <div className="flex items-center space-x-3">
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
                <span className="font-semibold text-lg">4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-400" />
                <span className="font-semibold text-lg">2M+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-emerald-400" />
                <span className="font-semibold text-lg">MadeSafe Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
