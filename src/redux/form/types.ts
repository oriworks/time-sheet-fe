import { EditableShift, Shift } from '../workdays/types'

export enum ActionTypes {
	LOAD = 'form/load',
	SELECT_DAY = 'form/select_day',
	CHANGE_DAY_OFF = 'form/change_day_off',
	CHANGE_WORKPLACE = 'form/change_workplace'
}

interface SelectDayAction {
	type: ActionTypes.SELECT_DAY
	payload: string
}

interface ChangeDayOffAction {
	type: ActionTypes.CHANGE_DAY_OFF
	payload: boolean
}

interface ChangeWorkplacePayload {
	index: number
	workplaceId: number
}
interface ChangeWorkplaceAction {
	type: ActionTypes.CHANGE_WORKPLACE
	payload: ChangeWorkplacePayload
}

interface LoadFormAction {
	type: ActionTypes.LOAD
	payload: State
}

export type Actions =
	| LoadFormAction
	| SelectDayAction
	| ChangeDayOffAction
	| ChangeWorkplaceAction

export type State = {
	day: string
	dayOff: boolean
	shifts: EditableShift[]
}
