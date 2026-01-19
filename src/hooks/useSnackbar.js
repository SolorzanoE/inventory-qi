import { SnackbarContext } from "@src/providers/context/ContextApp"
import { useContext } from "react"

const useSnackbar = () => (useContext(SnackbarContext))

export default useSnackbar