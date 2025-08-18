"use client"

import { useState } from "react"
import TemplateSidebar from "../components/TemplateList/TemplateSidebar"
import EditorDoc from "../components/docs/EditorDoc"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import SingleMail from "../components/docs/SingleMail"
import BulkMailDoc from "../components/docs/BulkMailDoc"
import GetTemplateDoc from "../components/docs/GetTemplateDoc"
import AutomateMailDoc from "../components/docs/AutomateMailDoc"
import TemplateCategoryDoc from "../components/docs/TemplateCategoryDoc"

function DocsPage() {
  const [activeDoc, setActiveDoc] = useState<string | null>(null)

  const toggleDoc = (doc: string) => {
    setActiveDoc(activeDoc === doc ? null : doc)
  }

  // Define the documentation items
  const docs = [
    {
      id: "getApi",
      title: "How To Use GET API For Templates",
      component: <GetTemplateDoc />,
    },
    {
      id: "singleMail",
      title: "How To Integrate API For Send - SINGLE - Email ",
      component: <SingleMail />,
    },
    {
      id: "bulkMail",
      title: "How To Integrate API For Send - BULK - Email ",
      component: <BulkMailDoc />,
    },
    {
      id: "automateMail",
      title: "How To Integrate API For - AUTOMATE - Email Sending",
      component: <AutomateMailDoc />,
    },
    {
      id: "editorDoc",
      title: "How To Create Templates By Editor",
      component: <EditorDoc />,
    },
    {
      id: "category",
      title: "Learn Template Categories",
      component: <TemplateCategoryDoc />,
    },
  ]

  return (
    <div className="h-[93.4vh] flex bg-zinc-900">
      <TemplateSidebar />

      <div className="flex flex-col w-[90vw]">
        {/* Header */}
        <header className="text-white p-6 shadow-md">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl font-semibold mb-2">TemplatePro Documentation</h1>
            <p className="text-xl font-light">
              Get started with integrating TemplatePro into your applications and explore our powerful features.
            </p>
          </div>
        </header>

        {/* Main content area */}
        <div className="flex flex-col px-32 py-0 overflow-y-auto max-w-[90vw]">
          {docs.map((doc) => (
            <div key={doc.id} className="bg-gray-800 rounded-lg shadow-lg mb-6">
              {/* Button container: Apply sticky only when active */}
              <div className={`${activeDoc === doc.id ? "sticky top-0 z-10 bg-zinc-900" : ""}`}>
                <button
                  onClick={() => toggleDoc(doc.id)}
                  className="flex items-center justify-between w-full p-4 text-lg font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 shadow-md hover:shadow-lg"
                >
                  <span>{doc.title}</span>
                  {activeDoc === doc.id ? (
                    <FaChevronUp className="text-white" />
                  ) : (
                    <FaChevronDown className="text-white" />
                  )}
                </button>
              </div>

              {/* Content Area */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  activeDoc === doc.id ? "h-auto opacity-100" : "h-0 opacity-0"
                } overflow-hidden`}
              >
                {activeDoc === doc.id && <div className="p-6 bg-gray-800 rounded-lg">{doc.component}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DocsPage
