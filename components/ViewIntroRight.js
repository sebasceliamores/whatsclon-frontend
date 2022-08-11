import React from 'react'
import IntroImg from '../components/svgComponents/IntroImg'

export default function ViewIntroRight() {
	return (
		<>
			<div className="py-[28px] flex grow justify-center items-center h-full w-full">
				<div className="mt-[-20px] text-center text-white w-[80%] max-w-[560px]">
					<div className="flex justify-center">
						<IntroImg />
					</div>
					<div>
						<div className="mt-[40px] text-[32px] font-light leading-[37.5px] ">
							<h1>WhatsClon Web</h1>
						</div>
						<div className="mt-[16px] text-[14px] font-normal text-introSecondary ">
							Ahora puedes enviar y recibir mensajes sin mantener tu teléfono conectado.
							<br />
							Usa WhatsApp en hasta 4 dispositivos vinculados y 1 teléfono a la vez.
						</div>
					</div>
				</div>
			</div>
			<div className=" absolute  bottom-0 w-full border-t-[6px] border-solid border-inputBorderActive opacity-70 "></div>
		</>
	)
}
