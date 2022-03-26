import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
	const { cocktailId } = useParams()
	const [loading, setLoading] = useState(false)
	const [cocktail, setCocktail] = useState(false)
	useEffect(() => {
		setLoading(true)
		async function getCocktail() {
			try {
				const res = await fetch(`${url}${cocktailId}`)
				const data = await res.json()
				const { drinks } = data
				if (drinks) {
					const {
						strDrink: name,
						strDrinkThumb: image,
						strAlcoholic: info,
						strGlass: glass,
						strCategory: category,
						strInstructions: instructions,
						strIngredient1,
						strIngredient2,
						strIngredient3,
						strIngredient4,
						strIngredient5,
					} = drinks[0]
					const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5]
					setCocktail({
						name,
						image,
						info,
						glass,
						category,
						instructions,
						ingredients,
					})
					setLoading(false)
				} else {
					setCocktail([])
				}
			} catch (error) {
				console.log(error)
				setLoading(false)
			}
		}
		getCocktail()
	}, [cocktailId])

	if (loading) {
		return <Loading />
	}
	if (!cocktail) {
		return <h2>no cocktail to display</h2>
	}
	const { name, image, info, glass, category, instructions, ingredients } = cocktail
	return (
		<section className='section cocktail-section'>
			<Link to='/' className='btn btn-primary'>
				back home
			</Link>
			<h2 className='section-title'>{name}</h2>
			<div className='drink'>
				<img src={image} alt={name} />
				<div className='drink-info'>
					<p>
						<span className='drink-data'>name: </span>
						{name}
					</p>
					<p>
						<span className='drink-data'>category: </span>
						{category}
					</p>
					<p>
						<span className='drink-data'>info: </span>
						{info}
					</p>
					<p>
						<span className='drink-data'>glass: </span>
						{glass}
					</p>
					<p>
						<span className='drink-data'>instructions: </span>
						{instructions}
					</p>
					<p>
						<span className='drink-data'>ingredients: </span>
						{ingredients.map((item, index) => {
							return item ? <span key={index}>{item},</span> : null
						})}
					</p>
				</div>
			</div>
		</section>
	)
}

export default SingleCocktail
