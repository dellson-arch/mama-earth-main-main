"use client"
import { Button } from "./ui/Button"
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react"

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-black/95 backdrop-blur-xl border-t border-gray-800/50 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-3 text-white hover:text-green-400 transition-all duration-300 group mb-4"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 group-hover:scale-110 transition-all duration-300">
              <span className="text-white font-bold text-md">M</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              MamaEarth
            </span>
          </button>
          <p className="text-sm leading-relaxed">
            Committed to crafting products that are free from harmful chemicals and toxins, using only the goodness of
            nature.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors duration-300"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Button
                variant="link"
                onClick={() => onNavigate("home")}
                className="text-gray-300 hover:text-green-400 p-0 h-auto"
              >
                Home
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                onClick={() => onNavigate("products")}
                className="text-gray-300 hover:text-green-400 p-0 h-auto"
              >
                Products
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                onClick={() => onNavigate("about")}
                className="text-gray-300 hover:text-green-400 p-0 h-auto"
              >
                About Us
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                onClick={() => onNavigate("community")}
                className="text-gray-300 hover:text-green-400 p-0 h-auto"
              >
                Community
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                onClick={() => onNavigate("impact")}
                className="text-gray-300 hover:text-green-400 p-0 h-auto"
              >
                Our Impact
              </Button>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Button variant="link" className="text-gray-300 hover:text-green-400 p-0 h-auto">
                Contact Us
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-gray-300 hover:text-green-400 p-0 h-auto">
                FAQs
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-gray-300 hover:text-green-400 p-0 h-auto">
                Shipping & Returns
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-gray-300 hover:text-green-400 p-0 h-auto">
                Privacy Policy
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-gray-300 hover:text-green-400 p-0 h-auto">
                Terms of Service
              </Button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-green-400" />
            <a
              href="mailto:support@mamaearth.in"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              support@mamaearth.in
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-green-400" />
            <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors duration-300">
              +91 98765 43210
            </a>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-green-400 mt-1" />
            <p className="text-gray-300">
              MamaEarth Headquarters, <br />
              123 Green Street, Eco City, <br />
              New Delhi, India - 110001
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/50 mt-12 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MamaEarth. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
