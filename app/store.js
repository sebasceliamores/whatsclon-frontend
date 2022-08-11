import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import viewsLeftSliceReducer from '../features/panelLeft/viewsLeftSlice'
import contactsReducer from '../features/contacts/contactsSlice'
import chatListReducer from '../features/chat/chatListSlice'
import chatPanelReducer from '../features/chat/chatPanelSlice'
import currentChatPanelReducer from '../features/chat/currentChatPanelSlice'
import socketReducer from '../features/socket/socketSlice'

export default configureStore({
	reducer: {
		socket: socketReducer,
		user: userReducer,
		viewsPanelLeft: viewsLeftSliceReducer,
		contacts: contactsReducer,
		chatList: chatListReducer,
		chatPanel: chatPanelReducer,
		currentChatPanel: currentChatPanelReducer,
	},
})
