import { WorkplaceResponse } from '~/services/user.service'

export enum ActionTypes {
	LOAD_START = 'workplaces/load_start',
	LOAD_SUCCESS = 'workplaces/load_success',
	LOAD_FAIL = 'workplaces/load_fail'
}

interface StartAction {
	type: ActionTypes.LOAD_START
}
interface SuccessAction {
	type: ActionTypes.LOAD_SUCCESS
	payload: WorkplaceResponse[]
}
interface FailAction {
	type: ActionTypes.LOAD_FAIL
}

export type Actions = StartAction | SuccessAction | FailAction

export interface Workplace {
	id: number
	name: string
}

export type State = {
	isLoading: boolean
	data: Workplace[]
}
