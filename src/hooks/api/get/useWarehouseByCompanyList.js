import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"

const useWarehouseByCompanyList = () => {
  const { responseService, behaivorService, requestService } = useApiService()
  
  const { showMessage } = useSnackbar()

  if (behaivorService.error) {
    showMessage("Ocurrió un error al ")
  }

  const request = async (companyId) => {
    const URL = endpoint.API_ENDPOINT_WAREHOUSE_BY_COMPANY_LIST
      .replace("*", companyId)

    try {
      requestService(URL, "GET")
    } catch(error) {
      console.error(error.message)
    }
  }

  return { request, behaivorService, responseService }
}

export default useWarehouseByCompanyList