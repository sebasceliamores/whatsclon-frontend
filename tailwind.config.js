/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			red: colors.red,
			panelHeaderBG: '#202c33',
			iconHeader: '#aebac1',
			iconActive: 'hsla(0,0%,100%,0.1)',
			dropdownBG: '#233138',
			primary: '#d1d7db',
			primaryStrong: '#e9edef',
			secondary: '#8696a0',
			butterBarDefault: '#182229',
			searchContainer: '#111b21',
			iconArrowLeft: '#00a884',
			containerListChats: '#111b21',
			borderList: 'rgba(134,150,160,0.15)',
			timeChatList: '#8696a0',
			hoverCardChat: '#202c33',
			focusCardChat: '#2a3942',
			borderStronger: 'rgba(134,150,160,0.15)',
			headerTittle: '#d9dee0',
			teal: '#008069',
			inputBorderActive: '#00a884',
			textMuted: '#8696a0',
			introBG: '#222e35',
			introSecondary: '#8696a0',
			richPanelBG: '#202c33',
			incomingBG: '#202c33',
			outgoingBG: '#005c4b',
			bubbleMeta: 'hsla(0,0%,100%,0.6)',
			conversationPanelBG: '#0b141a',
			unreadMarkerText: '#111b21',
			unreadTimeStamp: '#00a884',
			waveFormBG: '#3b4a54',
		},
		extend: {
			backgroundImage: {
				bgChat: 'url(/images/fondoChat4.png)',
			},
		},
	},
	mode: 'jit',
	plugins: [],
}
