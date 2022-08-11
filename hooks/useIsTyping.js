import { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { setEmitOneTyping } from '../features/chat/currentChatPanelSlice'
import { useDispatch } from 'react-redux'

export default function useIsTyping(chat_id, user_id, currentChat_id) {
	const [contactTyping, setContactTyping] = useState(false)
	const { socket } = useContext(SocketContext)
	const dispatch = useDispatch()

	useEffect(() => {
		socket?.on('server:IsTyping', (data) => {
			if (data.chat_id === chat_id) {
				if (data.contactId === user_id) {
					setContactTyping(data.isTyping)
					console.log(data)
				}

				if (data.isTyping) {
					setTimeout(() => {
						setContactTyping(false)
						dispatch(setEmitOneTyping({ chat_id: currentChat_id, isEmitOneTyping: false }))
					}, 4000)
				}
			}
		})

		return () => {
			socket?.off('server:IsTyping')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])

	return [contactTyping]
}
