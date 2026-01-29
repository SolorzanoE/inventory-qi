import endpoint from "@root/endpointConfig"
import useApiService from "@src/hooks/useApiService"
import useSnackbar from "@src/hooks/useSnackbar"
import { useEffect } from "react"

const useReportComparationList = () => {
  const { responseService, behaivorService, requestService } = useApiService()

  const { showMessage } = useSnackbar()

  useEffect(() => {
    if (behaivorService.error) {
      showMessage("Ocurrió un error al ", "warning")
      console.error(behaivorService.error)
    }
  }, [behaivorService.error])

  // body = [{idProducto, cantidad}]
  const request = async (companyId, body) => {
    const URL = endpoint.API_ENDPOINT_REPORT_COMPARATION_POST
      .replace("*", companyId)

    return await requestService(URL, "POST", body)
  }

  return { request, behaivorService, responseService }
}

export default useReportComparationList