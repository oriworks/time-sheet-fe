import { combineReducers, Reducer } from 'redux'
import { get } from 'lodash'

import { Actions } from '../types'

import { ActionTypes, State } from './types'
import { EditableShift, Shift } from '../workdays/types'

export const initialState: State = {
	day: '',
	dayOff: false,
	shifts: []
}

const day: Reducer<string, Actions> = (
	state: string = initialState.day,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.LOAD:
			return action.payload.day
		case ActionTypes.SELECT_DAY:
			return action.payload
		default:
			return state
	}
}
const dayOff: Reducer<boolean, Actions> = (
	state: boolean = initialState.dayOff,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.LOAD:
			return action.payload.dayOff
		case ActionTypes.CHANGE_DAY_OFF:
			return action.payload
		default:
			return state
	}
}
const shifts: Reducer<EditableShift[], Actions> = (
	state: EditableShift[] = initialState.shifts,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.LOAD:
			return action.payload.shifts
		case ActionTypes.CHANGE_WORKPLACE:
			return state.map((value, index) =>
				index !== action.payload.index
					? value
					: { ...value, workplaceId: action.payload.workplaceId }
			)
		default:
			return state
	}
}

export const getters = {
	day: (state: State): string => get(state, 'day', initialState.day),
	dayOff: (state: State): boolean =>
		get(state, 'dayOff', initialState.dayOff),
	shifts: (state: State): EditableShift[] =>
		get(state, 'shifts', initialState.shifts)
}

export default combineReducers({
	day,
	dayOff,
	shifts
})
