function ArrowLeftIcon(props) {
	const { height, width, fill } = props

	return (
		<svg viewBox="0 0 24 24" width height {...props}>
			<path fill={fill} d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z" />
		</svg>
	)
}

export default ArrowLeftIcon
