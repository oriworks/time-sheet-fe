import axios, { AxiosResponse } from 'axios'
import { camelizeKeys } from 'humps'

const axiosClient = axios.create({
	baseURL: 'http://localhost:8000',
	withCredentials: true
})

axiosClient.interceptors.response.use((response: AxiosResponse) => {
	if (
		response.data &&
		response.headers['content-type'] === 'application/json'
	) {
		response.data = camelizeKeys(response.data)
	}
	return response
})

export default axiosClient
