"use client"

import { useState, useEffect } from "react"
import TemplateSidebar from "../components/TemplateList/TemplateSidebar"
import Modal from "../components/TemplateList/UseTemplateModal"
import Pagination from "../components/general/Pagination"
import usePagination from "../hooks/usePagination"
import PreviewModal from "../components/modals/PreviewModal"
import type { Template } from "../types/types"
import TemplateCard from "../components/TemplateList/TemplateCard" // Import TemplateCard

function DashboardPage() {
  const [isUseTemplateModalOpen, setIsUseTemplateModalOpen] = useState<boolean>(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [templates, setTemplates] = useState<Template[]>([]) // List of templates with HTML content
  const templatesPerPage = 3 // Number of templates to show per page

  const { currentPage, totalPages, getCurrentPageItems, handleNextPage, handlePrevPage } = usePagination(
    templates,
    templatesPerPage,
  )

  // List of available template HTML files in the public/template folder
  const templateFiles = [
    "emailhtml.html",
    "emailTemplate.html",
    // Add more HTML files as needed
  ]

  useEffect(() => {
    const fetchTemplates = async () => {
      const fetchedTemplates: Template[] = []
      for (const file of templateFiles) {
        const response = await fetch(`/template/${file}`)
        if (response.ok) {
          const html = await response.text()
          fetchedTemplates.push({
            id: file,
            title: file.replace(".html", ""),
            template_description: `A template for ${file}`,
            html_content: html, // Make sure this matches your Template type
            css_content: "", // You can add CSS content if available, or leave it empty
          })
        } else {
          console.error(`Failed to load template: ${file}`)
        }
      }
      setTemplates(fetchedTemplates)
    }
    fetchTemplates()
  }, [])

  const handleUseTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsUseTemplateModalOpen(true)
  }

  const handlePreviewTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsPreviewModalOpen(true) // Open preview modal
  }

  return (
    <div className="h-[93.4vh] flex bg-gray-100">
      {/* Sidebar */}
      <TemplateSidebar />

      <div className="flex-1 p-8 bg-white shadow-xl rounded-lg ml-4 mt-8 mb-8 transition-all duration-500 ease-in-out">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Template Store</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentPageItems().map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={handleUseTemplateClick}
              onPreview={handlePreviewTemplateClick}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>

      {/* Modal for "Use Template" */}
      <Modal
        isOpen={isUseTemplateModalOpen}
        onClose={() => setIsUseTemplateModalOpen(false)}
        templateData={selectedTemplate}
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

export default DashboardPage
