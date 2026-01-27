import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
import { useEffect } from "react"

const useCompanyList = () => {
  const { responseService, behaivorService, requestService } = useApiService()

  const { showMessage } = useSnackbar()

  useEffect(() => {
    if (behaivorService.error) {
      showMessage("Ocurrió un error al ", "warning")
    }
  }, [behaivorService.error])
  
  const request = async () => {
    try {
      requestService(endpoint.API_ENDPOINT_COMPANY_LIST, "GET")
    } catch(error) {
      console.error(error.message)
    }
  }

  return { request, behaivorService, responseService }
}

export default useCompanyList