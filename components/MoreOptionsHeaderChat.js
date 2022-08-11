import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/user/userSlice'
import { setViewAddContact } from '../features/panelLeft/viewsLeftSlice'

import MoreOptionsIcon from './svgComponents/MoreOptionsIcon'

export default function MoreOptionsHeaderChat() {
	const [moreOptionsActive, setMoreOptionsActive] = useState(false)
	const wrapperRef = useRef(null)
	const dispatch = useDispatch()

	const handleMoreOptions = () => {
		setMoreOptionsActive(!moreOptionsActive)
	}

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	const handleSelectOption = (e) => {
		switch (e.target.id) {
			case 'NGROUP':
				break
			case 'MDEST':
				break
			case 'CONFIG':
				break
			case 'ADDCONT':
				dispatch(setViewAddContact(true))
				break
			default:
				break
		}
	}

	const useOutsideClick = (ref, moreOptionsActive) => {
		useEffect(() => {
			// Alert if clicked on outside of element

			const handleClickOutside = (event) => {
				if (ref.current && !ref.current.contains(event.target)) {
					setMoreOptionsActive(!moreOptionsActive)
				}
			}
			// Bind the event listener
			moreOptionsActive && document.addEventListener('mousedown', handleClickOutside)
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}, [ref, moreOptionsActive])
	}

	useOutsideClick(wrapperRef, moreOptionsActive)

	return (
		<div
			ref={wrapperRef}
			onClick={handleMoreOptions}
			className={` relative ml-2.5 p-2 cursor-pointer rounded-full ${
				moreOptionsActive && 'bg-iconActive select-none'
			}`}
		>
			<MoreOptionsIcon />

			{moreOptionsActive && (
				<div
					className={`absolute z-10 top-[44px] rounded-sm right-1 py-[9px] h-auto  max-w-[340px] text-left bg-dropdownBG ${
						moreOptionsActive && 'transition-all scale-100 duration-300 delay-75 ease-in-out'
					}`}
				>
					<ul className="min-w-[217.35px] text-[14.5px] leading-[14.5px] text-primary">
						<li className="hover:bg-[#182229]">
							<div
								onClick={handleSelectOption}
								id="NGROUP"
								className="pr-[58px] pl-[24px] pt-[13px] h-[40px]"
							>
								Nuevo grupo
							</div>
						</li>
						<li className="hover:bg-[#182229]">
							<div
								onClick={handleSelectOption}
								id="MDEST"
								className="pr-[58px] pl-[24px] pt-[13px] h-[40px]"
							>
								Mensajes destacados
							</div>
						</li>
						<li className="hover:bg-[#182229]">
							<div
								onClick={handleSelectOption}
								id="CONFIG"
								className="pr-[58px] pl-[24px] pt-[13px] h-[40px]"
							>
								Configuración
							</div>
						</li>
						<li className="hover:bg-[#182229]">
							<div
								onClick={handleSelectOption}
								id="ADDCONT"
								className="pr-[58px] pl-[24px] pt-[13px] h-[40px]"
							>
								Agregar contacto
							</div>
						</li>
						<li className="hover:bg-[#182229]">
							<div onClick={handleLogout} className="pr-[58px] pl-[24px] pt-[13px] h-[40px]">
								Cerrar sesión
							</div>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}
