"use client"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/Button"
import { ShoppingCart, Heart } from "lucide-react"
import { cn } from "../lib/utils"

const ProductCard = ({ product, addToCart, addToWishlist, isInWishlist, onProductClick }) => {
  return (
    <Card
      className={cn(
        "glass-effect border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2",
        "bg-gradient-to-br from-gray-800/50 to-gray-900/50",
      )}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div
          className="relative w-full h-48 flex items-center justify-center cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-gray-300 hover:text-red-400 transition-colors duration-300",
              isInWishlist && "text-red-500 hover:text-red-400",
            )}
            onClick={(e) => {
              e.stopPropagation() // Prevent card click
              addToWishlist(product)
            }}
          >
            <Heart className={cn("h-5 w-5", isInWishlist && "fill-red-500")} />
          </Button>
        </div>
        <h3
          className="text-xl font-semibold text-white mt-4 mb-2 cursor-pointer hover:text-green-400 transition-colors duration-300"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-lg font-bold mr-2">{product.rating} ★</span>
          <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
        </div>
        <p className="text-2xl font-bold text-green-400 mb-4">₹{product.price}</p>
        <Button
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard
