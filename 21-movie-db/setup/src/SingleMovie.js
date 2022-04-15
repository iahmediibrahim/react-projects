import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
	const { id } = useParams()
	const [movie, setMovie] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState({ show: false, message: '' })
	const fetchMovie = async (url) => {
		const resp = await fetch(url)
		const data = await resp.json()
		if (data.Response === 'False') {
			setError({ show: true, message: data.Error })
			setLoading(false)
		} else {
			setMovie(data)
			setLoading(false)
			setError({ show: false, message: '' })
		}
	}
	useEffect(() => {
		fetchMovie(`${API_ENDPOINT}&i=${id}`)
	}, [id])
	if (loading) return <div className='loading'></div>
	if (error.show)
		return (
			<div className='page-error'>
				<h1>{error.message}</h1>
				<Link to={'/'} className='btn'>
					back to movies
				</Link>{' '}
			</div>
		)
	const { Plot: plot, Poster: poster, Title: title, Year: year } = movie
	return (
		<section className='single-movie'>
			<img src={poster} alt={title} />
			<div className='single-movie-info'>
				<h2>{title}</h2>
				<p>{plot}</p>
				<h4>{year}</h4>
				<Link to={'/'} className='btn'>
					back to movies
				</Link>{' '}
			</div>
		</section>
	)
}

export default SingleMovie
