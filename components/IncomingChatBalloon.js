import { useEffect, useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import { DateTime } from 'luxon'
import { useSelector } from 'react-redux'
import AudioReader from '../components/AudioReader'

export default function IncomingChatBalloon({ message, isContinuation, urlPhoto }) {
	const { mess_message, mess_sendAt, mess_viewed, mess_isMedia, mess_media } = message
	const { emitViewedMessage } = useContext(SocketContext)
	const { currentContact_id } = useSelector((state) => state.currentChatPanel)

	const date = DateTime.fromISO(mess_sendAt).toFormat('hh:mm a')

	useEffect(() => {
		if (!mess_viewed) {
			const { mess_id, mess_chat_id } = message
			const mess_viewedAt = DateTime.utc()
			emitViewedMessage(mess_id, mess_chat_id, mess_viewedAt, currentContact_id)
		}
	}, [message, mess_viewed, emitViewedMessage, currentContact_id])

	return (
		<div className={` basis-auto ${!isContinuation && 'mb-[12px] pb-2'}`}>
			<div className="mb-[2px] px-[9%] flex items-start">
				<div
					className={` bg-incomingBG rounded-lg   
					text-base leading-[19px] ${
						mess_isMedia === 'audio' ? 'w-[336px]' : 'lg:max-w-[65%] sm:max-w-[85%]}'
					}  `}
				>
					<div className=" pt-[6px] pr-[7px] pb-[8px] pl-[9px]">
						<div className="flex">
							<div className=" select-text text-justify whitespace-pre-wrap break-all">
								{mess_isMedia === 'audio' && (
									<AudioReader urlPhoto={urlPhoto} isIncoming={true} messageData={message} />
								)}

								{!mess_isMedia && <span>{mess_message && mess_message}</span>}
							</div>
							<div className="inline-block w-[60px] "></div>
						</div>
						<div className="flex float-right mt-[-10px] mb-[-5px] ml-2 whitespace-nowrap text-[0.6475rem] text-bubbleMeta">
							<span>{date}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
