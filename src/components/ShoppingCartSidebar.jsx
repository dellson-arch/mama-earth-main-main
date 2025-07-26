"use client"
import { Button } from "./ui/Button"
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import { cn } from "../lib/utils"

const ShoppingCartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveFromCart, setCurrentPage }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckoutClick = () => {
    onClose()
    setCurrentPage("checkout")
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      {/* Overlay */}
      {isOpen && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>}

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-gray-900/95 backdrop-blur-xl shadow-2xl flex flex-col border-l border-gray-800/50">
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <ShoppingCart className="h-6 w-6 mr-2 text-green-400" /> Your Cart
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
              <ShoppingCart className="h-20 w-20 mb-4 opacity-30" />
              <p className="text-lg font-semibold">Your cart is empty!</p>
              <p className="text-sm">Add some amazing natural products to get started.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-gray-800/50 rounded-xl p-3 shadow-md border border-gray-700/50"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-white">{item.name}</h3>
                  <p className="text-green-400 font-bold text-lg">₹{item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full text-gray-300 hover:bg-gray-700/50 border-gray-700/50 bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-white font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full text-gray-300 hover:bg-gray-700/50 border-gray-700/50 bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-red-400 hover:bg-red-400/10 ml-4"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-800/50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-white">Subtotal:</span>
            <span className="text-2xl font-bold text-green-400">₹{total.toFixed(2)}</span>
          </div>
          <Button
            onClick={handleCheckoutClick}
            disabled={cartItems.length === 0}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartSidebar
