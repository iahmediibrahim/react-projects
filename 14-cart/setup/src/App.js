import React from 'react'
import CartContainer from './CartContainer'
import { useGlobalContext } from './context'
// components
import Navbar from './Navbar'

// items

function App() {
	const { loading } = useGlobalContext()
	if (loading) {
		return (
			<div className='loading'>
				<h1>Loading...</h1>
			</div>
		)
	}
	return (
		<main>
			<Navbar />
			<CartContainer />
		</main>
	)
}

export default App
