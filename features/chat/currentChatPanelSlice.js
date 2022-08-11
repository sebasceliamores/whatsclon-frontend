import { createSlice } from '@reduxjs/toolkit'

export const currentChatPanelSlice = createSlice({
	name: 'currentChatPanel',
	initialState: {
		currentChat_id: '',
		currentContact_id: '',
		isRecorderAudio: false,
		currentMessages: [],
		isEmitOneTyping: false,
	},
	reducers: {
		setCurrentChatId: (state, action) => {
			state.currentChat_id = action.payload
		},
		setCurrentContactId: (state, action) => {
			state.currentContact_id = action.payload
		},
		setCurrentMessages: (state, action) => {
			state.currentMessages = action.payload
		},
		setAddCurrentMessage: (state, action) => {
			if (state.currentChat_id === action.payload.chat_id) {
				state.currentMessages.push(action.payload.message)
			}
		},
		setUpdateCurrentMessage: (state, action) => {
			if (state.currentChat_id === action.payload.chat_id) {
				const isFind = state.currentMessages.findIndex(
					(item) => item.mess_id === action.payload.message.mess_id
				)
				if (isFind !== -1) {
					state.currentMessages[isFind] = action.payload.message
				}
			}
		},
		setIsRecorderAudio: (state, action) => {
			state.isRecorderAudio = action.payload
		},
		setEmitOneTyping: (state, action) => {
			state.isEmitOneTyping = action.payload.isEmitOneTyping
		},
	},
})

// Action creators are generated for each case reducer function
export const {
	setCurrentChatId,
	setCurrentContactId,
	setCurrentMessages,
	setAddCurrentMessage,
	setUpdateCurrentMessage,
	setIsRecorderAudio,
	setEmitOneTyping,
} = currentChatPanelSlice.actions

export default currentChatPanelSlice.reducer
