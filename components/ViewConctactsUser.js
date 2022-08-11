import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setViewContactUser } from '../features/panelLeft/viewsLeftSlice'
import { setContact } from '../features/contacts/contactsSlice'
import CardContact from './CardContact'

import ArrowLeftIcon from './svgComponents/ArrowLeftIcon'

export default function ViewConctactsUser({ widthLeftSide }) {
	const dispatch = useDispatch()
	const { user_id, token } = useSelector((state) => state.user)

	const contacts = useSelector((state) => state.contacts)

	const handleClose = () => {
		dispatch(setViewContactUser(false))
	}

	useEffect(() => {
		const fetchContacts = () => {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contacts/findById/${user_id}`, config)
				.then((res) => {
					dispatch(setContact(res.data))
				})
				.catch((err) => {
					console.log(err)
				})
		}

		if (contacts.length === 0) {
			fetchContacts()
		}

		return () => {}
	}, [contacts, dispatch, token, user_id])

	return (
		<div
			style={{ width: widthLeftSide }}
			className="absolute z-30 leading=[20px] left-0 bg-containerListChats h-full grow shrink 2xl:basis-[30%] xl:basis-[35%] md:basis-[40%] "
		>
			<header className="bg-panelHeaderBG flex basis-auto flex-col justify-end h-[108px] pl-[23px] pr-[20px] select-none">
				<div className="h-[59px] w-full flex basis-auto items-center">
					<div className="w-[53px]">
						<button onClick={handleClose} className="w-[53px] align-top">
							<ArrowLeftIcon height={'24px'} width={'24px'} fill={'#d9dee0'} />
						</button>
					</div>
					<div className=" w-full mt-[-2px] font-medium text-[19px] text-ellipsis whitespace-nowrap text-headerTittle">
						<h1>Nuevo chat</h1>
					</div>
				</div>
			</header>
			<div className="h-full w-full flex flex-col">
				{contacts.length > 0 ? (
					contacts.map((contact) => {
						return (
							<CardContact
								key={contact._id}
								displayName={contact.cont_displayName}
								contact={contact.contact}
								isContact={contact.cont_are_contacts}
							/>
						)
					})
				) : (
					<div className="mt-5 text-center text-introSecondary">No hay contactos</div>
				)}
			</div>
		</div>
	)
}
