import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
import { useEffect } from "react"

const useReportComparationList = () => {
  const { responseService, behaivorService, requestService } = useApiService()

  const { showMessage } = useSnackbar()

  useEffect(() => {
    if (behaivorService.error) {
      showMessage("Ocurrió un error al crear el reporte", "error")
      console.error(behaivorService.error)
    }
  }, [behaivorService.error])

  // body = [{idProducto, cantidad}]
  const request = async (companyId, warehouseId, body) => {
    const URL = endpoint.API_ENDPOINT_REPORT_COMPARATION_POST
      .replace("*", companyId)
      .replace("*", warehouseId)

    return await requestService(URL, "POST", body)
  }

  return { request, behaivorService, responseService }
}

export default useReportComparationList