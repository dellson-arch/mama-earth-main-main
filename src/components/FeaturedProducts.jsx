"use client"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/Button"
import { ShoppingCart, Heart } from "lucide-react"
import { cn } from "../lib/utils"

const featuredProducts = [
  {
    id: 1,
    name: "Onion Hair Oil",
    image: "/placeholder.svg?height=200&width=200",
    price: 399,
    rating: 4.5,
    reviews: 1200,
    category: "Hair Care",
    description: "Reduces hair fall and promotes hair growth. Enriched with Onion & Redensyl.",
  },
  {
    id: 2,
    name: "Ubtan Face Wash",
    image: "/placeholder.svg?height=200&width=200",
    price: 249,
    rating: 4.7,
    reviews: 1500,
    category: "Skin Care",
    description: "For tan removal and glowing skin. Contains Turmeric & Saffron.",
  },
  {
    id: 3,
    name: "Tea Tree Face Serum",
    image: "/placeholder.svg?height=200&width=200",
    price: 499,
    rating: 4.3,
    reviews: 900,
    category: "Skin Care",
    description: "Controls acne and pimples. With Tea Tree & Salicylic Acid.",
  },
  {
    id: 4,
    name: "Vitamin C Daily Glow Face Cream",
    image: "/placeholder.svg?height=200&width=200",
    price: 349,
    rating: 4.6,
    reviews: 1100,
    category: "Skin Care",
    description: "For radiant skin and even tone. Infused with Vitamin C & Turmeric.",
  },
]

const FeaturedProducts = ({ addToCart, addToWishlist, wishlistItems, onProductClick }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Our Bestsellers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {featuredProducts.map((product) => {
          const isInWishlist = wishlistItems.some((item) => item.id === product.id)
          return (
            <Card
              key={product.id}
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
        })}
      </div>
    </section>
  )
}

export default FeaturedProducts
