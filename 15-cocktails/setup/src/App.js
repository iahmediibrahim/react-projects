import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // import pages
// import components
import Navbar from './components/Navbar'
import About from './pages/About'
import Error from './pages/Error'
import Home from './pages/Home'
import SingleCocktail from './pages/SingleCocktail'
function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route index element={<Home />} />
				<Route path='cocktail'>
					<Route path=':cocktailId' element={<SingleCocktail />} />
				</Route>
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
