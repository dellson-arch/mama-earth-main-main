"use client"

import { useState, useRef } from "react"
import { Camera, Upload, Sparkles, ArrowRight, CheckCircle, Info, X, ArrowLeft } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/Badge"

const SkinHairAnalyzer = ({ onNavigate, setUserProfile, showNotification, setRecommendations }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [analysisType, setAnalysisType] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const [userAnswers, setUserAnswers] = useState({
    age: "",
    skinType: "",
    concerns: [],
    currentProducts: [],
    lifestyle: "",
    budget: "",
  })

  const skinQuestions = [
    {
      id: "age",
      question: "What's your age group?",
      type: "single",
      options: ["18-25", "26-35", "36-45", "46-55", "55+"],
    },
    {
      id: "skinType",
      question: "What's your skin type?",
      type: "single",
      options: ["Oily", "Dry", "Combination", "Sensitive", "Normal"],
    },
    {
      id: "concerns",
      question: "What are your main skin concerns? (Select all that apply)",
      type: "multiple",
      options: ["Acne", "Dark Spots", "Wrinkles", "Dryness", "Oiliness", "Sensitivity", "Dullness", "Pores"],
    },
    {
      id: "currentProducts",
      question: "What products do you currently use?",
      type: "multiple",
      options: ["Face Wash", "Moisturizer", "Sunscreen", "Serum", "Toner", "Face Mask", "None"],
    },
    {
      id: "lifestyle",
      question: "How would you describe your lifestyle?",
      type: "single",
      options: ["Very Active", "Moderately Active", "Sedentary", "Stressed", "Relaxed"],
    },
    {
      id: "budget",
      question: "What's your monthly skincare budget?",
      type: "single",
      options: ["Under ₹500", "₹500-1000", "₹1000-2000", "₹2000-5000", "Above ₹5000"],
    },
  ]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("Image size should be less than 5MB", "error")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        showNotification("Please select a valid image file", "error")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        setShowInstructions(false)
        showNotification("Photo uploaded successfully! 📸", "success")
      }
      reader.onerror = () => {
        showNotification("Error uploading image. Please try again.", "error")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // Check if camera is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showNotification("Camera not supported on this device", "error")
      return
    }

    // Trigger camera input
    if (cameraInputRef.current) {
      cameraInputRef.current.click()
    }
  }

  const handleAnswerChange = (questionId, answer, isMultiple = false) => {
    setUserAnswers((prev) => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || []
        const updatedAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter((a) => a !== answer)
          : [...currentAnswers, answer]
        return { ...prev, [questionId]: updatedAnswers }
      } else {
        return { ...prev, [questionId]: answer }
      }
    })
  }

  const analyzeImage = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      const mockResults = {
        skinType: userAnswers.skinType || "Combination",
        concerns: userAnswers.concerns.length > 0 ? userAnswers.concerns : ["Acne", "Dark Spots", "Oiliness"],
        skinHealth: Math.floor(Math.random() * 30) + 70, // 70-100
        recommendations: [
          {
            id: 1,
            name: "Tea Tree Face Wash",
            price: 299,
            originalPrice: 399,
            image: "/placeholder.svg?height=200&width=200&text=Tea+Tree+Face+Wash",
            reason: "Perfect for acne-prone skin with natural tea tree oil",
            rating: 4.5,
            reviews: 1250,
            category: "Face Wash",
          },
          {
            id: 2,
            name: "Vitamin C Face Serum",
            price: 599,
            originalPrice: 799,
            image: "/placeholder.svg?height=200&width=200&text=Vitamin+C+Serum",
            reason: "Helps reduce dark spots and brighten skin",
            rating: 4.7,
            reviews: 890,
            category: "Serum",
          },
          {
            id: 3,
            name: "Neem Face Mask",
            price: 199,
            originalPrice: 299,
            image: "/placeholder.svg?height=200&width=200&text=Neem+Face+Mask",
            reason: "Natural antibacterial properties for clear skin",
            rating: 4.3,
            reviews: 567,
            category: "Face Mask",
          },
          {
            id: 4,
            name: "Aloe Vera Moisturizer",
            price: 349,
            originalPrice: 449,
            image: "/placeholder.svg?height=200&width=200&text=Aloe+Vera+Moisturizer",
            reason: "Gentle hydration without clogging pores",
            rating: 4.6,
            reviews: 1100,
            category: "Moisturizer",
          },
        ],
      }

      setAnalysisResults(mockResults)
      setRecommendations(mockResults.recommendations)
      setUserProfile({
        skinType: mockResults.skinType,
        concerns: mockResults.concerns,
        skinHealth: mockResults.skinHealth,
        ...userAnswers,
      })
      setIsAnalyzing(false)
      setCurrentStep(4)
      showNotification("Analysis complete! Check your personalized recommendations 🎉", "success")
    }, 3000)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-center">Choose Analysis Type</CardTitle>
              <p className="text-gray-400 text-center">What would you like to analyze today?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => {
                    setAnalysisType("skin")
                    setCurrentStep(2)
                  }}
                  className="p-8 border-2 border-gray-700 rounded-lg hover:border-green-500 transition-all group bg-gradient-to-br from-pink-600/10 to-pink-800/10"
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Skin Analysis</h3>
                    <p className="text-gray-400">
                      Get personalized skincare recommendations based on your skin type and concerns
                    </p>
                    <Badge className="bg-pink-600 text-white">Most Popular</Badge>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setAnalysisType("hair")
                    setCurrentStep(2)
                  }}
                  className="p-8 border-2 border-gray-700 rounded-lg hover:border-green-500 transition-all group bg-gradient-to-br from-purple-600/10 to-purple-800/10"
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Hair Analysis</h3>
                    <p className="text-gray-400">Discover the perfect hair care routine for healthy, beautiful hair</p>
                    <Badge className="bg-purple-600 text-white">Coming Soon</Badge>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <div className="space-y-6">
            {/* Instructions for Less Tech-Savvy Users */}
            {showInstructions && (
              <Card className="glass-effect border-blue-500/50 bg-blue-600/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Info className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-blue-400">📸 How to Take a Perfect Photo</h3>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p>
                          • 🌞 <strong>Good lighting:</strong> Stand near a window or in bright light
                        </p>
                        <p>
                          • 😊 <strong>Clean face:</strong> Remove makeup and wash your face
                        </p>
                        <p>
                          • 📱 <strong>Hold steady:</strong> Keep your phone steady and close to your face
                        </p>
                        <p>
                          • 👀 <strong>Look straight:</strong> Look directly at the camera
                        </p>
                        <p>
                          • ✨ <strong>Don't worry:</strong> This helps us give you better recommendations!
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowInstructions(false)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Got it! <X className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Upload Your {analysisType === "skin" ? "Face" : "Hair"} Photo
                </CardTitle>
                <p className="text-gray-400 text-center">
                  Our AI will analyze your photo to give personalized recommendations
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {!uploadedImage ? (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-green-500 transition-colors">
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                          <Upload className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Upload Your Photo</h3>
                          <p className="text-gray-400 text-sm mb-4">Choose from your gallery or take a new photo</p>
                          <p className="text-xs text-gray-500">Supported formats: JPG, PNG, HEIC (Max 5MB)</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button onClick={handleCameraCapture} className="bg-green-600 hover:bg-green-700 h-14 text-lg">
                        <Camera className="h-6 w-6 mr-3" />📸 Take Photo
                      </Button>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 h-14 text-lg"
                      >
                        <Upload className="h-6 w-6 mr-3" />📁 Choose from Gallery
                      </Button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <div className="text-center">
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(3)}
                        className="text-gray-400 hover:text-white"
                      >
                        Skip photo upload and continue →
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative max-w-md mx-auto">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        className="w-full rounded-lg border border-gray-600 shadow-lg"
                      />
                      <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />✅ Photo Ready
                      </Badge>
                    </div>
                    <div className="text-center space-y-4">
                      <p className="text-green-400 font-medium">Great! Your photo looks perfect for analysis.</p>
                      <div className="flex justify-center space-x-4">
                        <Button
                          onClick={() => {
                            setUploadedImage(null)
                            setShowInstructions(true)
                          }}
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          📷 Change Photo
                        </Button>
                        <Button onClick={() => setCurrentStep(3)} className="bg-green-600 hover:bg-green-700">
                          Continue <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        const currentQuestion = skinQuestions.find(
          (q) => !userAnswers[q.id] || (Array.isArray(userAnswers[q.id]) && userAnswers[q.id].length === 0),
        )

        if (!currentQuestion) {
          return (
            <Card className="glass-effect border-gray-700">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Ready for Analysis!</h3>
                  <p className="text-gray-400">We have all the information we need to analyze your {analysisType}</p>
                </div>
                <Button
                  onClick={analyzeImage}
                  className="bg-green-600 hover:bg-green-700 h-12 px-8 text-lg"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>🤖 Analyzing
                      Your Skin...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-3" />🚀 Start AI Analysis
                    </>
                  )}
                </Button>
                {isAnalyzing && <p className="text-sm text-gray-400">This may take a few seconds...</p>}
              </CardContent>
            </Card>
          )
        }

        return (
          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{currentQuestion.question}</CardTitle>
                <Badge className="bg-green-600 text-white">
                  {
                    Object.keys(userAnswers).filter(
                      (key) =>
                        userAnswers[key] &&
                        (Array.isArray(userAnswers[key]) ? userAnswers[key].length > 0 : userAnswers[key]),
                    ).length
                  }
                  /{skinQuestions.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected =
                    currentQuestion.type === "multiple"
                      ? userAnswers[currentQuestion.id]?.includes(option)
                      : userAnswers[currentQuestion.id] === option

                  return (
                    <button
                      key={option}
                      onClick={() =>
                        handleAnswerChange(currentQuestion.id, option, currentQuestion.type === "multiple")
                      }
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-105 ${
                        isSelected
                          ? "border-green-500 bg-green-600/20 text-white shadow-lg"
                          : "border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "bg-green-500 border-green-500" : "border-gray-400"
                          }`}
                        >
                          {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        if (!analysisResults) return null

        return (
          <div className="space-y-6">
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-center">🎉 Your Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl font-bold text-white">{analysisResults.skinHealth}%</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Skin Health Score</h3>
                  <p className="text-gray-400">Based on your photo and answers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg border border-blue-600/30">
                    <h4 className="font-semibold text-white mb-3">🔍 Detected Skin Type</h4>
                    <Badge className="bg-blue-600 text-white text-lg px-4 py-2">{analysisResults.skinType}</Badge>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-lg border border-orange-600/30">
                    <h4 className="font-semibold text-white mb-3">⚠️ Main Concerns</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.concerns.map((concern, index) => (
                        <Badge key={index} className="bg-orange-600 text-white">
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-gray-300">
                    🤖 Our AI has analyzed your skin and found {analysisResults.recommendations.length} perfect products
                    for you!
                  </p>
                  <Button
                    onClick={() => onNavigate("recommendations")}
                    className="bg-green-600 hover:bg-green-700 h-12 px-8 text-lg"
                  >
                    🛍️ View My Personalized Products <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => (currentStep > 1 ? setCurrentStep(currentStep - 1) : onNavigate("home"))}
          className="mb-6 text-gray-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 1 ? "Back to Home" : "Previous Step"}
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🤖 AI Skin & Hair Analyzer</h1>
          <p className="text-xl text-gray-400">Get personalized product recommendations powered by AI</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep >= step ? "bg-green-600 text-white shadow-lg" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${currentStep > step ? "bg-green-600" : "bg-gray-700"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">
            Step {currentStep} of 4 • {Math.round((currentStep / 4) * 100)}% Complete
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  )
}

export default SkinHairAnalyzer
