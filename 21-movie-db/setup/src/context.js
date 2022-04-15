import React, { useContext, useState } from 'react'
import useFetch from './useFetch'
// make sure to use https
const AppContext = React.createContext()
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const AppProvider = ({ children }) => {
	const [query, setQuery] = useState('sup')
	const { loading, error, data: movies } = useFetch(`&s=${query}`)

	return (
		<AppContext.Provider
			value={{
				loading,
				error,
				movies,
				setQuery,
			}}>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
