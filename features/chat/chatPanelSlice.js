import { createSlice } from '@reduxjs/toolkit'

export const chatPanelSlice = createSlice({
	name: 'chatPanelSlice',
	initialState: {
		isviewChatPanel: false,
		dataChats: [
			{
				chat_id: '',
				infoContact: {},
				messages: [],
			},
		],
	},
	reducers: {
		setViewChatPanel: (state, action) => {
			state.isviewChatPanel = action.payload
		},
		setChatId: (state, action) => {
			const chatIdExist = state.dataChats.find((item) => item.chat_id === action.payload)
			if (!chatIdExist) {
				state.dataChats.push({
					chat_id: action.payload,
					infoContact: {},
					messages: [],
				})
			}
		},

		setInfoContact: (state, action) => {
			state.dataChats.forEach((item) => {
				if (item.chat_id === action.payload.chat_id) {
					item.infoContact = action.payload.contactInfo
				}
			})
		},
		setMessages: (state, action) => {
			state.dataChats.forEach((item) => {
				if (item.chat_id === action.payload.chat_id) {
					item.messages = action.payload.messages
				}
			})
		},
		setAddMessages: (state, action) => {
			state.dataChats.forEach((item) => {
				if (item.chat_id === action.payload.chat_id) {
					item.messages.push(action.payload.message)
				}
			})
		},
		setUpdateMessage: (state, action) => {
			state.dataChats.forEach((item) => {
				if (item.chat_id === action.payload.chat_id) {
					const isFind = item.messages.findIndex(
						(item) => item.mess_id === action.payload.message.mess_id
					)
					if (isFind !== -1) {
						item.messages[isFind] = action.payload.message
					}
				}
			})
		},
	},
})

// Action creators are generated for each case reducer function
export const {
	setViewChatPanel,
	setInfoContact,
	setMessages,
	setAddMessages,
	setChatId,
	setCurrentContactId,
	setUpdateMessage,
} = chatPanelSlice.actions

export default chatPanelSlice.reducer
