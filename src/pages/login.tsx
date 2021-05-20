import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actions as authActions } from '~/redux/auth'

const Login: React.FC = () => {
	const [email, setEmail] = React.useState('joeloliveira@oriworks.com')
	const [password, setPassword] = React.useState('qwerty123')

	const dispatch = useDispatch()

	const handleLogin: React.FormEventHandler<HTMLFormElement> = useCallback(
		e => {
			e.preventDefault()
			dispatch(authActions.authenticateAsync({ email, password }))
		},
		[dispatch, email, password]
	)

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login
