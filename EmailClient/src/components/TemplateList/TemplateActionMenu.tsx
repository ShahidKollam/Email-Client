"use client"

import type React from "react"

import { DocumentTextIcon, PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/outline"
import { useRef } from "react"
import useCloseMenu from "../../hooks/useCloseMenu"
import axios from "axios"
import useToast from "../../hooks/useToast"
import type { Template } from "../../types/types"

interface TemplateActionMenuProps {
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onChangeCategory?: () => void
  isMenuOpen: boolean
  toggleMenu: () => void
  template?: Template // Pass the template id as a prop
  menuRef?: React.RefObject<HTMLDivElement> // Ref for the menu
  templatePostUrl?: string // Pass the template URL as a prop
  isDefault?: boolean
  templateId?: string
}

const TemplateActionMenu: React.FC<TemplateActionMenuProps> = ({
  onEdit,
  onDelete,
  onChangeCategory,
  isMenuOpen,
  toggleMenu,
  template,
  // templatePostUrl, // Use this prop for the URL
}) => {
  const templateId = template?.id
  const { showSuccess, showError } = useToast()

  // Handler for copying the URL
  // const handleCopyUrl = () => {
  //   if (!templatePostUrl) {
  //     console.error("No URL provided to copy.");
  //     return;
  //   }
  //   navigator.clipboard.writeText(templatePostUrl);
  //   toggleMenu();
  // };

  // Modern handler for adding to "General" category using axios
  const handleAddToGeneral = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_SERVER_URL}/api/template/update-template/${templateId}`,
        { isApproved: true },
      )

      if (response.status === 200) {
        console.log("Template moved to General", response.data)
        showSuccess("Request Send to Admin")
        // You can also update the local state here if needed to reflect the change
      } else {
        console.error("Failed to send req")
      }
    } catch (error) {
      console.error("Error in request", error)
      showError("Error updating template")
    }
    toggleMenu() // Close the menu after the action
  }

  const menuRef = useRef<HTMLDivElement>(null)
  useCloseMenu(menuRef, toggleMenu)

  return (
    isMenuOpen &&
    onDelete && (
      <div
        ref={menuRef} // Attach the ref to the menu
        className="absolute right-0 mt-2 w-48 bg-gray-900 text-white shadow-lg rounded-md z-10"
      >
        <div className="py-2">
          {/* <button
            onClick={handleCopyUrl} // Handle copy URL action
            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center space-x-2"
          >
            <LinkIcon className="h-5 w-5" />
            <span>Copy Post URL</span>
          </button> */}
          {onEdit && templateId && (
            <button
              onClick={() => onEdit(templateId)} // Pass the templateId as argument
              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center space-x-2"
            >
              <PencilIcon className="h-5 w-5" />
              <span>Edit Template</span>
            </button>
          )}
          {onDelete && templateId && (
            <button
              onClick={() => onDelete(templateId)} // Pass the templateId as argument
              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center space-x-2"
            >
              <TrashIcon className="h-5 w-5" />
              <span>Delete Template</span>
            </button>
          )}
          <button
            onClick={onChangeCategory}
            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center space-x-2"
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span>Change Category</span>
          </button>
          <button
            onClick={handleAddToGeneral} // Call the modern axios handler for 'Add to General'
            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span title="Send Request to Admin">Request to Public</span>
          </button>
        </div>
      </div>
    )
  )
}

export default TemplateActionMenu
