import { useState, useEffect } from 'react'

export default function useOutsideClick(ref) {
	const [outsideClick, setOutsideClick] = useState(false)

	useEffect(() => {
		// Alert if clicked on outside of element

		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setOutsideClick(!outsideClick)
			}
		}
		// Bind the event listener
		outsideClick && document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, outsideClick])

	return [outsideClick, setOutsideClick]
}
