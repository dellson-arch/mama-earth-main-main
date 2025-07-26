"use client"

import { useState } from "react"
import { X, Send, Bot, Sparkles } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const AIAssistant = ({ isOpen, onClose, onProductRecommend }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your MamaEarth AI Assistant. How can I help you today? I can recommend products, answer questions about ingredients, or help with your skin/hair concerns.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    const userMessage = { id: messages.length + 1, sender: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = ""
      const lowerInput = userMessage.text.toLowerCase()

      if (lowerInput.includes("skin type") || lowerInput.includes("skin concern")) {
        aiResponse =
          "To give you the best recommendations for your skin, I suggest you try our personalized Skin & Hair Analyzer. Would you like to go there now?"
        // Trigger navigation to analyzer
        setTimeout(() => {
          if (window) {
            window.dispatchEvent(new CustomEvent("navigate-to-analyzer"))
          }
        }, 2000)
      } else if (lowerInput.includes("hair fall") || lowerInput.includes("hair growth")) {
        aiResponse =
          "For hair fall and growth concerns, our Onion Hair Oil and Onion Shampoo are highly effective. They are made with natural ingredients to strengthen hair and reduce breakage. Would you like me to recommend these products?"
        onProductRecommend(["Onion Hair Oil", "Onion Shampoo"])
      } else if (lowerInput.includes("vitamin c serum") || lowerInput.includes("brightening")) {
        aiResponse =
          "Our Vitamin C Face Serum is a bestseller for brightening and reducing dark spots. It's packed with natural Vitamin C and Turmeric for a radiant glow. Would you like me to recommend this product?"
        onProductRecommend(["Vitamin C Face Serum"])
      } else if (lowerInput.includes("ubtan face wash") || lowerInput.includes("tan removal")) {
        aiResponse =
          "The Ubtan Face Wash is perfect for deep cleansing and tan removal, giving you a natural glow with ingredients like Turmeric and Saffron. Would you like me to recommend this product?"
        onProductRecommend(["Ubtan Face Wash"])
      } else if (lowerInput.includes("natural ingredients") || lowerInput.includes("toxin free")) {
        aiResponse =
          "MamaEarth is India's first MadeSafe certified brand, ensuring all our products are 100% natural and toxin-free. We are committed to providing safe and effective solutions for your family."
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        aiResponse = "Hi there! How can I assist you with your natural beauty journey today?"
      } else if (lowerInput.includes("thank you") || lowerInput.includes("thanks")) {
        aiResponse = "You're most welcome! Is there anything else I can help you with?"
      } else {
        aiResponse =
          "I'm still learning! Could you please rephrase your question or ask about specific products or concerns? For personalized recommendations, try our Skin & Hair Analyzer."
      }

      setMessages((prev) => [...prev, { id: prev.length + 1, sender: "ai", text: aiResponse }])
      setIsLoading(false)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-gray-900/95 border-gray-700/50 text-white rounded-3xl shadow-2xl flex flex-col h-[80vh] max-h-[600px]">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-700/50">
          <CardTitle className="text-2xl font-bold flex items-center text-white">
            <Bot className="h-6 w-6 mr-2 text-green-400" />
            AI Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] p-3 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[75%] p-3 rounded-xl bg-gray-800 text-gray-100 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 animate-pulse text-green-400" />
                  <span>Typing...</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <form onSubmit={handleSend} className="p-6 border-t border-gray-700/50 flex items-center gap-3">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl py-2 px-4"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default AIAssistant
