import React, { useContext, useState } from 'react'
import sublinks from './data'

const AppContext = React.createContext()
export const AppProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
	const [location, setLocation] = useState({})
	const [page, setPage] = useState({ page: '', links: [] })
	const openSidebar = () => {
		setIsSidebarOpen(true)
	}
	const openSubmenu = (text, coordinates) => {
		const page = sublinks.find((link) => link.page === text)
		setLocation(coordinates)
		setPage(page)

		setIsSubmenuOpen(true)
	}
	const closeSidebar = () => {
		setIsSidebarOpen(false)
	}
	const closeSubmenu = () => {
		setIsSubmenuOpen(false)
	}
	return (
		<AppContext.Provider
			value={{
				isSidebarOpen,
				isSubmenuOpen,
				openSidebar,
				openSubmenu,
				closeSidebar,
				closeSubmenu,
				location,
				page,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => useContext(AppContext)
