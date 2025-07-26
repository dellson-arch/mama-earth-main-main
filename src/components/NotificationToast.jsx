import { cn } from "../lib/utils"
import { CheckCircle, XCircle, Info } from "lucide-react"

const NotificationToast = ({ message, type = "success" }) => {
  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-400" />,
    error: <XCircle className="h-5 w-5 text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-400" />,
  }

  const bgColorMap = {
    success: "bg-green-900/70 border-green-700/50",
    error: "bg-red-900/70 border-red-700/50",
    info: "bg-blue-900/70 border-blue-700/50",
  }

  return (
    <div
      className={cn(
        "flex items-center space-x-3 p-4 rounded-xl shadow-lg backdrop-blur-md text-white text-sm animate-slideInRight",
        bgColorMap[type],
        "border",
      )}
      style={{ minWidth: "250px" }}
    >
      {iconMap[type]}
      <span>{message}</span>
    </div>
  )
}

export default NotificationToast
