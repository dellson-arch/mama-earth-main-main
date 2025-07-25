"use client"

import { Heart, ShoppingCart, ArrowLeft, Trash2, Star } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

const WishlistPage = ({ wishlistItems = [], removeFromWishlist, addToCart, onProductClick }) => {
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-2xl p-8 border border-gray-700/50 animate-fade-in-up">
            <h1 className="text-3xl font-bold gradient-text mb-8">My Wishlist</h1>

            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Heart className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Your wishlist is empty</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start adding products you love to your wishlist and never lose track of them again.
              </p>
              <Button
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 btn-ripple"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-2xl p-8 border border-gray-700/50 animate-fade-in-up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">My Wishlist</h1>
              <p className="text-gray-400">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
              <Heart className="h-4 w-4 mr-1" />
              {wishlistItems.length}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((product, index) => (
              <div
                key={product.id}
                className="group glass-effect rounded-xl p-6 border border-gray-700/50 hover-lift transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4">
                  <div
                    className="aspect-square bg-gray-800/50 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => onProductClick(product)}
                  >
                    <img
                      src={product.image || "/placeholder.svg?height=200&width=200&text=Product"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Remove from wishlist button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-red-500/30"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>

                  {/* Product badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.isOrganic && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Organic</Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3
                      className="font-semibold text-white group-hover:text-green-400 transition-colors cursor-pointer line-clamp-2"
                      onClick={() => onProductClick(product)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">({product.rating || 4.0})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-400">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>

                  {/* Add to cart button */}
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 btn-ripple"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue shopping button */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800/50 px-8 py-3 rounded-xl font-medium transition-all duration-300 bg-transparent"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
