"use client"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Leaf, Heart, Users, Award, ArrowLeft } from "lucide-react"

const AboutUsPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          onClick={() => onNavigate("home")}
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-white group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            About MamaEarth
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our journey began with a simple promise: to create safe, natural, and effective products for every family.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="glass-effect border border-gray-700/50 shadow-2xl p-8">
            <CardHeader className="text-center">
              <Leaf className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-4xl font-bold text-white mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-300 leading-relaxed text-center">
              <p className="mb-4">
                At MamaEarth, we are committed to crafting products that are free from harmful chemicals and toxins,
                using only the goodness of nature. We believe in transparency, sustainability, and making a positive
                impact on both people and the planet.
              </p>
              <p>
                Every product is a step towards a healthier, happier you and a greener Earth. We are Asia's first brand
                to be certified by MadeSafe™, ensuring our products are safe for you and your loved ones.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="glass-effect border border-gray-700/50 shadow-xl p-6 text-center">
              <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <CardTitle className="text-2xl font-semibold text-white mb-2">Goodness Inside</CardTitle>
              <CardContent className="text-gray-300 text-sm">
                We use natural ingredients and ensure our products are free from harmful chemicals.
              </CardContent>
            </Card>
            <Card className="glass-effect border border-gray-700/50 shadow-xl p-6 text-center">
              <Leaf className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-2xl font-semibold text-white mb-2">Planting Trees</CardTitle>
              <CardContent className="text-gray-300 text-sm">
                For every order, we plant a tree, contributing to a greener planet.
              </CardContent>
            </Card>
            <Card className="glass-effect border border-gray-700/50 shadow-xl p-6 text-center">
              <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="text-2xl font-semibold text-white mb-2">Community Focus</CardTitle>
              <CardContent className="text-gray-300 text-sm">
                Building a community that shares values of natural living and sustainability.
              </CardContent>
            </Card>
            <Card className="glass-effect border border-gray-700/50 shadow-xl p-6 text-center">
              <Award className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-2xl font-semibold text-white mb-2">Certified Safe</CardTitle>
              <CardContent className="text-gray-300 text-sm">
                Asia's first MadeSafe™ certified brand, ensuring safety and quality.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-16">
          <Card className="glass-effect border border-gray-700/50 shadow-2xl p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-white mb-4">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-300 leading-relaxed text-center">
              <p className="mb-4">
                MamaEarth was born out of a parent's love and concern for their child. When we couldn't find toxin-free
                products for our baby, we decided to create our own. What started as a personal quest soon grew into a
                mission to provide safe and natural alternatives for everyone.
              </p>
              <p className="mb-4">
                From baby care to personal care and beauty, we've expanded our range, always adhering to our core
                principles of safety, natural ingredients, and environmental responsibility. We are proud to be a brand
                that cares, not just for you, but for the planet too.
              </p>
              <p>Join us on this journey towards a healthier lifestyle and a sustainable future.</p>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            onClick={() => onNavigate("products")}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Explore Our Products
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
