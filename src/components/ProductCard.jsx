"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star, Eye, Zap, Sparkles } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist, onProductClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    onAddToCart(product)
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    onAddToWishlist(product)
  }

  const handleProductClick = () => {
    onProductClick(product)
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      className={`group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-500/50 ${
        isHovered ? "transform-gpu" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float transition-all duration-1000" />
        <div className="absolute top-8 right-6 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float animation-delay-300 transition-all duration-1000" />
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float animation-delay-500 transition-all duration-1000" />
      </div>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            -{discountPercentage}%
          </Badge>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
          isInWishlist
            ? "bg-red-500/80 text-white shadow-lg shadow-red-500/25"
            : "bg-white/10 text-gray-300 hover:bg-red-500/80 hover:text-white hover:shadow-lg hover:shadow-red-500/25"
        }`}
      >
        <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg?height=300&width=300&text=" + encodeURIComponent(product.name)}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Loading Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer" />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex space-x-3">
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-green-600/90 hover:bg-green-500 text-white backdrop-blur-sm shadow-lg hover:shadow-green-500/25 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleProductClick}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </div>
        </div>

        {/* Premium Badge */}
        {product.isPremium && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-3 py-1 rounded-full shadow-lg">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Category */}
        <div className="flex items-center justify-between">
          <Badge className="bg-green-600/20 text-green-400 border border-green-600/30 text-xs">
            {product.category}
          </Badge>
          {product.isNew && (
            <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30 text-xs animate-pulse">
              <Zap className="h-3 w-3 mr-1" />
              New
            </Badge>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">
            {product.rating} ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Free Delivery</div>
            <div className="text-xs text-green-400">In Stock</div>
          </div>
        </div>

        {/* Key Benefits */}
        {product.benefits && (
          <div className="flex flex-wrap gap-1">
            {product.benefits.slice(0, 2).map((benefit, index) => (
              <Badge key={index} className="bg-gray-700/50 text-gray-300 text-xs border border-gray-600/50">
                {benefit}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 group-hover:scale-105"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  )
}

export default ProductCard
