import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/images',
  timeout: 5000,
})

export const get = (url, config = {}) => {
  return axiosInstance.get(url, config)
}

export const post = (url, data, config = {}) => {
  return axiosInstance.post(url, data, config)
}

export default axiosInstance;