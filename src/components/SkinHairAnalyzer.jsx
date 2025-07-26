"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/Input"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Sparkles, ChevronRight } from "lucide-react"

const SkinHairAnalyzer = ({ onNavigate, setUserProfile, showNotification, setRecommendations }) => {
  const [step, setStep] = useState(1)
  const [skinType, setSkinType] = useState("")
  const [hairType, setHairType] = useState("")
  const [skinConcerns, setSkinConcerns] = useState([])
  const [hairConcerns, setHairConcerns] = useState([])
  const [name, setName] = useState("")

  const handleSkinConcernChange = (concern) => {
    setSkinConcerns((prev) => (prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]))
  }

  const handleHairConcernChange = (concern) => {
    setHairConcerns((prev) => (prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]))
  }

  const handleSubmit = () => {
    if (!name || !skinType || !hairType || skinConcerns.length === 0 || hairConcerns.length === 0) {
      showNotification("Please answer all questions to get personalized recommendations.", "error")
      return
    }

    const profile = { name, skinType, hairType, concerns: [...skinConcerns, ...hairConcerns] }
    setUserProfile(profile)

    // Simulate generating recommendations based on profile
    const generatedRecommendations = []
    if (skinType === "oily" && skinConcerns.includes("acne")) {
      generatedRecommendations.push({
        id: "6",
        name: "Tea Tree Face Wash",
        price: 249,
        originalPrice: 299,
        rating: 4.3,
        reviews: 987,
        category: "skincare",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
        description: "Purifying face wash with tea tree oil for acne-prone skin",
        benefits: ["Controls acne", "Purifies skin", "Reduces oiliness", "Natural antibacterial"],
        ingredients: ["Tea Tree Oil", "Salicylic Acid", "Neem", "Aloe Vera"],
      })
    }
    if (skinType === "dry" && skinConcerns.includes("dullness")) {
      generatedRecommendations.push({
        id: "1",
        name: "Vitamin C Face Serum",
        price: 599,
        originalPrice: 799,
        rating: 4.8,
        reviews: 2847,
        category: "skincare",
        isBestseller: true,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
        description: "Brightening serum with natural Vitamin C for glowing skin",
        benefits: ["Brightens skin", "Reduces dark spots", "Anti-aging", "Natural ingredients"],
        ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Aloe Vera"],
      })
    }
    if (hairType === "hair fall") {
      generatedRecommendations.push({
        id: "2",
        name: "Onion Hair Oil",
        price: 349,
        originalPrice: 449,
        rating: 4.6,
        reviews: 1923,
        category: "haircare",
        isNew: true,
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop",
        description: "Nourishing hair oil with onion extract for stronger hair",
        benefits: ["Reduces hair fall", "Promotes growth", "Strengthens roots", "Natural formula"],
        ingredients: ["Onion Extract", "Coconut Oil", "Argan Oil", "Rosemary"],
      })
    }
    if (hairType === "dry" && hairConcerns.includes("frizz")) {
      generatedRecommendations.push({
        id: "5",
        name: "Argan Hair Mask",
        price: 449,
        originalPrice: 599,
        rating: 4.4,
        reviews: 1234,
        category: "haircare",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
        description: "Deep conditioning mask with argan oil for damaged hair",
        benefits: ["Deep conditioning", "Repairs damage", "Adds shine", "Strengthens hair"],
        ingredients: ["Argan Oil", "Keratin", "Shea Butter", "Vitamin E"],
      })
    }

    setRecommendations(generatedRecommendations)
    showNotification("Recommendations generated successfully!")
    onNavigate("recommendations")
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-lg font-medium mb-3">
                What's your name?
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl py-3 px-4"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-lg font-medium mb-3">What's your skin type?</label>
              <RadioGroup value={skinType} onValueChange={setSkinType} className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200">
                  <RadioGroupItem value="oily" id="oily" className="text-green-500" />
                  <Label htmlFor="oily" className="text-gray-200 text-base">
                    Oily
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200">
                  <RadioGroupItem value="dry" id="dry" className="text-green-500" />
                  <Label htmlFor="dry" className="text-gray-200 text-base">
                    Dry
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200">
                  <RadioGroupItem value="combination" id="combination" className="text-green-500" />
                  <Label htmlFor="combination" className="text-gray-200 text-base">
                    Combination
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200">
                  <RadioGroupItem value="normal" id="normal" className="text-green-500" />
                  <Label htmlFor="normal" className="text-gray-200 text-base">
                    Normal
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!name || !skinType}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 text-lg flex items-center justify-center space-x-2"
            >
              Next <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 text-lg font-medium mb-3">What's your hair type?</label>
              <RadioGroup value={hairType} onValueChange={setHairType} className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200">
                  <RadioGroupItem value="oily" id="hair-oily" className="text-green-500" />
                  <Label htmlFor="hair-oily" className="text-gray-200 text-base">
                    Oily
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200">
                  <RadioGroupItem value="dry" id="hair-dry" className="text-green-500" />
                  <Label htmlFor="hair-dry" className="text-gray-200 text-base">
                    Dry
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200">
                  <RadioGroupItem value="normal" id="hair-normal" className="text-green-500" />
                  <Label htmlFor="hair-normal" className="text-gray-200 text-base">
                    Normal
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200">
                  <RadioGroupItem value="combination" id="hair-combination" className="text-green-500" />
                  <Label htmlFor="hair-combination" className="text-gray-200 text-base">
                    Combination
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              onClick={() => setStep(3)}
              disabled={!hairType}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 text-lg flex items-center justify-center space-x-2"
            >
              Next <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 text-lg font-medium mb-3">
                What are your main skin concerns? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Acne", "Dullness", "Dark Spots", "Fine Lines", "Sensitivity", "Uneven Tone"].map((concern) => (
                  <div
                    key={concern}
                    className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200"
                  >
                    <Checkbox
                      id={`skin-${concern}`}
                      checked={skinConcerns.includes(concern.toLowerCase())}
                      onCheckedChange={() => handleSkinConcernChange(concern.toLowerCase())}
                      className="border-gray-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`skin-${concern}`} className="text-gray-200 text-base">
                      {concern}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={() => setStep(4)}
              disabled={skinConcerns.length === 0}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 text-lg flex items-center justify-center space-x-2"
            >
              Next <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 text-lg font-medium mb-3">
                What are your main hair concerns? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Hair Fall", "Dandruff", "Frizz", "Dry Scalp", "Split Ends", "Lack of Volume"].map((concern) => (
                  <div
                    key={concern}
                    className="flex items-center space-x-2 bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 has-[:checked]:border-green-500 has-[:checked]:ring-2 has-[:checked]:ring-green-500/20 transition-all duration-200"
                  >
                    <Checkbox
                      id={`hair-${concern}`}
                      checked={hairConcerns.includes(concern.toLowerCase())}
                      onCheckedChange={() => handleHairConcernChange(concern.toLowerCase())}
                      className="border-gray-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`hair-${concern}`} className="text-gray-200 text-base">
                      {concern}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={hairConcerns.length === 0}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 text-lg flex items-center justify-center space-x-2"
            >
              Get My Recommendations <Sparkles className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Card className="w-full max-w-2xl bg-gray-800/50 border-gray-700/50 text-white rounded-2xl shadow-xl relative z-10">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
            Skin & Hair Analyzer
          </CardTitle>
          <p className="text-gray-300 text-lg">Answer a few questions to get personalized product recommendations.</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </div>
  )
}

export default SkinHairAnalyzer
