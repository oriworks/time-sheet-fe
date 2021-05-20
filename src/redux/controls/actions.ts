import { Actions } from '../types'
import { ActionTypes } from './types'

export const selectDate = (date: string): Actions => ({
	type: ActionTypes.SELECT_DATE,
	payload: date
})
