"use client"

import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { Sparkles, ArrowRight } from "lucide-react"

export default function HeroSection({ setCurrentPage }) {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Badge className="mb-6 bg-green-100 text-green-800">
              <Sparkles className="h-4 w-4 mr-2" />
              100% Natural & Safe
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Natural Beauty,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                {" "}
                Made Safe
              </span>
            </h1>

            <p className="text-xl mb-8 leading-relaxed text-gray-300">
              Discover the goodness of nature with MamaEarth's range of toxin-free, natural products for you and your
              family.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
                onClick={() => setCurrentPage("products")}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                onClick={() => setCurrentPage("products")}
              >
                Browse All
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-white">2M+</div>
                <div className="text-sm text-gray-400">Happy Families</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.8★</div>
                <div className="text-sm text-gray-400">Customer Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Toxin Free</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-3xl p-8 backdrop-blur-sm border border-green-500/30">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=600&fit=crop"
                alt="Natural skincare products"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
