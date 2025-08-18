import { Tabs, Tab, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import Credentials from "../components/apiToolkit/Credentials"
import Documentation from "../components/apiToolkit/Documentation"
import TemplateSidebar from "../components/TemplateList/TemplateSidebar"

const ApiToolkitPage1 = () => {
  return (
    <div className="bg-gray-50 h-[93vh] font-sans text-gray-800 flex">
      {/* Sidebar */}
      <TemplateSidebar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start">
        {/* Header */}
        <header className="text-black py-6 shadow-md w-full">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-wide">API Toolkit - Developer Resources</h1>
          </div>
        </header>

        {/* Tabs Layout */}
        <div className="w-full max-w-6xl mx-auto px-6 py-10">
          <Tabs className="rounded-xl shadow-lg overflow-hidden bg-white">
            {/* Tab List */}
            <TabList className="flex bg-gray-200 p-4 border-b">
              <Tab className="px-6 py-3 font-semibold text-gray-700 rounded-t-lg cursor-pointer hover:bg-indigo-200 transition">
                Credentials
              </Tab>
              {/* <Tab className="px-6 py-3 font-semibold text-gray-700 rounded-t-lg cursor-pointer hover:bg-indigo-200 transition">
                                Domain
                            </Tab> */}
              <Tab className="px-6 py-3 font-semibold text-gray-700 rounded-t-lg cursor-pointer hover:bg-indigo-200 transition">
                Documentation
              </Tab>
            </TabList>

            {/* Tab Panels */}
            <TabPanel>
              <Credentials />
            </TabPanel>

            <TabPanel>
              <Documentation />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ApiToolkitPage1
