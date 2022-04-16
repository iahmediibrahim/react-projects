import { SET_LOADING } from './actions'
const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: true }
		default:
			throw new Error(`no matching ${action.type}`)
	}
}
export default reducer
