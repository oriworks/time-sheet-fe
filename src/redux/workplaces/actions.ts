import { AsyncAction } from '../types'
import { ActionTypes } from './types'

export const workplacesAsync =
	(): AsyncAction<void> =>
	async (dispatch, getState, { user }) => {
		dispatch({ type: ActionTypes.LOAD_START })
		try {
			const payload = await user.workplaces()

			dispatch({ type: ActionTypes.LOAD_SUCCESS, payload })
		} catch (error) {
			dispatch({ type: ActionTypes.LOAD_FAIL, error })
		}
	}
