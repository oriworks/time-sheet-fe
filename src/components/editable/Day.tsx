import classNames from 'classnames'
import moment from 'moment'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReSelector } from '~/hooks'

import {
	actions as controlsActions,
	selectors as controlsSelectors
} from '~/redux/controls'
import {
	actions as formActions,
	selectors as formSelectors
} from '~/redux/form'
import {
	actions as workdaysActions,
	selectors as workdaysSelectors
} from '~/redux/workdays'
import {
	actions as workplacesActions,
	selectors as workplacesSelectors
} from '~/redux/workplaces'

import { Shift, Workday } from '~/redux/workdays/types'
import { useHistory } from 'react-router'

interface Props {
	day: string
}

const Day: React.FC<Props> = ({ day }) => {
	const date = moment.utc(day)
	const history = useHistory()

	const workday = useReSelector(workdaysSelectors.getWorkday, {
		date: date.format('YYYY-MM-DD')
	})

	const dispatch = useDispatch()
	const handleEdit = useCallback(() => {
		dispatch(formActions.selectDate(day))
		history.push('/time-sheet/workday')
	}, [dispatch, day, history])

	return (
		<div className="rounded-lg p-2 flex flex-col bg-gray-600">
			<h1 className="font-semibold">{date.format('DD/MM/YYYY')}</h1>
			{workday.shifts.map(s => (
				<span key={`shift-${s.id}`}>
					{`${moment.utc(s.startedAt).format('HH:mm')}-${moment
						.utc(s.endedAt)
						.format('HH:mm')} ${s.workplace.name}`}
				</span>
			))}
			{!workday.validated && (
				<button
					className="bg-gray-800 border border-gray-400 p-2 hover:bg-indigo-800"
					onClick={handleEdit}
				>
					Editar
				</button>
			)}
		</div>
	)
}

// DayOff
// Filled
// Validate
// Disabled

export default Day
