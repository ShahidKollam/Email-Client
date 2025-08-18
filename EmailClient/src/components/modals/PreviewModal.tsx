"use client"

import type React from "react"

interface Template {
  html_content?: string
  css_content?: string
}

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  template?: Template | null
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, template }) => {
  if (!isOpen || !template) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">Template Preview</h2>

        {/* Container with max-height and scrollable content */}
        <div className="mb-4" style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {/* Embed the template inside an iframe to prevent styles from affecting the parent */}
          <iframe
            title="Template Preview"
            className="w-full h-[60vh] border-none"
            srcDoc={`<html>
                            <head>
                                <style>${template?.css_content || ""}</style>
                            </head>
                            <body style="margin: 0; padding: 0;">
                                ${template?.html_content || ""}
                            </body>
                        </html>`}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal
