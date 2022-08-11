import { createSlice } from '@reduxjs/toolkit'

export const chatListSlice = createSlice({
	name: 'chatList',
	initialState: [],
	reducers: {
		setChatList: (state, action) => {
			return action.payload
		},
		setLastMessage: (state, action) => {
			state.forEach((item) => {
				if (item._id === action.payload.chat_id) {
					item.lastMessage = action.payload.message
					if (!action.payload.message.mess_viewed) {
						item.chat_count_message++
					}
				}
			})
			if (action.payload.isSort) {
				state.sort((a, b) => {
					if (a.lastMessage.mess_sendAt > b.lastMessage.mess_sendAt) {
						return -1
					}
					if (a.lastMessage.mess_sendAt < b.lastMessage.mess_sendAt) {
						return 1
					}
					return 0
				})
			}
		},
		setUpdateLastMessage: (state, action) => {
			const isFind = state.findIndex((item) => item._id === action.payload.chat_id)

			if (isFind !== -1) {
				if (state[isFind].lastMessage.mess_sendAt <= action.payload.message.mess_sendAt) {
					state[isFind].lastMessage = action.payload.message
				}

				if (action.payload.message.mess_viewed) {
					state[isFind].chat_count_message = 0
				}
			}
		},
		setAddChatList: (state, action) => {
			state.push(action.payload)
		},
		setCheckBlue: (state, action) => {
			state.forEach((item) => {
				if (item._id === action.payload.chat_id) {
					item.isCheckBlue = action.payload.isCheckBlue
				}
			})
		},
	},
})

// Action creators are generated for each case reducer function
export const { setChatList, setLastMessage, setAddChatList, setUpdateLastMessage, setCheckBlue } =
	chatListSlice.actions

export default chatListSlice.reducer
