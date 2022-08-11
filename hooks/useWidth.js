import { useState, useEffect, useCallback } from 'react'

export default function useWidth(elementRef) {
	const [width, setWidth] = useState(null)

	const updateWidth = useCallback(() => {
		if (elementRef && elementRef.current) {
			const width = elementRef.current.getBoundingClientRect().width.toFixed()
			setWidth(width + 'px')
		}
	}, [elementRef])

	useEffect(() => {
		updateWidth()
		window.addEventListener('resize', updateWidth)
		return () => {
			window.removeEventListener('resize', updateWidth)
		}
	}, [updateWidth])

	return [width]
}
