import { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setMessages, setUpdateMessages } from '../features/chat/chatPanelSlice'
import { setCurrentMessages } from '../features/chat/currentChatPanelSlice'

import { configToken, url } from '../utils/configAxios'
import { SocketContext } from '../context/SocketContext'

import FooterPanelChat from './FooterPanelChat'
import HeaderPanelChat from './HeaderPanelChat'
import IncomingChatBalloon from './IncomingChatBalloon'
import OutgoingChatBallon from './OutgoingChatBallon'

export default function ViewChatPanel() {
	const [infoContact, setInfoContact] = useState({})
	const dispatch = useDispatch()
	const wrapper = useRef(null)
	const { dataChats } = useSelector((state) => state.chatPanel)
	const { currentChat_id, currentContact_id, currentMessages } = useSelector(
		(state) => state.currentChatPanel
	)
	const contacts = useSelector((state) => state.contacts)
	const { token, user_id, user_urlPhoto } = useSelector((state) => state.user)
	const { socket } = useContext(SocketContext)

	useEffect(() => {
		if (currentChat_id) {
			dataChats.forEach((chat) => {
				if (chat.chat_id === currentChat_id) {
					setInfoContact(chat.infoContact)
					if (chat.messages.length === 0) {
						axios
							.get(`${url}/api/messages/${currentChat_id}`, configToken(token))
							.then((res) => {
								const messages = res.data
								const chat_id = currentChat_id

								dispatch(setMessages({ messages, chat_id }))
								dispatch(setCurrentMessages(messages))
							})
							.catch((err) => {
								dispatch(setCurrentMessages([]))
							})
					} else {
						dispatch(setCurrentMessages(chat.messages))
					}
				}
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChat_id])

	useEffect(() => {
		if (currentContact_id && !currentChat_id) {
			contacts.forEach((contact) => {
				if (contact.cont_contact_id === currentContact_id) {
					const data = {
						displayName: contact.cont_displayName,
						cont_are_contacts: contact.cont_are_contacts,
						...contact.contact,
					}
					setInfoContact(data)
				}
			})
		}
	}, [currentChat_id, currentContact_id, contacts])

	useEffect(() => {
		wrapper.current?.scrollTo({
			top: wrapper.current?.scrollHeight + 1000,
		})
	}, [currentMessages])

	return (
		<div className="flex flex-col h-full w-full">
			<HeaderPanelChat infoContact={infoContact} />

			<div className="absolute top-0 z-10 w-full h-full bg-contain bg-repeat  bg-bgChat opacity-20"></div>
			<div ref={wrapper} className="relative h-full w-full flex flex-col grow shrink  scroll ">
				<div className="absolute w-full h-full z-10">
					<div className="mt-4 mb-3"></div>
					{currentMessages?.map((message) => {
						if (message.mess_user_id === user_id) {
							return (
								<OutgoingChatBallon
									key={message.mess_id}
									message={message}
									isContinuation={true}
									urlPhoto={user_urlPhoto}
								/>
							)
						} else {
							return (
								<IncomingChatBalloon
									key={message.mess_id}
									message={message}
									isContinuation={true}
									urlPhoto={infoContact.user_urlPhoto}
								/>
							)
						}
					})}
				</div>
			</div>
			<FooterPanelChat />
		</div>
	)
}
