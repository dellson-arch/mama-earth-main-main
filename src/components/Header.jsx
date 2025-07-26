"use client"

import { useState } from "react"
import { Search, ShoppingCart, Heart, User, Menu, X, Bot } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Badge } from "./ui/badge"

const Header = ({
  onNavigate,
  cartItemsCount = 0,
  wishlistCount = 0,
  onCartClick,
  user,
  onLogout,
  searchQuery,
  setSearchQuery,
  currentPage,
  onAIAssistantOpen,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onNavigate("products")
    }
  }

  const navItems = [
    { id: "home", label: "Home", active: currentPage === "home" },
    { id: "products", label: "Products", active: currentPage === "products" },
    { id: "analyzer", label: "Skin Analyzer", active: currentPage === "analyzer" },
    { id: "community", label: "Community", active: currentPage === "community" },
    { id: "about", label: "About Us", active: currentPage === "about" }, // Added About Us
    // Only show Impact if user is signed in
    ...(user ? [{ id: "impact", label: "Impact", active: currentPage === "impact" }] : []),
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center space-x-3 text-white hover:text-green-400 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                MamaEarth
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-xl relative overflow-hidden group ${
                  item.active
                    ? "text-green-400 bg-green-400/10 shadow-lg shadow-green-500/20"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl"></div>
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-400 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search natural products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/70"
                />
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* AI Assistant Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAIAssistantOpen}
              className="hidden sm:flex text-gray-300 hover:text-green-400 hover:bg-green-400/10 transition-all duration-300 rounded-xl px-4 py-2"
            >
              <Bot className="h-5 w-5 mr-2" />
              AI Assistant
            </Button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate("wishlist")}
              className="relative p-3 text-gray-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5 group"
            >
              <Heart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg shadow-red-500/30 animate-pulse">
                  {wishlistCount}
                </Badge>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onCartClick}
              className="relative p-3 text-gray-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5 group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center text-xs bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg shadow-green-500/30 animate-pulse">
                  {cartItemsCount}
                </Badge>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 group-hover:scale-110 transition-all duration-300">
                      <span className="text-white text-sm font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-gray-700/50">
                      <div className="px-4 py-3 text-sm text-gray-300 border-b border-gray-700/50">
                        <div className="font-medium text-white text-base">{user.name || "User"}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                        {user.treesPlanted > 0 && (
                          <div className="text-xs text-green-400 mt-1">🌱 {user.treesPlanted} trees planted</div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          onNavigate("impact")
                          setIsUserMenuOpen(false)
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
                      >
                        🌍 My Impact
                      </button>
                      <button
                        onClick={() => {
                          onLogout()
                          setIsUserMenuOpen(false)
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => onNavigate("signin")}
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-xl px-4 py-2"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-green-400 transition-colors duration-300" />
              <Input
                type="text"
                placeholder="Search natural products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-2xl backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50 py-4 bg-gray-900/50 backdrop-blur-xl rounded-b-2xl">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`text-left text-sm font-medium transition-all duration-300 px-4 py-3 rounded-xl ${
                    item.active ? "text-green-400 bg-green-400/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onAIAssistantOpen()
                  setIsMenuOpen(false)
                }}
                className="flex items-center text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 px-4 py-3 rounded-xl"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
