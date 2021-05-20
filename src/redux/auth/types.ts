export enum ActionTypes {
	START = 'auth/start',
	SUCCESS = 'auth/success',
	FAIL = 'auth/fail',
	LOGIN = 'auth/login',
	LOGOUT = 'auth/logout'
}

interface StartAction {
	type: ActionTypes.START
}
interface SuccessAction {
	type: ActionTypes.SUCCESS
}
interface FailAction {
	type: ActionTypes.FAIL
}
interface LoginAction {
	type: ActionTypes.LOGIN
}
interface LogoutAction {
	type: ActionTypes.LOGOUT
}

export type Actions =
	| LoginAction
	| LogoutAction
	| StartAction
	| SuccessAction
	| FailAction

export type State = {
	isLoading: boolean
	loggedIn: boolean
}
