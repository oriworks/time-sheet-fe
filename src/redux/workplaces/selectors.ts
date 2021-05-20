import { get } from 'lodash'

import { State, Workplace } from './types'

import { Reducer } from '../types'
import { getters } from './reducer'
import { createSelector } from 'reselect'

interface Props {
	ids: number[]
}
const getFromState = (state: Reducer): State => get(state, 'workplaces')
const getFromProps = (_: Reducer, { ids }: Props) => ({ ids })

export const getIsLoading = (state: Reducer): boolean =>
	getters.isLoading(getFromState(state))
export const getWorkplaces = (state: Reducer): Workplace[] =>
	getters.data(getFromState(state))

type Selector<T> = (_: Reducer, props: Props) => T
const notEmpty = <TValue>(
	value: TValue | null | undefined
): value is TValue => {
	return value !== null && value !== undefined
}
export const getWorkplaceName = (): Selector<Workplace[]> =>
	createSelector([getWorkplaces, getFromProps], (workplaces, { ids }) =>
		ids.map(id => workplaces.find(w => w.id === id)).filter(notEmpty)
	)
