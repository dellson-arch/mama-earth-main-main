"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Mail, Send, Loader2 } from "lucide-react"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setIsSubmitting(true)

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setMessage({ type: "success", text: "Thank you for subscribing!" })
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <Card className="glass-effect border border-gray-700/50 shadow-2xl p-8 max-w-3xl mx-auto text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <CardHeader className="mb-6">
          <Mail className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold text-white mb-2">Join Our Newsletter</CardTitle>
          <p className="text-lg text-gray-300">
            Get exclusive offers, new product updates, and natural beauty tips directly to your inbox.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Subscribing...</span>
                </div>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" /> Subscribe
                </>
              )}
            </Button>
          </form>
          {message && (
            <p className={message.type === "error" ? "mt-4 text-sm text-red-400" : "mt-4 text-sm text-green-400"}>
              {message.text}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

export default NewsletterSection
