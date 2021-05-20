import { get } from 'lodash'

import { State } from './types'

import { Reducer } from '../types'
import { getters } from './reducer'
import { createSelector } from 'reselect'

interface Props {
	date: string
}

const getFromState = (state: Reducer): State => get(state, 'controls')
const getFromProps = (_: Reducer, { date }: Props) => ({ date })

export const getYear = (state: Reducer): number =>
	getters.year(getFromState(state))
export const getMonth = (state: Reducer): number =>
	getters.month(getFromState(state))
export const getDates = (state: Reducer): string[] =>
	getters.date(getFromState(state))

type Selector<T> = (_: Reducer, props: Props) => T
export const getIsSelected = (): Selector<boolean> =>
	createSelector([getDates, getFromProps], (dates, { date }) =>
		dates.includes(date)
	)
