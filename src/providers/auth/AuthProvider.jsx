import useLogin from "@src/hooks/api/auth/useLogin"
import useLogout from "@src/hooks/api/auth/useLogout"
import { AuthContext } from "../context/ContextApp"
import BackdropComponent from "@src/components/backdrop/BackdropComponent"
import { useState } from "react"
import { useNavigate } from "react-router"

const AuthProvider = ({ children }) => {
  const { request: requestLogin, responseService: responseLogin, behaivorService: behaivorLogin } = useLogin()

  const { request: requestLogout, responseService: responseLogout, behaivorService: behaivorLogout } = useLogout()

  const navigate = useNavigate()

  const isLoadingRequest = behaivorLogin.loading | behaivorLogout.loading
  
  const [isLogged, setIsLogged] = useState(Boolean(sessionStorage.getItem("jwt")))

  const checkLogged = () => setIsLogged(Boolean(sessionStorage.getItem("jwt")))

  const login = async () => {
    await requestLogin()
    sessionStorage.setItem("jwt", crypto.randomUUID())
    checkLogged()
    navigate("app", { replace: true })
  }

  const logout = async () => {
    await requestLogout()    
    sessionStorage.removeItem("jwt")
    checkLogged()
    navigate("/")
  }

  return (
    <AuthContext value={{ login, logout, isLogged }}>
      <BackdropComponent open={isLoadingRequest} />
      { children }
    </AuthContext>
  )
}

export default AuthProvider