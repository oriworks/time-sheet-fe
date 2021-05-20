import { get } from 'lodash'

import { State } from './types'

import { Reducer } from '../types'
import { getters } from './reducer'
import { EditableShift } from '../workdays/types'
import { createSelector } from 'reselect'
import moment, { Moment } from 'moment'

interface Props {
	index: number
}

const getFromState = (state: Reducer): State => get(state, 'form')
const getFromProps = (_: Reducer, { index }: Props) => ({ index })

export const getDay = (state: Reducer): string =>
	getters.day(getFromState(state))
export const getDayOff = (state: Reducer): boolean =>
	getters.dayOff(getFromState(state))
export const getShifts = (state: Reducer): EditableShift[] =>
	getters.shifts(getFromState(state))

type Selector<T> = (_: Reducer, props: Props) => T
interface EditTime {
	hour: number
	minute: number
}
export const getShift = (): Selector<{
	workplaceId: number
	startedAt: EditTime
	endedAt: EditTime
}> =>
	createSelector(
		[getDay, getShifts, getFromProps],
		(day, shifts, { index }) => {
			const shift = shifts[index]

			return {
				workplaceId: shift.workplaceId,
				startedAt: {
					hour: moment.utc(shift.startedAt).hour(),
					minute: moment.utc(shift.startedAt).minute()
				},
				endedAt: {
					hour: moment.utc(shift.endedAt).hour(),
					minute: moment.utc(shift.endedAt).minute()
				}
			}
		}
	)
