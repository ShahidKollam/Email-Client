"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useGrapeJSEditor } from "../../hooks/useGrapeJSEditor"
import PreviewModal from "../modals/PreviewModal"
import HtmlCodeEdit from "./HtmlCodeEdit"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { CodeIcon } from "@heroicons/react/outline"
import SaveTemplateModal from "../modals/SaveTemplateModal"
import useToast from "../../hooks/useToast"

const EditorHome: React.FC = () => {
  const { editorRef } = useGrapeJSEditor()
  const location = useLocation()
  const { templateId } = location.state || {}
  const [templateContent, setTemplateContent] = useState<{ html: string; css: string } | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState<{ html_content: string; css_content: string }>()
  const [activeSidebar, setActiveSidebar] = useState<"blocks" | "styles" | "traits">("blocks")
  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false)
  const { showSuccess, showError } = useToast()

  const user = useSelector((state: RootState) => state.user)

  const fetchTemplate = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api/template/templateById/${templateId}`)
      const data = response.data

      if (data.success) {
        const { html_content, css_content } = data.data
        setTemplateContent({ html: html_content || "", css: css_content || "" })
      } else {
        console.error("Failed to fetch template content.")
      }
    } catch (error) {
      console.error("Error fetching template:", error)
    }
  }

  const handleSave = () => {
    setIsSaveTemplateModalOpen(true)
  }

  interface TemplateData {
    templateName: string
    subject: string
    category: string
    description: string
  }
  const handleSaveTemplate = async (data: TemplateData) => {
    const html = editorRef.current?.getHtml() || ""
    const css = editorRef.current?.getCss() || ""
    const description = data.description || ""
    const { templateName, subject, category } = data

    try {
      // const endpoint = templateId
      //   ? `${import.meta.env.VITE_API_SERVER_URL}/api/template/update-template/${templateId}`
      //   : `${import.meta.env.VITE_API_SERVER_URL}/api/template/save-template`;
      // const method = templateId ? 'put' : 'post';

      const endpoint = `${import.meta.env.VITE_API_SERVER_URL}/api/template/save-template`
      const method = "post"

      const response = await axios({
        method,
        url: endpoint,
        data: {
          template_name: templateName,
          html_content: html,
          css_content: css,
          template_description: description,
          category,
          subject,
          userId: user.id,
        },
      })

      if (response.status === 201) {
        showSuccess("Template saved successfully!")
      }
    } catch (error) {
      showError("Failed to save the template.")
      console.error(error)
    } finally {
      setIsSaveTemplateModalOpen(false) // Close the modal after saving
    }
  }

  useEffect(() => {
    if (templateId) fetchTemplate()
  }, [templateId])

  useEffect(() => {
    if (templateContent && editorRef.current) {
      editorRef.current.setComponents(templateContent.html)
      editorRef.current.setStyle(templateContent.css)
    }
  }, [templateContent])

  const handlePreview = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml()
      const css = editorRef.current.getCss() || ""
      setPreviewContent({ html_content: html, css_content: css })
      setIsPreview(true)
    }
  }

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.setComponents("")
      editorRef.current.setStyle("")
    }
  }

  return (
    <div className="w-full ">
      <div className="flex">
        <div className="p-4 w-[20%]">
          <div className="flex justify-start text-white bg-black border-b border-gray-600">
            {["blocks", "styles", "traits"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSidebar(tab as "blocks" | "styles" | "traits")}
                className={`px-4 py-2 ${activeSidebar === tab ? "bg-black" : "bg-black opacity-50"
                  } border-r border-gray-800`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div id="blocks" className={`${activeSidebar === "blocks" ? "" : "hidden"}`} />
          <div className={`panel__style ${activeSidebar === "styles" ? "" : "hidden"}`} />
          <div
            id="traits"
            className={`${activeSidebar === "traits" ? "" : "hidden"} panel__traits bg-black h-[85vh]`}
          />
        </div>

        <div className="w-[60%] h-full p-1">
          <header className="text-white pt-5 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Email Template Editor</h1>
            <div className="space-x-2 mr-0 text-lg font-medium">
              <button
                onClick={() => editorRef?.current?.Commands.run("open-code-view")}
                className=" bg-gray-100 hover:bg-gray-300 text-white p-1 rounded-md shadow-md focus:outline-none"
              >
                {<CodeIcon className="h-7 w-10 text-black text-center" />}
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md shadow-md focus:outline-none"
              >
                {templateId ? "Update" : "Save"}
              </button>
              <button
                onClick={handlePreview}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md shadow-md focus:outline-none"
              >
                Preview
              </button>
              <button
                onClick={handleClear}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md shadow-md focus:outline-none"
              >
                Clear
              </button>
            </div>
          </header>
          <div id="gjs" className="mx-5"></div>
          <div className="bg-black w-[19%] m-3 flex flex-col h-[90vh] absolute top-14 right-0 z-10 overflow-x-hidden p-2">
            <div className="panel__devices mb-2 top-1 -right-5 z-10 "></div>
          </div>
        </div>
      </div>

      {isPreview && <PreviewModal isOpen={isPreview} onClose={() => setIsPreview(false)} template={previewContent} />}

      <HtmlCodeEdit editorRef={editorRef} />
      <SaveTemplateModal
        isOpen={isSaveTemplateModalOpen}
        onClose={() => setIsSaveTemplateModalOpen(false)}
        onSave={handleSaveTemplate}
      />
    </div>
  )
}

export default EditorHome
