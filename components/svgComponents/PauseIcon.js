function PauseIcon(props) {
	const { fill } = props
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
			<circle cx={16} cy={16} r={14.75} fill="none" stroke="currentColor" strokeWidth={2.5} />
			<path
				className="iwt3stqw s79hpmcy ksz6vod1"
				d="M20.65 21.69V10.25h-3.34v11.44zm-9.3-11.44v11.44h3.34V10.25z"
				fill={fill}
			/>
		</svg>
	)
}

export default PauseIcon
