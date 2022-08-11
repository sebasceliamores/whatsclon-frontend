import { createSlice } from '@reduxjs/toolkit'

const switchView = (state, action, viewName) => {
	for (const key in state) {
		if (key !== viewName) {
			state[key] = false
		} else {
			state[key] = action.payload
		}
	}
}

export const viewsLeftSlice = createSlice({
	name: 'viewsPanelLeft',
	initialState: {
		viewInfoUser: false,
		viewAddContact: false,
		viewAddGroup: false,
		viewConctactsUser: false,
	},
	reducers: {
		setViewInfoUser: (state, action) => {
			switchView(state, action, 'viewInfoUser')
		},
		setViewAddContact: (state, action) => {
			switchView(state, action, 'viewAddContact')
		},
		setViewContactUser: (state, action) => {
			switchView(state, action, 'viewConctactsUser')
		},
	},
})

// Action creators are generated for each case reducer function
export const { setViewInfoUser, setViewAddContact, setViewContactUser } = viewsLeftSlice.actions

export default viewsLeftSlice.reducer
