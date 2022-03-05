export default (state, action) => {
	switch (action.type) {
		case 'CLEAR_CART':
			return { ...state, cart: [] }
		case 'REMOVE':
			return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) }
		case 'INCREASE':
			let increaseCart = state.cart.map((item) => {
				if (item.id === action.payload) {
					return { ...item, amount: item.amount + 1 }
				}
				return item
			})
			return { ...state, cart: increaseCart }
		case 'DECREASE':
			let decreaseCart = state.cart
				.map((item) => {
					if (item.id === action.payload) {
						return { ...item, amount: item.amount - 1 }
					}
					return item
				})
				.filter((item) => item.amount !== 0)
			return { ...state, cart: decreaseCart }
		case 'GET_TOTALS':
			let { total, amount } = state.cart.reduce(
				(cartTotal, cartItem) => {
					const { price, amount } = cartItem
					cartTotal.amount += amount
					cartTotal.total += amount * price
					return cartTotal
				},
				{ total: 0, amount: 0 },
			)
			total = parseFloat(total.toFixed(2))
			return { ...state, total, amount }
		case 'LOADING':
			return { ...state, loading: true }
		case 'DISPLAY_ITEMS':
			return { ...state, cart: action.payload, loading: false }
		case 'TOGGLE_AMOUNT':
			let tempCart = state.cart
				.map((item) => {
					if (item.id === action.payload.id) {
						if (action.payload.type === 'increase') {
							return { ...item, amount: item.amount + 1 }
						}
						if (action.payload.type === 'decrease') {
							return { ...item, amount: item.amount - 1 }
						}
					}
					return item
				})
				.filter((item) => item.amount !== 0)
			return { ...state, cart: tempCart }
		default:
			return state
	}
}
