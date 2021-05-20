import axiosClient from './axios-client'

export interface WorkplaceResponse {
	id: number
	name: string
}

interface UserResponse {
	id: number
	name: string
	email: string
	workplace: WorkplaceResponse
}

export interface ShiftResponse {
	id: number
	startedAt: string
	endedAt: string
	workplace: WorkplaceResponse
}

export interface WorkdayResponse {
	id: number
	day: string
	dayOff: boolean
	validate: boolean
	shifts: ShiftResponse[]
}

export interface WorkdaysResponse {
	today: string
	firstDay: string
	lastDay: string
	workdays: WorkdayResponse[]
}

export interface UserService {
	me: () => Promise<UserResponse>
	workdays: (year: number, month: number) => Promise<WorkdaysResponse>
	workplaces: () => Promise<WorkplaceResponse[]>
}

const userService: UserService = {
	me: async () =>
		await axiosClient
			.get<UserResponse>('/api/me')
			.then(response => response.data),
	workdays: async (year: number, month: number) =>
		await axiosClient
			.get<WorkdaysResponse>(`/api/workdays/year/${year}/month/${month}`)
			.then(response => ({
				today: response.data.today,
				firstDay: response.data.firstDay,
				lastDay: response.data.lastDay,
				workdays: response.data.workdays
			})),
	workplaces: async () =>
		await axiosClient
			.get<WorkplaceResponse[]>(`/api/workplaces`)
			.then(response => response.data)
}

export default userService
