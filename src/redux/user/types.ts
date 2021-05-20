import { Workplace } from '../workplaces/types'

export enum ActionTypes {
	START = 'user/start',
	SUCCESS = 'user/success',
	FAIL = 'user/fail'
}

interface StartAction {
	type: ActionTypes.START
}
interface SuccessAction {
	type: ActionTypes.SUCCESS
	payload: User
}
interface FailAction {
	type: ActionTypes.FAIL
}

export type Actions = StartAction | SuccessAction | FailAction

export interface User {
	id: number
	name: string
	email: string
	workplace: Workplace
}

export type State = {
	isLoading: boolean
	data: User | null
}
