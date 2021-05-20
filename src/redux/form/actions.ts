import moment from 'moment'
import { Actions, AsyncAction } from '../types'
import { getUser } from '../user/selectors'
import { getWorkday } from '../workdays/selectors'
import { ActionTypes } from './types'

export const selectDate = (date: string): Actions => ({
	type: ActionTypes.SELECT_DAY,
	payload: date
})

export const toggleDayOff = (value: boolean): Actions => ({
	type: ActionTypes.CHANGE_DAY_OFF,
	payload: value
})

export const changeWorkplace = (
	index: number,
	workplaceId: number
): Actions => ({
	type: ActionTypes.CHANGE_WORKPLACE,
	payload: {
		index,
		workplaceId
	}
})

export const load =
	(day: string, userId: number): AsyncAction<void> =>
	async (dispatch, getState) => {
		const workday = getWorkday()(getState(), { date: day })
		const user = getUser(getState())

		if (user) {
			if (workday) {
				//
			} else {
				dispatch({
					type: ActionTypes.LOAD,
					payload: {
						day,
						dayOff: false,
						shifts: [
							{
								workplaceId: user.workplace.id,
								startedAt: moment
									.utc(day)
									.hour(9)
									.minute(0)
									.format(),
								endedAt: moment
									.utc(day)
									.hour(9)
									.minute(0)
									.format()
							}
						]
					}
				})
			}
		}
	}
