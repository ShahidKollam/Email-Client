"use client"

import type React from "react"
import { useState } from "react"

interface SendBulkMailModalProps {
  isOpen: boolean
  onClose: () => void
  formValues: {
    email: string[]
    [key: string]: string | string[]
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void
  onAddEmailField: () => void
  onSubmit: () => void
  errorProp?: string
}

const SendBulkMailModal: React.FC<SendBulkMailModalProps> = ({
  isOpen,
  onClose,
  formValues,
  onInputChange,
  onAddEmailField,
  onSubmit,
  errorProp,
}) => {
  const [localError, setLocalError] = useState<string | null>(errorProp || null)
  console.log(errorProp)

  const handleSubmit = () => {
    // Validate emails only if email fields are not empty
    if (formValues.email.some((email) => email && !email.includes("@"))) {
      setLocalError("Please provide valid email addresses")
      return
    }

    setLocalError(null)
    onSubmit()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl overflow-y-auto">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Send Bulk Email</h2>

        {/* Email ID Inputs */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Recipient Email ID (optional)</label>
          {formValues.email.map((_, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="email"
                name="email"
                value={formValues.email[index]}
                onChange={(e) => onInputChange(e, index)}
                className="mt-2 block w-full p-3 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter recipient's email"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={onAddEmailField}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold"
          >
            + Add another email
          </button>

          {/* Error Message */}
          {localError && <div className="text-red-700 text-sm mb-4">{localError}</div>}
          {errorProp && <div className="text-red-700 text-sm mb-4">{errorProp}</div>}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-6 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-300 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit} // Use handleSubmit for error handling
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendBulkMailModal
