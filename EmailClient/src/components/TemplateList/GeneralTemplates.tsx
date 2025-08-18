"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import type { Template } from "../../types/types"
import usePagination from "../../hooks/usePagination"
import useToast from "../../hooks/useToast"
import TemplateSidebar from "./TemplateSidebar"
import TemplateCard from "./TemplateCard"
import Pagination from "../general/Pagination"
import PreviewModal from "../modals/PreviewModal"

function GeneralTemplates() {
  const user = useSelector((state: RootState) => state.user)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [customeTemplate, setCustomeTemplate] = useState<Template[]>([])
  const templatesPerPage = 3
  const { currentPage, totalPages, getCurrentPageItems, handleNextPage, handlePrevPage } = usePagination(
    customeTemplate,
    templatesPerPage,
  )
  const { showSuccess, showError } = useToast()

  const fetchCustomTemplates = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api/template/general-templates`)
      const fetchedTemplates = response.data
      setCustomeTemplate(fetchedTemplates)
    } catch (error) {
      console.error("Error fetching templates:", error)
    }
  }

  useEffect(() => {
    fetchCustomTemplates()
  }, [])

  const handleCloneTemplate = async (template: Template) => {
    try {
      const payload = {
        templateId: template.id,
        userId: user?.id,
      }
      const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/api/template/clone-template`, payload)

      if (response.status === 201) {
        showSuccess("Template cloned successfully!")
      } else {
        showError("Failed to clone the template.")
      }
    } catch (error) {
      console.error("Error cloning template:", error)
      showError("Error cloning template.")
    }
  }

  return (
    <div className="h-[93.5vh] flex bg-slate-300">
      <TemplateSidebar />

      <div className="flex-1 p-3 pr-5 shadow-xl rounded-lg ml-4 mt-8 mb-0 overflow-y-auto hide-scrollbar">
        <div className="flex justify-between">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Clone & Customize Our Free <span className="text-blue-500">Templates</span>
          </h1>
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
                onClone={() => handleCloneTemplate(template)}
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

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        template={selectedTemplate}
      />
    </div>
  )
}

export default GeneralTemplates
