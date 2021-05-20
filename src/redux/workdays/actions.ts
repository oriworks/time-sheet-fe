import { AsyncAction } from '../types'
import { ActionTypes } from './types'

export const workdaysAsync =
	(year: number, month: number): AsyncAction<void> =>
	async (dispatch, getState, { user }) => {
		dispatch({ type: ActionTypes.START })
		try {
			const payload = await user.workdays(year, month)

			dispatch({ type: ActionTypes.SUCCESS, payload })
		} catch (error) {
			dispatch({ type: ActionTypes.FAIL, error })
		}
	}
