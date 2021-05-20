import { combineReducers, Reducer } from 'redux'
import moment from 'moment'
import { get } from 'lodash'

import { Actions } from '../types'

import { ActionTypes, State } from './types'

const now = moment.utc()
export const initialState: State = {
	year: now.year(),
	month: parseInt(now.format('M')),
	date: []
}

const year: Reducer<number, Actions> = (
	state: number = initialState.year,
	action: Actions
) => {
	switch (action.type) {
		default:
			return state
	}
}
const month: Reducer<number, Actions> = (
	state: number = initialState.month,
	action: Actions
) => {
	switch (action.type) {
		default:
			return state
	}
}
const date: Reducer<string[], Actions> = (
	state: string[] = initialState.date,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.SELECT_DATE:
			return [action.payload]
		default:
			return state
	}
}

export const getters = {
	year: (state: State): number => get(state, 'year', initialState.year),
	month: (state: State): number => get(state, 'month', initialState.month),
	date: (state: State): string[] => get(state, 'date', initialState.date)
}

export default combineReducers({
	year,
	month,
	date
})
