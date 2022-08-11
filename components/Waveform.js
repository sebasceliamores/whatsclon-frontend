import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

const Waveform = ({ mess_media, setWaveRef }) => {
	const waveFormRef = useRef(null)
	const wavesurfer = useRef(null)

	const { url, isHeard } = mess_media

	const formWaveSurferOptions = (ref) => ({
		container: ref,
		waveColor: isHeard ? '#53bdeb' : '#8696a0',
		progressColor: '#53bdeb',
		cursorColor: isHeard ? '#53bdeb' : '#eee',
		barWidth: 3,
		barRadius: 3,
		barHeight: 2,
		barMinHeight: 1,
		cursorWidth: 2,
		cursorHeight: 1,
		responsive: true,
		height: 24,
		width: '100%',
		normalize: true,
		partialRender: true,
		hideScrollbar: true,
	})

	const create = async () => {
		const options = formWaveSurferOptions(waveFormRef.current)
		wavesurfer.current = WaveSurfer.create(options)
		setWaveRef(wavesurfer.current)
		if (url) {
			wavesurfer.current.load(url)
		}
	}

	useEffect(() => {
		if (waveFormRef.current) {
			create()
		}
		return () => {
			if (wavesurfer.current) {
				wavesurfer.current?.destroy()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <div className="w-[220px] " ref={waveFormRef}></div>
}

export default Waveform
