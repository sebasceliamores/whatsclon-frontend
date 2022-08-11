import { useState, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DateTime } from 'luxon'
import Image from 'next/image'
import axios from 'axios'
import { configToken, url } from '../utils/configAxios'
import { SocketContext } from '../context/SocketContext'
import { setIsRecorderAudio, setEmitOneTyping } from '../features/chat/currentChatPanelSlice'

import EmojiPicker from './EmojiPicker'
import AudioRecorderInput from './AudioRecorderInput'
import FileReader from './FileReader'

import ClipIcon from './svgComponents/ClipIcon'
import EmojiFaceIcon from './svgComponents/EmojiFaceIcon'
import MicIcon from './svgComponents/MicIcon'
import SendIcon from './svgComponents/SendIcon'
import ImgIcon from './svgComponents/ImgIcon'
import FileIcon from './svgComponents/FileIcon'

export default function FooterPanelChat() {
	const dispatch = useDispatch()
	const { currentChat_id, currentMessages, currentContact_id, isRecorderAudio, isEmitOneTyping } =
		useSelector((state) => state.currentChatPanel)
	const { token, user_id } = useSelector((state) => state.user)
	const [isType, setIsType] = useState({ message: '' })

	const [chatIdBeforeChangeChat, setChatIdBeforeChangeChat] = useState(null)
	const [enableEmojiPicker, setEnableEmojiPicker] = useState(false)
	const [activeClipIcon, setActiveClipIcon] = useState(false)
	const [fileImage, setFileImage] = useState({ file: null, url: null })

	const { emitNewMessage, emitCreateNewChat, emitIsTyping } = useContext(SocketContext)

	useEffect(() => {
		dispatch(setEmitOneTyping({ chat_id: currentChat_id, isEmitOneTyping: false }))
		setChatIdBeforeChangeChat(currentChat_id)
		return () => {
			if (chatIdBeforeChangeChat !== currentChat_id) {
				setIsType({ message: '' })
				dispatch(setEmitOneTyping({ chat_id: currentChat_id, isEmitOneTyping: false }))
				emitIsTyping(false, currentContact_id, currentChat_id)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChat_id, currentContact_id])

	useEffect(() => {
		if (isType.message.length > 0 && !isEmitOneTyping) {
			dispatch(setEmitOneTyping({ chat_id: currentChat_id, isEmitOneTyping: true }))
			emitIsTyping(true, currentContact_id, currentChat_id)
		}
		if (isType.message.length === 0 && isEmitOneTyping) {
			dispatch(setEmitOneTyping({ chat_id: currentChat_id, isEmitOneTyping: false }))
			emitIsTyping(false, currentContact_id, currentChat_id)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isType])

	const handleChangeInput = (e) => {
		setIsType({
			...isType,
			[e.target.name]: e.target.value,
		})
	}

	const dataSendMessage = (chat_id, mess_isMedia, mess_urlMedia) => {
		return {
			mess_chat_id: currentChat_id || chat_id,
			mess_user_id: user_id,
			mess_message: isType.message,
			mess_sendAt: DateTime.utc(),
			mess_isMedia: mess_isMedia || null,
		}
	}
	const data = {
		chat_user_id_1: user_id,
		chat_user_id_2: currentContact_id,
	}

	const funcSendMessage = async () => {
		if (isType.message.length > 0) {
			if (currentMessages.length === 0) {
				const dataJSON = JSON.parse(JSON.stringify(data))
				let chatExist = null
				try {
					const isExist = await axios.post(`${url}/api/chats/findOne`, dataJSON, configToken(token))
					if (isExist) chatExist = isExist
				} catch {
					chatExist = false
				}

				if (chatExist) {
					emitNewMessage(dataSendMessage(chatExist.data.chat_id), currentContact_id)
					setIsType({ message: '' })
				} else {
					emitCreateNewChat(data, dataSendMessage(), currentContact_id)
					setIsType({ message: '' })
				}
			} else {
				emitNewMessage(dataSendMessage(), currentContact_id)
				setIsType({ message: '' })
			}
		} else {
			console.log('si no existen mensajes')
		}

		setEnableEmojiPicker(false)

		if (isEmitOneTyping) {
			dispatch(setEmitOneTyping({ chat_id: currentChat_id, isEmitOneTyping: false }))
			emitIsTyping(false, currentContact_id, currentChat_id)
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			funcSendMessage()
		}
	}

	const HandleSendMessage = (e) => {
		e.preventDefault()
		funcSendMessage()
	}

	console.log(fileImage)

	return (
		<div className="z-20">
			{enableEmojiPicker && (
				<EmojiPicker
					onPick={(emoji) => {
						setIsType({ message: isType.message + emoji })
					}}
				/>
			)}
			<footer className="flex items-end z-20 min-h-[62px] pr-[17px] pl-[11px] py-[5px] bg-richPanelBG">
				{!isRecorderAudio && !fileImage.file && (
					<div className="min-h-[52px] w-full flex  justify-center">
						<div className="min-h-[52px] py-[5px] px-[10px] flex items-center justify-center">
							<div
								onClick={() => setEnableEmojiPicker(!enableEmojiPicker)}
								className="mr-[8px] cursor-pointer"
							>
								<EmojiFaceIcon
									height={'26px'}
									width={'26px'}
									fill={enableEmojiPicker ? '#008069' : '#8696a0'}
								/>
							</div>
							<div className="relative p-[8px] cursor-pointer">
								<div onClick={() => setActiveClipIcon(!activeClipIcon)}>
									<ClipIcon />
								</div>
								{activeClipIcon && (
									<div className="absolute top-[-130px] righ-0 left-0 ">
										<FileIcon className="mb-2 cursor-pointer" />
										<div>
											<input
												type={'file'}
												className="hidden"
												name="readImage"
												id="readImage"
												accept="image/*"
												onChange={(e) => {
													const file = e.target.files[0]
													const reader = new FileReader()
													reader.onload = (e) => {
														setFileImage({ file, url: e.target.result })
													}
													reader.readAsDataURL(file)
													setActiveClipIcon(false)
												}}
											/>
											<label htmlFor="readImage" className=" cursor-pointer">
												<ImgIcon className="mb-2 " />
											</label>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="min-h-[20px] grow shrink  bg-[#2a3942] my-[5px]  mr-[10px] px-[12px] pt-[9px] pb-[11px] border-[1px] border-solid border-[#2a3942] rounded-lg text-[15px] font-normal leading-5">
							<div className="flex grow shrink  px-[3px] ">
								<input
									autoComplete="off"
									onChange={handleChangeInput}
									name="message"
									placeholder="Escribe un mensaje aquí"
									value={isType.message}
									type="text"
									onKeyDown={handleKeyDown}
									className="bg-[#2a3942] outline-none w-full h-full"
								/>
							</div>
						</div>

						<div className="flex justify-center items-center min-h-[52px] w-[37px] py-[5px] px-[10px]">
							{isType.message ? (
								<button onClick={HandleSendMessage} className="outline-none">
									<SendIcon height={'24px'} width={'24px'} />{' '}
								</button>
							) : (
								<button onClick={() => dispatch(setIsRecorderAudio(true))} className="outline-none">
									<MicIcon fill={'#8696a0'} />
								</button>
							)}
						</div>
					</div>
				)}
				{isRecorderAudio && <AudioRecorderInput />}
				{fileImage.file && <FileReader file={fileImage} />}
			</footer>
		</div>
	)
}
