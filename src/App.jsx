"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import HomePage from "./components/HomePage"
import ProductsPage from "./components/ProductsPage"
import ProductDetailPage from "./components/ProductDetailPage"
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
import LoadingPage from "./components/LoadingPage"
import OfflinePage from "./components/OfflinePage"

const ProfilePage = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-8">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-effect rounded-2xl p-8 border border-gray-700/50 animate-fade-in-up">
        <h1 className="text-3xl font-bold gradient-text mb-6">My Profile</h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-pulse-glow">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name || "User"}</h2>
              <p className="text-gray-400">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-xl border border-gray-700/50 hover-lift">
              <h3 className="text-lg font-semibold text-white mb-2">Account Info</h3>
              <p className="text-gray-400">
                Member since: {new Date(user?.joinDate || Date.now()).toLocaleDateString()}
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl border border-gray-700/50 hover-lift">
              <h3 className="text-lg font-semibold text-white mb-2">Environmental Impact</h3>
              <p className="text-green-400 font-bold">{user?.treesPlanted || 0} trees planted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const OrdersPage = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-effect rounded-2xl p-8 border border-gray-700/50 animate-fade-in-up">
        <h1 className="text-3xl font-bold gradient-text mb-6">My Orders</h1>
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
          <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
          <button
            onClick={() => onNavigate("products")}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 btn-ripple"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  </div>
)

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [previousPage, setPreviousPage] = useState("home")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userProfile, setUserProfile] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // SUPER SIMPLE LOADING - NO COMPLEX LOGIC
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 800) // Slightly longer for better UX
          return 100
        }
        return prev + 2 // Increase by 2% every 100ms = 5 seconds total
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("mamaearth-cart")
      const savedWishlist = localStorage.getItem("mamaearth-wishlist")
      const savedUser = localStorage.getItem("mamaearth-user")
      const savedProfile = localStorage.getItem("mamaearth-profile")

      if (savedCart) setCartItems(JSON.parse(savedCart))
      if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist))
      if (savedUser) setUser(JSON.parse(savedUser))
      if (savedProfile) setUserProfile(JSON.parse(savedProfile))
    } catch (error) {
      console.error("Error loading saved data:", error)
    }

    const handleNavigateToAnalyzer = () => {
      setCurrentPage("analyzer")
      setIsAIAssistantOpen(false)
    }

    window.addEventListener("navigate-to-analyzer", handleNavigateToAnalyzer)
    return () => window.removeEventListener("navigate-to-analyzer", handleNavigateToAnalyzer)
  }, [])

  useEffect(() => {
    localStorage.setItem("mamaearth-cart", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem("mamaearth-wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  useEffect(() => {
    if (user) {
      localStorage.setItem("mamaearth-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("mamaearth-user")
    }
  }, [user])

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("mamaearth-profile", JSON.stringify(userProfile))
    }
  }, [userProfile])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  const showNotification = (message, type = "success") => {
    const id = Date.now()
    const notification = { id, message, type }
    setNotifications((prev) => [...prev, notification])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 4000)
  }

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        showNotification(`Updated ${product.name} quantity in cart! 🛒`)
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        showNotification(`${product.name} added to cart! 🌿`)
        return [...prev, { ...product, quantity }]
      }
    })

    if (user) {
      setUser((prev) => ({
        ...prev,
        treesPlanted: (prev.treesPlanted || 0) + 1,
      }))
      showNotification(`🌳 You planted a tree! Total: ${(user.treesPlanted || 0) + 1} trees`, "success")
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
        showNotification(`${product.name} removed from wishlist 💔`, "info")
        return prev.filter((item) => item.id !== product.id)
      } else {
        showNotification(`${product.name} added to wishlist! ❤️`)
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
    setPreviousPage(currentPage)
    setCurrentPage("products")
    setSearchQuery(products[0] || "")
    setIsAIAssistantOpen(false)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setPreviousPage(currentPage)
    setCurrentPage("product-detail")
  }

  const handleLogout = () => {
    setUser(null)
    setUserProfile(null)
    setCartItems([])
    setWishlistItems([])
    showNotification("Successfully signed out! 👋", "info")
  }

  const handleNavigate = (page) => {
    setPreviousPage(currentPage)
    setCurrentPage(page)
  }

  const handleGoBack = () => {
    setCurrentPage(previousPage)
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
      case "product-detail":
        return (
          <ProductDetailPage
            product={selectedProduct}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
            isInWishlist={wishlistItems.some((item) => item.id === selectedProduct?.id)}
          />
        )
      case "wishlist":
        return (
          <WishlistPage
            wishlistItems={wishlistItems}
            removeFromWishlist={removeFromWishlist}
            addToCart={addToCart}
            onProductClick={handleProductClick}
          />
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
            onProductClick={handleProductClick}
          />
        )
      case "community":
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <CommunitySection />
            </div>
          </div>
        )
      case "impact":
        return <TreeTracker user={user} onNavigate={handleNavigate} />
      case "profile":
        return <ProfilePage user={user} onNavigate={handleNavigate} />
      case "orders":
        return <OrdersPage user={user} onNavigate={handleNavigate} />
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            wishlistItems={wishlistItems}
            onProductClick={handleProductClick}
          />
        )
    }
  }

  if (isLoading) {
    return <LoadingPage progress={loadingProgress} />
  }

  if (!isOnline) {
    return <OfflinePage onRetry={() => window.location.reload()} onGoHome={() => setCurrentPage("home")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
        previousPage={previousPage}
        cartItemsCount={getCartItemsCount()}
        wishlistCount={wishlistItems.length}
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAIAssistantOpen={() => setIsAIAssistantOpen(true)}
      />

      <main className="relative z-10">{renderPage()}</main>

      <Footer onNavigate={handleNavigate} />

      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveFromCart={removeFromCart}
        setCurrentPage={handleNavigate}
      />

      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onProductRecommend={handleProductRecommend}
      />

      <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
        {notifications.map((notification) => (
          <div key={notification.id} className="animate-slide-in-right">
            <NotificationToast
              message={notification.message}
              type={notification.type}
              onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
