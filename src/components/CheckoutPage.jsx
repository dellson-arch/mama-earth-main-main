"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

const CheckoutPage = ({ cartItems = [], onNavigate, user, total = 0, clearCart }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      clearCart()
      onNavigate("home")
    }, 3000)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-2xl p-8 border border-gray-700/50 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Order Placed Successfully! 🎉</h1>
            <p className="text-gray-400 mb-6">
              Thank you for your purchase! Your order has been confirmed and will be processed shortly.
            </p>
            <div className="glass-effect p-4 rounded-lg border border-green-500/20 mb-6">
              <p className="text-green-400 font-medium">🌳 You've planted {cartItems.length} trees with this order!</p>
            </div>
            <p className="text-sm text-gray-500">Redirecting to home page...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-8 border border-gray-700/50 animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold gradient-text">Checkout</h1>
                <Button
                  onClick={() => onNavigate("home")}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber ? "bg-green-500 text-white" : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className={`ml-2 text-sm ${step >= stepNumber ? "text-green-400" : "text-gray-400"}`}>
                      {stepNumber === 1 && "Shipping"}
                      {stepNumber === 2 && "Payment"}
                      {stepNumber === 3 && "Review"}
                    </span>
                    {stepNumber < 3 && (
                      <div className={`w-16 h-0.5 mx-4 ${step > stepNumber ? "bg-green-500" : "bg-gray-700"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-xl font-semibold text-white mb-4">Shipping Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="Enter full address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="ZIP"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 btn-ripple"
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-xl font-semibold text-white mb-4">Payment Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                      <Input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name on Card</label>
                      <Input
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                      <Input
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                      <Input
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 btn-ripple"
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-xl font-semibold text-white mb-4">Review Your Order</h2>

                  <div className="glass-effect p-6 rounded-xl border border-gray-700/50">
                    <h3 className="font-semibold text-white mb-4">Shipping Address</h3>
                    <div className="text-gray-300 space-y-1">
                      <p>
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p>{formData.address}</p>
                      <p>
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                      <p>{formData.phone}</p>
                    </div>
                  </div>

                  <div className="glass-effect p-6 rounded-xl border border-gray-700/50">
                    <h3 className="font-semibold text-white mb-4">Payment Method</h3>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">**** **** **** {formData.cardNumber.slice(-4)}</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 btn-ripple"
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 border border-gray-700/50 sticky top-24 animate-fade-in-up animate-delay-200">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image || "/placeholder.svg?height=50&width=50&text=Product"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-green-400">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>₹{Math.round(total * 0.18)}</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between text-lg font-semibold text-white">
                  <span>Total</span>
                  <span className="text-green-400">₹{Math.round(total * 1.18)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Truck className="h-4 w-4 text-green-400" />
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
