"use client"

import { useState } from "react"
import { EyeIcon } from "@heroicons/react/outline"
import useFetchTemplates from "../../hooks/useFetchTemplates"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import Loading from "../general/Loading"
import Error from "../general/Error"
import type { Template } from "../../types/types"
import { extractPlaceholders } from "../../utils/extractPlaceholders"
import { EmailAutomationModal } from "../modals/EmailAutomationModal"
import PreviewModal from "../modals/PreviewModal"

const TemplateTable = () => {
  const user = useSelector((state: RootState) => state.user)
  const { error, loading, templates } = useFetchTemplates(user.id)

  const [currentPage, setCurrentPage] = useState(1)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("")
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false) // State for PreviewModal
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null) // Store selected template data
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    date: "",
    time: "",
    recipient: "",
  })
  const itemsPerPage = 5

  const handleAutomateEmail = (template: Template) => {
    setSelectedTemplateId(template?.id || "")
    const placeholders = extractPlaceholders(template?.html_content || "")
    const initialValues: { [key: string]: string } = {}
    placeholders.forEach((placeholder) => {
      initialValues[placeholder] = ""
    })
    setFormValues(initialValues)
    setIsScheduleModalOpen(true)
  }

  const previewTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setIsPreviewModalOpen(true)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = Array.isArray(templates) ? templates.slice(indexOfFirstItem, indexOfLastItem) : []
  const totalPages = Math.ceil(templates.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full border-collapse bg-gray-50 rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <tr>
            <th className="py-4 px-6 font-semibold text-left w-1/5">Template ID</th>
            <th className="py-4 px-6 font-semibold text-left w-2/5">Template Name</th>
            <th className="py-4 px-6 font-semibold text-left w-1/5">Category</th>
            <th className="py-4 px-6 font-semibold text-center w-1/5">Automate</th>
            <th className="py-4 px-6 font-semibold text-center w-1/5">Preview</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentItems.length > 0 ? (
            currentItems.map((template) => (
              <tr key={template.id} className="hover:bg-indigo-50">
                <td className="py-4 px-6 text-gray-700">{template.id}</td>
                <td className="py-4 px-6 text-gray-700 max-w-xs truncate">{template.template_name}</td>
                <td className="py-4 px-6 text-gray-700">{template.category}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleAutomateEmail(template)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
                  >
                    Schedule
                  </button>
                </td>
                <td className="py-4 px-6 text-center">
                  <button onClick={() => previewTemplate(template)} className="text-indigo-600 hover:text-indigo-800">
                    <EyeIcon className="h-6 w-6 inline-block" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-6 px-6 text-center font-semibold text-xl text-red-600">
                No templates available. Please check back later or create new templates.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {templates.length > 0 ? (
        <div className="mt-6 flex justify-center gap-5 items-center px-6 py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-300"
          >
            Previous
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-300"
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Render EmailAutomationModal */}
      <EmailAutomationModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        // userId={user.id}
        templateId={selectedTemplateId}
        placeholders={formValues}
      />

      {/* Render PreviewModal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        template={selectedTemplate}
      />
    </div>
  )
}

export default TemplateTable
