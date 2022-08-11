function PlayIcon(props) {
	const { fill } = props
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16px"
			height="18px"
			viewBox="0 0 16 18"
			{...props}
		>
			<path
				d="M15.05 8.39L2 .32a1 1 0 00-1.53.85v15.66A1 1 0 002 17.7l13-7.6a1 1 0 00.05-1.71z"
				fill={fill}
			/>
		</svg>
	)
}

export default PlayIcon
