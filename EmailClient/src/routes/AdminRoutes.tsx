import type React from "react"
import { Routes, Route } from "react-router-dom"
import DashboardPage from "../pages/admin/DashboardPage"
import AdminLayout from "../layouts/AdminLayout"
import TemplateListPage from "../pages/admin/TemplateListPage"
import UserPage from "../pages/admin/UserPage"

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Wrap all admin routes with AdminLayout */}
      <Route element={<AdminLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/templates" element={<TemplateListPage />} />
        <Route path="/users" element={<UserPage />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
