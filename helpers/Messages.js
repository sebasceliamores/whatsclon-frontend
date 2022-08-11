export function parseTime(seconds) {
	const minutes = Math.floor(seconds / 60)
	const secondsLeft = Math.round(seconds - minutes * 60)
	return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`
}
