"use client"

import { Heart, ShoppingCart, Star } from "lucide-react"
import { Badge } from "./ui/Badge"

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist, onProductClick }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    if (onAddToWishlist) {
      onAddToWishlist(product)
    }
  }

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product)
    }
  }

  return (
    <div
      onClick={handleProductClick}
      className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
    >
      <div className="glass-effect rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 border border-gray-700/50 hover:border-green-500/30">
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-black/70 transition-all duration-300 group-hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? "text-red-500 fill-current" : "text-white"}`} />
          </button>
          {product.originalPrice && product.originalPrice > product.price && (
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
          {product.tags && (
            <div className="flex flex-wrap gap-2">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-600/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-bold text-white text-lg leading-tight group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>

          {product.description && <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>}

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
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
