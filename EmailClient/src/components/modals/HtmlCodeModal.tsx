"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface HtmlCodeModalProps {
  isOpen: boolean
  html: string
  css: string
  onClose: () => void
  onSave: (html: string, css: string) => void
}

// Helper function to format HTML code
const formatHtml = (html: string): string => {
  // Add a newline before and after each tag
  return html.replace(/(>)(<)(\/*)/g, "$1\n$2$3").replace(/\n{2,}/g, "\n")
}

// Helper function to format CSS code
const formatCSS = (css: string): string => {
  // Add a newline after each CSS rule and selector
  return css
    .replace(/}\s*/g, "}\n\n") // Add newlines after closing curly braces
    .replace(/([^{]+)\s*{/g, "$1 {\n") // Add a newline after each selector
    .replace(/;\s*/g, ";\n") // Add a newline after each semicolon
    .replace(/\n{2,}/g, "\n") // Ensure there's only one blank line between rules
}

const HtmlCodeModal: React.FC<HtmlCodeModalProps> = ({ isOpen, html, css, onClose, onSave }) => {
  const [htmlCode, setHtmlCode] = useState(html)
  const [cssCode, setCssCode] = useState(css)
  const [copyStatus, setCopyStatus] = useState({ html: false, css: false })

  // Synchronize state with props when they change
  useEffect(() => {
    if (isOpen) {
      setHtmlCode(formatHtml(html)) // Format the HTML code when modal is opened
      setCssCode(formatCSS(css)) // Format the CSS code when modal is opened
    }
  }, [html, css, isOpen])

  const handleCopy = (code: string, type: "html" | "css") => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyStatus((prev) => ({ ...prev, [type]: true }))
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [type]: false }))
      }, 1000) // Revert to default after 2 seconds
    })
  }

  const handleSave = () => {
    onSave(htmlCode, cssCode)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 rounded-lg shadow-2xl w-9/12 h-[95vh] p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h2 className="text-xl font-semibold">Code Editor</h2>
          <button className="text-gray-400 hover:text-red-500 text-xl" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 gap-6 overflow-auto mt-4">
          {/* HTML Editor */}
          <div className="flex flex-col flex-1">
            <h3 className="text-lg font-medium mb-2">HTML</h3>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="flex-1 p-4 bg-gray-800 text-gray-200 border border-gray-600 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-inner"
              style={{ height: "80vh" }} // Larger editor height
              placeholder="Write your HTML code here..."
            />
            <button
              className="mt-2 bg-blue-600 hover:bg-blue-500 text-white text-sm py-2 px-4 rounded-md shadow-lg"
              onClick={() => handleCopy(htmlCode, "html")}
            >
              {copyStatus.html ? "Copied!" : "Copy HTML"}
            </button>
          </div>

          {/* CSS Editor */}
          <div className="flex flex-col flex-1">
            <h3 className="text-lg font-medium mb-2">CSS</h3>
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              className="flex-1 p-4 bg-gray-800 text-gray-300 border border-gray-600 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 resize-none shadow-inner"
              style={{ height: "80vh" }} // Larger editor height
              placeholder="Write your CSS code here..."
            />
            <button
              className="mt-2 bg-green-600 hover:bg-green-500 text-white text-sm py-2 px-4 rounded-md shadow-lg"
              onClick={() => handleCopy(cssCode, "css")}
            >
              {copyStatus.css ? "Copied!" : "Copy CSS"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-4 border-t border-gray-700 pt-4">
          <button
            className="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-sm text-gray-100 rounded-md shadow-md"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="py-2 px-4 bg-green-600 hover:bg-green-500 text-white text-sm rounded-md shadow-md"
            onClick={handleSave}
          >
            Run Code
          </button>
        </div>
      </div>
    </div>
  )
}

export default HtmlCodeModal
