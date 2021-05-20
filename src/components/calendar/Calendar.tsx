import React from 'react'
import 'moment/locale/pt-br'
import { useSelector } from 'react-redux'
import { capitalize } from 'lodash'

import { selectors as workdaysSelectors } from '~/redux/workdays'
import Day from './Day'

const Calendar: React.FC = () => {
	const calendar = useSelector(workdaysSelectors.getWorkdays)
	const today = useSelector(workdaysSelectors.getToday)
	const month = useSelector(workdaysSelectors.getMonth)

	return (
		<div>
			<p className="text-center">{capitalize(today.format('MMMM'))}</p>
			<div className="grid grid-flow-row grid-cols-7 bg-gray-800 gap-0.5">
				<span className="text-center">Seg</span>
				<span className="text-center">Ter</span>
				<span className="text-center">Qua</span>
				<span className="text-center">Qui</span>
				<span className="text-center">Sex</span>
				<span className="text-center">Sab</span>
				<span className="text-center">Dom</span>
				{Object.keys(calendar).map(day => (
					<Day key={day} month={month} {...calendar[day]} />
				))}
			</div>
		</div>
	)
}

// DayOff - Validate
// Filled - Validate
// Disabled

export default Calendar
