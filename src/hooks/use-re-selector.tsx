import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const useReSelector = <TState, TArgs, TSelected>(
	selector: () => (state: TState, args: TArgs) => TSelected,
	args: TArgs,
	equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => {
	const getParams = useMemo(() => args, [args])
	const propSelector = useMemo(() => selector(), [selector])
	return useSelector(
		(state: TState) => propSelector(state, getParams),
		equalityFn
	)
}

export default useReSelector
