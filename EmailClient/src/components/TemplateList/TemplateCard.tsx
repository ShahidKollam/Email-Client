"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Template } from "../../types/types"
import EditCategoryModal from "../modals/EditCategoryModal"
import TemplateActionMenu from "./TemplateActionMenu"
import { BsThreeDotsVertical } from "react-icons/bs"
import { ClipboardIcon } from "@heroicons/react/outline"

interface TemplateCardProps {
  template: Template
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  onUse?: (template: Template) => void
  onPreview: (template: Template) => void
  onSend?: (template: Template) => void
  onClone?: (template: Template) => void
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onDelete,
  onEdit,
  onUse,
  onPreview,
  onSend,
  onClone,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState(template.category || "")
  const menuRef = useRef<HTMLDivElement | null>(null)
  const shadowRootRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeModal = () => setIsModalOpen(false)
  const openModal = () => setIsModalOpen(true)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset copied state after 2 seconds
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCategoryChange = (newCategory: string) => {
    setNewCategory(newCategory)
  }

  useEffect(() => {
    if (shadowRootRef.current && !shadowRootRef.current.shadowRoot) {
      const shadowRoot = shadowRootRef.current.attachShadow({ mode: "open" })
      shadowRoot.innerHTML = ` 
        ${template.html_content}
        <style>${template.css_content}</style>
      `
    } else if (shadowRootRef.current?.shadowRoot) {
      shadowRootRef.current.shadowRoot.innerHTML = `
        ${template.html_content}
        <style>${template.css_content}</style>
      `
    }
  }, [template])

  const truncateText = (text: string, limit: number): string => {
    const words = text.split(" ")
    if (words.length <= limit) return text
    return words.slice(0, limit).join(" ") + "..."
  }

  console.log(template)

  return (
    <>
      <div
        key={template.id}
        className="bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col relative p-6"
      >
        <div className="flex-1">
          <div ref={shadowRootRef} className="mt-6 flex-1" style={{ maxHeight: "300px", overflow: "hidden" }}></div>

          <div className="flex justify-between items-center pt-6 pb-4 border-b">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {truncateText(template.template_name ?? "Untitled Template", 5)}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-medium text-gray-600">Category: </span>
                {newCategory || "No category"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-medium text-gray-600">Subject: </span>
                {truncateText(template.subject ?? "No subject", 5)}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="p-3 text-gray-800 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="More options"
                title="Actions"
              >
                <BsThreeDotsVertical className="h-6 w-6" />
              </button>
              <TemplateActionMenu
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                onEdit={() => template.id && onEdit && onEdit(template.id)}
                {...(onDelete ? { onDelete: () => template.id && onDelete(template.id) } : {})}
                onChangeCategory={() => {
                  toggleMenu()
                  openModal()
                }}
                template={template}
                templatePostUrl={template?.api_url}
              />
            </div>
          </div>

          <p className="text-gray-900 mt-2 flex items-center">
            <span className="text-gray-900 mr-2">Template ID : </span>
            {template?.template_id}
            <button
              onClick={() => copyToClipboard(template?.template_id ?? "")} // Use nullish coalescing operator
              className="ml-0 p-1 text-gray-400 hover:text-gray-800"
              title="Copy To Clipboard"
              aria-label="Copy Template ID"
            >
              <ClipboardIcon className="w-5 h-5" />
            </button>

            {copied && <span className="ml-2 text-sm text-green-500">Copied!</span>}
          </p>
          <p className="text-gray-600 mt-2">{template?.template_description || "No description available"}</p>

          <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {onUse && (
              <button
                onClick={() => onUse(template)}
                className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 w-full md:w-auto transform hover:scale-105"
              >
                Use Template
              </button>
            )}
            {onSend && (
              <button
                onClick={() => onSend(template)}
                className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 w-full md:w-auto transform hover:scale-105"
              >
                Send Bulk Emails
              </button>
            )}
            {onClone && (
              <button
                onClick={() => onClone(template)}
                className="px-5 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300 w-full md:w-auto transform hover:scale-105"
              >
                Clone Template
              </button>
            )}
            <button
              onClick={() => onPreview(template)}
              className="px-5 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300 w-full md:w-auto transform hover:scale-105"
            >
              Preview Template
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Changing Category */}
      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCategoryChange}
        currentCategory={template.category}
        id={template.id}
      />
    </>
  )
}

export default TemplateCard
