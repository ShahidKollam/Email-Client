"use client"

import type React from "react"
import { useState } from "react"
import HtmlCodeModal from "../modals/HtmlCodeModal"

interface HtmlCodeEditProps {
  editorRef: React.MutableRefObject<any>
}

const HtmlCodeEdit: React.FC<HtmlCodeEditProps> = ({ editorRef }) => {
  const [isCodeViewOpen, setIsCodeViewOpen] = useState(false)
  const [codeContent, setCodeContent] = useState<{ html: string; css: string }>({ html: "", css: "" })

  const openCodeView = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml()
      const css = editorRef.current.getCss() || ""
      setCodeContent({ html, css })
      setIsCodeViewOpen(true)
    }
  }

  const saveCodeChanges = (html: string, css: string) => {
    if (editorRef.current) {
      editorRef.current.setComponents(html)
      editorRef.current.setStyle(css)
    }
  }

  editorRef?.current?.Commands.add("open-code-view", {
    run() {
      openCodeView()
    },
  })

  return (
    <>
      <HtmlCodeModal
        isOpen={isCodeViewOpen}
        html={codeContent.html}
        css={codeContent.css}
        onClose={() => setIsCodeViewOpen(false)}
        onSave={saveCodeChanges}
      />
    </>
  )
}

export default HtmlCodeEdit
