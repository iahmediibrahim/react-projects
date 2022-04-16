import React, { useContext, useEffect, useReducer } from 'react'
import { HANDLE_PAGE, HANDLE_SEARCH, REMOVE_STORY, SET_LOADING, SET_STORIES } from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
	loading: true,
	hits: [],
	query: 'react',
	page: 47,
	nbPages: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const fetchStories = async (url) => {
		dispatch({ type: SET_LOADING })
		try {
			const resp = await fetch(url)
			const data = await resp.json()
			dispatch({ type: SET_STORIES, payload: data })
		} catch (error) {
			console.log(error.response)
		}
	}
	const removeStory = (id) => {
		dispatch({ type: REMOVE_STORY, id })
	}
	const handleSearch = (query) => {
		dispatch({ type: HANDLE_SEARCH, query })
	}
	const handlePage = (value) => {
		dispatch({ type: HANDLE_PAGE, value })
	}
	useEffect(() => {
		fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
	}, [state.query, state.page])

	return (
		<AppContext.Provider value={{ ...state, removeStory, handleSearch, handlePage }}>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
