"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { X, Send, Bot } from "lucide-react"

const AIAssistant = ({ isOpen, onClose, onProductRecommend }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const predefinedResponses = {
    hello: "Hi there! How can I assist you today with your natural beauty needs?",
    "skin type":
      "To help you better, please tell me more about your skin concerns. Are you looking for products for oily, dry, combination, normal, or sensitive skin?",
    "hair type": "For hair, are you looking for solutions for oily, dry, normal, curly, or straight hair?",
    "recommend products":
      "I can help with that! What kind of products are you interested in? For example, 'shampoo for oily hair' or 'face cream for dry skin'.",
    "thank you": "You're welcome! Is there anything else I can help you with?",
    "about mamaearth":
      "MamaEarth is dedicated to providing natural, toxin-free, and safe products for babies, beauty, and personal care. We believe in 'Goodness Inside' and plant a tree for every order!",
    "tree planted":
      "Every order with MamaEarth helps us plant a tree! You can track your impact on the 'Impact' page once you're signed in.",
    "how to use": "Just type your questions or requests in the chat box, and I'll do my best to assist you!",
    "oily hair shampoo":
      "For oily hair, I recommend our 'Onion Hair Shampoo' or 'Tea Tree Shampoo'. They help control oil and keep your scalp healthy.",
    "dry skin face cream":
      "Our 'Ubtan Face Cream' or 'Vitamin C Face Cream' are excellent for dry skin, providing deep hydration and nourishment.",
    "acne products":
      "For acne, consider our 'Tea Tree Face Wash' and 'Bye Bye Blemishes Face Cream'. They are formulated to combat acne and reduce marks.",
    "dark spots":
      "Our 'Bye Bye Blemishes Face Cream' and 'Vitamin C Face Wash' are great for reducing dark spots and improving skin radiance.",
    "aging skin":
      "For aging skin, I suggest our 'Retinol Face Cream' and 'Green Tea Face Serum' to help reduce fine lines and improve elasticity.",
    dullness: "To combat dullness, try our 'Vitamin C Face Wash' and 'Ubtan Face Mask' for a brighter complexion.",
    "sensitive skin":
      "For sensitive skin, our 'Aloe Vera Gel' and 'Oatmeal & Milk Body Lotion' are gentle and soothing.",
    pores: "To minimize pores, our 'Tea Tree Face Toner' and 'Charcoal Face Mask' can be very effective.",
    default:
      "I'm still learning! Can you rephrase that or ask something else? You can try questions like 'recommend products', 'skin type', or 'about MamaEarth'.",
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    const newUserMessage = { id: Date.now(), text: input, sender: "user" }
    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = predefinedResponses[input.toLowerCase()] || predefinedResponses["default"]

      // Check for product recommendation keywords
      if (input.toLowerCase().includes("recommend products for")) {
        const productQuery = input.toLowerCase().replace("recommend products for", "").trim()
        if (productQuery.includes("oily hair")) {
          aiResponse = "For oily hair, I recommend our 'Onion Hair Shampoo' and 'Tea Tree Hair Mask'."
          onProductRecommend(["Onion Hair Shampoo", "Tea Tree Hair Mask"])
        } else if (productQuery.includes("dry skin")) {
          aiResponse = "For dry skin, try our 'Ubtan Face Cream' and 'Vitamin C Serum'."
          onProductRecommend(["Ubtan Face Cream", "Vitamin C Serum"])
        } else if (productQuery.includes("acne")) {
          aiResponse =
            "For acne-prone skin, our 'Tea Tree Face Wash' and 'Bye Bye Blemishes Face Cream' are highly effective."
          onProductRecommend(["Tea Tree Face Wash", "Bye Bye Blemishes Face Cream"])
        } else {
          aiResponse = `I can recommend products for "${productQuery}". Please navigate to the products page to see relevant items.`
          onProductRecommend([productQuery]) // Pass the query to filter products
        }
      } else if (input.toLowerCase().includes("shampoo for")) {
        const hairType = input.toLowerCase().replace("shampoo for", "").trim()
        if (hairType.includes("oily")) {
          aiResponse = "For oily hair, I recommend our 'Onion Hair Shampoo' or 'Tea Tree Shampoo'."
          onProductRecommend(["Onion Hair Shampoo", "Tea Tree Shampoo"])
        } else if (hairType.includes("dry")) {
          aiResponse = "For dry hair, try our 'Argan Hair Shampoo' or 'Rice Water Shampoo'."
          onProductRecommend(["Argan Hair Shampoo", "Rice Water Shampoo"])
        } else {
          aiResponse = `I can help you find a shampoo for ${hairType}. Please navigate to the products page and search for it.`
          onProductRecommend([`shampoo ${hairType}`])
        }
      } else if (input.toLowerCase().includes("face cream for")) {
        const skinType = input.toLowerCase().replace("face cream for", "").trim()
        if (skinType.includes("dry")) {
          aiResponse = "Our 'Ubtan Face Cream' or 'Vitamin C Face Cream' are excellent for dry skin."
          onProductRecommend(["Ubtan Face Cream", "Vitamin C Face Cream"])
        } else if (skinType.includes("oily")) {
          aiResponse = "For oily skin, try our 'Tea Tree Face Cream' or 'Oil-Free Face Moisturizer'."
          onProductRecommend(["Tea Tree Face Cream", "Oil-Free Face Moisturizer"])
        } else {
          aiResponse = `I can help you find a face cream for ${skinType}. Please navigate to the products page and search for it.`
          onProductRecommend([`face cream ${skinType}`])
        }
      }

      const newAiMessage = { id: Date.now() + 1, text: aiResponse, sender: "ai" }
      setMessages((prev) => [...prev, newAiMessage])
      setIsLoading(false)
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
      <div className="relative w-full max-w-md h-[80vh] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col border border-gray-700/50 animate-slideInRight">
        <Card className="flex flex-col h-full bg-transparent border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Bot className="h-6 w-6 text-green-400" />
              <CardTitle className="text-xl font-bold text-white">MamaEarth AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <Bot className="h-12 w-12 mb-4 text-green-500" />
                <p className="text-lg font-semibold">How can I help you today?</p>
                <p className="text-sm">Ask me about products, skin/hair concerns, or MamaEarth!</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={cn(
                    "max-w-[70%] p-3 rounded-lg shadow-md",
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-700 text-gray-100 rounded-bl-none",
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-700 text-gray-100 rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700/50 flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
              disabled={isLoading}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default AIAssistant
