import { useEffect, useRef, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DateTime } from 'luxon'
import { setIsRecorderAudio } from '../features/chat/currentChatPanelSlice'
import { SocketContext } from '../context/SocketContext'
import blobToBase64 from '../helpers/blobToBase64'

import TrashIcon from './svgComponents/TrashIcon'
import MicIcon from './svgComponents/MicIcon'
import SendIconWithBG from './svgComponents/SendIconWithBG'
import PauseIcon from './svgComponents/PauseIcon'

export default function AudioRecorderInput() {
	const dispatch = useDispatch()
	const [globalStream, setGlobalStream] = useState(null)
	const [audioRecorder, setAudioRecorder] = useState(null)
	const [isRecording, setIsRecording] = useState(true)

	const { emitNewMessage } = useContext(SocketContext)

	const { currentChat_id, currentMessages, currentContact_id } = useSelector(
		(state) => state.currentChatPanel
	)
	const { user_id } = useSelector((state) => state.user)

	const dataMessage = (chat_id, mess_isMedia, audioBase64) => {
		return {
			mess_chat_id: currentChat_id || chat_id,
			mess_user_id: user_id,
			mess_message: '',
			mess_sendAt: DateTime.utc(),
			mess_isMedia: mess_isMedia || null,
			file: audioBase64,
		}
	}

	const funcSendAudio = async (Base64) => {
		if (currentMessages.length === 0) {
			const data = {
				chat_user_id_1: user_id,
				chat_user_id_2: currentContact_id,
			}
			const dataJSON = JSON.parse(JSON.stringify(data))
			const chatExist = await axios.post(`${url}/api/chats/findOne`, dataJSON, configToken(token))

			if (chatExist) {
				emitNewMessage(dataMessage(chatExist.data.chat_id, 'audio'), currentContact_id, Base64)
			} else {
				// NEED FIX
				emitCreateNewChat(data, dataMessage(null, 'audio'), currentContact_id, Base64)
			}
		} else {
			emitNewMessage(dataMessage(null, 'audio'), currentContact_id, Base64)
		}
	} // end funcSendMessage

	const sendAudio = () => {
		if (audioRecorder) {
			globalStream.getTracks().forEach((track) => track.stop())
			audioRecorder.stop()
			audioRecorder.ondataavailable = async (e) => {
				const blob = new Blob([e.data], { type: 'audio/wav' })
				const Base64 = await blobToBase64(blob)
				dispatch(setIsRecorderAudio(false))
				funcSendAudio(Base64)
			}
		}
	}

	useEffect(() => {
		if (!audioRecorder) {
			const constraints = { audio: true }
			navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
				setGlobalStream(stream)
				setAudioRecorder(new MediaRecorder(stream))
			})
		}
		if (audioRecorder) {
			audioRecorder.start()
		}
	}, [audioRecorder, globalStream])

	return (
		<div className="flex justify-end items-center w-full ">
			<div className="flex  max-w-[417px] items-center">
				<div className="flex grow h-[46px] justify-center items-center ml-[9px] mr-[12px] pl-[19px] pr-[11px]  rounded-full ">
					<div className="min-w-[2.25em] text-lg text-introSecondary">
						{isRecording ? 'Grabando audio ...' : 'Grabación pausada'}
					</div>
				</div>
				<button
					onClick={() => {
						globalStream?.getTracks()[0].stop()
						dispatch(setIsRecorderAudio(false))
					}}
					className="h-[35px] mr-[12px]"
				>
					<TrashIcon width={'16px'} height={'22px'} />
				</button>
				<div className="mr-[12px] flex">
					{isRecording ? (
						<button
							onClick={() => {
								audioRecorder?.pause()
								setIsRecording(false)
							}}
							className="w-[32px] h-[32px]"
						>
							<PauseIcon fill={'#ff3b30'} color={'#ff3b30'} />
						</button>
					) : (
						<button
							onClick={() => {
								audioRecorder?.resume()
								setIsRecording(true)
							}}
							className="w-[32px] h-[32px]"
						>
							<MicIcon fill={'#ff3b30'} width={'25px'} height={'30px'} />
						</button>
					)}
				</div>

				<button onClick={sendAudio} className="w-[35px] h-[35px] ">
					<SendIconWithBG fill={' #00a884'} />
				</button>
			</div>
		</div>
	)
}
