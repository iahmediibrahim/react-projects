import React from 'react'
import { useGlobalContext } from './context'
import Loading from './Loading'
import SetupForm from './SetupForm'

// import Modal from './Modal'
function App() {
	const { waiting, loading, questions, index, correct } = useGlobalContext()
	if (waiting) return <SetupForm />
	if (loading) return <Loading />
	return <main>quiz sssss</main>
}

export default App
