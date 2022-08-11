import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewChatPanel, setInfoContact, setChatId } from '../features/chat/chatPanelSlice'
import { setCurrentChatId, setCurrentContactId } from '../features/chat/currentChatPanelSlice'
import useIsTyping from '../hooks/useIsTyping'
import useOutsideClick from '../hooks/useOutSideClick'

import MoreOptionsCardChat from './MoreOptionsCardChat'
import ArrowDownIcon from './svgComponents/ArrowDownIcon'
import UserDefaultPhoto from './svgComponents/UserDefaultPhoto'
import DoubleCheck from './svgComponents/DoubleCheck'
import MicIcon from './svgComponents/MicIcon'

import { parseTime } from '../helpers/Messages'
import { dateFormat } from '../helpers/helpersCardListChat'

const useIsClickChat = (chat_id, currentChat_id) => {
	const [isClick, setIsClick] = useState(false)

	useEffect(() => {
		if (chat_id === currentChat_id) {
			setIsClick(true)
		} else {
			setIsClick(false)
		}
	}, [currentChat_id, chat_id])

	return [isClick]
}

export default function CardListChats({
	displayName,
	contact,
	chat_id,
	isContact,
	lastMessage,
	countMessage,
}) {
	const itemArrowDown = useRef(null)
	const wrapperRef = useRef(null)
	const [noViewedLastMessage, setNoViewedLastMessage] = useState(true)
	const [viewCurrentPanel, setViewCurrentPanel] = useState(false)
	const [isHover, setIsHover] = useState(false)
	const [topItemArrow, setTopItemArrow] = useState('')
	const dispatch = useDispatch()
	const { currentChat_id } = useSelector((state) => state.currentChatPanel)
	const { user_id } = useSelector((state) => state.user)
	const { mess_isMedia, mess_media } = lastMessage

	const [contactTyping] = useIsTyping(chat_id, user_id, currentChat_id)
	const [outsideClick, setOutsideClick] = useOutsideClick(wrapperRef)
	const [isClick] = useIsClickChat(chat_id, currentChat_id)

	useEffect(() => {
		if (lastMessage?.mess_user_id !== user_id) {
			if (countMessage > 0) {
				setNoViewedLastMessage(true)
			}
			if (countMessage === 0) {
				setNoViewedLastMessage(false)
			}
		} else {
			setNoViewedLastMessage(false)
		}

		if (currentChat_id === chat_id) {
			setViewCurrentPanel(true)
		} else {
			setViewCurrentPanel(false)
		}
	}, [lastMessage, countMessage, currentChat_id, chat_id, user_id])

	const handleClick = (e) => {
		dispatch(setViewChatPanel(true))
		dispatch(setChatId(chat_id))
		dispatch(setCurrentChatId(chat_id))
		dispatch(setCurrentContactId(contact._id))
		const contactInfo = {
			...contact,
			displayName,
			cont_are_contacts: isContact,
		}
		dispatch(setInfoContact({ contactInfo, chat_id }))
	}

	const isMyLastMessage = () => {
		if (lastMessage?.mess_user_id === user_id) {
			return true
		} else {
			return false
		}
	}

	const handleMoreOptions = useCallback(
		(e) => {
			if (outsideClick) {
				setOutsideClick(false)
			} else {
				setOutsideClick(true)
				if (itemArrowDown.current) {
					const topArrowItem = itemArrowDown.current.getBoundingClientRect().top.toFixed()
					const topMoreOptions = parseInt(topArrowItem) + 26
					setTopItemArrow(topMoreOptions + 'px')
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[outsideClick]
	)

	return (
		<>
			<div className="relative ">
				<div
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					onClick={handleClick}
					className={` flex min-h-[72px] hover:bg-hoverCardChat pointer-events-auto cursor-pointer ${
						isClick && 'bg-focusCardChat'
					} select-none`}
				>
					<div className="flex items-center pl-[15px] pr-[13px] select-none">
						{isContact ? (
							contact?.user_urlPhoto && (
								<Image
									src={contact.user_urlPhoto}
									width={49}
									height={49}
									className="rounded-full object-cover"
									alt="user"
								/>
							)
						) : (
							<UserDefaultPhoto width={49} height={49} />
						)}
					</div>
					<div className=" flex grow flex-col justify-center pr-[15px] border-t border-solid border-borderList">
						<div className="flex items-center text-left leading-normal">
							<div className="text-[17px] font-normal text-primaryStrong flex grow">
								<span className="text-ellipsis whitespace-nowrap ">
									{displayName ?? contact?.user_email}
								</span>
							</div>
							<div
								className={`
							${noViewedLastMessage && !viewCurrentPanel ? 'text-unreadTimeStamp' : 'text-timeChatList '} 
							  text-xs mt-[3px] ml-[6px] whitespace-nowrap text-ellipsis`}
							>
								{dateFormat(lastMessage)}
							</div>
						</div>
						<div className=" flex items-center text-introSecondary text-ellipsis whitespace-nowrap m-h-[20px] text-[13px]  text-left leading-[20px] mt-[2px]">
							{isMyLastMessage() && !contactTyping && (
								<DoubleCheck
									fill={`${lastMessage?.mess_viewed ? '#53bdeb' : 'hsla(0,0%,100%,0.5)'}`}
									className="mr-[5px] mt-[2.5px]"
								/>
							)}
							<div className="grow w-0 truncate whitespace-nowrap">
								{!contactTyping ? (
									<span
										className={` ${isClick && 'text-white font-[400]'} ${
											noViewedLastMessage && 'text-white font-medium'
										} text-[14px] truncate whitespace-nowrap `}
									>
										{mess_isMedia === 'audio' && (
											<div className="flex">
												<MicIcon
													fill={`${mess_media?.isHeard ? '#53bdeb' : '#09d261'} `}
													height={'15px'}
													width={'20px'}
												/>
												<span>{parseTime(mess_media.duration)}</span>
											</div>
										)}
										{lastMessage?.mess_message ?? ''}
									</span>
								) : (
									<div className="text-teal text-ellipsis whitespace-nowrap">
										<span>Esta escribiendo ... </span>
									</div>
								)}
							</div>

							{noViewedLastMessage && !viewCurrentPanel && (
								<div className="ml-[6px] mr-[0px] font-semibold text-xs text-center ">
									<span
										className={`bg-unreadTimeStamp  ${
											countMessage < 10 ? 'px-[0.6em]' : 'px-[0.4em]'
										} pt-[0.2em] pb-[0.3em] rounded-[1.1em]  font-semibold text-unreadMarkerText`}
									>
										{countMessage}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
				{isHover && (
					<div
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
						ref={itemArrowDown}
						onClick={handleMoreOptions}
						className="absolute right-2 bottom-0 cursor-pointer"
					>
						<ArrowDownIcon />
					</div>
				)}
			</div>
			{outsideClick && (
				<div ref={wrapperRef}>
					<MoreOptionsCardChat topItemArrow={topItemArrow} />
				</div>
			)}
		</>
	)
}
