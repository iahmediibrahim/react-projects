import { useEffect, useState } from 'react'
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const useFetch = (urlParams) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState({ show: false, message: '' })
	const [data, setData] = useState([])
	const fetchData = async (url) => {
		setLoading(true)
		try {
			const resp = await fetch(url)
			const data = await resp.json()
			if (data.Response === 'True') {
				setData(data.Search || data)
				setError({ show: false, message: '' })
			} else {
				setError({ show: true, message: data.Error })
			}
			setLoading(false)
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		fetchData(`${API_ENDPOINT}${urlParams}`)
	}, [urlParams])
	return { loading, error, data }
}

export default useFetch
