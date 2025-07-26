"use client"
import ProductCard from "./ProductCard"
import { Button } from "./ui/Button"
import { Heart, ArrowLeft, ShoppingCart } from "lucide-react"

const WishlistPage = ({ wishlistItems, removeFromWishlist, addToCart, onNavigate, onProductClick }) => {
  const handleAddToWishlistToggle = (product) => {
    // This function is passed to ProductCard, it should toggle wishlist status
    // For wishlist page, it means removing from wishlist if already there
    removeFromWishlist(product.id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          onClick={() => onNavigate("home")}
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-white group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
          Your Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 text-center">
            <Heart className="h-24 w-24 mb-4 opacity-30" />
            <p className="text-xl font-semibold mb-2">Your wishlist is empty!</p>
            <p className="text-md mb-6">Looks like you haven't added any products to your wishlist yet.</p>
            <Button
              onClick={() => onNavigate("products")}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Start Browsing Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                addToWishlist={handleAddToWishlistToggle} // Pass the toggle function
                isInWishlist={true} // Always true for items on wishlist page
                onProductClick={onProductClick}
              />
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate("products")}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" /> Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
