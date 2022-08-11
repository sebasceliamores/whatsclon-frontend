import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setViewAddContact } from '../features/panelLeft/viewsLeftSlice'
import ArrowLeftIcon from '../components/svgComponents/ArrowLeftIcon'
import XIcon from './svgComponents/XIcon'

export default function ViewAddContact({ widthLeftSide }) {
	const { token, user_email, user_id } = useSelector((state) => state.user)
	const [typeForm, setTypeForm] = useState({ name: '', email: '' })
	const [contact, setContact] = useState({})
	const [error, setError] = useState({ message: '' })
	const dispatch = useDispatch()

	const url = `${process.env.NEXT_PUBLIC_BASE_URL}`

	const handleClose = () => {
		dispatch(setViewAddContact(false))
	}

	const handleDeleteText = (name) => {
		setTypeForm({ ...typeForm, [name]: '' })
	}

	const handleChangeTypeForm = (e) => {
		setTypeForm({ ...typeForm, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const { name, email } = typeForm

		let contactExist = false

		if (name !== '' && email !== '') {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			try {
				const emailExist = await axios.get(`${url}/api/users/findByEmail/${email}`, config)
				if (emailExist.data) {
					contactExist = true
					setContact(emailExist.data)
					if (emailExist.data?.user_email === user_email) {
						contactExist = false
						return setError({ message: 'No puedes añadirte a ti mismo' })
					}
				}
			} catch (err) {
				return setError({ message: 'El usuario no existe en WhatsClon  ' })
			}

			if (Object.keys(contact).length > 0 && contactExist) {
				const data = {
					cont_displayName: name,
					cont_contact_id: contact.user_id,
					cont_user_id: user_id,
					cont_state: contact.user_state,
				}

				try {
					const newContact = await axios.post(`${url}/api/contacts`, data, config)
					if (newContact.data) {
						return dispatch(setViewAddContact(false))
					}
				} catch (err) {
					return setError({ message: 'El usuario ya existe en tu lista de contactos' })
				}
			}
		} else {
			return setError({ message: 'Por favor, llenar todos los campos' })
		}
	}

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
						<h1>Agregar Contacto</h1>
					</div>
				</div>
			</header>

			<div className="h-full w-full flex flex-col pt-10">
				<form className="px-[30px] select-none">
					<div className="mb-[40px] pt-[14px] pb-[10px] leading-tight">
						<div className="mb-[14px]">
							<span className="text-[14px] text-teal">Nombre</span>
						</div>
						<div className="flex font-[400px] border-b-2 border-solid border-inputBorderActive">
							<div className="flex grow my-[8px]">
								<input
									autoComplete="off"
									onChange={handleChangeTypeForm}
									value={typeForm.name}
									name="name"
									className="w-full h-full outline-none bg-containerListChats"
									type="text"
								/>
							</div>
							{typeForm.name !== '' && (
								<button
									onClick={() => {
										handleDeleteText('name')
									}}
									className="pt-[8px] outline-none"
								>
									<XIcon width={'24px'} height={'24px'} fill={'#8696a0'} />
								</button>
							)}
						</div>
					</div>
					<div className="mb-[40px] pt-[14px] pb-[10px] leading-tight">
						<div className="mb-[14px]">
							<span className="text-[14px] text-teal">Correo</span>
						</div>
						<div className="flex font-[400px] border-b-2 border-solid border-inputBorderActive">
							<div className="flex grow my-[8px]">
								<input
									autoComplete="off"
									onChange={handleChangeTypeForm}
									value={typeForm.email}
									name="email"
									className="w-full h-full outline-none bg-containerListChats"
									type="email"
								/>
							</div>
							{typeForm.email !== '' && (
								<button
									onClick={() => {
										handleDeleteText('email')
									}}
									className="pt-[8px] outline-none"
								>
									<XIcon width={'24px'} height={'24px'} fill={'#8696a0'} />
								</button>
							)}
						</div>
					</div>

					<div className="mb-[40px] pt-[14px] pb-[10px] leading-tight">
						<div onClick={handleSubmit} className="mb-[14px] flex justify-center">
							<button className="py-[8px] h-[40px] w-1/5 text-center rounded border-b-2 border-solid border-inputBorderActive text-inputBorderActive opacity-80 hover:opacity-100">
								Agregar
							</button>
						</div>
						<div className="pt-[15px] h-[20px] text-center ">
							<span className=" text-[14px] text-red-300 opacity-90 text-ellipsis whitespace-nowrap">
								{error.message && error.message}
							</span>
						</div>
					</div>
				</form>
				<div className="select-none text-textMuted mt-[4px] mr-[20px] mb-[28px] ml-[30px] text-[14px] text-center leading-[20px] font-normal ">
					<span>Este nombre será visible en tus contactos de WhatsClon.</span>
				</div>
			</div>
		</div>
	)
}
