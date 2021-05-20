import { combineReducers } from 'redux'

import authReducer, { initialState as authInitialState } from './auth'
import controlsReducer, {
	initialState as controlsInitialState
} from './controls'
import formReducer, { initialState as formInitialState } from './form'
import userReducer, { initialState as userInitialState } from './user'
import workdaysReducer, {
	initialState as workdaysInitialState
} from './workdays'
import workplacesReducer, {
	initialState as workplacesInitialState
} from './workplaces'

import { Reducer, State } from './types'

export const reducer: Reducer = combineReducers({
	auth: authReducer,
	controls: controlsReducer,
	form: formReducer,
	user: userReducer,
	workdays: workdaysReducer,
	workplaces: workplacesReducer
})

export const initialState: State = {
	auth: authInitialState,
	controls: controlsInitialState,
	form: formInitialState,
	user: userInitialState,
	workdays: workdaysInitialState,
	workplaces: workplacesInitialState
}
