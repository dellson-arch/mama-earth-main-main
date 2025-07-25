"use client"

import { Leaf, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">MamaEarth</span>
            </div>
            <p className="text-gray-400 text-sm">
              India's first MadeSafe certified brand. Natural, toxin-free products for you and your family.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate("home")} className="text-gray-400 hover:text-white text-sm">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("products")} className="text-gray-400 hover:text-white text-sm">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("analyzer")} className="text-gray-400 hover:text-white text-sm">
                  AI Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("about")} className="text-gray-400 hover:text-white text-sm">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📧 support@mamaearth.in</p>
              <p>📞 1800-123-4567</p>
              <p>📍 Gurugram, Haryana, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 MamaEarth. All rights reserved. Made with 💚 for families.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
