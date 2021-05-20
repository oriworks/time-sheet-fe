import React from 'react'
import 'moment/locale/pt-br'
import { useSelector } from 'react-redux'
import { capitalize } from 'lodash'

import { selectors as controlsSelectors } from '~/redux/controls'
import Day from './Day'

const List: React.FC = () => {
	const days = useSelector(controlsSelectors.getDates)

	return (
		<div className="flex flex-col gap-y-2 py-2">
			{days.map(day => (
				<Day key={day} day={day} />
			))}
		</div>
	)
}

export default List
