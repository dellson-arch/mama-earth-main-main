"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { CheckCircle, Truck, CreditCard, Package } from "lucide-react"

const CheckoutPage = ({ cartItems, onNavigate, user, total, clearCart }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "card",
  })
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order processing
    console.log("Order placed:", formData, cartItems)
    setIsOrderPlaced(true)
    clearCart() // Clear cart after successful order
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl text-center p-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6 animate-bounce" />
          <CardTitle className="text-3xl font-bold mb-4">Order Placed Successfully!</CardTitle>
          <p className="text-gray-300 mb-6">Thank you for your purchase. Your order will be shipped soon.</p>
          <Button
            onClick={() => onNavigate("home")}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
          >
            Continue Shopping
          </Button>
        </Card>
      </div>
    )
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Complete your purchase and get ready for natural goodness!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <Card className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center text-white">
                <Truck className="h-6 w-6 mr-2 text-green-400" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-300 text-sm font-medium mb-2">
                    Address
                  </label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-gray-300 text-sm font-medium mb-2">
                      City
                    </label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Anytown"
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-gray-300 text-sm font-medium mb-2">
                      Zip Code
                    </label>
                    <Input
                      id="zip"
                      name="zip"
                      type="text"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="12345"
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary & Payment */}
          <div className="space-y-8">
            <Card className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center text-white">
                  <Package className="h-6 w-6 mr-2 text-blue-400" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-gray-300">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700/50 pt-4 flex justify-between items-center text-white text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center text-white">
                  <CreditCard className="h-6 w-6 mr-2 text-purple-400" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 bg-gray-700"
                    />
                    <label htmlFor="card" className="ml-3 text-gray-300">
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 bg-gray-700"
                    />
                    <label htmlFor="upi" className="ml-3 text-gray-300">
                      UPI
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 bg-gray-700"
                    />
                    <label htmlFor="cod" className="ml-3 text-gray-300">
                      Cash on Delivery
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 text-lg"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
