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
      console.error(behaivorService.error)
    }
  }, [behaivorService.error])
  
  const request = async () => 
    await requestService(endpoint.API_ENDPOINT_COMPANY_LIST, "GET")

  return { request, behaivorService, responseService }
}

export default useCompanyList