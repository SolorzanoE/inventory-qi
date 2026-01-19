import apiService from "@src/services/apiService"
import { useCallback, useState } from "react"

const useApiService = () => {
  const [requestData, setRequestData] = useState({
    loading: false,
    loaded: false,
    data: null,
    error: null
  })

  const { data: responseService, ...behaivorService  } = requestData

  //TODO: Get token by local storage

  const requestService = useCallback( async (url, method, body) => {
    try {
      setRequestData(behaivor => ({ ...behaivor, loading: true, error: null }))

      const response = await apiService.request(url, method, "token", body)

      setRequestData(behaivor => ({ ...behaivor, data: response, loaded: true }))
    } catch (error) {
      setRequestData(behaivor => ({ ...behaivor, error: error.message }))
    } finally {
      setRequestData(behaivor => ({ ...behaivor, loading: false }))
    }
  }, [])

  return { requestService, behaivorService, responseService }
}

export default useApiService