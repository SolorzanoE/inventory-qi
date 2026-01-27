import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
import { useEffect } from "react"

const useProductExistenceByCompanyWarehouseList = () => {
  const { responseService, behaivorService, requestService } = useApiService()

  const { showMessage } = useSnackbar()

  useEffect(() => {
    if (behaivorService.error) {
      showMessage("Ocurrió un error al ", "warning")
    }
  }, [behaivorService.error])

  const request = async (companyId, warehouseId) => {
    const URL = endpoint.API_ENDPOINT_PRODUCT_EXISTENCE_BY_COMPANY_WAREHOUSE_LIST
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

export default useProductExistenceByCompanyWarehouseList