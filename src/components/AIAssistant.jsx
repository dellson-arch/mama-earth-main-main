"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Bot, Camera } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { CardContent, CardHeader, CardTitle } from "./ui/card"

const AIAssistant = ({ isOpen, onClose, onProductRecommend }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hi! I'm your MamaEarth beauty assistant! 🌿 I can help you find the perfect natural products for your skin and hair. What's your concern today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const quickQuestions = [
    { text: "Best products for acne", icon: "🌟", concern: "acne" },
    { text: "Hair fall solutions", icon: "💇‍♀️", concern: "hair-fall" },
    { text: "Dry skin remedies", icon: "💧", concern: "dry-skin" },
    { text: "Natural anti-aging", icon: "✨", concern: "anti-aging" },
  ]

  const productDatabase = {
    acne: [
      { name: "Tea Tree Face Wash", price: 399, rating: 4.5 },
      { name: "Neem Face Serum", price: 599, rating: 4.3 },
      { name: "Charcoal Face Mask", price: 299, rating: 4.4 },
    ],
    "hair-fall": [
      { name: "Onion Hair Oil", price: 399, rating: 4.6 },
      { name: "Bhringraj Shampoo", price: 349, rating: 4.4 },
      { name: "Rice Water Hair Mask", price: 449, rating: 4.2 },
    ],
    "dry-skin": [
      { name: "Aloe Vera Gel", price: 249, rating: 4.5 },
      { name: "Vitamin C Moisturizer", price: 549, rating: 4.3 },
      { name: "Coconut Oil Body Lotion", price: 399, rating: 4.4 },
    ],
    "anti-aging": [
      { name: "Vitamin C Face Serum", price: 699, rating: 4.7 },
      { name: "Retinol Night Cream", price: 899, rating: 4.5 },
      { name: "Collagen Face Mask", price: 499, rating: 4.3 },
    ],
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    // Check for specific concerns
    if (lowerMessage.includes("acne") || lowerMessage.includes("pimple") || lowerMessage.includes("breakout")) {
      return {
        content:
          "I understand you're dealing with acne! 🌿 Here are some amazing natural products that can help clear your skin:",
        products: productDatabase.acne,
        concern: "acne",
      }
    }

    if (lowerMessage.includes("hair fall") || lowerMessage.includes("hair loss") || lowerMessage.includes("thinning")) {
      return {
        content:
          "Hair fall can be frustrating! 💚 These natural products have helped thousands of customers strengthen their hair:",
        products: productDatabase["hair-fall"],
        concern: "hair-fall",
      }
    }

    if (lowerMessage.includes("dry skin") || lowerMessage.includes("moistur") || lowerMessage.includes("hydrat")) {
      return {
        content: "Dry skin needs extra love! 💧 These hydrating products will restore your skin's natural moisture:",
        products: productDatabase["dry-skin"],
        concern: "dry-skin",
      }
    }

    if (lowerMessage.includes("aging") || lowerMessage.includes("wrinkle") || lowerMessage.includes("fine line")) {
      return {
        content: "Let's fight those signs of aging naturally! ✨ These anti-aging products are perfect for you:",
        products: productDatabase["anti-aging"],
        concern: "anti-aging",
      }
    }

    if (lowerMessage.includes("photo") || lowerMessage.includes("picture") || lowerMessage.includes("image")) {
      return {
        content:
          "Great idea! 📸 You can upload a photo using our AI Skin Analyzer. It will analyze your skin and give you personalized recommendations. Would you like me to take you there?",
        hasAction: true,
        actionText: "Open AI Analyzer",
        actionType: "analyzer",
      }
    }

    // Default responses
    const defaultResponses = [
      "That's a great question! Can you tell me more about your specific skin or hair concerns? I'm here to help you find the perfect natural solution! 🌿",
      "I'd love to help you with that! Could you share more details about what you're looking for? Are you dealing with any specific skin or hair issues?",
      "Thanks for asking! To give you the best recommendations, could you tell me about your skin type or any particular concerns you have?",
    ]

    return {
      content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
    }
  }

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(message)
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: botResponse.content,
        products: botResponse.products,
        concern: botResponse.concern,
        hasAction: botResponse.hasAction,
        actionText: botResponse.actionText,
        actionType: botResponse.actionType,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question) => {
    handleSendMessage(question.text)
  }

  const handleProductRecommend = (products) => {
    onProductRecommend(products.map((p) => p.name))
  }

  const handleAction = (actionType) => {
    if (actionType === "analyzer") {
      onClose()
      // This would navigate to analyzer - we'll handle this in the parent component
      window.dispatchEvent(new CustomEvent("navigate-to-analyzer"))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      <div className="w-full max-w-md h-[600px] glass-effect border border-gray-700 rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">AI Beauty Assistant</CardTitle>
              <p className="text-xs text-green-400">Online • Ready to help</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-gray-100 border border-gray-700"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === "bot" && <Bot className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>

                    {/* Product Recommendations */}
                    {message.products && (
                      <div className="mt-3 space-y-2">
                        {message.products.map((product, index) => (
                          <div key={index} className="bg-gray-700/50 rounded-lg p-2 border border-gray-600">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-white">{product.name}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-green-400 font-semibold">₹{product.price}</span>
                                  <span className="text-yellow-400 text-xs">★ {product.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          size="sm"
                          onClick={() => handleProductRecommend(message.products)}
                          className="w-full bg-green-600 hover:bg-green-700 mt-2"
                        >
                          View All Products
                        </Button>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {message.hasAction && (
                      <Button
                        size="sm"
                        onClick={() => handleAction(message.actionType)}
                        className="mt-2 bg-green-600 hover:bg-green-700"
                      >
                        <Camera className="h-3 w-3 mr-1" />
                        {message.actionText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-green-400" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start"
                >
                  <span className="mr-1">{question.icon}</span>
                  {question.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about skin or hair concerns..."
              className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
