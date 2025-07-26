"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ArrowLeft, Check, Star, Users, Sparkles } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const SignInPage = ({ onNavigate, setUser }) => {
  // Removed setIsLoading
  const [isSignUp, setIsSignUp] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    skinType: "",
    hairType: "",
    concerns: [],
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.name.trim() && isSignUp) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.phone.trim() && isSignUp) newErrors.phone = "Phone is required"
      if (!formData.password) newErrors.password = "Password is required"
      if (isSignUp && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match"
      }
    } else if (step === 2 && isSignUp) {
      if (!formData.skinType) newErrors.skinType = "Please select your skin type"
    } else if (step === 3 && isSignUp) {
      if (!formData.hairType) newErrors.hairType = "Please select your hair type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      // Save user credentials to localStorage
      const userCredentials = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // In production, this should be hashed
        skinType: formData.skinType,
        hairType: formData.hairType,
        concerns: formData.concerns,
        treesPlanted: 0,
        joinDate: new Date().toISOString(),
      }

      localStorage.setItem(`mamaearth-user-${formData.email}`, JSON.stringify(userCredentials))

      // Set current user (without password for security)
      const { password, ...userWithoutPassword } = userCredentials
      setUser(userWithoutPassword)
      onNavigate("home")
    }, 1500) // Simulate network delay
  }

  const handleSignIn = () => {
    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Get stored user credentials
        const storedUserData = localStorage.getItem(`mamaearth-user-${formData.email}`)

        if (storedUserData) {
          const userData = JSON.parse(storedUserData)

          // Validate password
          if (userData.password === formData.password) {
            // Login successful - set user without password
            const { password, ...userWithoutPassword } = userData
            setUser(userWithoutPassword)
            onNavigate("home")
            return
          } else {
            setErrors({ password: "Invalid password" })
          }
        } else {
          setErrors({ email: "User not found. Please sign up first." })
        }
      } else {
        // Validation errors
        const newErrors = {}
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.password) newErrors.password = "Password is required"
        setErrors(newErrors)
      }
    }, 1500) // Simulate network delay
  }

  const toggleConcern = (concern) => {
    setFormData((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c) => c !== concern)
        : [...prev.concerns, concern],
    }))
  }

  const renderSignUpStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {" "}
            {/* Removed animate-fade-in */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            {" "}
            {/* Removed animate-fade-in */}
            <h3 className="text-lg font-semibold text-white text-center">Tell us about your skin</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Oily", "Dry", "Combination", "Sensitive", "Normal"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleInputChange("skinType", type)}
                  className={`p-3 rounded-lg border text-sm transition-all hover:scale-105 ${
                    formData.skinType === type
                      ? "border-green-400 bg-green-400/10 text-green-400 shadow-md"
                      : "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.skinType && <p className="text-red-400 text-sm mt-1 text-center">{errors.skinType}</p>}
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            {" "}
            {/* Removed animate-fade-in */}
            <h3 className="text-lg font-semibold text-white text-center">What about your hair?</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Straight", "Wavy", "Curly", "Coily"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleInputChange("hairType", type)}
                  className={`p-3 rounded-lg border text-sm transition-all hover:scale-105 ${
                    formData.hairType === type
                      ? "border-green-400 bg-green-400/10 text-green-400 shadow-md"
                      : "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.hairType && <p className="text-red-400 text-sm mt-1 text-center">{errors.hairType}</p>}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300 text-center">Main concerns (optional):</h4>
              <div className="grid grid-cols-2 gap-2">
                {["Acne", "Dryness", "Hair Fall", "Dandruff", "Dullness", "Frizz"].map((concern) => (
                  <button
                    key={concern}
                    onClick={() => toggleConcern(concern)}
                    className={`p-2 rounded-lg border text-xs transition-all hover:scale-105 ${
                      formData.concerns.includes(concern)
                        ? "border-green-400 bg-green-400/10 text-green-400 shadow-md"
                        : "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50"
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex relative overflow-hidden">
      {/* Floating particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-800/20 opacity-70" />
        <div className="relative z-10 flex flex-col justify-center text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse-soft">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <span className="text-5xl font-bold gradient-text">MamaEarth</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">Join the Natural Beauty Revolution</h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              Discover personalized skincare and haircare solutions powered by nature and AI
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="glass-effect p-4 rounded-lg animate-delay-100">
              {" "}
              {/* Removed animate-fade-in */}
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-green-400" />
                <span className="text-2xl font-bold text-white">2M+</span>
              </div>
              <p className="text-sm text-gray-400">Happy Customers</p>
            </div>
            <div className="glass-effect p-4 rounded-lg animate-delay-200">
              {" "}
              {/* Removed animate-fade-in */}
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">4.8★</span>
              </div>
              <p className="text-sm text-gray-400">Average Rating</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 text-left max-w-sm mx-auto">
            <div className="flex items-center space-x-3 animate-delay-300">
              {" "}
              {/* Removed animate-fade-in */}
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-green-400" />
              </div>
              <span className="text-gray-300">AI-powered skin & hair analysis</span>
            </div>
            <div className="flex items-center space-x-3 animate-delay-400">
              {" "}
              {/* Removed animate-fade-in */}
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-green-400" />
              </div>
              <span className="text-gray-300">Personalized product recommendations</span>
            </div>
            <div className="flex items-center space-x-3 animate-delay-500">
              {" "}
              {/* Removed animate-fade-in */}
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-green-400" />
              </div>
              <span className="text-gray-300">Plant a tree with every purchase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-md">
          <Card className="glass-effect border-gray-700 shadow-2xl">
            {" "}
            {/* Removed animate-fade-in */}
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-white">
                {isSignUp ? "Create Your Account" : "Welcome Back!"}
              </CardTitle>
              <p className="text-gray-400">
                {isSignUp ? "Join thousands of happy customers" : "Sign in to your account"}
              </p>

              {isSignUp && (
                <div className="flex items-center justify-center space-x-2 mt-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-10 h-2 rounded-full transition-all duration-300 ${
                        step <= currentStep ? "bg-green-500 shadow-md shadow-green-500/30" : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {!isSignUp ? (
                // Sign In Form
                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <Button onClick={handleSignIn} className="w-full btn-primary py-3 text-lg">
                    Sign In
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  <div className="text-center">
                    <button onClick={() => setIsSignUp(true)} className="text-green-400 hover:text-green-300 text-sm">
                      Don't have an account? <span className="font-semibold">Sign up</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Sign Up Form
                <div className="space-y-4">
                  {renderSignUpStep()}

                  <div className="flex space-x-3 pt-4">
                    {currentStep > 1 && (
                      <Button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent py-3 text-lg"
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back
                      </Button>
                    )}
                    <Button onClick={handleNext} className="flex-1 btn-primary py-3 text-lg">
                      {currentStep === 3 ? "Complete" : "Next"}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => {
                        setIsSignUp(false)
                        setCurrentStep(1)
                      }}
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      Already have an account? <span className="font-semibold">Sign in</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Social Login */}
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent py-3"
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent py-3"
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
