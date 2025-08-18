"use client"

import type React from "react"

interface InjectValuesModalProps {
  isOpen: boolean
  onClose: () => void
  formValues: Record<string, string>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}

const InjectValuesModal: React.FC<InjectValuesModalProps> = ({
  isOpen,
  onClose,
  formValues,
  onInputChange,
  onSubmit,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Inject Values</h2>

        <div className="space-y-4">
          {/* Dynamic inputs based on placeholders */}
          {Object.keys(formValues).map((key) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="text-gray-700">
                {key}
              </label>
              <input
                type="text"
                name={key}
                id={key}
                value={formValues[key]}
                onChange={onInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={onSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default InjectValuesModal
