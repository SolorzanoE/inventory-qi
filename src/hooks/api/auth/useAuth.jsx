import { AuthContext } from "@src/providers/context/ContextApp"
import { useContext } from "react"

const useAuth = () => useContext(AuthContext)

export default useAuth