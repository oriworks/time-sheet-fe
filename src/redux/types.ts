import { Reducer as ReduxReducer, Store as ReduxStore } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Services } from '../services'

import { Actions as AuthActions, State as AuthState } from './auth/types'
import {
	Actions as ControlsActions,
	State as ControlsState
} from './controls/types'
import { Actions as FormActions, State as FormState } from './form/types'
import { Actions as UserActions, State as UserState } from './user/types'
import {
	Actions as WorkdaysActions,
	State as WorkdaysState
} from './workdays/types'
import {
	Actions as WorkplacesActions,
	State as WorkplacesState
} from './workplaces/types'

const DEFAULT_ACTION_TYPE = 'DEFAULT_ACTION_TYPE'
interface DefaultAction {
	type: typeof DEFAULT_ACTION_TYPE
}

export const defaultAction: DefaultAction = { type: DEFAULT_ACTION_TYPE }

export type Actions =
	| DefaultAction
	| AuthActions
	| ControlsActions
	| FormActions
	| UserActions
	| WorkdaysActions
	| WorkplacesActions
export interface State {
	auth: AuthState
	controls: ControlsState
	form: FormState
	user: UserState
	workdays: WorkdaysState
	workplaces: WorkplacesState
}

export type Reducer = ReduxReducer<State, Actions>
export type AsyncAction<R> = ThunkAction<Promise<R>, Reducer, Services, Actions>
export type Dispatch = ThunkDispatch<Reducer, Services, Actions>

export type Store = ReduxStore<State> & { dispatch: Dispatch }
