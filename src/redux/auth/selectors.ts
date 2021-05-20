import { get } from 'lodash'

import { State } from './types'

import { Reducer } from '../types'
import { getters } from './reducer'

const getFromState = (state: Reducer): State => get(state, 'auth')

export const getIsLoading = (state: Reducer): boolean =>
	getters.isLoading(getFromState(state))
export const getLoggedIn = (state: Reducer): boolean =>
	getters.loggedIn(getFromState(state))
