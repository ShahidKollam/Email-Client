import type React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store" // Adjust path as needed

interface ProtectedRouteProps {
  element: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const user = useSelector((state: RootState) => state.user)

  if (!user.name) {
    return <Navigate to="/login" />
  }

  return element // Render the protected page if the user is authenticated
}

export default ProtectedRoute
