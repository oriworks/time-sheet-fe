import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as dotenv from 'dotenv'

import App from './App'
import configureStore, { loadState, saveState } from './redux/store'

import './index.css'

dotenv.config()
const store = configureStore(loadState())

store.subscribe(() => {
	saveState(store.getState())
})

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
