import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null)
	const dispatch = useDispatch()
	const { token, user_id } = useSelector((state) => state.user)

	const emitNewMessage = (messages, contactId, file) => {
		const data = {
			messages,
			contactId,
			emitSocketId: socket?.id,
			file: file || null,
		}
		socket?.emit('client:NewMessage', data)
	}

	const emitViewedMessage = (
		mess_id,
		mess_chat_id,
		mess_viewedAt,
		contactId,
		mess_isMedia,
		mess_media
	) => {
		const data = {
			mess_id,
			mess_chat_id,
			mess_viewedAt,
			contactId,
			emitSocketId: socket?.id,
			mess_isMedia: mess_isMedia || null,
			mess_media: mess_media || null,
		}
		socket?.emit('client:ViewedMessage', data)
	}

	const emitCreateNewChat = (data, dataMessage, contactId) => {
		const newData = {
			...data,
			contactId,
			emitSocketId: socket?.id,
		}
		socket?.emit('client:CreateNewChat', newData, dataMessage)
	}

	const emitIsContactOnline = (contactId) => {
		const data = {
			contactId,
		}
		socket?.emit('client:isContactOnline', data)
	}

	const emitNewAudioRecord = (data) => {
		socket?.emit('client:NewAudioRecord', data)
	}

	const emitIsTyping = (isTyping, contactId, chat_id) => {
		const data = {
			isTyping,
			contactId,
			chat_id,
		}
		socket?.emit('client:IsTyping', data)
	}

	useEffect(() => {
		if (!socket && token && user_id) {
			const newSocket = io(process.env.NEXT_PUBLIC_BASE_URL, {
				query: {
					token: token,
					user_id: user_id,
				},
			})

			setSocket(newSocket)

			newSocket?.emit('client:SaveSocketId')
		}

		return () => {
			socket?.close()
		}
	}, [socket, token, user_id, dispatch])

	return (
		<SocketContext.Provider
			value={{
				socket,
				emitNewMessage,
				emitViewedMessage,
				emitCreateNewChat,
				emitIsContactOnline,
				emitNewAudioRecord,
				emitIsTyping,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}
