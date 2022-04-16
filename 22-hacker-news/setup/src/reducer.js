import { HANDLE_SEARCH, REMOVE_STORY, SET_LOADING, SET_STORIES } from './actions'
const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: true }
		case SET_STORIES:
			const { hits, page, nbPages } = action.payload
			return { ...state, loading: false, hits, page, nbPages }

		case REMOVE_STORY:
			return { ...state, hits: state.hits.filter((story) => story.objectID !== action.id) }
		case HANDLE_SEARCH:
			return { ...state, query: action.query, page: 0 }
		default:
			throw new Error(`no matching ${action.type}`)
	}
}
export default reducer
