import { createSlice } from '@reduxjs/toolkit'

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState: [],
	reducers: {
		setContact: (state, action) => {
			return action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setContact } = contactsSlice.actions

export default contactsSlice.reducer
