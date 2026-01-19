import apiService from "@src/services/apiService"
import { useCallback, useState } from "react"

const useApiService = () => {
  const [behaivorRequest, setBehaivorRequest] = useState({
    loading: false,
    loaded: false,
    data: null,
    error: null
  })

  //TODO: Get token by local storage

  const requestService = useCallback( async (url, method, body) => {
    try {
      setBehaivorRequest(behaivor => ({ ...behaivor, loading: true, error: null }))

      const response = await apiService.request(url, method, "token", body)

      setBehaivorRequest(behaivor => ({ ...behaivor, data: response, loaded: true }))
    } catch (error) {
      setBehaivorRequest(behaivor => ({ ...behaivor, error: error.message }))
    } finally {
      setBehaivorRequest(behaivor => ({ ...behaivor, loading: false }))
    }
  }, [])

  return { behaivorRequest, requestService }
}

export default useApiService