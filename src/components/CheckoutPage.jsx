"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ArrowLeft, ShoppingBag, MapPin, CreditCard, CheckCircle, Loader2 } from "lucide-react"

const CheckoutPage = ({ cartItems, onNavigate, user, total, clearCart }) => {
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod") // 'cod' or 'card'
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setShippingAddress((prev) => ({ ...prev, fullName: user.name || "" }))
    }
  }, [user])

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCardChange = (e) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!shippingAddress.fullName) newErrors.fullName = "Full Name is required"
    if (!shippingAddress.addressLine1) newErrors.addressLine1 = "Address Line 1 is required"
    if (!shippingAddress.city) newErrors.city = "City is required"
    if (!shippingAddress.state) newErrors.state = "State is required"
    if (!shippingAddress.zipCode) newErrors.zipCode = "Zip Code is required"

    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !/^\d{16}$/.test(cardDetails.cardNumber))
        newErrors.cardNumber = "Valid 16-digit card number is required"
      if (!cardDetails.cardName) newErrors.cardName = "Card Name is required"
      if (!cardDetails.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate))
        newErrors.expiryDate = "Valid MM/YY is required"
      if (!cardDetails.cvv || !/^\d{3,4}$/.test(cardDetails.cvv)) newErrors.cvv = "Valid 3 or 4 digit CVV is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you'd send order data to a backend
    console.log("Order placed:", {
      items: cartItems,
      total,
      shippingAddress,
      paymentMethod,
      user: user?.email,
    })

    setIsProcessing(false)
    setOrderPlaced(true)
    clearCart() // Clear cart after successful order
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20 pb-12 flex items-center justify-center text-white">
        <Card className="glass-effect border border-gray-700/50 shadow-2xl w-full max-w-md text-center p-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6 animate-bounce" />
          <CardTitle className="text-4xl font-bold mb-4">Order Placed!</CardTitle>
          <p className="text-lg text-gray-300 mb-6">Thank you for your purchase, {user?.name || "customer"}!</p>
          <p className="text-md text-gray-400 mb-8">
            Your order has been successfully placed and will be processed shortly.
          </p>
          <Button
            onClick={() => onNavigate("home")}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Button
          onClick={() => onNavigate("home")}
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-white group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold text-white mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <Card className="glass-effect border border-gray-700/50 shadow-2xl lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <ShoppingBag className="h-6 w-6 mr-2 text-green-400" /> Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex justify-between items-center text-gray-300">
                        <span className="text-sm">
                          {item.name} (x{item.quantity})
                        </span>
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-700/50 pt-4 flex justify-between items-center text-white text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Shipping Address & Payment */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-effect border border-gray-700/50 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-blue-400" /> Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={shippingAddress.fullName}
                  onChange={handleAddressChange}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                />
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                <Input
                  type="text"
                  name="addressLine1"
                  placeholder="Address Line 1"
                  value={shippingAddress.addressLine1}
                  onChange={handleAddressChange}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                />
                {errors.addressLine1 && <p className="text-red-400 text-sm mt-1">{errors.addressLine1}</p>}
                <Input
                  type="text"
                  name="addressLine2"
                  placeholder="Address Line 2 (Optional)"
                  value={shippingAddress.addressLine2}
                  onChange={handleAddressChange}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                    {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={shippingAddress.zipCode}
                      onChange={handleAddressChange}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                    {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
                <Input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  disabled
                />
              </CardContent>
            </Card>

            <Card className="glass-effect border border-gray-700/50 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <CreditCard className="h-6 w-6 mr-2 text-purple-400" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={paymentMethod === "cod" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("cod")}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-lg font-semibold",
                      paymentMethod === "cod"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50",
                    )}
                  >
                    Cash on Delivery
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("card")}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-lg font-semibold",
                      paymentMethod === "card"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50",
                    )}
                  >
                    Credit/Debit Card
                  </Button>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={cardDetails.cardNumber}
                      onChange={handleCardChange}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                    />
                    {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                    <Input
                      type="text"
                      name="cardName"
                      placeholder="Name on Card"
                      value={cardDetails.cardName}
                      onChange={handleCardChange}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                    />
                    {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={handleCardChange}
                          className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                        />
                        {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <Input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                        />
                        {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || cartItems.length === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <span>Place Order (₹{total.toFixed(2)})</span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
