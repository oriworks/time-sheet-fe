import axiosClient from './axios-client'

interface LoginResponse {
	twoFactor: boolean
}

interface LoginRequest {
	email: string
	password: string
}

export interface AuthService {
	login: (request: LoginRequest) => Promise<void>
	logout: () => Promise<void>
}

const authService: AuthService = {
	login: async (request: LoginRequest) =>
		await axiosClient.get('/sanctum/csrf-cookie').then(() => {
			return axiosClient
				.post<LoginResponse>('/login', request)
				.then(({ status }) => {
					if (status !== 200) {
						throw new Error(
							'Something went wrong! Please contact support.'
						)
					}
				})
		}),
	logout: async () =>
		await axiosClient.post('/logout').then(({ status }) => {
			if (status !== 204) {
				throw new Error('Something went wrong! Please contact support.')
			}
		})
}

export default authService
