"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Sparkles, Leaf } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const SignInPage = ({ onNavigate, onSignIn, showNotification }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (!formData.email || !formData.password) {
      showNotification("Please fill in all required fields", "error")
      setIsLoading(false)
      return
    }

    if (isSignUp) {
      if (!formData.name || !formData.phone) {
        showNotification("Please fill in all required fields", "error")
        setIsLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        showNotification("Passwords don't match", "error")
        setIsLoading(false)
        return
      }

      if (formData.password.length < 6) {
        showNotification("Password must be at least 6 characters", "error")
        setIsLoading(false)
        return
      }
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: formData.name || "User",
        email: formData.email,
        phone: formData.phone || "",
        treesPlanted: Math.floor(Math.random() * 50) + 10,
        joinDate: new Date().toISOString(),
      }

      onSignIn(userData)
      showNotification(
        isSignUp ? "Account created successfully! Welcome to MamaEarth! 🌱" : "Welcome back! 🌿",
        "success",
      )
      setIsLoading(false)
      onNavigate("home")
    }, 2000)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-3xl font-bold gradient-text">MamaEarth</span>
              <div className="text-sm text-green-400 font-medium">Natural Beauty</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? "Join the Natural Beauty Revolution" : "Welcome Back"}
          </h1>
          <p className="text-gray-400">
            {isSignUp
              ? "Create your account and start your journey to natural beauty"
              : "Sign in to continue your natural beauty journey"}
          </p>
        </div>

        <Card className="glass-effect border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-green-400" />
              <span>{isSignUp ? "Create Account" : "Sign In"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-xl"
                      required={isSignUp}
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-xl"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-xl"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-12 pr-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {isSignUp && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-xl"
                    required={isSignUp}
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{isSignUp ? "Creating Account..." : "Signing In..."}</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {!isSignUp && (
              <div className="text-center">
                <button className="text-green-400 hover:text-green-300 text-sm transition-colors">
                  Forgot your password?
                </button>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">or</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">{isSignUp ? "Already have an account?" : "Don't have an account?"}</p>
              <Button
                type="button"
                variant="outline"
                onClick={toggleMode}
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-all duration-200 bg-transparent"
              >
                {isSignUp ? "Sign In Instead" : "Create Account"}
              </Button>
            </div>

            {isSignUp && (
              <div className="bg-gradient-to-r from-green-600/10 to-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-green-400 font-semibold text-sm">🌱 Join Our Mission</h3>
                    <p className="text-gray-300 text-xs">
                      Every purchase plants a tree and supports sustainable beauty practices
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <button className="text-green-400 hover:text-green-300 transition-colors">Terms of Service</button> and{" "}
            <button className="text-green-400 hover:text-green-300 transition-colors">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
