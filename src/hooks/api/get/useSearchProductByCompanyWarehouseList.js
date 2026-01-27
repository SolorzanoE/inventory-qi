import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"

const useSearchProductByCompanyWarehouseList = () => {
  const { responseService, behaivorService, requestService } = useApiService()

  const { showMessage } = useSnackbar()

  if (behaivorService.error) {
    showMessage("Ocurrió un error al ")
  }

  const request = async (companyId, warehouseId) => {
    const URL = endpoint.API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_WAREHOUSE_LIST
      .replace("*", companyId)
      .replace("*", warehouseId)

    try {
      requestService(URL, "GET")
    } catch(error) {
      console.error(error.message)
    }
  }

  return { request, behaivorService, responseService }
}

export default useSearchProductByCompanyWarehouseList