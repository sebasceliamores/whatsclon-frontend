const { DateTime } = require('luxon')

export const dateFormat = (lastMessage) => {
	if (lastMessage?.mess_message) {
		const currentTime = DateTime.fromISO(DateTime.utc())
		const date = DateTime.fromISO(lastMessage?.mess_sendAt)
		const diff = currentTime.diff(date, 'days').toObject()

		if (diff.days < 1) {
			return date.toFormat('hh:mm a')
		}
		if (diff.days >= 1 && diff.days < 2) {
			return 'ayer'
		}
		if (diff.days >= 2 && diff.days < 8) {
			return date.toFormat('EEEE', { locale: 'es' })
		}
		if (diff.days >= 1) {
			return date.toFormat('dd/M/yyyy')
		}
	}
}
