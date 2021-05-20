import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Calendar from '~/components/calendar'
import Editable from '~/components/editable'
import { actions as userActions } from '~/redux/user'
import { actions as workdaysActions } from '~/redux/workdays'
import { actions as workplacesActions } from '~/redux/workplaces'
import { selectors as controlsSelectors } from '~/redux/controls'

const TimeSheet: React.FC = () => {
	const dispatch = useDispatch()
	const year = useSelector(controlsSelectors.getYear)
	const month = useSelector(controlsSelectors.getMonth)

	useEffect(() => {
		dispatch(userActions.userAsync())
		dispatch(workdaysActions.workdaysAsync(year, month))
		dispatch(workplacesActions.workplacesAsync())
	}, [dispatch, year, month])

	// const loadWorkdays = useCallback(() => {
	// 	axiosClient
	// 		.get('/api/workdays')
	// 		.then(response => {
	// 			console.log(response.data)
	// 		})
	// 		.catch(error => console.error(error))
	// }, [])

	return (
		<div>
			<div className="container mx-auto md:max-w-3xl">
				<Calendar />
				<Editable />
			</div>
		</div>
	)
}

export default TimeSheet
