import { AsyncAction } from '../types'
import { ActionTypes } from './types'

export const userAsync =
	(): AsyncAction<void> =>
	async (dispatch, getState, { user }) => {
		dispatch({ type: ActionTypes.START })
		try {
			const payload = await user.me()

			dispatch({ type: ActionTypes.SUCCESS, payload })
		} catch (error) {
			dispatch({ type: ActionTypes.FAIL, error })
		}
	}
