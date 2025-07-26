"use client"

import { useState } from "react"
import { CreditCard, Shield } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const CheckoutPage = ({ cartItems = [], onNavigate, user, total, clearCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      clearCart()
      onNavigate("home")
    }, 3000)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-400">Thank you for your purchase. Redirecting to home...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-white font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry</label>
                    <Input type="text" placeholder="MM/YY" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                    <Input type="text" placeholder="123" className="bg-gray-800 border-gray-700 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name on Card</label>
                  <Input type="text" placeholder="John Doe" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <Button onClick={handlePlaceOrder} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Place Order - ₹{total}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
