import React from 'react'
import Follower from './Follower'
import { useFetch } from './useFetch'
// import Loading from './../../../23-quiz/setup/src/Loading';
function App() {
	const { loading, data } = useFetch()
	return (
		<main>
			<section className='section-title'>
				<h1>{loading ? 'loading ... ' : 'pagination'}</h1>
				<div className='underline'></div>
				<section className='followers'>
					<div className='container'>
						{data.map((follower) => (
							<Follower key={follower.id} {...follower} />
						))}
					</div>
				</section>
			</section>
		</main>
	)
}

export default App
