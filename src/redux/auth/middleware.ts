import { Middleware } from 'redux'
import { logout } from './actions'

const authMiddleware: Middleware =
	({ dispatch }) =>
	next =>
	action => {
		if (!action.error) {
			return next(action)
		}
		switch (action.error.response.status) {
			case 401:
			case 419:
			case 503:
				dispatch(logout())
				window.location.reload()
				break
			default:
				return next(action)
		}
	}

export default authMiddleware
