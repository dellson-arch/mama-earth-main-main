"use client"

import { useState, useEffect } from "react"
import { Search, Grid, List, ChevronDown } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Badge } from "./ui/Badge"
import ProductCard from "./ProductCard"

const ProductsPage = ({ onAddToCart, onAddToWishlist, wishlistItems, searchQuery, setSearchQuery, onProductClick }) => {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState("grid")
  const [priceRange, setPriceRange] = useState("all")

  const allProducts = [
    {
      id: "1",
      name: "Vitamin C Face Serum",
      price: 599,
      originalPrice: 799,
      rating: 4.8,
      reviews: 2847,
      category: "skincare",
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      description: "Brightening serum with natural Vitamin C for glowing skin",
      benefits: ["Brightens skin", "Reduces dark spots", "Anti-aging", "Natural ingredients"],
      ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Aloe Vera"],
    },
    {
      id: "2",
      name: "Onion Hair Oil",
      price: 349,
      originalPrice: 449,
      rating: 4.6,
      reviews: 1923,
      category: "haircare",
      isNew: true,
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop",
      description: "Nourishing hair oil with onion extract for stronger hair",
      benefits: ["Reduces hair fall", "Promotes growth", "Strengthens roots", "Natural formula"],
      ingredients: ["Onion Extract", "Coconut Oil", "Argan Oil", "Rosemary"],
    },
    {
      id: "3",
      name: "Ubtan Face Wash",
      price: 199,
      originalPrice: 249,
      rating: 4.7,
      reviews: 3421,
      category: "skincare",
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      description: "Traditional ubtan formula for deep cleansing and glow",
      benefits: ["Deep cleansing", "Natural glow", "Removes tan", "Gentle formula"],
      ingredients: ["Turmeric", "Chickpea Flour", "Sandalwood", "Rose Water"],
    },
    {
      id: "4",
      name: "Rice Face Wash",
      price: 199,
      originalPrice: 249,
      rating: 4.5,
      reviews: 1567,
      category: "skincare",
      isNew: true,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop",
      description: "Gentle rice-based cleanser for soft and smooth skin",
      benefits: ["Gentle cleansing", "Softens skin", "Brightening", "Suitable for all skin types"],
      ingredients: ["Rice Water", "Niacinamide", "Glycerin", "Natural Extracts"],
    },
    {
      id: "5",
      name: "Argan Hair Mask",
      price: 449,
      originalPrice: 599,
      rating: 4.4,
      reviews: 1234,
      category: "haircare",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
      description: "Deep conditioning mask with argan oil for damaged hair",
      benefits: ["Deep conditioning", "Repairs damage", "Adds shine", "Strengthens hair"],
      ingredients: ["Argan Oil", "Keratin", "Shea Butter", "Vitamin E"],
    },
    {
      id: "6",
      name: "Tea Tree Face Wash",
      price: 249,
      originalPrice: 299,
      rating: 4.3,
      reviews: 987,
      category: "skincare",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
      description: "Purifying face wash with tea tree oil for acne-prone skin",
      benefits: ["Controls acne", "Purifies skin", "Reduces oiliness", "Natural antibacterial"],
      ingredients: ["Tea Tree Oil", "Salicylic Acid", "Neem", "Aloe Vera"],
    },
    {
      id: "7",
      name: "Coconut Body Lotion",
      price: 299,
      originalPrice: 399,
      rating: 4.6,
      reviews: 2156,
      category: "bodycare",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop",
      description: "Moisturizing body lotion with coconut oil for soft skin",
      benefits: ["Deep moisturizing", "Long-lasting hydration", "Natural fragrance", "Non-greasy"],
      ingredients: ["Coconut Oil", "Shea Butter", "Glycerin", "Vitamin E"],
    },
    {
      id: "8",
      name: "Charcoal Face Mask",
      price: 199,
      originalPrice: 249,
      rating: 4.2,
      reviews: 876,
      category: "skincare",
      image: "https://images.unsplash.com/photo-1556228720-da4ac2b4d50b?w=300&h=300&fit=crop",
      description: "Detoxifying charcoal mask for deep pore cleansing",
      benefits: ["Deep cleansing", "Removes blackheads", "Detoxifies", "Minimizes pores"],
      ingredients: ["Activated Charcoal", "Bentonite Clay", "Tea Tree Oil", "Witch Hazel"],
    },
  ]

  const categories = [
    { id: "all", name: "All Products", count: allProducts.length },
    { id: "skincare", name: "Skincare", count: allProducts.filter((p) => p.category === "skincare").length },
    { id: "haircare", name: "Haircare", count: allProducts.filter((p) => p.category === "haircare").length },
    { id: "bodycare", name: "Bodycare", count: allProducts.filter((p) => p.category === "bodycare").length },
  ]

  useEffect(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by price range
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-200":
          filtered = filtered.filter((product) => product.price < 200)
          break
        case "200-500":
          filtered = filtered.filter((product) => product.price >= 200 && product.price <= 500)
          break
        case "above-500":
          filtered = filtered.filter((product) => product.price > 500)
          break
      }
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchQuery, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
            Natural Products
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our complete range of natural and organic beauty products
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-400 transition-colors duration-300" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-2xl backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/25"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                {category.name}
                <Badge className="ml-2 bg-white/20 text-xs">{category.count}</Badge>
              </button>
            ))}
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="appearance-none bg-gray-800/50 border border-gray-700/50 text-white px-4 py-2 pr-8 rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
                >
                  <option value="all">All Prices</option>
                  <option value="under-200">Under ₹200</option>
                  <option value="200-500">₹200 - ₹500</option>
                  <option value="above-500">Above ₹500</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-800/50 border border-gray-700/50 text-white px-4 py-2 pr-8 rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid" ? "bg-green-600 text-white" : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list" ? "bg-green-600 text-white" : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-400 text-center">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                isInWishlist={wishlistItems.some((item) => item.id === product.id)}
                onProductClick={onProductClick}
              />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setPriceRange("all")
              }}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
