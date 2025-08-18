import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Define the types for the custom hook
type UseToast = {
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
  showWarning: (message: string) => void
}

// Custom Hook in TypeScript
const useToast = (): UseToast => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      position: "bottom-right", // Use string literals for position
      autoClose: 9000, // Closes after 3 seconds
      theme: "dark",
    })
  }

  const showError = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 9000,
      theme: "dark",
    })
  }

  const showInfo = (message: string) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 9000,
      theme: "dark",
    })
  }

  const showWarning = (message: string) => {
    toast.warn(message, {
      position: "bottom-right",
      autoClose: 9000,
      theme: "dark",
    })
  }

  return { showSuccess, showError, showInfo, showWarning }
}

export default useToast
