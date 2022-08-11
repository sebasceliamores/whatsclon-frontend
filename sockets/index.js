import { io } from 'socket.io-client'
import store from '../app/store'

const user_id = store.getState().user.user_id
const token = store.getState().user.token

const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
	query: {
		token: token,
		user_id: user_id,
	},
})

/* export const emitNewMessage = (messages) => {
	socket.emit('client:NewMessage', messages)
}

export const emitJoinChatRoom = (chatRoomId) => {
	socket.emit('client:JoinChatRoom', chatRoomId)
} */

/* socket.on('basic', (data) => {
	console.log(data)
}) */

/* socket.on('server:NewMessage', (data) => {
	const { message, chat_id } = data
	dispatch(setUpdateMessages(message, chat_id))
}) */

export default socket
