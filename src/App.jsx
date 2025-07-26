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
// import LoadingSpinner from "./components/LoadingSpinner" // Removed as per request

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [pageHistory, setPageHistory] = useState(["home"]) // Initialize with home
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userProfile, setUserProfile] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  // Removed isTransitioning state as per request for instant transitions

  // Load data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("mamaearth-cart")
    const savedWishlist = localStorage.getItem("mamaearth-wishlist")
    const savedUser = localStorage.getItem("mamaearth-current-user")
    const savedProfile = localStorage.getItem("mamaearth-profile")

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist))
    if (savedUser) {
      const currentUser = JSON.parse(savedUser)
      setUser(currentUser)
    }
    if (savedProfile) setUserProfile(JSON.parse(savedProfile))

    // Listen for custom navigation events
    const handleNavigateToAnalyzer = () => {
      handleNavigate("analyzer") // Use the new handleNavigate
      setIsAIAssistantOpen(false)
    }

    window.addEventListener("navigate-to-analyzer", handleNavigateToAnalyzer)
    return () => window.removeEventListener("navigate-to-analyzer", handleNavigateToAnalyzer)
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("mamaearth-cart", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem("mamaearth-wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  useEffect(() => {
    if (user) {
      localStorage.setItem("mamaearth-current-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("mamaearth-current-user")
    }
  }, [user])

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("mamaearth-profile", JSON.stringify(userProfile))
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
    handleNavigate("products") // Use the new handleNavigate
    setSearchQuery(products[0] || "")
    setIsAIAssistantOpen(false)
  }

  // Updated navigation logic for correct history management
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId)
    setPageHistory((prevHistory) => {
      // If navigating to a page already in history, truncate history to that point
      const existingIndex = prevHistory.indexOf(pageId)
      if (existingIndex !== -1 && existingIndex < prevHistory.length - 1) {
        return prevHistory.slice(0, existingIndex + 1)
      }
      // If navigating to the current page, do nothing to history
      if (prevHistory[prevHistory.length - 1] === pageId) {
        return prevHistory
      }
      // Otherwise, add the new page to history
      return [...prevHistory, pageId]
    })
  }

  const handleGoBack = () => {
    setPageHistory((prevHistory) => {
      const newHistory = [...prevHistory]
      if (newHistory.length > 1) {
        newHistory.pop() // Remove the current page
        const prevPage = newHistory[newHistory.length - 1] // Get the page before the one we just popped
        setCurrentPage(prevPage)
      } else {
        // If we are at the first page in history (likely 'home'), stay there.
        setCurrentPage("home")
      }
      return newHistory
    })
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlistItems={wishlistItems}
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
          />
        )
      case "wishlist":
        return (
          <WishlistPage wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />
        )
      case "signin":
        return <SignInPage onNavigate={handleNavigate} setUser={setUser} />
      case "checkout":
        return (
          <CheckoutPage
            cartItems={cartItems}
            onNavigate={handleNavigate}
            user={user}
            total={getCartTotal()}
            clearCart={() => setCartItems([])}
          />
        )
      case "analyzer":
        return (
          <SkinHairAnalyzer
            onNavigate={handleNavigate}
            setUserProfile={setUserProfile}
            showNotification={showNotification}
            setRecommendations={setRecommendations}
          />
        )
      case "recommendations":
        return (
          <RecommendationsPage
            onNavigate={handleNavigate}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            userProfile={userProfile}
            wishlistItems={wishlistItems}
            recommendations={recommendations}
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
            onNavigate={handleNavigate}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlistItems={wishlistItems}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-hero-pattern">
      {/* Floating particles background */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <Header
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        currentPage={currentPage}
        previousPage={pageHistory.length > 1 ? pageHistory[pageHistory.length - 2] : null}
        cartItemsCount={getCartItemsCount()}
        wishlistCount={wishlistItems.length}
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onLogout={() => {
          setUser(null)
          localStorage.removeItem("mamaearth-current-user")
          setPageHistory(["home"]) // Reset history on logout
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAIAssistantOpen={() => setIsAIAssistantOpen(true)}
      />

      {/* Main content - removed transition class for instant changes */}
      <main className="relative z-10">{renderPage()}</main>

      <Footer onNavigate={handleNavigate} />

      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveFromCart={removeFromCart}
        setCurrentPage={handleNavigate} // Use the new handleNavigate
      />

      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onProductRecommend={handleProductRecommend}
      />

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <NotificationToast key={notification.id} message={notification.message} type={notification.type} />
        ))}
      </div>

      {/* Global Loading Spinner - Removed */}
      {/* {isLoading && <LoadingSpinner />} */}
    </div>
  )
}

export default App
