"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert("Thank you for subscribing!")
    setEmail("")
  }

  return (
    <section className="py-20 bg-gradient-to-r from-green-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stay Updated</h2>
        <p className="text-lg text-gray-300 mb-8">
          Subscribe to our newsletter for the latest updates on new products and exclusive offers
        </p>
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
            required
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
