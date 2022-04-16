import { SET_LOADING, SET_STORIES } from './actions'
const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: true }
		case SET_STORIES:
			const { hits, page, nbPages } = action.payload
			return { ...state, loading: false, hits, page, nbPages }
		default:
			throw new Error(`no matching ${action.type}`)
	}
}
export default reducer
