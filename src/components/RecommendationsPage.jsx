"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/Button"
import ProductCard from "./ProductCard"
import { Sparkles } from "lucide-react"

const RecommendationsPage = ({
  onNavigate,
  addToCart,
  addToWishlist,
  userProfile,
  wishlistItems,
  recommendations: initialRecommendations,
}) => {
  const [recommendations, setRecommendations] = useState(initialRecommendations)

  // Fallback products if no specific recommendations are provided
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

  useEffect(() => {
    if (initialRecommendations && initialRecommendations.length > 0) {
      setRecommendations(initialRecommendations)
    } else if (userProfile) {
      // Generate recommendations based on user profile if available
      const generated = allProducts
        .filter((product) => {
          if (userProfile.skinType === "oily" && product.name.includes("Tea Tree")) return true
          if (userProfile.skinType === "dry" && product.name.includes("Coconut Body Lotion")) return true
          if (userProfile.hairType === "oily" && product.name.includes("Onion Hair Oil")) return true
          if (userProfile.hairType === "dry" && product.name.includes("Argan Hair Mask")) return true
          if (userProfile.concerns.includes("acne") && product.name.includes("Tea Tree")) return true
          if (userProfile.concerns.includes("dullness") && product.name.includes("Vitamin C")) return true
          if (userProfile.concerns.includes("hair fall") && product.name.includes("Onion Hair Oil")) return true
          return false
        })
        .slice(0, 4) // Limit to 4 recommendations
      setRecommendations(generated.length > 0 ? generated : allProducts.slice(0, 4)) // Fallback to general bestsellers
    } else {
      setRecommendations(allProducts.slice(0, 4)) // Default to bestsellers if no profile
    }
  }, [userProfile, initialRecommendations])

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
            Your Personalized Recommendations
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Based on your profile, here are the best products for you!
          </p>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recommendations.map((product, index) => (
              <div
                key={product.id}
                className="transform transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onAddToWishlist={addToWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No specific recommendations yet</h3>
            <p className="text-gray-400 mb-6">
              Complete our Skin & Hair Analyzer to get personalized product suggestions!
            </p>
            <Button
              onClick={() => onNavigate("analyzer")}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
            >
              Go to Analyzer
            </Button>
          </div>
        )}

        <div className="text-center mt-16">
          <Button
            onClick={() => onNavigate("products")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-12 py-4 rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Browse All Products
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RecommendationsPage
