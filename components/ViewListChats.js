import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useSelector, useDispatch } from 'react-redux'
import {
	setLastMessage,
	setAddChatList,
	setUpdateLastMessage,
} from '../features/chat/chatListSlice'
import { setAddMessages, setUpdateMessage } from '../features/chat/chatPanelSlice'
import {
	setAddCurrentMessage,
	setUpdateCurrentMessage,
} from '../features/chat/currentChatPanelSlice'

import CardListChats from '../components/CardListChats'

export default function ViewListChats() {
	const dispatch = useDispatch()
	const chatListData = useSelector((state) => state.chatList)
	const { user_id } = useSelector((state) => state.user)

	const { socket } = useContext(SocketContext)

	useEffect(() => {
		socket?.on('server:NewMessage', (data) => {
			const { message, chat_id } = data
			if (message) {
				dispatch(setAddCurrentMessage({ message, chat_id }))
				dispatch(setAddMessages({ message, chat_id }))
				const isSort = message.mess_user_id !== user_id ? true : false
				dispatch(setLastMessage({ message, chat_id, isSort }))
			}
		})

		return () => {
			socket?.off('server:NewMessage')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])

	useEffect(() => {
		socket?.on('server:ViewedMessage', (data) => {
			const { message, chat_id } = data
			if (message) {
				dispatch(setUpdateLastMessage({ message, chat_id }))
				dispatch(setUpdateCurrentMessage({ message, chat_id }))
				dispatch(setUpdateMessage({ message, chat_id }))
			}
		})
		return () => {
			socket?.off('server:ViewedMessage')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])

	useEffect(() => {
		socket?.on('server:createNewChat', (data, newMessage) => {
			if (data) {
				dispatch(setAddChatList(data))
				dispatch(setAddCurrentMessage({ message: newMessage, chat_id: data._id }))
				dispatch(setAddMessages({ message: newMessage, chat_id: data._id }))
			}
		})
		return () => {
			socket?.off('server:createNewChat')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])

	return (
		<div className=" bg-containerListChats flex flex-col h-[calc(100%-108px)] scroll">
			{chatListData.length > 0 ? (
				chatListData.map((chat) => (
					<CardListChats
						key={chat._id}
						chat_id={chat._id}
						displayName={chat.cont_displayName}
						contact={chat.contactInfo}
						isContact={chat.cont_are_contacts}
						lastMessage={chat.lastMessage}
						countMessage={chat.chat_count_message}
					/>
				))
			) : (
				<div className="w-full text-center mt-10 text-sm text-introSecondary">
					<span>No existen chats</span>
				</div>
			)}
		</div>
	)
}
