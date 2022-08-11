import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { setViewInfoUser, setViewContactUser } from '../features/panelLeft/viewsLeftSlice'

import UserDefaultPhoto from './svgComponents/UserDefaultPhoto'
import ViewStatesIcon from './svgComponents/ViewStatesIcon'
import NewChatIcon from './svgComponents/NewChatIcon'
import MoreOptionsHeaderChat from './MoreOptionsHeaderChat'

export default function HeaderPanelChatList() {
	const dispatch = useDispatch()
	const userPhoto = useSelector((state) => state.user.user_urlPhoto)

	const handleClick = (name) => {
		switch (name) {
			case 'photo':
				dispatch(setViewInfoUser(true))
				break
			case 'states':
				break
			case 'newChat':
				dispatch(setViewContactUser(true))
				break

			default:
				break
		}
	}

	return (
		<header className=" z-30 bg-panelHeaderBG flex h-[59px] w-full items-center py-2.5 px-4">
			<div
				onClick={() => {
					handleClick('photo')
				}}
				id="photo"
				className="h-[40px] w-[40px] grow cursor-pointer"
			>
				{userPhoto ? (
					<Image
						src={userPhoto}
						width={40}
						height={40}
						className="rounded-full object-cover"
						alt="user"
					/>
				) : (
					<UserDefaultPhoto width={40} height={40} />
				)}
			</div>
			<div className="flex">
				<div
					onClick={() => {
						handleClick('states')
					}}
					title="Estados"
					name="states"
					className="p-2 cursor-pointer"
				>
					<ViewStatesIcon existstates={'disable'} />
				</div>
				<div
					onClick={() => {
						handleClick('newChat')
					}}
					title="Nuevo chat"
					name="newChat"
					className="p-2 ml-2.5 cursor-pointer"
				>
					<NewChatIcon />
				</div>
				<div title="Menú">
					<MoreOptionsHeaderChat />
				</div>
			</div>
		</header>
	)
}
