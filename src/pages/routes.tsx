import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	BrowserRouter,
	Route,
	Switch,
	Redirect,
	RouteProps
} from 'react-router-dom'

import Login from './login'
import TimeSheet from './time-sheet'
import {
	actions as authActions,
	selectors as authSelectors
} from '~/redux/auth'
import Workday from './workday'

interface PrivateRouteProps extends RouteProps {
	loggedIn: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			rest.loggedIn ? (
				children
			) : (
				<Redirect
					to={{ pathname: '/', state: { from: props.location } }}
				/>
			)
		}
	/>
)

const Routes: React.FC = () => {
	const dispatch = useDispatch()
	const loggedIn = useSelector(authSelectors.getLoggedIn)

	const logout = useCallback(() => dispatch(authActions.logout()), [dispatch])

	return (
		<div className="h-screen w-screen bg-gray-900 text-gray-50">
			<BrowserRouter>
				<header className="flex justify-between items-center container mx-auto md:max-w-3xl py-6">
					<div className="w-20 flex justify-start">
						<h1>Time Sheet</h1>
					</div>
					<div className="w-20 flex justify-center">
						<img
							className="h-12"
							src="https://jet7.com.pt/jet7.com.pt/wp-content/uploads/2020/04/logo-jet7.jpg"
							alt="[Jet 7.5]"
						/>
					</div>
					<div className="w-20 flex justify-end">
						{loggedIn && <button onClick={logout}>Sair</button>}
					</div>
				</header>
				<Switch>
					<Route exact path="/">
						{loggedIn ? <Redirect to="/time-sheet" /> : <Login />}
					</Route>
					<PrivateRoute exact path="/time-sheet" loggedIn={loggedIn}>
						<TimeSheet />
					</PrivateRoute>
					<PrivateRoute
						exact
						path="/time-sheet/workday"
						loggedIn={loggedIn}
					>
						<Workday />
					</PrivateRoute>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default Routes
