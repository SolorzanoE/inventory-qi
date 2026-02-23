import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
import { useEffect } from "react"

const useLogin = () => {
  const { requestService, responseService, behaivorService } = useApiService()

  const { showMessage } = useSnackbar()

  useEffect(() => {
    if (behaivorService.error) {
      
      showMessage("Ocurrió un error al iniciar sesión", "error")
      console.error(behaivorService.error)
    }
  }, [behaivorService.error])
  
  const request = async (user, password) => {
    const URL = endpoint.API_ENDPOINT_LOGIN

    return await requestService(URL, "POST", { user, password })
  }

  return { request, responseService, behaivorService }
}

export default useLogin