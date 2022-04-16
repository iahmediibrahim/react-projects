import { HANDLE_PAGE, HANDLE_SEARCH, REMOVE_STORY, SET_LOADING, SET_STORIES } from './actions'
const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: true }
		case SET_STORIES:
			const { hits, page: pageNO, nbPages } = action.payload
			return { ...state, loading: false, hits, page: pageNO, nbPages }

		case REMOVE_STORY:
			return { ...state, hits: state.hits.filter((story) => story.objectID !== action.id) }
		case HANDLE_SEARCH:
			return { ...state, query: action.query, page: 0 }
		case HANDLE_PAGE:
			let page
			if (action.value === 'inc') {
				page = state.page + 1
				if (page >= state.nbPages - 1) page = 0
			} else if (action.value === 'dec') {
				page = state.page - 1
				if (page < 0) page = state.nbPages - 1
			}
			return { ...state, page }
		default:
			throw new Error(`no matching ${action.type}`)
	}
}
export default reducer
