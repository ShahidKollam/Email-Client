// src/pages/TemplateList.tsx
import type React from "react"
import TemplateTable from "../../components/admin/TemplateTable"

const TemplateListPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Template List</h1>

      <TemplateTable />
    </div>
  )
}

export default TemplateListPage
