import React, { useEffect, useState } from 'react'
import { FaCalendarTimes, FaEnvelopeOpen, FaLock, FaMap, FaPhone, FaUser } from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
	const [loading, setLoading] = useState(true)
	const [person, setPerson] = useState(null)
	const [title, setTitle] = useState('name')
	const [value, setValue] = useState('random person')
	const getPerson = async () => {
		const res = await fetch(url)
		const data = await res.json()
		const person = data.results[0]
		const { email, phone } = person
		const { large: image } = person.picture
		const {
			login: { password },
		} = person
		const {
			name: { first, last },
		} = person
		const {
			dob: { age },
		} = person
		const {
			street: { number, name },
		} = person.location
		const newPerson = {
			image,
			email,
			phone,
			password,
			age,
			street: `${number} ${name}`,
			name: `${first} ${last}`,
		}
		setPerson(newPerson)
		setLoading(false)
		setValue(newPerson.name)
		setTitle('name')
	}
	useEffect(() => {
		getPerson()
	}, [])

	const handleValue = (e) => {
		if (e.target.classList.contains('icon')) {
			const newValue = e.target.dataset.label
			setTitle(newValue)
			setValue(person[newValue])
		}
	}
	return (
		<main>
			<div className='block bcg-black'></div>
			<div className='block'>
				<div className='container'>
					<img src={(person && person.image) || defaultImage} alt='random user' className='user-img' />
					<p className='user-title'>my {title} is</p>
					<p className='user-value'>{value}</p>
					<div className='values-list'>
						<button className='icon' data-label='name' onMouseOver={handleValue}>
							<FaUser />
						</button>
						<button className='icon' data-label='age' onMouseOver={handleValue}>
							<FaCalendarTimes />
						</button>
						<button className='icon' data-label='email' onMouseOver={handleValue}>
							<FaEnvelopeOpen />
						</button>
						<button className='icon' data-label='street' onMouseOver={handleValue}>
							<FaMap />
						</button>
						<button className='icon' data-label='phone' onMouseOver={handleValue}>
							<FaPhone />
						</button>
						<button className='icon' data-label='password' onMouseOver={handleValue}>
							<FaLock />
						</button>
					</div>
					<button className='btn' type='button' onClick={getPerson}>
						{loading ? 'loading ... ' : 'random user'}
					</button>
				</div>
			</div>
		</main>
	)
}

export default App
