"use client"

import { CheckCircle, Info, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

const NotificationToast = ({ message, type = "success" }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2700) // Hide slightly before parent removes it

    return () => clearTimeout(timer)
  }, [])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />
      default:
        return <Info className="h-5 w-5 text-gray-400" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-900/70 border-green-700/50"
      case "info":
        return "bg-blue-900/70 border-blue-700/50"
      case "error":
        return "bg-red-900/70 border-red-700/50"
      default:
        return "bg-gray-900/70 border-gray-700/50"
    }
  }

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-md border ${getBgColor()} transition-all duration-300 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      role="alert"
      aria-live="assertive"
    >
      {getIcon()}
      <span className="text-white text-sm font-medium">{message}</span>
    </div>
  )
}

export default NotificationToast
