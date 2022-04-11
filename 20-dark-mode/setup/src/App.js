import React, { useEffect, useState } from 'react'
import Article from './Article'
import data from './data'
const getStorageTheme = () => {
	let theme = 'light-theme'
	if (localStorage.getItem('theme')) {
		theme = localStorage.getItem('theme')
	}
	return theme
}
function App() {
	const [theme, setTheme] = useState(getStorageTheme())
	useEffect(() => {
		document.documentElement.className = theme
		localStorage.setItem('theme', theme)
	}, [theme])
	const toggleTheme = () => {
		setTheme((oldTheme) => {
			if (oldTheme === 'light-theme') return 'dark-theme'
			return 'light-theme'
		})
	}
	return (
		<main>
			<nav>
				<div className='nav-center'>
					<h1>Overreacted</h1>
					<button className='btn' onClick={toggleTheme}>
						toggle
					</button>
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
