"use client"

import { useState } from "react"
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, Leaf, Plus, Minus, Share2, Eye } from 'lucide-react'
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { Card, CardContent, CardHeader } from "./ui/card"

const ProductDetailPage = ({ product, onNavigate, onGoBack, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
            <Button onClick={() => onNavigate("products")} className="bg-green-600 hover:bg-green-700">
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Mock additional product data
  const productImages = [
    product.image,
    "/placeholder.svg?height=400&width=400&text=Product+Image+2",
    "/placeholder.svg?height=400&width=400&text=Product+Image+3",
    "/placeholder.svg?height=400&width=400&text=Product+Image+4",
  ]

  const productDetails = {
    ...product,
    fullDescription: `Experience the power of nature with our ${product.name}. This carefully crafted formula combines the finest natural ingredients to deliver exceptional results for your skin and hair care needs. Our commitment to toxin-free, safe products ensures you get the best of nature without any harmful chemicals.`,
    keyIngredients: product.ingredients || ["Natural Extract", "Vitamin E", "Aloe Vera", "Essential Oils"],
    benefits: product.benefits || ["Nourishing", "Gentle", "Effective", "Natural"],
    howToUse: [
      "Cleanse your face/hair with lukewarm water",
      "Apply a small amount of the product",
      "Gently massage in circular motions",
      "Leave for 2-3 minutes if required",
      "Rinse thoroughly with water",
      "Use twice daily for best results",
    ],
    specifications: {
      "Product Type": product.category || "Skincare",
      "Skin Type": "All Skin Types",
      Volume: "100ml",
      "Shelf Life": "24 months",
      "Country of Origin": "India",
      Manufacturer: "MamaEarth",
    },
  }

  const relatedProducts = [
    {
      id: "related1",
      name: "Tea Tree Face Wash",
      price: 299,
      originalPrice: 399,
      image: "/pimple.jpg",
      rating: 4.5,
      reviews: 1250,
    },
    {
      id: "related2",
      name: "Aloe Vera Gel",
      price: 249,
      originalPrice: 349,
      image: "/alovera.jpg",
      rating: 4.7,
      reviews: 890,
    },
    {
      id: "related3",
      name: "Vitamin C Moisturizer",
      price: 549,
      originalPrice: 699,
      image: "/vitaminc.jpg",
      rating: 4.6,
      reviews: 567,
    },
  ]

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <button onClick={() => onNavigate("home")} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate("products")} className="hover:text-white transition-colors">
            Products
          </button>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-gray-800">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white text-lg px-3 py-1">
                  {discountPercentage}% OFF
                </Badge>
              )}
              <button
                onClick={() => onAddToWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
                  isInWishlist ? "bg-red-500 text-white" : "bg-white/20 backdrop-blur-sm text-white hover:bg-red-500"
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-green-500" : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-current" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-300">({product.rating || 4.5})</span>
                <span className="text-gray-500">• {product.reviews || 1000} reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-white">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {discountPercentage > 0 && <Badge className="bg-green-600 text-white">Save {discountPercentage}%</Badge>}
            </div>

            {/* Key Benefits */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Key Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {productDetails.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-700 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-800 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4 text-gray-300" />
                  </button>
                  <span className="px-4 py-2 text-white font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-800 transition-colors"
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4 text-gray-300" />
                  </button>
                </div>
                <span className="text-gray-400">Max 10 per order</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-semibold"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ₹{product.price * quantity}
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Compare
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Truck className="h-5 w-5 text-green-400" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm">Safe & Tested</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Leaf className="h-5 w-5 text-green-400" />
                <span className="text-sm">100% Natural</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="glass-effect border-gray-700 mb-12">
          <CardHeader>
            <div className="flex space-x-8 border-b border-gray-700">
              {["description", "ingredients", "howToUse", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-sm font-medium transition-colors ${
                    activeTab === tab ? "text-green-400 border-b-2 border-green-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "description" && "Description"}
                  {tab === "ingredients" && "Ingredients"}
                  {tab === "howToUse" && "How to Use"}
                  {tab === "specifications" && "Specifications"}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">{productDetails.fullDescription}</p>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Key Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productDetails.keyIngredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "howToUse" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">How to Use</h3>
                <ol className="space-y-3">
                  {productDetails.howToUse.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(productDetails.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Related Products */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="glass-effect border-gray-700 hover:border-green-500/50 transition-all cursor-pointer"
              >
                <CardContent className="p-4">
                  <img
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(relatedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">({relatedProduct.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-white">₹{relatedProduct.price}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{relatedProduct.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
