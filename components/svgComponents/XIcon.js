function XIcon(props) {
	const { height, width, fill } = props

	return (
		<svg viewBox="0 0 24 24" width height {...props}>
			<path fill={fill} d="M17.25 7.8L16.2 6.75l-4.2 4.2-4.2-4.2L6.75 7.8l4.2 4.2-4.2 4.2 1.05 1.05 4.2-4.2 4.2 4.2 1.05-1.05-4.2-4.2 4.2-4.2z" />
		</svg>
	)
}

export default XIcon
