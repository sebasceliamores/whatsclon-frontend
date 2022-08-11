function SendIconWithBG(props) {
	const { fill } = props

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" {...props}>
			<path
				d="M17.5 0A17.51 17.51 0 0135 17.5 17.51 17.51 0 0117.5 35 17.51 17.51 0 010 17.5 17.51 17.51 0 0117.5 0z"
				fill={fill}
			/>
			<path
				className="iwt3stqw s79hpmcy ksz6vod1"
				d="M25.64 18.55L11.2 24.93a.86.86 0 01-1.13-.44.83.83 0 01-.06-.44l.48-4.11a1.36 1.36 0 011.24-1.19l7.51-.6a.16.16 0 00.14-.16.16.16 0 00-.14-.14l-7.51-.6a1.36 1.36 0 01-1.24-1.19L10 12a.84.84 0 01.74-.94.87.87 0 01.45.06l14.44 6.38a.61.61 0 01.31.79.59.59 0 01-.3.26z"
				fill="#fff"
			/>
		</svg>
	)
}

export default SendIconWithBG
