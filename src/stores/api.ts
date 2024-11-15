import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

const api = applyCaseMiddleware(
  axios.create({
    baseURL: 'https://api.axas.store/api/v1/stores',
  })
)

export default api
