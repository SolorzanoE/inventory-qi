import apiService from "@src/services/apiService"
import { useState } from "react"

const useApiService = () => {
  const requestModel = {
    loading: false,
    loaded: false,
    data: null,
    error: null
  }
  
  const [requestData, setRequestData] = useState(requestModel)

  const { data: responseService, ...behaivorService } = requestData

  //TODO: Get token by local storage

  const requestService = async (url, method, body) => {
    let response = null

    setRequestData(behaivor => ({ ...behaivor, loading: true, error: null }))

    try {
      response = await apiService.request(url, method, "token", body)

      setRequestData(behaivor => ({ ...behaivor, data: response, loaded: true }))
    } catch (error) {
      setRequestData(behaivor => ({ ...behaivor, error: error.message }))
    } finally {
      setRequestData(behaivor => ({ ...behaivor, loading: false }))
    }

    return response
  }

  return { requestService, behaivorService, responseService }
}

export default useApiService