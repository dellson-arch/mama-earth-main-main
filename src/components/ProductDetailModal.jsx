"use client"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { X, ShoppingCart, Heart, Star } from "lucide-react"
import { cn } from "../lib/utils"

const ProductDetailModal = ({ isOpen, onClose, product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    onAddToCart(product)
    onClose() // Close modal after adding to cart
  }

  const handleAddToWishlist = () => {
    onAddToWishlist(product)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <Card className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-effect border border-gray-700/50 shadow-2xl rounded-2xl flex flex-col animate-scaleIn">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-700/50">
          <CardTitle className="text-2xl font-bold text-white">{product.name}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-800/50 rounded-xl p-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="max-h-80 object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                <p className="text-gray-300 text-lg mb-4">{product.description}</p>

                <div className="flex items-center mb-4">
                  <span className="text-yellow-400 text-xl font-bold mr-2 flex items-center">
                    {product.rating} <Star className="h-5 w-5 ml-1 fill-yellow-400" />
                  </span>
                  <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                </div>

                <p className="text-3xl font-bold text-green-400 mb-6">₹{product.price}</p>

                {/* Key Features/Benefits */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Key Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Reduces hair fall and promotes growth</li>
                    <li>Made with natural ingredients</li>
                    <li>Dermatologically tested</li>
                    <li>Free from harmful chemicals</li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 mt-6">
                <Button
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300 font-semibold py-3 rounded-xl shadow-lg shadow-green-500/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center",
                    isInWishlist && "border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300",
                  )}
                  onClick={handleAddToWishlist}
                >
                  <Heart className={cn("h-5 w-5 mr-2", isInWishlist && "fill-red-500")} />
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetailModal
