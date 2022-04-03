const paginate = (data) => {
	const itemsPerPage = 9
	const pages = Math.ceil(data.length / itemsPerPage)
	let newArray = Array.from({ length: pages }, (_, index) => {
		const start = index * itemsPerPage
		return data.slice(start, start + itemsPerPage)
	})
	return newArray
}

export default paginate
