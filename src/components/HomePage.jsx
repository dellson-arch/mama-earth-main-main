"use client"
import { useState } from "react"
import { Shield, Star, Users, TrendingUp } from "lucide-react"
import HeroSection from "./HeroSection"
import FeaturedProducts from "./FeaturedProducts"
import CategoryGrid from "./CategoryGrid"
import NewsletterSection from "./NewsletterSection"

const HomePage = ({ onNavigate, addToCart, addToWishlist, wishlistItems = [], onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState("face-care")

  const featuredProducts = [
    {
      id: 1,
      name: "Vitamin C Face Serum with Vitamin C & Turmeric",
      price: 599,
      originalPrice: 799,
      rating: 4.8,
      reviews: 2847,
      isBestseller: true,
      category: "face-care",
      image: "/placeholder.svg?height=300&width=300&text=Vitamin+C+Serum",
      description: "Brightening serum with natural vitamin C for radiant, glowing skin",
      tags: ["Brightening", "Anti-aging"],
      benefits: ["Reduces dark spots", "Brightens complexion", "Anti-aging properties", "Natural ingredients"],
      ingredients: ["Vitamin C", "Turmeric", "Hyaluronic Acid", "Niacinamide"],
    },
    {
      id: 2,
      name: "Onion Hair Oil for Hair Regrowth & Hair Fall Control",
      price: 349,
      originalPrice: 449,
      rating: 4.6,
      reviews: 1923,
      isNew: true,
      category: "hair-care",
      image: "/placeholder.svg?height=300&width=300&text=Onion+Hair+Oil",
      description: "Nourishing hair oil with onion extract for stronger, healthier hair",
      tags: ["Hair Growth", "Natural"],
      benefits: ["Reduces hair fall", "Promotes growth", "Strengthens roots", "Natural formula"],
      ingredients: ["Onion Extract", "Coconut Oil", "Argan Oil", "Rosemary Oil"],
    },
    {
      id: 3,
      name: "Ubtan Face Wash with Turmeric & Saffron",
      price: 199,
      originalPrice: 249,
      rating: 4.7,
      reviews: 3421,
      isBestseller: true,
      category: "face-care",
      image: "/placeholder.svg?height=300&width=300&text=Ubtan+Face+Wash",
      description: "Traditional face wash with turmeric and gram flour for natural glow",
      tags: ["Cleansing", "Ayurvedic"],
      benefits: ["Deep cleansing", "Natural glow", "Removes tan", "Gentle formula"],
      ingredients: ["Turmeric", "Saffron", "Chickpea Flour", "Rose Water"],
    },
    {
      id: 4,
      name: "Aloe Vera Gel with Pure Aloe Vera & Vitamin E",
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      reviews: 3245,
      isBestseller: true,
      category: "body-care",
      image: "/placeholder.svg?height=300&width=300&text=Aloe+Vera+Gel",
      description: "Pure aloe vera gel for skin and hair with vitamin E",
      tags: ["Soothing", "Multi-purpose"],
      benefits: ["Soothes skin", "Moisturizes", "Heals minor cuts", "Multi-purpose use"],
      ingredients: ["Aloe Vera", "Vitamin E", "Glycerin", "Natural Extracts"],
    },
  ]

  const categories = [
    {
      id: "face-care",
      name: "Face Care",
      description: "Natural face wash, serums & moisturizers",
      image: "/placeholder.svg?height=200&width=200&text=Face+Care",
      products: 50,
      icon: "✨",
    },
    {
      id: "hair-care",
      name: "Hair Care",
      description: "Onion shampoos, oils & treatments",
      image: "/placeholder.svg?height=200&width=200&text=Hair+Care",
      products: 30,
      icon: "💇‍♀️",
    },
    {
      id: "body-care",
      name: "Body Care",
      description: "Body lotions, scrubs & moisturizers",
      image: "/placeholder.svg?height=200&width=200&text=Body+Care",
      products: 25,
      icon: "🧴",
    },
    {
      id: "baby-care",
      name: "Baby Care",
      description: "Gentle & safe baby products",
      image: "/placeholder.svg?height=200&width=200&text=Baby+Care",
      products: 20,
      icon: "👶",
    },
  ]

  const stats = [
    { label: "Happy Families", value: "2M+", icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Customer Rating", value: "4.8★", icon: Star, color: "from-yellow-500 to-yellow-600" },
    { label: "Toxin Free", value: "100%", icon: Shield, color: "from-green-500 to-green-600" },
    { label: "Natural Products", value: "125+", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Amazing products! My skin has never looked better. The vitamin C serum is a game-changer.",
      image: "/placeholder.svg?height=60&width=60&text=PS",
    },
    {
      name: "Rahul Gupta",
      location: "Delhi",
      rating: 5,
      comment: "The onion hair oil really works! Noticed less hair fall within 2 weeks of use.",
      image: "/placeholder.svg?height=60&width=60&text=RG",
    },
    {
      name: "Anjali Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Love the natural ingredients. Finally found products that don't irritate my sensitive skin.",
      image: "/placeholder.svg?height=60&width=60&text=AP",
    },
  ]

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <HeroSection onNavigate={onNavigate} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedProducts
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          wishlistItems={wishlistItems}
          onProductClick={onProductClick}
        />
        <CategoryGrid onNavigate={onNavigate} />
        <NewsletterSection />
      </div>
    </div>
  )
}

export default HomePage
