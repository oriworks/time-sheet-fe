import { combineReducers, Reducer } from 'redux'
import { get } from 'lodash'

import { Actions } from '../types'

import { ActionTypes, State } from './types'

export const initialState: State = {
	isLoading: false,
	loggedIn: false
}

const isLoading: Reducer<boolean, Actions> = (
	state: boolean = initialState.isLoading,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.START:
			return true
		case ActionTypes.LOGIN:
		case ActionTypes.FAIL:
			return false
		default:
			return state
	}
}

const loggedIn: Reducer<boolean, Actions> = (
	state: boolean = initialState.loggedIn,
	action: Actions
): boolean => {
	switch (action.type) {
		case ActionTypes.LOGIN:
			return true
		case ActionTypes.LOGOUT:
			return false
		default:
			return state
	}
}

export const getters = {
	isLoading: (state: State): boolean =>
		get(state, 'isLoading', initialState.isLoading),
	loggedIn: (state: State): boolean =>
		get(state, 'loggedIn', initialState.loggedIn)
}

export default combineReducers({
	isLoading,
	loggedIn
})
