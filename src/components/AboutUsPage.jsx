"use client"

import { Leaf, Shield, Heart, Users, Factory, Globe } from "lucide-react"
import { Button } from "./ui/Button"

const AboutUsPage = ({ onNavigate }) => {
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
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
            Our Story: Nurturing Nature, Nurturing You
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            At MamaEarth, we believe in the power of nature to heal and nourish. We are committed to creating safe,
            natural, and effective products for your entire family.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="glass-effect rounded-3xl p-8 shadow-xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed text-center">
              To provide toxin-free, natural, and safe products for babies and mamas, ensuring a healthier future for
              all. We strive to make goodness a habit, one product at a time.
            </p>
          </div>
          <div className="glass-effect rounded-3xl p-8 shadow-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed text-center">
              To be the leading natural personal care brand globally, known for our commitment to safety, transparency,
              and sustainability, empowering families to make healthier choices.
            </p>
          </div>
        </section>

        {/* Key Pillars */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Our core values guide everything we do, from sourcing ingredients to delivering products to your door.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-3xl p-8 text-center shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 border border-gray-700/50 hover:border-green-500/30">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">MadeSafe Certified</h3>
              <p className="text-gray-400 leading-relaxed">
                India's first brand to be MadeSafe certified, ensuring our products are free from harmful chemicals.
              </p>
            </div>
            <div className="glass-effect rounded-3xl p-8 text-center shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/30">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Natural Ingredients</h3>
              <p className="text-gray-400 leading-relaxed">
                We use the best of nature, carefully selected for their purity and effectiveness.
              </p>
            </div>
            <div className="glass-effect rounded-3xl p-8 text-center shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-700/50 hover:border-purple-500/30">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">For the Family</h3>
              <p className="text-gray-400 leading-relaxed">
                Products designed for everyone, from newborns to adults, ensuring gentle care for all.
              </p>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="text-center mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Our Commitment to the Planet
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Every purchase with MamaEarth contributes to a greener, healthier planet.
            </p>
          </div>
          <div className="glass-effect rounded-3xl p-8 shadow-xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Factory className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Planting Goodness</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              We are proud to be a plastic-positive brand, recycling more plastic than we use. With every order, we
              plant a tree, contributing to a sustainable future.
            </p>
            <Button
              onClick={() => onNavigate("impact")}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
            >
              See Your Impact
            </Button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Join the MamaEarth Family
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Experience the difference of natural, safe, and effective products.
          </p>
          <Button
            onClick={() => onNavigate("products")}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-12 py-4 rounded-2xl shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Explore Our Products
          </Button>
        </section>
      </div>
    </div>
  )
}

export default AboutUsPage
