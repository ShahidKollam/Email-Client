import TemplateSidebar from "../components/TemplateList/TemplateSidebar"
import Home from "../components/Home"

function DefaultTemplatePage() {
  return (
    <div className="h-[93.4vh] flex bg-gray-100">
      {/* Sidebar */}
      <TemplateSidebar />
      <Home />
    </div>
  )
}

export default DefaultTemplatePage
