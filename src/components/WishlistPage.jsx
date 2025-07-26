"use client"

import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "./ui/Button"
import ProductCard from "./ProductCard"

const WishlistPage = ({ wishlistItems, removeFromWishlist, addToCart, onNavigate, onProductClick }) => {
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <Button
              onClick={() => onNavigate("home")}
              variant="ghost"
              className="text-gray-400 hover:text-white mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Button>
          </div>

          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
            <Heart className="h-16 w-16 text-red-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
            Your Wishlist is Empty
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start adding products you love to your wishlist and never lose track of your favorites
          </p>

          <Button
            onClick={() => onNavigate("products")}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            <Heart className="h-5 w-5 mr-2" />
            Discover Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            className="text-gray-400 hover:text-white mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Button>

          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-full text-red-400 text-sm font-medium border border-red-500/30">
                ❤️ Your Favorites
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
              My Wishlist
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {wishlistItems.length} {wishlistItems.length === 1 ? "product" : "products"} saved for later
            </p>
          </div>
        </div>

        {/* Wishlist Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => {
                wishlistItems.forEach((item) => addToCart(item))
                wishlistItems.forEach((item) => removeFromWishlist(item.id))
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>

            <Button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
                  wishlistItems.forEach((item) => removeFromWishlist(item.id))
                }
              }}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 px-6 py-3 rounded-xl transition-all duration-300"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onAddToWishlist={removeFromWishlist}
                  isInWishlist={true}
                  onProductClick={onProductClick}
                />

                {/* Remove from wishlist button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 left-3 p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg hover:scale-110"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-16">
          <Button
            onClick={() => onNavigate("products")}
            variant="outline"
            size="lg"
            className="px-12 py-4 bg-transparent border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 hover:scale-110 transition-all duration-300 rounded-2xl text-lg font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
          >
            <Heart className="h-5 w-5 mr-2" />
            Continue Shopping
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
