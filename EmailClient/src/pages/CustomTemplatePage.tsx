"use client"

import type React from "react"

import { useState, useEffect } from "react"
import TemplateSidebar from "../components/TemplateList/TemplateSidebar"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Pagination from "../components/general/Pagination"
import usePagination from "../hooks/usePagination"
import InjectValuesModal from "../components/modals/InjectValuesModal"
import PreviewModal from "../components/modals/PreviewModal"
import type { Template, FormValues } from "../types/types" // Import types
import TemplateCard from "../components/TemplateList/TemplateCard"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import useToast from "../hooks/useToast"

function CreateTemplatePage() {
  const navigate = useNavigate()
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [customeTemplate, SetCustomeTemplate] = useState<Template[]>([]) // Custom Templates from API
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormValues>({ email: "" })
  const user = useSelector((state: RootState) => state.user)
  const { showSuccess, showError } = useToast()
  const templatesPerPage = 9

  const { currentPage, totalPages, getCurrentPageItems, handleNextPage, handlePrevPage } = usePagination(
    customeTemplate,
    templatesPerPage,
  )

  const handleEditClick = (id: string) => {
    navigate("/editor", {
      state: { templateId: id },
    })
  }

  const fetchCustomTemplates = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api/template/custom-template/${user.id}`)
      const fetchedTemplates = response.data
      SetCustomeTemplate(fetchedTemplates)
    } catch (error) {
      console.error("Error fetching templates:", error)
    }
  }

  useEffect(() => {
    fetchCustomTemplates()
  }, [])

  const handleUseCustomeTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    const placeholders = extractPlaceholders(template.html_content || "")
    const initialValues: FormValues = { email: "" }
    placeholders.forEach((placeholder) => {
      initialValues[placeholder] = "" // Initialize all placeholders with empty string
    })
    setFormValues(initialValues)
    setIsCustomModalOpen(true)
  }

  const extractPlaceholders = (htmlContent: string) => {
    const regex = /{{(.*?)}}/g
    const placeholders: string[] = []
    let match
    while ((match = regex.exec(htmlContent)) !== null) {
      placeholders.push(match[1].trim())
    }
    return placeholders
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleModalSubmit = async () => {
    const payload = {
      recipient: formValues.email,
      templateId: selectedTemplate?.id,
      placeholders: formValues,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/api/sendmail/sendmailbyid`, payload)
      setIsCustomModalOpen(false) // Close the modal
      if (response.data.success) {
        showSuccess("Email sent successfully!")
      } else {
        showError("Error sending email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  const handleCloseModal = () => {
    setIsCustomModalOpen(false)
  }

  const handleDeleteTemplate = async (id: any) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this template?")
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/api/template/deleteTemplate/${id}`)
        if (response.status === 200) {
          console.log("Template deleted successfully!")
          showSuccess("Template deleted successfully!")
          fetchCustomTemplates()
        }
      } catch (error) {
        showError("Error deleting template")
        console.error("Error deleting template:", error)
      }
    }
  }

  return (
    <div className="h-[93.5vh] flex bg-slate-300">
      <TemplateSidebar />

      <div className="flex-1 p-3 pr-5 shadow-xl rounded-lg ml-4 mt-8 mb-0 overflow-y-auto hide-scrollbar">
        <div className="flex justify-between">
          <h1 className="text-4xl text-bold font-semibold text-indigo-600 mb-6">Your Templates</h1>
          <Link
            to="/editor"
            className="bg-blue-500 text-xl cursor-pointer text-white font-semibold rounded-lg px-10 py-2 mb-3 mr-2 hover:bg-blue-700"
          >
            Create your Template
          </Link>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
        <div className="grid grid-cols-3 gap-3 mt-5">
          {customeTemplate.length > 0 ? (
            getCurrentPageItems().map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onDelete={handleDeleteTemplate}
                onEdit={handleEditClick}
                onUse={handleUseCustomeTemplateClick}
                onPreview={(template) => {
                  setSelectedTemplate(template)
                  setIsPreviewModalOpen(true)
                }}
              />
            ))
          ) : (
            <>No Templates Available</>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>

      {/* Inject Values Modal */}
      <InjectValuesModal
        isOpen={isCustomModalOpen}
        onClose={handleCloseModal}
        formValues={formValues}
        onInputChange={handleInputChange}
        onSubmit={handleModalSubmit}
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        template={selectedTemplate}
      />
    </div>
  )
}

export default CreateTemplatePage
