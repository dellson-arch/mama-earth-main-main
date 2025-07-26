"use client"
import { Card, CardContent } from "./ui/card"
import { cn } from "../lib/utils"

const categories = [
  { name: "Hair Care", icon: "/placeholder.svg?height=64&width=64", description: "Nourish your locks naturally" },
  { name: "Skin Care", icon: "/placeholder.svg?height=64&width=64", description: "Radiant skin, naturally" },
  { name: "Baby Care", icon: "/placeholder.svg?height=64&width=64", description: "Gentle care for your little ones" },
  {
    name: "Body Care",
    icon: "/placeholder.svg?height=64&width=64",
    description: "Pamper your body with nature's best",
  },
  { name: "Makeup", icon: "/placeholder.svg?height=64&width=64", description: "Beauty that's good for you" },
  { name: "Wellness", icon: "/placeholder.svg?height=64&width=64", description: "Holistic health solutions" },
]

const CategoryGrid = ({ onNavigate, onCategorySelect }) => {
  const handleCategoryClick = (categoryName) => {
    if (onCategorySelect) {
      onCategorySelect(categoryName)
    }
    onNavigate("products")
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <Card
            key={index}
            className={cn(
              "glass-effect border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer",
              "bg-gradient-to-br from-gray-800/50 to-gray-900/50",
            )}
            onClick={() => handleCategoryClick(category.name)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <img
                src={category.icon || "/placeholder.svg"}
                alt={category.name}
                className="w-20 h-20 mb-4 object-contain filter drop-shadow-lg"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">{category.name}</h3>
              <p className="text-gray-300 text-sm">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default CategoryGrid
