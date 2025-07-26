"use client"

import { X, ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/card"

const ShoppingCartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveFromCart, setCurrentPage }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckoutClick = () => {
    onClose()
    setCurrentPage("checkout")
  }

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900/95 border-l border-gray-800/50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <ShoppingCart className="h-7 w-7 mr-3 text-green-400" />
            Your Cart
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-20 w-20 text-gray-600 mx-auto mb-6" />
              <p className="text-gray-400 text-lg">Your cart is empty.</p>
              <Button
                onClick={() => {
                  onClose()
                  setCurrentPage("products")
                }}
                className="mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="bg-gray-800/50 border-gray-700/50 text-white rounded-xl shadow-md">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                      <p className="text-gray-400 text-sm">₹{item.price.toFixed(2)} each</p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-full border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-3 text-white font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-full border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-xl font-bold text-green-400">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-800/50 space-y-4">
            <div className="flex justify-between items-center text-white text-2xl font-bold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Button
              onClick={handleCheckoutClick}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 text-lg flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShoppingCartSidebar
