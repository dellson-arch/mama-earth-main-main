"use client"

import { Button } from "./ui/Button"
import ProductCard from "./ProductCard"

export default function FeaturedProducts({ setCurrentPage, addToCart, toggleWishlist, wishlist, onProductClick }) {
  const products = [
    {
      id: "1",
      name: "Vitamin C Face Serum",
      price: 599,
      originalPrice: 799,
      rating: 4.8,
      reviews: 2847,
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
      isNew: true,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop",
      description: "Gentle rice-based cleanser for soft and smooth skin",
      benefits: ["Gentle cleansing", "Softens skin", "Brightening", "Suitable for all skin types"],
      ingredients: ["Rice Water", "Niacinamide", "Glycerin", "Natural Extracts"],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full text-green-400 text-sm font-medium border border-green-500/30">
              ✨ Most Loved Products
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
            Bestselling Products
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our most loved natural products trusted by millions of customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={toggleWishlist}
                isInWishlist={wishlist.some((item) => item.id === product.id)}
                onProductClick={onProductClick}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="px-12 py-4 bg-transparent border-2 border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 hover:scale-110 transition-all duration-300 rounded-2xl text-lg font-semibold shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
            onClick={() => setCurrentPage("products")}
          >
            <span className="mr-2">🌿</span>
            Explore All Products
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
