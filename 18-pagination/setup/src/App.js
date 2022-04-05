import React, { useEffect, useState } from 'react'
import Follower from './Follower'
import { useFetch } from './useFetch'
// import Loading from './../../../23-quiz/setup/src/Loading';
function App() {
	const { loading, data } = useFetch()
	const [page, setPage] = useState(0)
	const [followers, setFollowers] = useState([])
	useEffect(() => {
		if (loading) return
		setFollowers(data[page])
	}, [loading, page])
	const nextPage = (page) => {
		setPage((oldPage) => {
			let nextPage = oldPage + 1
			if (nextPage > data.length - 1) {
				nextPage = 0
			}
			return nextPage
		})
	}
	const prevPage = (page) => {
		setPage((oldPage) => {
			let prevPage = oldPage - 1
			if (prevPage < 0) {
				prevPage = data.length - 1
			}
			return prevPage
		})
	}
	return (
		<main>
			<section className='section-title'>
				<h1>{loading ? 'loading ... ' : 'pagination'}</h1>
				<div className='underline'></div>
				<section className='followers'>
					<div className='container'>
						{followers.map((follower) => (
							<Follower key={follower.id} {...follower} />
						))}
					</div>
					{!loading && (
						<div className='btn-container'>
							<button className='prev-btn' onClick={prevPage}>
								prev
							</button>
							{data.map((_, index) => (
								<button
									className={`page-btn ${index === page ? 'active-btn' : ''}`}
									onClick={() => setPage(index)}>
									{index + 1}
								</button>
							))}
							<button className='next-btn' onClick={nextPage}>
								next
							</button>
						</div>
					)}
				</section>
			</section>
		</main>
	)
}

export default App
