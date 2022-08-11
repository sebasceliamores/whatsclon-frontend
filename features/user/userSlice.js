import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		setUser: (state, action) => {
			state.user_id = action.payload.user_id
			state.user_name = action.payload.user_name
			state.user_lastname = action.payload.user_lastname
			state.user_email = action.payload.user_email
			state.user_state = action.payload.user_state
			state.user_urlPhoto = action.payload.user_urlPhoto
			state.token = action.payload.token
		},
		logoutUser: (state) => {
			state.user_id = null
			state.user_name = null
			state.user_lastname = null
			state.user_email = null
			state.user_state = null
			state.user_urlPhoto = null
			state.token = null
			document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;' // Delete cookie
			document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;' // Delete cookie
			window.location.reload()
		},
	},
})

// Action creators are generated for each case reducer function
export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer
