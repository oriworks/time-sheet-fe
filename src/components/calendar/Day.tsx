import classNames from 'classnames'
import moment from 'moment'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useReSelector } from '~/hooks'

import {
	actions as controlsActions,
	selectors as controlsSelectors
} from '~/redux/controls'
import {
	actions as workplacesActions,
	selectors as workplacesSelectors
} from '~/redux/workplaces'

import { Shift, Workday } from '~/redux/workdays/types'
import { FormattedWorkday } from '~/redux/workdays/selectors'

interface Props extends FormattedWorkday {
	month: number
}

const Day: React.FC<Props> = ({
	month,
	workdayId,
	day,
	shifts,
	hours,
	dayOff,
	validated,
	disabled
}) => {
	const date = moment.utc(day)
	const sameMonth = month === date.get('month')

	const dispatch = useDispatch()
	const handleSelect = useCallback(() => {
		!disabled && !validated && dispatch(controlsActions.selectDate(day))
	}, [dispatch, day, disabled, validated])

	const isSelected = useReSelector(controlsSelectors.getIsSelected, {
		date: day
	})

	const workplaces = useReSelector(workplacesSelectors.getWorkplaceName, {
		ids: shifts.map(s => s.workplace.id)
	})
	/**
	 *	'bg-indigo-500': workdayId != null && !validated && !disabled,
	 *	'bg-green-400': validated,
	 *	'bg-green-500': validated,
	 *	'bg-gray-400': disabled && !validated,
	 *	'bg-gray-500': disabled && !validated && !sameMonth
	 */

	return (
		<div
			className={classNames(
				`flex-grow border border-transparent cursor-pointer`,
				{
					'bg-gray-500': !sameMonth,
					'bg-green-500 cursor-not-allowed': validated,
					'bg-indigo-500': workdayId != null && !validated,
					'bg-gray-400 cursor-not-allowed': disabled,
					'border-red-500': isSelected,
					'bg-gray-900':
						sameMonth &&
						!validated &&
						!disabled &&
						workdayId === null
				}
			)}
			onClick={handleSelect}
		>
			<div
				className={classNames(
					'p-1 leading-4 flex flex-col justify-between',
					{}
				)}
			>
				<div className="flex justify-between items-center">
					<span>{`${date.get('date')}`}</span>
					<span className="font-semibold text-xs leading-3">
						{dayOff ? 'F' : hours}
					</span>
				</div>
				<div className="flex flex-row justify-end items-center font-semibold text-xs w-full text-right">
					{!dayOff &&
						workplaces &&
						workplaces.map(({ name }) => name).join(' / ')}
				</div>
			</div>
		</div>
	)
}

// DayOff
// Filled
// Validate
// Disabled

export default Day
