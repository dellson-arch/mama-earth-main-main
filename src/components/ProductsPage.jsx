"use client"

import { useState, useMemo } from "react"
import { Grid, List, Search, Star, Heart, ShoppingCart, SlidersHorizontal, X } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Badge } from "./ui/Badge"
import { allProducts, productCategories, getCategoryStats } from "../data/product"

const ProductsPage = ({
  onAddToCart,
  onAddToWishlist,
  wishlistItems = [],
  searchQuery = "",
  setSearchQuery,
  onProductClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [selectedBenefits, setSelectedBenefits] = useState([])

  const categoryStats = getCategoryStats()

  const categories = [
    { id: "all", name: "All Products", count: categoryStats.all },
    ...Object.entries(productCategories).map(([id, name]) => ({
      id,
      name,
      count: categoryStats[id] || 0,
    })),
  ]

  // Get all unique benefits for filtering
  const allBenefits = [...new Set(allProducts.flatMap((product) => product.benefits || []))]

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          product.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query)),
      )
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter((product) => product.rating >= selectedRating)
    }

    // Filter by benefits
    if (selectedBenefits.length > 0) {
      filtered = filtered.filter((product) => selectedBenefits.some((benefit) => product.benefits?.includes(benefit)))
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
        filtered.sort((a, b) => b.id - a.id)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // popularity
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    return filtered
  }, [selectedCategory, searchQuery, priceRange, sortBy, selectedRating, selectedBenefits])

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  const handleAddToWishlist = (product) => {
    if (onAddToWishlist) {
      onAddToWishlist(product)
    }
  }

  const clearAllFilters = () => {
    setSelectedCategory("all")
    setPriceRange([0, 2000])
    setSelectedRating(0)
    setSelectedBenefits([])
    if (setSearchQuery) setSearchQuery("")
  }

  const toggleBenefit = (benefit) => {
    setSelectedBenefits((prev) => (prev.includes(benefit) ? prev.filter((b) => b !== benefit) : [...prev, benefit]))
  }

  const ProductCard = ({ product }) => (
    <div
      className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
      onClick={() => onProductClick(product)}
    >
      <div className="glass-effect rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 border border-gray-700/50 hover:border-green-500/30 h-full flex flex-col">
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.originalPrice > product.price && (
              <Badge className="bg-red-600 text-white text-xs">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
            {product.isBestseller && <Badge className="bg-yellow-600 text-white text-xs">Bestseller</Badge>}
            {product.isNew && <Badge className="bg-blue-600 text-white text-xs">New</Badge>}
            {!product.inStock && <Badge className="bg-gray-600 text-white text-xs">Out of Stock</Badge>}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAddToWishlist(product)
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isInWishlist(product.id)
                ? "bg-red-500 text-white"
                : "bg-black/50 backdrop-blur-sm text-white hover:bg-red-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-3">
          <h3 className="font-bold text-white text-lg line-clamp-2 group-hover:text-green-400 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">({product.rating})</span>
            <span className="text-xs text-gray-500">• {product.reviews} reviews</span>
          </div>

          <p className="text-sm text-gray-400 line-clamp-2 flex-1">{product.description}</p>

          <div className="flex flex-wrap gap-1">
            {product.benefits?.slice(0, 2).map((benefit, index) => (
              <Badge key={index} className="text-xs bg-green-600/20 text-green-400 border-green-600/30">
                {benefit}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <Badge className="bg-green-600 text-white text-xs">Free Shipping</Badge>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleAddToCart(product)
            }}
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Products</h1>
          <p className="text-xl text-gray-400">Discover our complete range of natural beauty products</p>
          {searchQuery && (
            <div className="mt-4 flex items-center space-x-2">
              <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Search: "{searchQuery}"</Badge>
              <span className="text-gray-400">({filteredProducts.length} products found)</span>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="glass-effect p-6 rounded-2xl border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white text-lg">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-400 hover:text-white">
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-xs opacity-75">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-20 bg-gray-800/50 border-gray-700 text-white text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 2000])}
                      className="w-20 bg-gray-800/50 border-gray-700 text-white text-sm"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      [0, 300],
                      [300, 600],
                      [600, 1000],
                      [1000, 2000],
                    ].map(([min, max]) => (
                      <Button
                        key={`${min}-${max}`}
                        variant="outline"
                        size="sm"
                        onClick={() => setPriceRange([min, max])}
                        className="text-xs text-gray-300 border-gray-700 hover:bg-gray-800"
                      >
                        ₹{min}-{max}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                      className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors ${
                        selectedRating === rating ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">& up</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Benefits Filter */}
              <div>
                <h4 className="font-semibold text-white mb-3">Benefits</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {allBenefits.map((benefit) => (
                    <button
                      key={benefit}
                      onClick={() => toggleBenefit(benefit)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        selectedBenefits.includes(benefit)
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:bg-gray-800/50"
                      }`}
                    >
                      {benefit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-300 border-gray-700 hover:bg-gray-800"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-gray-300 font-medium">{filteredProducts.length} products found</span>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800/50 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="name">Name: A to Z</option>
                </select>

                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-green-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-green-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "all" || selectedRating > 0 || selectedBenefits.length > 0 || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory !== "all" && (
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30 flex items-center gap-1">
                    Category: {productCategories[selectedCategory]}
                    <button onClick={() => setSelectedCategory("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedRating > 0 && (
                  <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 flex items-center gap-1">
                    {selectedRating}+ Stars
                    <button onClick={() => setSelectedRating(0)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedBenefits.map((benefit) => (
                  <Badge
                    key={benefit}
                    className="bg-blue-600/20 text-blue-400 border-blue-600/30 flex items-center gap-1"
                  >
                    {benefit}
                    <button onClick={() => toggleBenefit(benefit)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters} className="bg-green-600 hover:bg-green-700">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
