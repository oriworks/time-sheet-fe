import { get } from 'lodash'

import { State, User } from './types'

import { Reducer } from '../types'
import { getters } from './reducer'

const getFromState = (state: Reducer): State => get(state, 'user')

export const getIsLoading = (state: Reducer): boolean =>
	getters.isLoading(getFromState(state))
export const getUser = (state: Reducer): User | null =>
	getters.data(getFromState(state))
