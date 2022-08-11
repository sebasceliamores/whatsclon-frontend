export default function MoreOptionsCardChat({ topItemArrow }) {
	return (
		<div
			style={{ top: topItemArrow }}
			className={`absolute bg-red z-30 -right-44 top-0 rounded-sm  py-[9px] h-auto  max-w-[340px] text-left bg-dropdownBG cursor-pointer select-none`}
		>
			{' '}
			<ul className="min-w-[217.35px] text-[14.5px] leading-[14.5px] text-primary">
				<li className="hover:bg-[#182229]">
					<div className="pr-[58px] pl-[24px] pt-[13px] h-[40px]">Archivar chat</div>
				</li>
				<li className="hover:bg-[#182229]">
					<div className="pr-[58px] pl-[24px] pt-[13px] h-[40px]">Silenciar notificaciones</div>
				</li>
				<li className="hover:bg-[#182229]">
					<div className="pr-[58px] pl-[24px] pt-[13px] h-[40px]">Eliminar chat</div>
				</li>
				<li className="hover:bg-[#182229]">
					<div className="pr-[58px] pl-[24px] pt-[13px] h-[40px]">Fijar chat</div>
				</li>
				<li className="hover:bg-[#182229]">
					<div className="pr-[58px] pl-[24px] pt-[13px] h-[40px]">Marcar como no leído</div>
				</li>
			</ul>
		</div>
	)
}
