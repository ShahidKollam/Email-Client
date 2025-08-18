"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import useToast from "../../hooks/useToast"

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  templateId: string
  placeholders: { [key: string]: string }
}

export const EmailAutomationModal: React.FC<EmailModalProps> = ({ isOpen, onClose, templateId, placeholders }) => {
  const [formValues, setFormValues] = useState(placeholders)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showSuccess, showError } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormValues((prev) => ({ ...prev, [id]: value }))
  }

  const validateForm = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formValues.recipient || !emailRegex.test(formValues.recipient)) {
      return "Please enter a valid email address."
    }

    // Validate date and time
    if (!formValues.date || !formValues.time) {
      return "Please select both date and time."
    }

    return null
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      const { date, time, recipient, ...dynamicPlaceholders } = formValues
      const payload = {
        templateId,
        timeInput: time,
        dateInput: date,
        recipient,
        placeholders: dynamicPlaceholders,
      }

      const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/api/sendmail/automate-email`, payload)

      if (response.status === 201) {
        console.log("Email scheduled successfully:", response.data)
        showSuccess("Email scheduled successfully")
        onClose()
      }
    } catch (err) {
      setError("Failed to schedule email. Please try again.")
      showError("Failed to schedule email.")
      console.error("Error scheduling email:", err)
    } finally {
      setLoading(false)
      setFormValues({})
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Automate Email</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {["date", "time", "recipient", ...Object.keys(placeholders)].map((key) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-semibold text-gray-700">
                  {key === "recipient" ? "Email" : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  id={key}
                  type={key === "date" ? "date" : key === "time" ? "time" : "text"}
                  value={formValues[key] || ""}
                  onChange={handleChange}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder={key === "recipient" ? "Enter recipient email" : `Enter ${key}`}
                />
              </div>
            ))}
          </div>

          {error && <div className="text-red-500 text-sm mt-4 font-semibold">{error}</div>}

          <div className="flex justify-end items-center gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none transition"
            >
              {loading ? "Scheduling..." : "Schedule Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
