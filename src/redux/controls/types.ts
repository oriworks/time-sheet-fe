export enum ActionTypes {
	SELECT_DATE = 'controls/select_date'
}

interface SelectDateAction {
	type: ActionTypes.SELECT_DATE
	payload: string
}

export type Actions = SelectDateAction

export type State = {
	year: number
	month: number
	date: string[]
}
