"use client"
import { Badge } from "./ui/badge"

const CategoryGrid = ({ onNavigate }) => {
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

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full text-purple-400 text-sm font-medium border border-purple-500/30">
              🛍️ Shop by Category
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            Discover Your Perfect Match
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated categories of natural products designed for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onNavigate("products")}
            >
              <div className="glass-effect rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-gray-700/50 hover:border-purple-500/30">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{category.description}</p>
                <Badge
                  variant="outline"
                  className="text-purple-400 border-purple-600/50 bg-purple-600/10 group-hover:bg-purple-600/20 transition-all duration-300"
                >
                  {category.products} Products
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
