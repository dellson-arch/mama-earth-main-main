"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const SignInPage = ({ onNavigate, setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    skinType: "normal",
    hairType: "normal",
    concerns: [],
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const skinTypes = ["oily", "dry", "combination", "normal", "sensitive"]
  const hairTypes = ["oily", "dry", "normal", "curly", "straight"]
  const skinConcerns = ["acne", "dark-spots", "aging", "dullness", "sensitivity", "pores"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleConcernToggle = (concern) => {
    setFormData((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c) => c !== concern)
        : [...prev.concerns, concern],
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = "Name is required"
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      if (isSignUp) {
        // Sign Up Logic
        const users = JSON.parse(localStorage.getItem("mamaearth-users") || "[]")

        // Check if user already exists
        const existingUser = users.find((user) => user.email === formData.email)
        if (existingUser) {
          setErrors({ email: "User already exists with this email" })
          setIsLoading(false)
          return
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password, // In production, this should be hashed
          skinType: formData.skinType,
          hairType: formData.hairType,
          concerns: formData.concerns,
          treesPlanted: 0,
          joinedDate: new Date().toISOString(),
        }

        // Save to localStorage
        users.push(newUser)
        localStorage.setItem("mamaearth-users", JSON.stringify(users))

        // Set current user (without password)
        const { password, ...userWithoutPassword } = newUser
        setUser(userWithoutPassword)

        // Navigate to home
        setTimeout(() => {
          setIsLoading(false)
          onNavigate("home")
        }, 1000)
      } else {
        // Sign In Logic
        const users = JSON.parse(localStorage.getItem("mamaearth-users") || "[]")
        const user = users.find((u) => u.email === formData.email && u.password === formData.password)

        if (user) {
          // Set current user (without password)
          const { password, ...userWithoutPassword } = user
          setUser(userWithoutPassword)

          setTimeout(() => {
            setIsLoading(false)
            onNavigate("home")
          }, 1000)
        } else {
          setErrors({ email: "Invalid email or password" })
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.error("Authentication error:", error)
      setErrors({ general: "Something went wrong. Please try again." })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20 pb-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Button
          onClick={() => onNavigate("home")}
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-white group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Button>

        <Card className="glass-effect border border-gray-700/50 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              {isSignUp ? "Join MamaEarth" : "Welcome Back"}
            </CardTitle>
            <p className="text-gray-400">
              {isSignUp
                ? "Create your account and start your natural beauty journey"
                : "Sign in to your account to continue"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              )}

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              {isSignUp && (
                <>
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  {/* Skin Type */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">Skin Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {skinTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, skinType: type }))}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            formData.skinType === type
                              ? "bg-green-600 text-white"
                              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hair Type */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">Hair Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {hairTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, hairType: type }))}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            formData.hairType === type
                              ? "bg-green-600 text-white"
                              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skin Concerns */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Skin Concerns (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {skinConcerns.map((concern) => (
                        <button
                          key={concern}
                          type="button"
                          onClick={() => handleConcernToggle(concern)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            formData.concerns.includes(concern)
                              ? "bg-green-600 text-white"
                              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                          }`}
                        >
                          {concern.charAt(0).toUpperCase() + concern.slice(1).replace("-", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {errors.general && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400 text-sm">{errors.general}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{isSignUp ? "Creating Account..." : "Signing In..."}</span>
                  </div>
                ) : (
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                )}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                    skinType: "normal",
                    hairType: "normal",
                    concerns: [],
                  })
                  setErrors({})
                }}
                className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 pt-6 border-t border-gray-700/50">
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs">Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs">Trusted</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-xs">Private</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignInPage
