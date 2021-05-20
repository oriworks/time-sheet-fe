import { AsyncAction } from '../types'
import { Actions, ActionTypes } from './types'

interface AuthRequest {
	email: string
	password: string
}

export const logout = (): Actions => ({ type: ActionTypes.LOGOUT })

export const authenticateAsync =
	(request: AuthRequest): AsyncAction<void> =>
	async (dispatch, getState, { auth }) => {
		dispatch({ type: ActionTypes.START })
		try {
			await auth.login(request)

			dispatch({ type: ActionTypes.LOGIN })
		} catch (error) {
			dispatch({ type: ActionTypes.FAIL, error })
		}
	}
