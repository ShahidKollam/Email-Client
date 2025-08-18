import TemplateSidebar from "../components/TemplateList/TemplateSidebar"
import HeaderAutomate from "../components/automateEmail/HeaderAutomate"
import TemplateTabele from "../components/automateEmail/TemplateTabele"

const AutomateEmailPage = () => {
  return (
    <div className="bg-gray-50 h-[93vh] font-sans text-gray-800 flex">
      {/* Sidebar */}
      <TemplateSidebar />

      {/* Main Content */}
      <div className="h-[93.5vh] w-[86vw] bg-gray-100 p-8">
        <HeaderAutomate />
        <TemplateTabele />
      </div>
    </div>
  )
}

export default AutomateEmailPage
