"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { Button } from "./ui/Button"
import { ArrowLeft, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

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
    recommendedFor: ["oily", "dry", "normal", "hair-fall"],
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
    recommendedFor: ["normal", "combination", "dullness", "dark-spots"],
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
    recommendedFor: ["oily", "combination", "acne", "pores"],
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
    recommendedFor: ["dry", "normal", "dullness", "dark-spots", "aging"],
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
    recommendedFor: ["dry", "normal", "straight", "damaged-hair"],
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
    recommendedFor: ["sensitive", "normal", "dry", "all-skin-types"],
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
    recommendedFor: ["baby"],
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
    recommendedFor: ["oily", "combination", "pores", "acne"],
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
    recommendedFor: ["dry", "curly", "damaged-hair"],
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
    recommendedFor: ["dry", "normal", "all-skin-types"],
  },
]

const RecommendationsPage = ({ onNavigate, addToCart, addToWishlist, userProfile, wishlistItems, recommendations }) => {
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState([])

  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      // If recommendations are passed from analyzer, use them
      const recommendedProductObjects = allProducts.filter((product) => recommendations.includes(product.name))
      setPersonalizedRecommendations(recommendedProductObjects)
    } else if (userProfile) {
      // Generate recommendations based on user profile if no specific recommendations are passed
      const { skinType, hairType, concerns } = userProfile
      const generated = allProducts.filter((product) => {
        const productTags = product.recommendedFor || []
        const matchesSkinType = skinType && productTags.includes(skinType)
        const matchesHairType = hairType && productTags.includes(hairType)
        const matchesConcern = concerns && concerns.some((concern) => productTags.includes(concern))

        return matchesSkinType || matchesHairType || matchesConcern
      })
      setPersonalizedRecommendations(generated)
    } else {
      // Fallback: show some popular products if no profile or specific recommendations
      setPersonalizedRecommendations(allProducts.slice(0, 4))
    }
  }, [userProfile, recommendations])

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

        <div className="text-center mb-10">
          <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Personalized Recommendations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Based on your profile and preferences, here are some products we think you'll love!
          </p>
        </div>

        {userProfile && (
          <Card className="glass-effect border border-gray-700/50 shadow-xl p-6 mb-10 max-w-2xl mx-auto">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-white">Your Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-base space-y-2">
              <p>
                <span className="font-semibold text-green-400">Skin Type:</span>{" "}
                {userProfile.skinType.charAt(0).toUpperCase() + userProfile.skinType.slice(1)}
              </p>
              <p>
                <span className="font-semibold text-green-400">Hair Type:</span>{" "}
                {userProfile.hairType.charAt(0).toUpperCase() + userProfile.hairType.slice(1)}
              </p>
              <p>
                <span className="font-semibold text-green-400">Concerns:</span>{" "}
                {userProfile.concerns.length > 0
                  ? userProfile.concerns.map((c) => c.charAt(0).toUpperCase() + c.slice(1).replace("-", " ")).join(", ")
                  : "None specified"}
              </p>
            </CardContent>
          </Card>
        )}

        {personalizedRecommendations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">
              We couldn't find specific recommendations based on your profile.
            </p>
            <p className="text-md text-gray-500 mb-6">
              Try our{" "}
              <Button variant="link" onClick={() => onNavigate("analyzer")} className="text-blue-400 p-0 h-auto">
                Skin & Hair Analyzer
              </Button>{" "}
              to get tailored suggestions, or explore all our products.
            </p>
            <Button
              onClick={() => onNavigate("products")}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full"
            >
              Explore All Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {personalizedRecommendations.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                isInWishlist={wishlistItems.some((item) => item.id === product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecommendationsPage
