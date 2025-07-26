"use client"

import { Button } from "./ui/Button"

const NewsletterSection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/95 to-emerald-600/95"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Updated with Nature's Best</h2>
          <p className="text-xl text-green-100 leading-relaxed">
            Get the latest updates on new products, exclusive offers, and natural beauty tips delivered to your inbox
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-white/30 text-gray-900 placeholder-gray-500 font-medium shadow-lg"
          />
          <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Subscribe Now
          </Button>
        </div>

        <p className="text-green-100 text-sm">Join 500,000+ subscribers. No spam, unsubscribe anytime.</p>
      </div>
    </section>
  )
}

export default NewsletterSection
