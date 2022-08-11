import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { setViewInfoUser } from '../features/panelLeft/viewsLeftSlice'

import ArrowLeftIcon from '../components/svgComponents/ArrowLeftIcon'
import EditPenIcon from '../components/svgComponents/EditPenIcon'

export default function ViewInfoUser({ widthLeftSide }) {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const handleClose = () => {
		dispatch(setViewInfoUser(false))
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
						<h1>Perfil</h1>
					</div>
				</div>
			</header>
			<div className="h-full w-full flex flex-col">
				<div className="my-[28px] mx-auto h-[200px] w-[200px]">
					<div className="cursor-pointer">
						{user.user_urlPhoto && (
							<Image
								className="rounded-full"
								src={user.user_urlPhoto}
								width={200}
								height={200}
								alt="avatar"
							/>
						)}
					</div>
				</div>
				<div className="px-[30px] ">
					<div className="mb-[10px] pt-[14px] pb-[10px] leading-tight">
						<div className="mb-[14px]">
							<span className="text-[14px] text-teal">Tu nombre</span>
						</div>
						<div className="flex font-[400px] border-b-2 border-solid border-inputBorderActive">
							<div className="flex grow my-[8px]">
								<input
									className="w-full h-full outline-none bg-containerListChats"
									type="text"
									defaultValue={user.user_name}
								/>
							</div>
							<button className="pt-[8px]">
								<EditPenIcon />
							</button>
						</div>
					</div>
				</div>
				<div className="select-none text-textMuted mt-[4px] mr-[20px] mb-[28px] ml-[30px] text-[14px] leading-[20px] font-normal">
					<span>
						Este no es tu nombre de usuario ni un PIN. Este nombre será visible para tus contactos
						de WhatsClon.
					</span>
				</div>
				<div className="px-[30px] ">
					<div className="mb-[10px] pt-[14px] pb-[10px]">
						<div className="mb-[14px]">
							<span className="text-[14px] text-teal">Info.</span>
						</div>
						<div className="flex font-[400px]">
							<div className="flex grow my-[8px]">
								<input
									className="w-full h-full outline-none bg-containerListChats"
									type="text"
									defaultValue={user.user_state}
								/>
							</div>
							<button className="pt-[8px]">
								<EditPenIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
