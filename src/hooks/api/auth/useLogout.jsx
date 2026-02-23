import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
import { useEffect } from "react"

const useLogout = () => {
  const { requestService, responseService, behaivorService } = useApiService()

  const { showMessage } = useSnackbar()

  useEffect(() => {
    if (behaivorService.error) {
      showMessage("Ocurrió un error al cerrar sesión", "error")
      console.error(behaivorService.error)
    }
  }, [behaivorService.error])
  
  const request = async () => {
    const URL = endpoint.API_ENDPOINT_LOGOUT

    return await requestService(URL, "GET")
  }

  return { request, responseService, behaivorService }
}

export default useLogout