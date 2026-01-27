import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
const useSearchProductByCompanyList = () => {
  const { responseService, behaivorService, requestService } = useApiService()

  const { showMessage } = useSnackbar()

  if (behaivorService.error) {
    showMessage("Ocurrió un error al ")
  }

  const request = async (companyId, filtro) => {
    const URL = endpoint.API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_LIST
      .replace("*", companyId)
      .replace("*", filtro)

    try {
      requestService(URL, "GET")
    } catch(error) {
      console.error(error.message)
    }
  }

  return { request, behaivorService, responseService }
}

export default useSearchProductByCompanyList