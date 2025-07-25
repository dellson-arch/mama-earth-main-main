"use client"

import { useState, useEffect } from "react"
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Leaf,
  MessageCircle,
  TreePine,
  Sparkles,
  Users,
  ChevronDown,
  Package,
  ArrowLeft,
} from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Badge } from "./ui/Badge"

const Header = ({
  onNavigate,
  onGoBack,
  currentPage,
  previousPage,
  cartItemsCount = 0,
  wishlistCount = 0,
  onCartClick,
  user,
  onLogout,
  searchQuery = "",
  setSearchQuery,
  onAIAssistantOpen,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isUserMenuOpen])

  const navItems = [
    { id: "home", label: "Home", icon: null },
    { id: "products", label: "Products", icon: null },
    { id: "analyzer", label: "AI Analyzer", icon: Sparkles },
    { id: "community", label: "Community", icon: Users },
  ]

  const handleProfileMenuClick = (action) => {
    setIsUserMenuOpen(false)

    switch (action) {
      case "profile":
        onNavigate("profile")
        break
      case "orders":
        onNavigate("orders")
        break
      case "impact":
        onNavigate("impact")
        break
      case "logout":
        onLogout()
        onNavigate("home")
        break
      default:
        break
    }
  }

  // Pages that should show back button instead of full navigation
  const pagesWithBackButton = [
    "products",
    "product-detail",
    "checkout",
    "recommendations",
    "profile",
    "orders",
    "analyzer",
    "signin",
    "community",
  ]

  const shouldShowBackButton =
    pagesWithBackButton.includes(currentPage) && previousPage !== currentPage && previousPage !== "home"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect border-b border-gray-700/50 shadow-2xl"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo and Back Button */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate("home")}>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 transition-all duration-300 group-hover:scale-110">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold gradient-text">MamaEarth</span>
                <div className="text-xs text-green-400 font-medium">Natural Beauty</div>
              </div>
            </div>

            {/* Back Button - positioned after logo */}
            {shouldShowBackButton && (
              <div className="ml-4 pl-4 border-l border-gray-700/50">
                <Button
                  variant="ghost"
                  onClick={onGoBack}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 flex items-center space-x-2 px-3 py-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </div>
            )}
          </div>

          {/* Center - Navigation (show on main pages or when no valid back navigation) */}
          {(!shouldShowBackButton || currentPage === "products") && (
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                      currentPage === item.id
                        ? "text-green-400 bg-green-600/10 shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    <span>{item.label}</span>
                    {currentPage === item.id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </nav>
          )}

          {/* Center - Search Bar (for back button pages) */}
          {shouldShowBackButton && (
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                <Input
                  type="text"
                  placeholder="Search natural products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-xl transition-all duration-200"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      onNavigate("products")
                    }
                  }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>
          )}

          {/* Right Side - Search Bar (for normal pages) */}
          {!shouldShowBackButton && (
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                <Input
                  type="text"
                  placeholder="Search natural products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-xl transition-all duration-200"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      onNavigate("products")
                    }
                  }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* AI Assistant */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onAIAssistantOpen}
              className="relative text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
            >
              <MessageCircle className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 rounded-xl bg-green-500/0 group-hover:bg-green-500/10 transition-colors"></div>
            </Button>

            {/* Tree Counter - Always visible when user exists */}
            {user && (
              <button
                onClick={() => onNavigate("impact")}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl hover:from-green-600/30 hover:to-green-500/30 transition-all duration-200 group"
              >
                <TreePine className="h-4 w-4 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-green-400">{user.treesPlanted || 0}</span>
                <div className="text-xs text-green-300/80 hidden sm:block">trees</div>
              </button>
            )}

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("wishlist")}
              className="relative text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg">
                  {wishlistCount}
                </Badge>
              )}
              <div className="absolute inset-0 rounded-xl bg-red-500/0 group-hover:bg-red-500/10 transition-colors"></div>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg">
                  {cartItemsCount}
                </Badge>
              )}
              <div className="absolute inset-0 rounded-xl bg-green-500/0 group-hover:bg-green-500/10 transition-colors"></div>
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <span className="hidden sm:block font-medium">{user.name}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 glass-effect border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden animate-fade-in z-50">
                    <div className="p-2">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-700/50 mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-xs text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-1">
                        <button
                          onClick={() => handleProfileMenuClick("profile")}
                          className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 flex items-center space-x-3 group"
                        >
                          <User className="h-4 w-4 group-hover:text-green-400 transition-colors" />
                          <span>My Profile</span>
                        </button>

                        <button
                          onClick={() => handleProfileMenuClick("orders")}
                          className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 flex items-center space-x-3 group"
                        >
                          <Package className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                          <span>My Orders</span>
                        </button>

                        <button
                          onClick={() => handleProfileMenuClick("impact")}
                          className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 flex items-center space-x-3 group"
                        >
                          <TreePine className="h-4 w-4 text-green-400 group-hover:text-green-300 transition-colors" />
                          <div className="flex items-center justify-between flex-1">
                            <span>My Impact</span>
                            <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                              {user.treesPlanted || 0}
                            </Badge>
                          </div>
                        </button>

                        <hr className="my-2 border-gray-700/50" />

                        <button
                          onClick={() => handleProfileMenuClick("logout")}
                          className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200 flex items-center space-x-3"
                        >
                          <User className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => onNavigate("signin")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white rounded-xl"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-400 transition-colors" />
            <Input
              type="text"
              placeholder="Search natural products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-xl transition-all duration-200"
              onKeyPress={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  onNavigate("products")
                  setIsMenuOpen(false)
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-gray-700/50 animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? "text-green-400 bg-green-600/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {IconComponent && <IconComponent className="h-5 w-5" />}
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
