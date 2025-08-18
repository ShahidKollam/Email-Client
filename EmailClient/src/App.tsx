import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateTemplatePage from "./pages/CreateTemplatePage"
import CustomTemplatePage from "./pages/CustomTemplatePage"
import DefaultTemplatePage from "./pages/DefaultTemplatePage"
import LoginPage from "./pages/auth/LoginPage"
import SignUpPage from "./pages/auth/SignUpPage"
import NavbarLayout from "./components/general/NavbarLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import BulkMailPage from "./pages/BulkMailPage"
import PublicRoute from "./components/PublicRoute"
import LandingPage from "./pages/LandingPage"
import { ToastContainer } from "react-toastify"
import AdminRoutes from "./routes/AdminRoutes"
import UserProfilePage from "./pages/UserProfilePage"
import ApiToolkitPage1 from "./pages/ApiToolkitPage1"
import GeneralTemplates from "./components/TemplateList/GeneralTemplates"
import AutomateEmailPage from "./pages/AutomateEmailPage"
import DocsPage from "./pages/DocPage"

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<PublicRoute element={<LoginPage />} redirectTo="/" />} />
        <Route path="/sign-up" element={<PublicRoute element={<SignUpPage />} redirectTo="/" />} />

        <Route element={<NavbarLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute element={<DefaultTemplatePage />} />} />
          <Route path="/editor" element={<ProtectedRoute element={<CreateTemplatePage />} />} />
          <Route path="/custom-templates" element={<ProtectedRoute element={<CustomTemplatePage />} />} />
          <Route path="/bulk-email" element={<ProtectedRoute element={<BulkMailPage />} />} />
          <Route path="/general-templates" element={<ProtectedRoute element={<GeneralTemplates />} />} />

          <Route path="/profile" element={<ProtectedRoute element={<UserProfilePage />} />} />
          <Route path="/api-toolkit" element={<ProtectedRoute element={<ApiToolkitPage1 />} />} />
          <Route path="/automate-email" element={<ProtectedRoute element={<AutomateEmailPage />} />} />
          <Route path="/clone-template" element={<ProtectedRoute element={<GeneralTemplates />} />} />
          <Route path="/doc-page" element={<ProtectedRoute element={<DocsPage />} />} />
        </Route>

        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  )
}

export default App
