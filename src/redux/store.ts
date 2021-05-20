import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import CryptoJS from 'crypto-js'
import aes from 'crypto-js/aes'

import { Actions, Dispatch, State, Store } from './types'

import { reducer } from '.'
import services, { Services } from '../services'
import authMiddleware from './auth/middleware'

export const loadState = (): State | undefined => {
	try {
		const serializedState = localStorage.getItem('state')

		return serializedState
			? JSON.parse(
					aes
						.decrypt(
							serializedState,
							process.env.LOCAL_STORAGE_ENCRYPT_KEY ??
								'LOCAL_STORAGE_ENCRYPT_KEY'
						)
						.toString(CryptoJS.enc.Utf8)
			  )
			: undefined
	} catch (error) {
		return undefined
	}
}

export const saveState = (state: State): void => {
	try {
		const serializedState = aes
			.encrypt(
				JSON.stringify(state),
				process.env.LOCAL_STORAGE_ENCRYPT_KEY ??
					'LOCAL_STORAGE_ENCRYPT_KEY'
			)
			.toString()

		localStorage.setItem('state', serializedState)
	} catch (error) {
		// Ignore write error
	}
}

const configureStore = (preloadedState?: State): Store => {
	const thunkMiddleware: ThunkMiddleware<State, Actions, Services> =
		thunk.withExtraArgument<Services>(services)

	const middlewares = [thunkMiddleware, authMiddleware]
	const middlewareEnhancer = applyMiddleware<Dispatch, State>(...middlewares)

	const enhancers = [middlewareEnhancer]
	const composedEnhancers = composeWithDevTools(...enhancers)

	const store = createStore(reducer, preloadedState, composedEnhancers)

	return store
}

export default configureStore
