import React from 'react'
import Article from './Article'
import data from './data'
function App() {
	return (
		<main>
			<nav>
				<div className='nav-center'>
					<h1>Overreacted</h1>
					<button className='btn'>toggle</button>
				</div>
			</nav>
			<section className='articles'>
				{data.map((item) => (
					<Article key={item.id} {...item} />
				))}
			</section>
		</main>
	)
}

export default App
