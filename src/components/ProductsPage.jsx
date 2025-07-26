"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { Input } from "./ui/Input"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "./ui/Button"
import { cn } from "../lib/utils"

const allProducts = [
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
  {
    id: 5,
    name: "Rice Water Shampoo",
    image: "/placeholder.svg?height=200&width=200",
    price: 349,
    rating: 4.4,
    reviews: 850,
    category: "Hair Care",
    description: "Improves hair elasticity and strength. With Rice Water & Keratin.",
  },
  {
    id: 6,
    name: "Aloe Vera Gel",
    image: "/placeholder.svg?height=200&width=200",
    price: 199,
    rating: 4.8,
    reviews: 2000,
    category: "Skin Care",
    description: "Soothing and hydrating for skin and hair. Pure Aloe Vera.",
  },
  {
    id: 7,
    name: "Milky Soft Baby Lotion",
    image: "/placeholder.svg?height=200&width=200",
    price: 299,
    rating: 4.9,
    reviews: 1800,
    category: "Baby Care",
    description: "Gentle moisturization for baby's delicate skin. Milk & Oats.",
  },
  {
    id: 8,
    name: "Charcoal Face Mask",
    image: "/placeholder.svg?height=200&width=200",
    price: 399,
    rating: 4.2,
    reviews: 750,
    category: "Skin Care",
    description: "Detoxifies skin and removes impurities. Activated Charcoal & Coffee.",
  },
  {
    id: 9,
    name: "Argan Hair Mask",
    image: "/placeholder.svg?height=200&width=200",
    price: 599,
    rating: 4.6,
    reviews: 600,
    category: "Hair Care",
    description: "Deep conditioning for frizzy and damaged hair. Argan Oil & Milk Protein.",
  },
  {
    id: 10,
    name: "CoCo Body Lotion",
    image: "/placeholder.svg?height=200&width=200",
    price: 279,
    rating: 4.5,
    reviews: 950,
    category: "Body Care",
    description: "Intense moisturization with the goodness of Coffee & Cocoa.",
  },
]

const categories = ["All", "Hair Care", "Skin Care", "Baby Care", "Body Care", "Makeup", "Wellness"]
const sortByOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Rating"]

const ProductsPage = ({ onAddToCart, onAddToWishlist, wishlistItems, searchQuery, setSearchQuery, onProductClick }) => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Relevance")
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  useEffect(() => {
    let products = [...allProducts]

    // Filter by search query
    if (searchQuery) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      products = products.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "Price: Low to High":
        products.sort((a, b) => a.price - b.price)
        break
      case "Price: High to Low":
        products.sort((a, b) => b.price - a.price)
        break
      case "Rating":
        products.sort((a, b) => b.rating - a.rating)
        break
      case "Relevance":
      default:
        // No specific sort, maintain original order or a default relevance
        break
    }

    setFilteredProducts(products)
  }, [searchQuery, selectedCategory, sortBy])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Our Products
        </h1>

        {/* Search and Filter/Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-2xl backdrop-blur-sm"
            />
          </div>

          <div className="flex space-x-4">
            {/* Category Filter (Desktop) */}
            <div className="hidden md:flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    selectedCategory === category
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-800/50 border border-gray-700/50 text-white py-3 pl-4 pr-10 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-green-500/20 transition-all duration-300 cursor-pointer"
              >
                {sortByOptions.map((option) => (
                  <option key={option} value={option}>
                    Sort by: {option}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {isFilterPanelOpen && (
          <div className="md:hidden bg-gray-900/90 backdrop-blur-md rounded-xl p-4 mb-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-sm font-medium",
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
              onClick={() => setIsFilterPanelOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSortBy("Relevance")
              }}
              className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={onAddToCart}
                addToWishlist={onAddToWishlist}
                isInWishlist={wishlistItems.some((item) => item.id === product.id)}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
