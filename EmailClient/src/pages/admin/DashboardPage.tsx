// DashboardPage.tsx
import { Link } from "react-router-dom"
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

const DashboardPage = () => {
  // const user = useSelector((state: RootState) => state.user.name);

  return (
    <div className="min-h-screen relative top-14">
      {/* Main Content */}
      <main className="ml-0 p-0">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-800 to-purple-800 text-white shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>

        {/* Dashboard Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Total Users</h4>
            <div className="text-4xl font-bold text-blue-600">1,234</div>
            <p className="text-gray-600 mt-2">Number of active users on the platform.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Email Campaigns</h4>
            <div className="text-4xl font-bold text-purple-600">567</div>
            <p className="text-gray-600 mt-2">Total email campaigns sent.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Pending Approvals</h4>
            <div className="text-4xl font-bold text-yellow-600">12</div>
            <p className="text-gray-600 mt-2">Approval requests for email templates.</p>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Analytics Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Active Users</h4>
              <div className="text-4xl font-bold text-green-600">450</div>
              <p className="text-gray-600 mt-2">Currently active users on the platform.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Email Engagement</h4>
              <div className="text-4xl font-bold text-indigo-600">87%</div>
              <p className="text-gray-600 mt-2">Percentage of users engaged with emails.</p>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Send Bulk Email</h4>
            <p className="text-gray-600 mb-6">Create and send bulk emails to your users with ease.</p>
            <Link to="/bulk-email" className="text-white bg-blue-600 hover:bg-blue-800 py-3 px-8 rounded-full">
              Start Campaign
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Manage Users</h4>
            <p className="text-gray-600 mb-6">View, edit, and delete users from the platform.</p>
            <Link to="/users" className="text-white bg-purple-600 hover:bg-purple-800 py-3 px-8 rounded-full">
              Manage Users
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
