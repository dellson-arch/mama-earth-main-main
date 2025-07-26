"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import HomePage from "./components/HomePage"
import ProductsPage from "./components/ProductsPage"
import WishlistPage from "./components/WishlistPage"
import SignInPage from "./components/SignInPage"
import CheckoutPage from "./components/CheckoutPage"
import SkinHairAnalyzer from "./components/SkinHairAnalyzer"
import RecommendationsPage from "./components/RecommendationsPage"
import ShoppingCartSidebar from "./components/ShoppingCartSidebar"
import Footer from "./components/Footer"
import NotificationToast from "./components/NotificationToast"
import AIAssistant from "./components/AIAssistant"
import TreeTracker from "./components/TreeTracker"
import CommunitySection from "./components/CommunitySection"
import ProductDetailModal from "./components/ProductDetailModal"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userProfile, setUserProfile] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("mamaearth-cart")
    const savedWishlist = localStorage.getItem("mamaearth-wishlist")
    const savedUser = localStorage.getItem("mamaearth-user")
    const savedProfile = localStorage.getItem("mamaearth-profile")

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
        localStorage.removeItem("mamaearth-cart")
      }
    }

    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Error parsing wishlist data:", error)
        localStorage.removeItem("mamaearth-wishlist")
      }
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("mamaearth-user")
      }
    }

    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile))
      } catch (error) {
        console.error("Error parsing profile data:", error)
        localStorage.removeItem("mamaearth-profile")
      }
    }

    // Listen for custom navigation events
    const handleNavigateToAnalyzer = () => {
      setCurrentPage("analyzer")
      setIsAIAssistantOpen(false)
    }

    window.addEventListener("navigate-to-analyzer", handleNavigateToAnalyzer)
    return () => window.removeEventListener("navigate-to-analyzer", handleNavigateToAnalyzer)
  }, [])

  // Save to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem("mamaearth-cart", JSON.stringify(cartItems))
    } catch (error) {
      console.error("Error saving cart data:", error)
    }
  }, [cartItems])

  useEffect(() => {
    try {
      localStorage.setItem("mamaearth-wishlist", JSON.stringify(wishlistItems))
    } catch (error) {
      console.error("Error saving wishlist data:", error)
    }
  }, [wishlistItems])

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("mamaearth-user", JSON.stringify(user))
      } else {
        localStorage.removeItem("mamaearth-user")
      }
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }, [user])

  useEffect(() => {
    try {
      if (userProfile) {
        localStorage.setItem("mamaearth-profile", JSON.stringify(userProfile))
      }
    } catch (error) {
      console.error("Error saving profile data:", error)
    }
  }, [userProfile])

  const showNotification = (message, type = "success") => {
    const id = Date.now()
    const notification = { id, message, type }
    setNotifications((prev) => [...prev, notification])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        showNotification(`Updated ${product.name} quantity in cart`)
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        showNotification(`${product.name} added to cart`)
        return [...prev, { ...product, quantity }]
      }
    })

    // Update user's tree count
    if (user) {
      setUser((prev) => ({
        ...prev,
        treesPlanted: (prev.treesPlanted || 0) + 1,
      }))
    }
  }

  const removeFromCart = (productId) => {
    const product = cartItems.find((item) => item.id === productId)
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
    if (product) {
      showNotification(`${product.name} removed from cart`, "info")
    }
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        showNotification(`${product.name} removed from wishlist`, "info")
        return prev.filter((item) => item.id !== product.id)
      } else {
        showNotification(`${product.name} added to wishlist`)
        return [...prev, product]
      }
    })
  }

  const removeFromWishlist = (productId) => {
    const product = wishlistItems.find((item) => item.id === productId)
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
    if (product) {
      showNotification(`${product.name} removed from wishlist`, "info")
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleProductRecommend = (products) => {
    setCurrentPage("products")
    setSearchQuery(products[0] || "")
    setIsAIAssistantOpen(false)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={setCurrentPage}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlistItems={wishlistItems}
            onProductClick={handleProductClick}
          />
        )
      case "products":
        return (
          <ProductsPage
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
            wishlistItems={wishlistItems}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onProductClick={handleProductClick}
          />
        )
      case "wishlist":
        return (
          <WishlistPage
            wishlistItems={wishlistItems}
            removeFromWishlist={removeFromWishlist}
            addToCart={addToCart}
            onNavigate={setCurrentPage}
            onProductClick={handleProductClick}
          />
        )
      case "signin":
        return <SignInPage onNavigate={setCurrentPage} setUser={setUser} />
      case "checkout":
        return (
          <CheckoutPage
            cartItems={cartItems}
            onNavigate={setCurrentPage}
            user={user}
            total={getCartTotal()}
            clearCart={() => setCartItems([])}
          />
        )
      case "analyzer":
        return (
          <SkinHairAnalyzer
            onNavigate={setCurrentPage}
            setUserProfile={setUserProfile}
            showNotification={showNotification}
            setRecommendations={setRecommendations}
          />
        )
      case "recommendations":
        return (
          <RecommendationsPage
            onNavigate={setCurrentPage}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            userProfile={userProfile}
            wishlistItems={wishlistItems}
            recommendations={recommendations}
            onProductClick={handleProductClick}
          />
        )
      case "community":
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <CommunitySection />
            </div>
          </div>
        )
      case "impact":
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">Your Environmental Impact</h1>
                <p className="text-xl text-gray-400">See how you're making a difference with every purchase</p>
              </div>
              <TreeTracker user={user} />
            </div>
          </div>
        )
      default:
        return (
          <HomePage
            onNavigate={setCurrentPage}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlistItems={wishlistItems}
            onProductClick={handleProductClick}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-hero-pattern">
      {/* Enhanced Floating particles background */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <Header
        onNavigate={setCurrentPage}
        cartItemsCount={getCartItemsCount()}
        wishlistCount={wishlistItems.length}
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        onAIAssistantOpen={() => setIsAIAssistantOpen(true)}
      />

      <main className="relative z-10">{renderPage()}</main>

      <Footer onNavigate={setCurrentPage} />

      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveFromCart={removeFromCart}
        setCurrentPage={setCurrentPage}
      />

      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onProductRecommend={handleProductRecommend}
      />

      <ProductDetailModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
        onAddToWishlist={addToWishlist}
        isInWishlist={selectedProduct ? wishlistItems.some((item) => item.id === selectedProduct.id) : false}
      />

      {/* Enhanced Notifications */}
      <div className="fixed top-24 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <NotificationToast key={notification.id} message={notification.message} type={notification.type} />
        ))}
      </div>
    </div>
  )
}

export default App
