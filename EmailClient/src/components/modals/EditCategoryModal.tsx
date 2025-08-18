"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog } from "@headlessui/react"
import axios from "axios"
import URL from "../api/api"
import useToast from "../../hooks/useToast"

interface EditCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (newCategory: string) => void
  currentCategory?: string
  id?: string
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ isOpen, onClose, onSubmit, currentCategory, id }) => {
  const [categories] = useState<string[]>(["dynamic_content", "marketing_campaign", "static_content", "general"])

  const categoryLabels: Record<string, string> = {
    dynamic_content: "Dynamic Content",
    marketing_campaign: "Marketing Campaign",
    static_content: "Static Content",
    general: "General",
  }
  const { showSuccess, showError } = useToast()
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (currentCategory) setSelectedCategory(currentCategory)
  }, [currentCategory])

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value)
  }

  const handleSubmit = async () => {
    if (selectedCategory) {
      setIsSubmitting(true)
      try {
        console.log(selectedCategory)

        // Perform PUT request to update the category
        const response = await axios.put(URL.UPDATE_TEMPLATE(id), { category: selectedCategory })
        console.log("Category updated successfully:", response.data)
        showSuccess("Category updated successfully")
        onSubmit(selectedCategory) // Pass the updated category to the parent
        onClose()
      } catch (error) {
        showError("Failed to update category")
        console.error("Failed to update category:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">Change Category</Dialog.Title>
          <div className="space-y-4">
            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Select Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {categoryLabels[category]} {/* Display the human-readable label */}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default EditCategoryModal
