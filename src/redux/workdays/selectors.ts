import { get } from 'lodash'
import moment, { Moment } from 'moment'

import { Shift, State, Workday, Workdays } from './types'

import { Reducer } from '../types'
import { getters } from './reducer'
import { createSelector } from 'reselect'

interface Props {
	date: string
}
const getFromState = (state: Reducer): State => get(state, 'workdays')
const getFromProps = (_: Reducer, { date }: Props) => ({ date })

export const getIsLoading = (state: Reducer): boolean =>
	getters.isLoading(getFromState(state))
export const getMonth = (state: Reducer): number =>
	getters.month(getFromState(state))
export const getToday = (state: Reducer): Moment =>
	moment.utc(getters.today(getFromState(state)))
export const getWorkdays = (state: Reducer): Workdays =>
	getters.data(getFromState(state))

type Selector<T> = (_: Reducer, props: Props) => T

export interface FormattedWorkday extends Workday {
	hours?: string
	workplaces?: string
}
const countHours = (shifts: Shift[]): number =>
	shifts.reduce(
		(agg, { endedAt, startedAt }) =>
			agg +
			moment
				.duration(moment.utc(endedAt).diff(moment.utc(startedAt)))
				.asHours(),
		0
	)
export const getWorkday = (): Selector<FormattedWorkday> =>
	createSelector([getWorkdays, getFromProps], (workdays, { date }) => {
		return (
			workdays[date] && {
				...workdays[date],
				hours: `${countHours(workdays[date].shifts)}H`,
				workplaces: workdays[date].shifts
					.map(s => s.workplace.name)
					.join(' / ')
			}
		)
	})
