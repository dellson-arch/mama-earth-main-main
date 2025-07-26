"use client"

import { X, Star, ShoppingCart, Heart, CheckCircle } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const ProductDetailModal = ({ isOpen, onClose, product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <Card className="w-full max-w-3xl bg-gray-900/95 border-gray-700/50 text-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        <CardHeader className="p-0 lg:w-1/2 relative">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 lg:h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
          {product.originalPrice > product.price && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          {product.isBestseller && (
            <Badge className="absolute bottom-4 left-4 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
              Bestseller
            </Badge>
          )}
          {product.isNew && (
            <Badge className="absolute bottom-4 left-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
              New
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-6 lg:w-1/2 space-y-4 custom-scrollbar overflow-y-auto">
          <CardTitle className="text-3xl font-bold text-white">{product.name}</CardTitle>
          <p className="text-gray-300 text-lg">{product.description}</p>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-lg text-white ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="text-md text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-4xl font-bold text-green-400">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          {product.benefits && product.benefits.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">Key Benefits:</h4>
              <ul className="space-y-1 text-gray-300">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">Ingredients:</h4>
              <p className="text-gray-300">{product.ingredients.join(", ")}</p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </Button>
            <Button
              onClick={() => onAddToWishlist(product)}
              variant="outline"
              className={`flex-1 border-2 ${
                isInWishlist
                  ? "border-red-500 text-red-500 hover:bg-red-500/10"
                  : "border-gray-600 text-gray-300 hover:border-white/50 hover:bg-white/10"
              } font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
              <span>{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetailModal
