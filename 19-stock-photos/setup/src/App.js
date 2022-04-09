import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
	const [loading, setLoading] = useState(false)
	const [photos, setPhotos] = useState([])
	const [page, setPage] = useState(1)
	const [query, setQuery] = useState('')
	const [newImages, setNewImages] = useState(false)
	const mounted = useRef()
	const fetchImages = async () => {
		setLoading(true)
		let url
		if (query) {
			url = `${searchUrl}${clientID}&page=${page}&query=${query}`
		} else {
			url = `${mainUrl}${clientID}&page=${page}`
		}
		try {
			const res = await fetch(url)
			const data = await res.json()
			setPhotos((oldPhotos) => {
				if (query && page === 1) return data.results

				if (query) {
					return [...oldPhotos, ...data.results]
				} else {
					return [...oldPhotos, ...data]
				}
			})
			setNewImages(false)
			setLoading(false)
		} catch (error) {
			setNewImages(false)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchImages()
	}, [page])

	const event = () => {
		if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
			setNewImages(true)
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', event)
		return () => window.removeEventListener('scroll', event)
	}, [])
	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true
			return
		}
		if (!newImages) return
		if (loading) return
		setPage((oldPage) => oldPage + 1)
	}, [newImages])
	const handleSubmit = (e) => {
		e.preventDefault()
		if (!query) return
		if (page === 1) {
			fetchImages()
			return
		}
		setPage(1)
	}
	return (
		<main>
			<section className='search'>
				<form className='search-form'>
					<input
						type='text'
						placeholder='search'
						className='form-input'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button type='submit' className='submit-btn' onClick={handleSubmit}>
						<FaSearch />
					</button>
				</form>
			</section>
			<section className='photos'>
				<div className='photos-center'>
					{photos.map((image) => (
						<Photo key={image.id} {...image} />
					))}
				</div>
				{loading && <h2 className='loading'>Loading ...</h2>}
			</section>
		</main>
	)
}

export default App
