"use client"

import { useState } from "react"
import { X, Heart, ShoppingCart, Star, Plus, Minus, Shield, Leaf, Award, Truck } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

const ProductDetailModal = ({ isOpen, onClose, product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!isOpen || !product) return null

  const productImages = [product.image, product.image, product.image, product.image]

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity)
    }
  }

  const handleWishlistToggle = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-gray-800/50">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.originalPrice > product.price && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
              {product.isBestseller && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
                  Bestseller
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? "border-green-500" : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-white ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-green-400">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="text-green-400 font-semibold">Save ₹{product.originalPrice - product.price}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>

            {/* Benefits */}
            {product.benefits && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Key Benefits</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-600/30"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Leaf className="h-5 w-5 text-green-400" />
                <span className="text-sm">100% Natural</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Dermatologically Tested</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Award className="h-5 w-5 text-purple-400" />
                <span className="text-sm">Award Winning</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Truck className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Free Shipping</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300"
                >
                  <Minus className="h-4 w-4 text-white" />
                </button>
                <span className="w-12 text-center text-white font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300"
                >
                  <Plus className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ₹{product.price * quantity}
              </Button>

              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  isInWishlist
                    ? "border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    : "border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10"
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-800/50 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Free shipping on orders above ₹399</span>
                <span className="text-green-400 font-medium">✓ Eligible</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Expected delivery</span>
                <span className="text-white font-medium">3-5 business days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Return policy</span>
                <span className="text-white font-medium">30 days easy return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
