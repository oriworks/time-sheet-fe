import { combineReducers, Reducer } from 'redux'
import { get } from 'lodash'

import { Actions } from '../types'

import { ActionTypes, State, User } from './types'

export const initialState: State = {
	isLoading: false,
	data: null
}

const isLoading: Reducer<boolean, Actions> = (
	state: boolean = initialState.isLoading,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.START:
			return true
		case ActionTypes.SUCCESS:
		case ActionTypes.FAIL:
			return false
		default:
			return state
	}
}

const data: Reducer<User | null, Actions> = (
	state: User | null = initialState.data,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.SUCCESS:
			return action.payload
		default:
			return state
	}
}

export const getters = {
	isLoading: (state: State): boolean =>
		get(state, 'isLoading', initialState.isLoading),
	data: (state: State): User | null => get(state, 'data', initialState.data)
}

export default combineReducers({
	isLoading,
	data
})
