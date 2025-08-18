import type React from "react"
import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/admin/AdminSidebar "
import AdminHeader from "../components/admin/AdminHeader"
import Footer from "../components/general/Footer"

const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col">
      <AdminSidebar />

      <div className="flex-1 ml-64 mt-4 bg-gradient-to-r from-gray-200 p-1 to-gray-100 min-h-screen">
        <AdminHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout
