import React, { useCallback, useContext, useEffect, useState } from 'react'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('a')
	const [cocktails, setCocktails] = useState([])
	const fetchDrinks = useCallback(async () => {
		setLoading(true)
		try {
			const res = await fetch(`${url}${searchTerm}`)
			const data = await res.json()
			const { drinks } = data
			if (drinks) {
				const newCocktails = drinks.map((item) => {
					const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item
					return {
						id: idDrink,
						name: strDrink,
						image: strDrinkThumb,
						info: strAlcoholic,
						glass: strGlass,
					}
				})
				setCocktails(newCocktails)
			} else {
				setCocktails([])
			}
			setLoading(false)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}, [searchTerm])
	useEffect(() => {
		fetchDrinks()
	}, [fetchDrinks])

	return <AppContext.Provider value={{ loading, setSearchTerm, cocktails }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
