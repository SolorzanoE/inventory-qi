import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
import { useEffect } from "react"
const useSearchProductByCompanyList = () => {
  const { responseService, behaivorService, requestService } = useApiService()

  const { showMessage } = useSnackbar()

  useEffect(() => {
    if (behaivorService.error) {
      showMessage("Ocurrió un error al ", "warning")
      console.error(behaivorService.error)
    }
  }, [behaivorService.error])

  const request = async (companyId, filtro) => {
    const URL = endpoint.API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_LIST
      .replace("*", companyId)
      .replace("*", filtro)

    return await requestService(URL, "GET")
  }

  return { request, behaivorService, responseService }
}

export default useSearchProductByCompanyList