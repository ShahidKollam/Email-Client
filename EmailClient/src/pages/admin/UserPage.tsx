// src/pages/UserPage.tsx
import type React from "react"
import UserTable from "../../components/admin/UserTable"

const UserPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Users List</h1>

      <UserTable />
    </div>
  )
}

export default UserPage
