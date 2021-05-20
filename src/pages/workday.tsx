import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Calendar from '~/components/calendar'
import Editable from '~/components/editable'
import {
	actions as userActions,
	selectors as userSelectors
} from '~/redux/user'
import { actions as workdaysActions } from '~/redux/workdays'
import {
	actions as workplacesActions,
	selectors as workplacesSelectors
} from '~/redux/workplaces'
import { selectors as controlsSelectors } from '~/redux/controls'
import {
	selectors as formSelectors,
	actions as formActions
} from '~/redux/form'
import classNames from 'classnames'
import Switch from '~/components/switch'
import { getShifts } from '~/redux/form/selectors'
import Shift from '~/components/editable/Shift'
import moment from 'moment'

const Workday: React.FC = () => {
	const currentEditDay = useSelector(formSelectors.getDay)
	const user = useSelector(userSelectors.getUser)

	// Dispatch
	const dispatch = useDispatch()

	useEffect(() => {
		if (user) {
			dispatch(formActions.load(currentEditDay, user.id))
		}
	}, [dispatch, currentEditDay, user])

	const dayOff = useSelector(formSelectors.getDayOff)
	const shifts = useSelector(formSelectors.getShifts)
	const workplaces = useSelector(workplacesSelectors.getWorkplaces)

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
		event => {
			event.preventDefault()
		},
		[]
	)

	const handleChange = useCallback(
		(value: boolean) => {
			dispatch(formActions.toggleDayOff(value))
		},
		[dispatch]
	)
	return (
		user && (
			<div className="container mx-auto md:max-w-3xl p-2">
				<div className="bg-gray-700 border border-gray-500 p-2 flex flex-col gap-2">
					<div className="flex justify-between">
						<span>{user.name}</span>
						<span>
							{moment.utc(currentEditDay).format('DD-MM-YYYY')}
						</span>
					</div>
					<form>
						<div className="flex justify-between items-center">
							<label htmlFor="dayOff">Folga:</label>
							<div className="w-16">
								<Switch
									id="dayOff"
									name="dayOff"
									checked={dayOff}
									onChange={handleChange}
								/>
							</div>
						</div>
					</form>
					{!dayOff &&
						shifts.map((s, i) => <Shift key={i} index={i} />)}
				</div>
				{/* <div className="container mx-auto md:max-w-3xl ">
				<form onSubmit={handleSubmit}>
				</form>
			</div> */}
			</div>
		)
	)
}

export default Workday
