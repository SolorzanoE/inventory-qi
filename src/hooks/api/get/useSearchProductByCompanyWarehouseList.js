import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
import { useEffect } from "react"

const useSearchProductByCompanyWarehouseList = () => {
  const { responseService, behaivorService, requestService } = useApiService()

  const { showMessage } = useSnackbar()

  useEffect(() => {
    if (behaivorService.error) {
      showMessage("Ocurrió un error al ", "warning")
      console.error(behaivorService.error)
    }
  }, [behaivorService.error])

  const request = async (companyId, warehouseId, filtro) => {
    const URL = endpoint.API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_WAREHOUSE_LIST
      .replace("*", companyId)
      .replace("*", warehouseId)
      .replace("*", filtro)
    
    return await requestService(URL, "GET")
  }

  return { request, behaivorService, responseService }
}

export default useSearchProductByCompanyWarehouseList