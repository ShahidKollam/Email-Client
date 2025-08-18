"use client"

import type React from "react"
import { useState } from "react"

interface GenerateClientModalProps {
  showModal: boolean
  onClose: () => void
  onGenerate: (clientName: string) => void
}

const GenerateClientModal: React.FC<GenerateClientModalProps> = ({ showModal, onClose, onGenerate }) => {
  const [clientName, setClientName] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = () => {
    if (clientName.trim() === "") {
      setError("Client name is required.")
    } else if (clientName.length < 3) {
      setError("Client name must be at least 3 characters long.")
    } else {
      setError("")
      onGenerate(clientName)
      onClose()
    }
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[400px] max-w-[90vw]">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Generate New Client</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="clientName">
            Client Name
          </label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter Client Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  )
}

export default GenerateClientModal
