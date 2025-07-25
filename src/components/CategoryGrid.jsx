"use client"

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/Badge"

export default function CategoryGrid({ onNavigate }) {
  const categories = [
    {
      id: "skincare",
      name: "Face Care",
      description: "Natural face wash, serums & moisturizers",
      count: "50+ Products",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=64&h=64&fit=crop",
    },
    {
      id: "haircare",
      name: "Hair Care",
      description: "Onion shampoos, oils & treatments",
      count: "30+ Products",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=64&h=64&fit=crop",
    },
    {
      id: "bodycare",
      name: "Body Care",
      description: "Body lotions, scrubs & body wash",
      count: "25+ Products",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop",
    },
    {
      id: "babycare",
      name: "Baby Care",
      description: "Gentle & safe products for babies",
      count: "40+ Products",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=64&h=64&fit=crop",
    },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Shop by Category</h2>
          <p className="text-lg text-gray-400">Discover natural products for every need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-all duration-300 bg-gray-800 border-gray-700 hover:border-green-500/50 hover:scale-105 group"
              onClick={() => onNavigate("products")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-green-500/10 p-1 group-hover:bg-green-500/20 transition-colors">
                  <div className="w-full h-full rounded-xl bg-gray-800 flex items-center justify-center">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{category.description}</p>
                <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                  {category.count}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
