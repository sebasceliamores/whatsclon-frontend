function SendIcon(props) {
	const { height, width } = props
	return (
		<svg viewBox="0 0 24 24" width height {...props}>
			<path
				fill="#8696a0"
				d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
			/>
		</svg>
	)
}

export default SendIcon
