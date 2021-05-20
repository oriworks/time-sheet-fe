import { combineReducers, Reducer } from 'redux'
import { get } from 'lodash'

import { Actions } from '../types'

import { ActionTypes, State, Workday, Workdays } from './types'
import { WorkdayResponse, WorkdaysResponse } from '~/services/user.service'
import moment from 'moment'

const initialStateWorkday: Workday = {
	workdayId: null,
	day: '',
	shifts: [],
	dayOff: false,
	validated: false,
	disabled: false
}

export const initialState: State = {
	isLoading: false,
	today: '',
	month: 0,
	data: {}
}

const isLoading: Reducer<boolean, Actions> = (
	state: boolean = initialState.isLoading,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.START:
			return true
		case ActionTypes.SUCCESS:
		case ActionTypes.FAIL:
			return false
		default:
			return state
	}
}

const today: Reducer<string, Actions> = (
	state: string = initialState.today,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.START:
			return initialState.today
		case ActionTypes.SUCCESS:
			return action.payload.today
		default:
			return state
	}
}

const month: Reducer<number, Actions> = (
	state: number = initialState.month,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.SUCCESS:
			return moment.utc(action.payload.today).get('month')
		default:
			return state
	}
}

const prepareData = (response: WorkdaysResponse): Workdays => {
	const data: Workdays = {}

	const workdays = response.workdays.reduce<{
		[date: string]: WorkdayResponse
	}>(
		(agg, workday) => ({
			...agg,
			[moment.utc(workday.day).format('YYYY-MM-DD')]: workday
		}),
		{}
	)

	const lastDay = moment.utc(response.lastDay)
	const iterator = moment.utc(response.firstDay)

	while (iterator.isSameOrBefore(lastDay)) {
		const dayFormatted = iterator.format('YYYY-MM-DD')
		data[dayFormatted] = workdays[dayFormatted]
			? {
					...initialStateWorkday,
					workdayId: workdays[dayFormatted].id,
					dayOff: workdays[dayFormatted].dayOff,
					shifts: workdays[dayFormatted].shifts.map(s => ({
						id: s.id,
						startedAt: s.startedAt,
						endedAt: s.endedAt,
						workplace: s.workplace
					})),
					validated: workdays[dayFormatted].validate
			  }
			: { ...initialStateWorkday }
		data[dayFormatted].day = iterator.format()
		data[dayFormatted].disabled =
			iterator.isAfter(moment.utc(response.today)) ||
			data[dayFormatted].validated

		iterator.add(1, 'days')
	}

	return data
}

const data: Reducer<Workdays, Actions> = (
	state: Workdays = initialState.data,
	action: Actions
) => {
	switch (action.type) {
		case ActionTypes.SUCCESS:
			return prepareData(action.payload)
		default:
			return state
	}
}

export const getters = {
	isLoading: (state: State): boolean =>
		get(state, 'isLoading', initialState.isLoading),
	month: (state: State): number => get(state, 'month', initialState.month),
	today: (state: State): string => get(state, 'today', initialState.today),
	data: (state: State): Workdays => get(state, 'data', initialState.data)
}

export default combineReducers({
	isLoading,
	month,
	today,
	data
})
