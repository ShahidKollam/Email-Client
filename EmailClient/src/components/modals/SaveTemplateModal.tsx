"use client"

import type React from "react"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Dialog } from "@headlessui/react"

interface FormValues {
  templateName: string
  category: string
  description: string
  subject: string
}

interface SaveTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: FormValues) => void
}

const SaveTemplateModal: React.FC<SaveTemplateModalProps> = ({ isOpen, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      onSave(data)
      onClose()
    } catch (error) {
      console.error("Error saving template", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">Save Template</Dialog.Title>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="space-y-4">
              {/* Template Name */}
              <div>
                <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">
                  Template Name
                </label>
                <input
                  id="templateName"
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border ${errors.templateName ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register("templateName", { required: "Template name is required" })}
                />
                {errors.templateName && <p className="mt-1 text-sm text-red-500">{errors.templateName.message}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Email Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border ${errors.subject ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("category", { required: "Category is required" })}
                >
                  <option value="dynamic_content">Dynamic Content</option>
                  <option value="marketing_campaign">Marketing Campaign</option>
                  <option value="static_content">Static Content</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("description")}
                  rows={4}
                />
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
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default SaveTemplateModal
