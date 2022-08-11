import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../app/store'
import { SocketProvider } from '../context/SocketContext'

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<SocketProvider>
				<Component {...pageProps} />
			</SocketProvider>
		</Provider>
	)
}

export default MyApp
