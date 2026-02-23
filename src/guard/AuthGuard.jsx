import useAuth from "@src/hooks/api/auth/useAuth"
import { Navigate } from "react-router"

const AuthGuard = ({ children }) => {
  const { isLogged } = useAuth()

  if (!isLogged)
    return <Navigate to="/not-authorized" />

  return children
}

export default AuthGuard