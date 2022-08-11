import { createSlice } from '@reduxjs/toolkit'

export const socketSlice = createSlice({
	name: 'socket',
	initialState: null,
	reducers: {
		setSocket: (state, action) => {
			state = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setSocket } = socketSlice.actions

export default socketSlice.reducer
