import { combineReducers, Reducer } from 'redux'
import { get } from 'lodash'

import { Actions } from '../types'

import { ActionTypes, State, Workplace } from './types'

export const initialState: State = {
	isLoading: false,
	data: []
}

const isLoading: Reducer<boolean, Actions> = (
	state: boolean = initialState.isLoading,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.LOAD_START:
			return true
		case ActionTypes.LOAD_SUCCESS:
		case ActionTypes.LOAD_FAIL:
			return false
		default:
			return state
	}
}

const data: Reducer<Workplace[], Actions> = (
	state: Workplace[] = initialState.data,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.LOAD_SUCCESS:
			return action.payload
		default:
			return state
	}
}

export const getters = {
	isLoading: (state: State): boolean =>
		get(state, 'isLoading', initialState.isLoading),
	data: (state: State): Workplace[] => get(state, 'data', initialState.data)
}

export default combineReducers({
	isLoading,
	data
})
