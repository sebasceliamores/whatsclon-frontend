import React from 'react'
import { useSelector } from 'react-redux'
import ViewChatPanel from './ViewChatPanel'
import ViewIntroRight from './ViewIntroRight'

export default function PanelRightSide() {
	const { isviewChatPanel } = useSelector((state) => state.chatPanel)

	return (
		<div className="relative bg-introBG h-full grow shrink 2xl:basis-[70%] xl:basis-[65%] md:basis-[60%] border-l border-solid border-borderStronger ">
			{isviewChatPanel ? <ViewChatPanel /> : <ViewIntroRight />}
		</div>
	)
}
