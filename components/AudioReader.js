import { useEffect, useContext, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { DateTime } from 'luxon'
import { useSelector } from 'react-redux'
import { parseTime } from '../helpers/Messages'
import { SocketContext } from '../context/SocketContext'
import UserDefaultPhoto from './svgComponents/UserDefaultPhoto'
import PlayIcon from './svgComponents/PlayIcon'
import PauseAudio from './svgComponents/PauseAudio'
import MicIcon from './svgComponents/MicIcon'

const WaveForm = dynamic(() => import('./Waveform'), { ssr: false })

export default function AudioReader({ messageData, urlPhoto, isIncoming }) {
	const { mess_media, mess_isMedia } = messageData
	const { currentContact_id } = useSelector((state) => state.currentChatPanel)

	const [waveRef, setWaveRef] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)

	const [totalTime, setTotalTime] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)

	const { emitViewedMessage } = useContext(SocketContext)

	const handlePlayPause = () => {
		waveRef.playPause()
		setIsPlaying(!isPlaying)

		if (!mess_media?.isHeard && isIncoming) {
			console.log('enter')
			const mess_viewedAt = DateTime.utc()

			emitViewedMessage(
				messageData.mess_id,
				messageData.mess_chat_id,
				mess_viewedAt,
				currentContact_id,
				mess_isMedia,
				mess_media
			)
		}
	}

	useEffect(() => {
		if (waveRef) {
			waveRef?.on('finish', () => {
				setIsPlaying(false)
			})

			waveRef?.on('ready', () => {
				setTotalTime(waveRef?.getDuration())
			})

			waveRef?.on('audioprocess', () => {
				setCurrentTime(waveRef.getCurrentTime())
			})
		}
	}, [waveRef])

	return (
		<div className={`flex items-center ${isIncoming && 'flex-row-reverse '} `}>
			<div className={`h-[55px] w-[55px] rounded-full  ${isIncoming && 'ml-2 mb-2'}`}>
				<div className="relative">
					{urlPhoto ? (
						<Image className="rounded-full" src={urlPhoto} width={55} height={55} alt="user" />
					) : (
						<UserDefaultPhoto width={'55px'} height={'55px'} />
					)}
					<span className="absolute bottom-1 right-0">
						<MicIcon
							width={'26px'}
							height={'19px'}
							fill={`${mess_media?.isHeard ? '#53bdeb' : '#09d261'}`}
						/>
					</span>
				</div>
			</div>
			<div className="relative h-full">
				<div className="flex items-center pb-2 h-[37px]">
					<button onClick={handlePlayPause} className=" ">
						{isPlaying ? (
							<PauseAudio
								width={'34px'}
								height={'32px'}
								fill={`${isIncoming ? '#848488' : '#f5f7f8'} `}
							/>
						) : (
							<PlayIcon
								width={'34px'}
								height={'18px'}
								fill={`${isIncoming ? '#848488' : '#f5f7f8'} `}
							/>
						)}
					</button>
					<WaveForm mess_media={mess_media} setWaveRef={setWaveRef} />
					<div className="absolute bottom-[-13px]  mt-[-10px] mb-[-5px] ml-2  text-[0.6775rem] text-bubbleMeta">
						<span className="mr-20">
							{currentTime === 0 ? parseTime(totalTime) : parseTime(currentTime)}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
