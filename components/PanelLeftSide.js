import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useWidth from '../hooks/useWidth'

import HeaderPanelChatList from '../components/HeaderPanelChatList'
import SearchInput from '../components/SearchInput'
import ViewListChats from '../components/ViewListChats'
import ViewAddContact from './ViewAddContact'

import ViewInfoUser from './ViewInfoUser'
import ViewConctactsUser from './ViewConctactsUser'

export default function PanelLeftSide() {
	const wrapperLeftSide = useRef(null)
	const viewPanel = useSelector((state) => state.viewsPanelLeft)
	const { viewInfoUser, viewAddContact, viewConctactsUser } = viewPanel

	const [width] = useWidth(wrapperLeftSide)

	return (
		<>
			<div
				ref={wrapperLeftSide}
				className="relative  bg-gray-500 h-full grow shrink 2xl:basis-[30%] xl:basis-[35%] md:basis-[40%] "
			>
				<HeaderPanelChatList />
				<SearchInput />
				<ViewListChats />
			</div>

			{viewInfoUser && <ViewInfoUser widthLeftSide={width} />}
			{viewAddContact && <ViewAddContact widthLeftSide={width} />}
			{viewConctactsUser && <ViewConctactsUser widthLeftSide={width} />}
		</>
	)
}
