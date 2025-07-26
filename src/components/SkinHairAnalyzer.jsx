"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ArrowLeft, Sparkles, CheckCircle, Loader2 } from "lucide-react"
import { cn } from "../lib/utils"

const SkinHairAnalyzer = ({ onNavigate, setUserProfile, showNotification, setRecommendations }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    skinType: "",
    skinConcerns: [],
    hairType: "",
    hairConcerns: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const skinTypes = ["oily", "dry", "combination", "normal", "sensitive"]
  const skinConcerns = ["acne", "dark-spots", "aging", "dullness", "sensitivity", "pores"]
  const hairTypes = ["oily", "dry", "normal", "curly", "straight"]
  const hairConcerns = ["hair-fall", "dandruff", "frizz", "split-ends", "greying"]

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleToggleConcern = (field, concern) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(concern) ? prev[field].filter((c) => c !== concern) : [...prev[field], concern],
    }))
  }

  const handleAnalyze = async () => {
    setIsLoading(true)
    // Simulate API call for analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save profile
    setUserProfile(formData)
    showNotification("Analysis complete! Generating recommendations...", "success")

    // Simulate recommendation generation
    const generatedRecommendations = generateProductRecommendations(formData)
    setRecommendations(generatedRecommendations)

    setIsLoading(false)
    setAnalysisComplete(true)
  }

  const generateProductRecommendations = (profile) => {
    const { skinType, skinConcerns, hairType, hairConcerns } = profile
    const recommendations = []

    // Example logic for recommendations (can be expanded)
    if (skinType === "oily" || skinConcerns.includes("acne") || skinConcerns.includes("pores")) {
      recommendations.push("Tea Tree Face Serum", "Charcoal Face Mask")
    }
    if (skinType === "dry" || skinConcerns.includes("dullness") || skinConcerns.includes("aging")) {
      recommendations.push("Vitamin C Daily Glow Face Cream", "Ubtan Face Wash")
    }
    if (skinType === "sensitive") {
      recommendations.push("Aloe Vera Gel")
    }

    if (hairType === "oily" || hairConcerns.includes("dandruff")) {
      recommendations.push("Onion Hair Oil")
    }
    if (hairType === "dry" || hairConcerns.includes("frizz") || hairConcerns.includes("split-ends")) {
      recommendations.push("Rice Water Shampoo", "Argan Hair Mask")
    }
    if (hairConcerns.includes("hair-fall")) {
      recommendations.push("Onion Hair Oil")
    }

    // Remove duplicates and return
    return [...new Set(recommendations)]
  }

  if (analysisComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20 pb-12 flex items-center justify-center text-white">
        <Card className="glass-effect border border-gray-700/50 shadow-2xl w-full max-w-md text-center p-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6 animate-bounce" />
          <CardTitle className="text-4xl font-bold mb-4">Analysis Complete!</CardTitle>
          <p className="text-lg text-gray-300 mb-6">Your personalized recommendations are ready.</p>
          <Button
            onClick={() => onNavigate("recommendations")}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105"
          >
            View Recommendations
          </Button>
        </Card>
      </div>
    )
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
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <CardTitle className="text-3xl font-bold text-white mb-2">Skin & Hair Analyzer</CardTitle>
            <p className="text-gray-400">Answer a few questions to get personalized product recommendations.</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">1. Tell us about your Skin</h3>
                <div>
                  <label className="block text-white text-sm font-medium mb-3">What is your skin type?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {skinTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={formData.skinType === type ? "default" : "outline"}
                        onClick={() => handleSelect("skinType", type)}
                        className={cn(
                          "py-3 rounded-xl text-base font-medium",
                          formData.skinType === type
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50",
                        )}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-3">
                    Any specific skin concerns? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {skinConcerns.map((concern) => (
                      <Button
                        key={concern}
                        type="button"
                        variant={formData.skinConcerns.includes(concern) ? "default" : "outline"}
                        onClick={() => handleToggleConcern("skinConcerns", concern)}
                        className={cn(
                          "py-3 rounded-xl text-base font-medium",
                          formData.skinConcerns.includes(concern)
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50",
                        )}
                      >
                        {concern.charAt(0).toUpperCase() + concern.slice(1).replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!formData.skinType}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Next: Hair Profile
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">2. Tell us about your Hair</h3>
                <div>
                  <label className="block text-white text-sm font-medium mb-3">What is your hair type?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hairTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={formData.hairType === type ? "default" : "outline"}
                        onClick={() => handleSelect("hairType", type)}
                        className={cn(
                          "py-3 rounded-xl text-base font-medium",
                          formData.hairType === type
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50",
                        )}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-3">
                    Any specific hair concerns? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hairConcerns.map((concern) => (
                      <Button
                        key={concern}
                        type="button"
                        variant={formData.hairConcerns.includes(concern) ? "default" : "outline"}
                        onClick={() => handleToggleConcern("hairConcerns", concern)}
                        className={cn(
                          "py-3 rounded-xl text-base font-medium",
                          formData.hairConcerns.includes(concern)
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-700/50",
                        )}
                      >
                        {concern.charAt(0).toUpperCase() + concern.slice(1).replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-white font-semibold py-3 rounded-xl text-lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleAnalyze}
                    disabled={isLoading || !formData.hairType}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <span>Get Recommendations</span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SkinHairAnalyzer
