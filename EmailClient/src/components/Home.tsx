"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolling(window.scrollY > 10)
    }

    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 text-white w-[90vw] overflow--auto">


      {/* New Template Store Feature - Larger and More Attractive */}
      <section className="py-20 bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Discover Our Free Template Store</h2>
          <p className="text-xl mb-8 px-6 md:px-0 max-w-3xl mx-auto">
            Browse through an extensive collection of professionally designed email templates. Clone, customize, and
            launch campaigns that captivate your audience. Start using the templates today and transform your email
            marketing experience!
          </p>
          <Link
            to="/general-templates"
            className="bg-white text-blue-600 text-lg font-semibold py-3 px-8 rounded-lg shadow-xl transition-all hover:bg-blue-100 hover:scale-105"
          >
            Explore the Template Store
          </Link>
        </div>
      </section>

    
      {/* Testimonial Section */}
      <section className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Users Are Saying</h2>
          <div className="flex justify-center space-x-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-lg mb-4">
                "This platform has completely transformed the way we approach email marketing. The templates are
                beautiful, and the automation is a game changer!"
              </p>
              <p className="font-semibold">Sarah J., Marketing Director</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-lg mb-4">
                "The analytics dashboard allows us to track everything in real time. It’s easy to use and powerful!"
              </p>
              <p className="font-semibold">John D., Senior Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Create Stunning Email Templates?</h3>
        <p className="text-lg mb-6">Sign up today and take your email marketing to the next level!</p>
        <Link
          to="/sign-up"
          className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg shadow-xl transition-all transform hover:bg-blue-100 hover:scale-105"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 EmailTemplatePro. All rights reserved.</p>
          <nav className="mt-4">
            <Link to="/terms" className="text-gray-400 hover:text-white transition duration-300 mx-4">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition duration-300 mx-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default Home
