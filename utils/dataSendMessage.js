export default function dataSendMessage(chat_id, user_id, mess_isMedia, mess_urlMedia) {
	return {
		mess_chat_id: chat_id || null,
		mess_user_id: user_id,
		mess_message: isType.message,
		mess_sendAt: DateTime.utc(),
		mess_isMedia: mess_isMedia || null,
		mess_urlMedia: mess_urlMedia || null,
	}
}
