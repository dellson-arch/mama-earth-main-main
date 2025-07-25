"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Award, Zap } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import ProductCard from "./ProductCard"
import { products } from "../data/products"
import { useRouter } from "next/navigation" // Import useRouter for navigation

const FeaturedProducts = ({ onAddToCart, onAddToWishlist, wishlistItems, onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [visibleProducts, setVisibleProducts] = useState(4)
  const router = useRouter() // Initialize useRouter

  // Featured products with special badges
  const featuredProducts = products.slice(0, 8).map((product, index) => ({
    ...product,
    isFeatured: true,
    badge: index < 2 ? "bestseller" : index < 4 ? "trending" : index < 6 ? "new" : "premium",
  }))

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, featuredProducts.length - visibleProducts + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredProducts.length, visibleProducts])

  // Responsive visible products
  useEffect(() => {
    const updateVisibleProducts = () => {
      if (window.innerWidth < 640) setVisibleProducts(1)
      else if (window.innerWidth < 1024) setVisibleProducts(2)
      else if (window.innerWidth < 1280) setVisibleProducts(3)
      else setVisibleProducts(4)
    }

    updateVisibleProducts()
    window.addEventListener("resize", updateVisibleProducts)
    return () => window.removeEventListener("resize", updateVisibleProducts)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, featuredProducts.length - visibleProducts + 1))
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, featuredProducts.length - visibleProducts + 1)) %
        Math.max(1, featuredProducts.length - visibleProducts + 1),
    )
    setIsAutoPlaying(false)
  }

  const getBadgeConfig = (badge) => {
    switch (badge) {
      case "bestseller":
        return {
          icon: Award,
          text: "Bestseller",
          className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse",
        }
      case "trending":
        return {
          icon: TrendingUp,
          text: "Trending",
          className: "bg-gradient-to-r from-pink-500 to-red-500 text-white",
        }
      case "new":
        return {
          icon: Zap,
          text: "New",
          className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-bounce",
        }
      case "premium":
        return {
          icon: Sparkles,
          text: "Premium",
          className: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
        }
      default:
        return {
          icon: Sparkles,
          text: "Featured",
          className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
        }
    }
  }

  const onNavigate = (path) => {
    router.push(path) // Use router to navigate
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-blue-900/10" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-green-400/30 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-green-600/10 border border-green-600/20 rounded-full px-6 py-3">
            <Sparkles className="h-5 w-5 text-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">Featured Collection</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            <span className="gradient-text">Bestselling Products</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our most loved products, carefully curated based on customer reviews, effectiveness, and natural
            ingredients that deliver real results.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">50K+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">4.9★</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">98%</div>
              <div className="text-sm text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-6">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-6">
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Products Grid */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)`,
                width: `${(featuredProducts.length / visibleProducts) * 100}%`,
              }}
            >
              {featuredProducts.map((product, index) => {
                const badgeConfig = getBadgeConfig(product.badge)
                const BadgeIcon = badgeConfig.icon

                return (
                  <div key={product.id} className="px-3" style={{ width: `${100 / featuredProducts.length}%` }}>
                    <div className="relative">
                      {/* Special Badge */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge
                          className={`${badgeConfig.className} px-3 py-1 rounded-full shadow-lg font-bold text-xs`}
                        >
                          <BadgeIcon className="h-3 w-3 mr-1" />
                          {badgeConfig.text}
                        </Badge>
                      </div>

                      <ProductCard
                        product={product}
                        onAddToCart={onAddToCart}
                        onAddToWishlist={onAddToWishlist}
                        isInWishlist={wishlistItems.some((item) => item.id === product.id)}
                        onProductClick={onProductClick}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.max(1, featuredProducts.length - visibleProducts + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-green-400 w-8" : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button onClick={() => onNavigate("products")} className="btn-primary group">
            View All Products
            <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
