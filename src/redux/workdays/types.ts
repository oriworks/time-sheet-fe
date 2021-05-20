import { WorkdaysResponse } from '~/services/user.service'
import { Workplace } from '../workplaces/types'

export enum ActionTypes {
	START = 'workdays/start',
	SUCCESS = 'workdays/success',
	FAIL = 'workdays/fail'
}

interface StartAction {
	type: ActionTypes.START
}
interface SuccessAction {
	type: ActionTypes.SUCCESS
	payload: WorkdaysResponse
}
interface FailAction {
	type: ActionTypes.FAIL
}

export type Actions = StartAction | SuccessAction | FailAction

export interface EditableShift {
	id?: number
	workplaceId: number
	startedAt: string
	endedAt: string
}

export interface Shift {
	id: number
	workplace: Workplace
	startedAt: string
	endedAt: string
}

export interface Workday {
	workdayId: number | null
	day: string
	dayOff: boolean
	shifts: Shift[]
	validated: boolean
	disabled: boolean
}

export interface Workdays {
	[date: string]: Workday
}

export type State = {
	isLoading: boolean
	today: string
	month: number
	data: Workdays
}
