import type { ReactElement } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import type { RootState } from "../redux/store"

interface PublicRouteProps {
  element: ReactElement
  redirectTo: string
}

function PublicRoute({ element, redirectTo }: PublicRouteProps): ReactElement {
  const isAuthenticated = useSelector((state: RootState) => state.user.name)

  return isAuthenticated ? <Navigate to={redirectTo} replace /> : element
}

export default PublicRoute
