import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from './useFetch'

const SingleMovie = () => {
	const { id } = useParams()
	const { loading, error, data: movie } = useFetch(`&i=${id}`)

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
