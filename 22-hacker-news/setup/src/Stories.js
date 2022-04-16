import React from 'react'
import { useGlobalContext } from './context'

const Stories = () => {
	const { loading } = useGlobalContext()
	if (loading) return <div className='loading'></div>
	return <h2>stories component</h2>
}

export default Stories
