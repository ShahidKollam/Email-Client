"use client"

import type React from "react"

import { useState, useEffect } from "react"
import TemplateSidebar from "../components/TemplateList/TemplateSidebar"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Pagination from "../components/general/Pagination"
import usePagination from "../hooks/usePagination"
import PreviewModal from "../components/modals/PreviewModal"
import type { Template } from "../types/types" // Import types
import TemplateCard from "../components/TemplateList/TemplateCard"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import SendBulkMailModal from "../components/modals/SendBulkMailModal"
import useToast from "../hooks/useToast"

function BulkMailPage() {
  const navigate = useNavigate()
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [customeTemplate, SetCustomeTemplate] = useState<Template[]>([]) // Custom Templates from API
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.user)
  const [formValues, setFormValues] = useState({ email: [""] })
  const templatesPerPage = 6 // Number of templates to show per page
  const { currentPage, totalPages, getCurrentPageItems, handleNextPage, handlePrevPage } = usePagination(
    customeTemplate,
    templatesPerPage,
  )
  const [errorProp] = useState<string>("")
  const { showSuccess, showError } = useToast()

  const handleEditClick = (id: string) => {
    navigate("/editor", {
      state: { templateId: id },
    })
  }

  const fetchCustomTemplates = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api/template/custom-template/${user.id}`)
      const fetchedTemplates = response.data
      if ((response.status = 200)) {
        const marketingTemplates = fetchedTemplates.filter(
          (template: Template) => template.category === "marketing_campaign",
        )
        SetCustomeTemplate(marketingTemplates)
      }
    } catch (error) {
      console.error("Error fetching templates:", error)
    }
  }

  useEffect(() => {
    fetchCustomTemplates()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target
    if (name === "email" && index !== undefined) {
      const updatedEmails = [...formValues.email]
      updatedEmails[index] = value
      setFormValues({ ...formValues, email: updatedEmails })
      console.log("Updated formValues:", formValues) // Add this line to check the state
    } else {
      setFormValues({ ...formValues, [name]: value })
    }
  }

  const handleAddEmailField = () => {
    setFormValues({ ...formValues, email: [...formValues.email, ""] })
  }

  const handleModalSubmit = async () => {
    const { email } = formValues

    const payload = {
      recipients: email,
      templateId: selectedTemplate?.id,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/api/sendmail/sendBulkMail`, payload)
      setIsCustomModalOpen(false)
      if (response.data.success) {
        showSuccess("Emails sent successfully!")
        setFormValues({ email: [""] })
      } else {
        showError("Failed to send emails")
      }
    } catch (error) {
      console.error("Error sending emails:", error)
      showError("Error sending emails")
    }
  }

  const handleOpenBulkMailModal = (template: Template) => {
    setSelectedTemplate(template) // Set the selected template
    setIsCustomModalOpen(true)
  }

  const handleDeleteTemplate = async (id: any) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this template?")
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/api/template/deleteTemplate/${id}`)
        if (response.status === 200) {
          showSuccess("Template deleted successfully!")
          console.log("Template deleted successfully!")
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
          <h1 className="text-3xl text-bold font-semibold text-gray-800 mb-6">Email Marketing Templates</h1>
          <Link
            to="/editor"
            className="bg-blue-500 text-xl cursor-pointer text-white font-semibold rounded-lg px-10 py-2 mb-3 hover:bg-blue-700"
          >
            Create your Template
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {customeTemplate.length > 0 ? (
            getCurrentPageItems().map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onDelete={handleDeleteTemplate}
                onEdit={handleEditClick}
                onSend={handleOpenBulkMailModal}
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
      <SendBulkMailModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        formValues={formValues}
        onInputChange={handleInputChange}
        onAddEmailField={handleAddEmailField}
        onSubmit={handleModalSubmit}
        errorProp={errorProp}
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

export default BulkMailPage
