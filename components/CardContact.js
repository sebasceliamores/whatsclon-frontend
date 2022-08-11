import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { config, url } from '../utils/configAxios'
import { useDispatch, useSelector } from 'react-redux'
import { setViewChatPanel, setChatId, setInfoContact } from '../features/chat/chatPanelSlice'
import { setCurrentChatId, setCurrentContactId } from '../features/chat/currentChatPanelSlice'
import { setViewContactUser } from '../features/panelLeft/viewsLeftSlice'

import UserDefaultPhoto from './svgComponents/UserDefaultPhoto'

export default function CardContact({ displayName, contact, isContact }) {
	const { user_urlPhoto, user_state } = contact
	const { user_id } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const handleClick = async () => {
		const data = {
			chat_user_id_1: contact._id,
			chat_user_id_2: user_id,
		}

		const contactInfo = {
			...contact,
			displayName,
			cont_are_contacts: isContact,
		}

		try {
			const existChat = await axios.post(`${url}/api/chats/findOne`, data, config)
			console.log(existChat)
			if (existChat) {
				const chat_id = existChat.data.chat_id
				dispatch(setChatId(chat_id))
				dispatch(setCurrentChatId(chat_id))
				dispatch(setInfoContact({ contactInfo, chat_id }))
			}
		} catch (err) {}

		dispatch(setCurrentContactId(contact._id))
		dispatch(setViewChatPanel(true))
		dispatch(setViewContactUser(false))
	}

	return (
		<div
			onClick={handleClick}
			className="flex min-h-[72px] w-full bg-containerListChats cursor-pointer"
		>
			<div className="flex items-center pl-[15px] pr-[13px] select-none">
				{isContact ? (
					user_urlPhoto && (
						<Image
							src={user_urlPhoto}
							width={49}
							height={49}
							className="rounded-full object-cover"
							alt="user"
						/>
					)
				) : (
					<UserDefaultPhoto height={49} width={49} />
				)}
			</div>
			<div className=" flex grow flex-col justify-center pr-[15px] border-t border-solid border-borderList">
				<div className="flex items-center text-left leading-normal">
					<div className="text-[17px] font-normal text-primaryStrong flex grow">
						<span className="text-ellipsis whitespace-nowrap">{displayName}</span>
					</div>
				</div>
				<div className="relative  flex text-secondary text-ellipsis whitespace-nowrap m-h-[20px] text-[13px]  text-left leading-[20px] mt-[2px]">
					<span>{user_state}</span>
				</div>
			</div>
		</div>
	)
}
