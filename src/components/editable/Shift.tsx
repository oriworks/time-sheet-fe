import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReSelector } from '~/hooks'

import {
	selectors as formSelectors,
	actions as formActions
} from '~/redux/form'
import {
	actions as workplacesActions,
	selectors as workplacesSelectors
} from '~/redux/workplaces'

interface Props {
	index: number
}

const hours = (min = 9, max = 23): number[] => {
	const hours = []
	for (let index = min; index <= max; index++) {
		hours.push(index % 24)
	}
	return hours
}

const Shift: React.FC<Props> = ({ index }) => {
	const { workplaceId, startedAt, endedAt } = useReSelector(
		formSelectors.getShift,
		{ index }
	)
	const workplaces = useSelector(workplacesSelectors.getWorkplaces)

	// Dispatch
	const dispatch = useDispatch()
	const handleChangeWorkplace: React.ChangeEventHandler<HTMLSelectElement> =
		useCallback(
			event => {
				console.log(event.target.value)
				dispatch(
					formActions.changeWorkplace(
						index,
						parseInt(event.target.value)
					)
				)
			},
			[dispatch, index]
		)

	return (
		<div className="border p-2">
			<label className="flex justify-between items-center gap-2">
				<span>Local:</span>
				<select
					className="block w-full mt-1 text-black"
					value={workplaceId}
					onChange={handleChangeWorkplace}
				>
					{workplaces.map(w => (
						<option key={w.id} value={w.id}>
							{w.name}
						</option>
					))}
				</select>
			</label>
			<div className="flex justify-between items-center gap-2">
				<span>Entrada:</span>
				<select
					className="block w-full mt-1 text-black"
					value={startedAt.hour}
				>
					{hours(9, 23).map(h => (
						<option key={`in-hours-${h}`} value={h}>
							{h}
						</option>
					))}
				</select>
				<span>H</span>
				<select
					className="block w-full mt-1 text-black"
					value={startedAt.minute}
				>
					{[
						{ value: 0, label: '00' },
						{ value: 30, label: '30' }
					].map(h => (
						<option key={`in-minutes-${h.value}`} value={h.value}>
							{h.label}
						</option>
					))}
				</select>
				<span>m</span>
			</div>
			<div className="flex justify-between items-center gap-2">
				<span>Saída:</span>
				<select
					className="block w-full mt-1 text-black"
					value={endedAt.hour}
				>
					{hours(9, 30).map(h => (
						<option key={`out-hours-${h}`} value={h}>
							{h}
						</option>
					))}
				</select>
				<span>H</span>
				<select
					className="block w-full mt-1 text-black"
					value={endedAt.minute}
				>
					{[
						{ value: 0, label: '00' },
						{ value: 30, label: '30' }
					].map(h => (
						<option key={`out-minutes-${h.value}`} value={h.value}>
							{h.label}
						</option>
					))}
				</select>
				<span>m</span>
			</div>
		</div>
	)
}

export default Shift
