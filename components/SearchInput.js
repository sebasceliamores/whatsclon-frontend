import { useState, useRef, useEffect } from 'react'
import ArrowLeftIcon from './svgComponents/ArrowLeftIcon'
import SearchIcon from './svgComponents/SearchIcon'
import XIcon from './svgComponents/XIcon'

export default function SearchInput() {
	const [isClickSearch, setIsCLickSearch] = useState(false)
	const [verifyType, setVerifyType] = useState(false)
	const inputSearch = useRef(null)

	const handleClickX = (e) => {
		setVerifyType(false)
		inputSearch.current.value = ''
		inputSearch.current.focus()
	}

	const handleClickSearch = (e) => {
		if (isClickSearch) {
			setIsCLickSearch(false)
			setVerifyType(false)
			inputSearch.current.value = ''
			inputSearch.current.placeholder = 'Busca un chat o inicia uno nuevo'
		} else {
			setIsCLickSearch(true)
		}
	}

	const handleTypeInputSearch = (e) => {
		const { value } = e.target
		if (value.length > 0) {
			setVerifyType(true)
		} else {
			setVerifyType(false)
		}
	}

	useEffect(() => {
		isClickSearch ? inputSearch.current.focus() : inputSearch.current.blur()
	}, [isClickSearch])

	return (
		<div className="bg-searchContainer px-3 h-[49px] w-full flex justify-center items-center border-b border-solid border-borderList ">
			<div className="relative box-border bg-panelHeaderBG rounded-md h-[35px] flex grow shrink">
				<button
					onClick={handleClickSearch}
					className={`absolute  left-[12px] h-[35px] outline-none transition ease-in-out duration-300  ${
						isClickSearch && ' rotate-[360deg] scale-125'
					}`}
				>
					{!isClickSearch ? (
						<span className="w-6 h-6">
							<SearchIcon height={'19px'} width={'24px'} fill={'#8696a0'} />
						</span>
					) : (
						<span className="w-6 h-6 ">
							<ArrowLeftIcon height={'19px'} width={'24px'} fill={'#00a884'} />
						</span>
					)}
				</button>
				<div className="w-full pl-[65px] pr-[32px] h-[35px] flex  ">
					<input
						name={'searchInput'}
						onChange={handleTypeInputSearch}
						className="bg-panelHeaderBG text-primary rounded-md w-full border-none outline-none text-[14px]"
						type="text"
						placeholder={`${isClickSearch ? '' : 'Busca un chat o inicia uno nuevo'}`}
						onFocus={(e) => {
							setIsCLickSearch(true)
						}}
						ref={inputSearch}
					/>
					{verifyType && (
						<button onClick={handleClickX} className="absolute right-[12px] h-[35px]">
							<span className="w-6 h-6">
								<XIcon height={'24px'} width={'24px'} fill={'#8696a0'} />
							</span>
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
