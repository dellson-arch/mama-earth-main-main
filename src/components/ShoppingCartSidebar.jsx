"use client"

import { useState } from "react"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

const ShoppingCartSidebar = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveFromCart,
  setCurrentPage,
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onClose()
      setIsAnimating(false)
    }, 300)
  }

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    setCurrentPage("checkout")
    onClose()
  }

  if (!isOpen && !isAnimating) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen && !isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen && !isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
              {cartItems.length > 0 && (
                <Badge className="bg-green-600 text-white">
                  {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
                </Badge>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-400 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started!</p>
                <Button
                  onClick={() => {
                    setCurrentPage("products")
                    onClose()
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="glass-effect rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image || "/placeholder.svg?height=80&width=80&text=Product"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white line-clamp-2 mb-1">{item.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg font-bold text-green-400">₹{item.price}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-gray-500 line-through">₹{item.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-white transition-colors rounded"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-white transition-colors rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-800 p-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span className="text-gray-300">Total:</span>
                <span className="text-white">₹{getTotal().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentPage("products")
                    onClose()
                  }}
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Continue Shopping
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center">Free shipping on orders over ₹500</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ShoppingCartSidebar
