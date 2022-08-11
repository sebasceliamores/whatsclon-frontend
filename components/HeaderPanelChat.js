import { useEffect, useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import Image from 'next/image'
import { DateTime } from 'luxon'

import MoreOptionsIcon from './svgComponents/MoreOptionsIcon'
import SearchIcon from './svgComponents/SearchIcon'
import UserDefaultPhoto from './svgComponents/UserDefaultPhoto'

export default function HeaderPanelChat({ infoContact }) {
	const { displayName, _id } = infoContact
	const { socket, emitIsContactOnline } = useContext(SocketContext)

	const [isOnline, setIsOnline] = useState({
		isOnline: false,
		isOnlineAt: null,
	})

	const formatDate = (date) => {
		const currentTime = DateTime.fromISO(DateTime.utc())
		const dateTime = DateTime.fromISO(date)
		const diff = currentTime.diff(dateTime, ['days', 'minutes'])

		if (diff.days < 1) {
			const roundMinutes = Math.round(diff.minutes)

			if (diff.minutes < 60) {
				return `ultima vez hace ${roundMinutes} min`
			}
			return `ultima vez hoy a las  ${date.toFormat('hh:mm a')}`
		}
		if (diff.days >= 1 && diff.days < 2) {
			return 'ultima vez ayer'
		}
		if (diff.days >= 2 && diff.days < 8) {
			return `ultima vez el ${dateTime.toFormat('EEEE', { locale: 'es' })}`
		}
		if (diff.days >= 1) {
			return `ultima vez el ${dateTime.toFormat('dd/M/yyyy')}`
		}
	}

	useEffect(() => {
		const contactId = _id
		if (contactId) {
			emitIsContactOnline(contactId)
		}
	}, [emitIsContactOnline, _id])

	useEffect(() => {
		if (socket) {
			socket.on('server:IsContactOnline', (data) => {
				if (data.isOnline) {
					setIsOnline({ isConnected: true, isOnlineAt: null })
				} else {
					const date = DateTime.fromISO(data)
					setIsOnline({ isConnected: false, isOnlineAt: date })
				}
			})
		}

		return () => {
			socket?.off('server:IsContactOnline')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])

	return (
		<header className="flex z-20 h-[59px] w-full items-center py-[10px] px-[16px] bg-richPanelBG">
			<div className="flex grow cursor-pointer h-full">
				<div className="mr-[15px] mt-[-1px] h-full w-[40px] rounded-full ">
					{infoContact?.cont_are_contacts ? (
						infoContact.user_urlPhoto && (
							<Image
								src={infoContact.user_urlPhoto}
								width={40}
								height={40}
								className="rounded-full"
								alt="user"
							/>
						)
					) : (
						<UserDefaultPhoto width={40} height={40} />
					)}
				</div>
				<div className="flex flex-col grow justify-center text-left font-medium text-[16px] text-ellipsis whitespace-nowrap truncate">
					<span className="  truncate">{displayName ?? infoContact.user_email}</span>
					<div className="text-[13px] text-introSecondary  ">
						{isOnline.isConnected ? (
							<span className="truncate">en línea</span>
						) : (
							<span className="truncate">{formatDate(isOnline.isOnlineAt)}</span>
						)}
					</div>
				</div>
			</div>

			<div className="ml-[20px]">
				<div className="flex items-center">
					<div className="p-2 cursor-pointer">
						<SearchIcon height={'24px'} width={'24px'} fill={'#aebac1'} />
					</div>
					<div className="p-2 cursor-pointer">
						<MoreOptionsIcon height={'24px'} width={'24px'} fill={'#aebac1'} />
					</div>
				</div>
			</div>
		</header>
	)
}
