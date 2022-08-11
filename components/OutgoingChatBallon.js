import { useEffect, useRef, useState } from 'react'
import { parseTime } from '../helpers/Messages'
import { DateTime } from 'luxon'
import AudioReader from '../components/AudioReader'
import DoubleCheck from './svgComponents/DoubleCheck'

export default function OutgoingChatBallon({ message, isContinuation, urlPhoto }) {
	const { mess_message, mess_sendAt, mess_viewed, mess_isMedia, mess_media } = message

	const date = DateTime.fromISO(mess_sendAt).toFormat('hh:mm a')

	return (
		<div className={` basis-auto ${!isContinuation && 'mb-[12px] pb-2'}`}>
			<div className=" mb-[2px] px-[9%] flex justify-end  ">
				<div
					className={` bg-outgoingBG rounded-lg   
					text-base leading-[19px] ${
						mess_isMedia === 'audio' ? 'w-[336px]' : 'lg:max-w-[65%] sm:max-w-[85%]}'
					}  `}
				>
					<div className=" pt-[6px] pr-[7px] pb-[8px] pl-[9px]">
						<div className="flex">
							<div className="  select-text whitespace-pre-wrap  break-all">
								{mess_isMedia === 'audio' && (
									<AudioReader messageData={message} urlPhoto={urlPhoto} />
								)}

								{!mess_isMedia && <span>{mess_message && mess_message}</span>}
							</div>

							<div className="inline-block w-[75px] "></div>
						</div>
						<div className="flex float-right  mt-[-10px] mb-[-5px] ml-2  text-[0.6775rem] text-bubbleMeta">
							<span>{date}</span>
							<span className="ml-1">
								<DoubleCheck fill={`${mess_viewed ? '#53bdeb' : 'hsla(0,0%,100%,0.5)'}`} />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
