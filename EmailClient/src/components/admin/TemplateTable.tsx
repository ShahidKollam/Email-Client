"use client"

import type React from "react"
import { useState, useRef } from "react"
import { FaEllipsisH } from "react-icons/fa"
import useFetchTemplates from "../../hooks/useFetchTemplates"
import Loading from "../general/Loading"
import Error from "../general/Error"
import axios from "axios"
import useToast from "../../hooks/useToast"
import TemplateActionMenu from "../TemplateList/TemplateActionMenu"
import EditCategoryModal from "../modals/EditCategoryModal"
import useCloseMenu from "../../hooks/useCloseMenu"
import PreviewModal from "../modals/PreviewModal"

interface Template {
  id: string
  template_name?: string
  template_description?: string
  creator?: string
  User?: { name?: string }
  category: string
  html_content?: string
  css_content?: string
}

const TemplateTable: React.FC = () => {
  const { error, loading, templates, setTemplates } = useFetchTemplates()
  const { showSuccess, showError } = useToast()

  const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null)
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false) // State to control the preview modal
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null) // State to store template data for preview

  const menuRef = useRef(null)
  useCloseMenu(menuRef, () => setIsMenuOpen(null))

  const closeModal = () => setIsModalOpen(false)

  const openModal = (templateId: string, category: string) => {
    setCurrentTemplateId(templateId)
    setNewCategory(category)
    setIsModalOpen(true)
  }

  const toggleMenu = (templateId: string) => {
    if (isMenuOpen === templateId) {
      setIsMenuOpen(null) // Close the menu if the same template is clicked
    } else {
      setIsMenuOpen(templateId) // Open the menu for the clicked template
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setNewCategory(newCategory)
  }

  const handleDeleteTemplate = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this template?")
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/api/template/deleteTemplate/${id}`)
        if (response.status === 200) {
          setTemplates((prev) => prev.filter((t) => t.id !== id))

          showSuccess("Template deleted successfully!")
        }
      } catch (error) {
        showError("Error deleting template")
      }
    }
  }

  const handleApprovalToggle = async (id: string, currentStatus: boolean) => {
    if (currentStatus === null) {
      return
    }

    const newStatus = !currentStatus
    const newIsDefault = newStatus ? true : false

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_SERVER_URL}/api/template/update-template/${id}`, {
        isApproved: newStatus,
        isDefault: newIsDefault,
      })

      if (response.status === 200) {
        setTemplates((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isApproved: newStatus, isDefault: newIsDefault } : t)),
        )

        showSuccess(`Template ${newStatus ? "approved" : "disapproved"} successfully!`)
      }
    } catch (error) {
      showError("Error updating approval status")
    }
  }

  const openPreviewModal = (template: Template) => {
    setPreviewTemplate(template)
    setIsPreviewOpen(true)
  }

  const closePreviewModal = () => {
    setIsPreviewOpen(false)
    setPreviewTemplate(null)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg h-screen">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Template Name</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Description</th>
            <th className="px-6 py-4 text-left">Preview</th>
            <th className="px-6 py-4 text-left">Public</th>
            <th className="px-6 py-4 text-left">Creator</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{template.id}</td>
              <td className="px-6 py-4">{template.template_name}</td>
              <td className="px-6 py-4">{template.category}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {template.template_description.length > 20
                  ? `${template.template_description.slice(0, 20)}...`
                  : template.template_description || "No description available"}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => openPreviewModal(template)} // Trigger preview modal
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Preview
                </button>
              </td>
              <td className="px-6 py-4 ">
                <button
                  onClick={() => handleApprovalToggle(template.id, template.isApproved)}
                  className={`px-3 py-1 rounded-full ${
                    template.isApproved === null && template.isDefault === false
                      ? "bg-yellow-100 "
                      : template.isApproved && template.isDefault
                        ? "bg-green-200"
                        : "bg-red-200"
                  }`}
                >
                  {template.isApproved === null && template.isDefault === false
                    ? "Null"
                    : template.isApproved && template.isDefault
                      ? "Approved"
                      : "Pending"}
                </button>
              </td>

              <td className="px-6 py-4">{template.User?.name || "Unknown Creator"}</td>
              <td className="px-6 py-4 text-center">
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(template.id)}
                    className="p-2 text-gray-800 rounded-full hover:bg-gray-200 transition-colors duration-300"
                    aria-label="More options"
                  >
                    <FaEllipsisH size={20} />
                  </button>
                  {isMenuOpen === template.id && (
                    <TemplateActionMenu
                      isMenuOpen={isMenuOpen === template.id}
                      toggleMenu={() => toggleMenu(template.id)}
                      onDelete={() => handleDeleteTemplate(template.id)}
                      onChangeCategory={() => openModal(template.id, template.category)}
                      templateId={template.id}
                      menuRef={menuRef}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentTemplateId && (
        <EditCategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleCategoryChange}
          currentCategory={newCategory}
          id={currentTemplateId}
        />
      )}

      {/* Preview Modal */}
      <PreviewModal isOpen={isPreviewOpen} onClose={closePreviewModal} template={previewTemplate} />
    </div>
  )
}

export default TemplateTable
