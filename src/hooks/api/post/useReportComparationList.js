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
    }
  }, [behaivorService.error])

  // body = [{idProducto, cantidad}]
  const request = async (companyId, body) => {
    const URL = endpoint.API_ENDPOINT_REPORT_COMPARATION_POST
      .replace("*", companyId)

    try {
      requestService(URL, "POST", body)
    } catch(error) {
      console.error(error.message)
    }
  }

  return { request, behaivorService, responseService }
}

export default useReportComparationList