import { useState, useRef } from 'react'
import { Category, getEmojisGroupedBy } from 'unicode-emoji'

const groupedEmojis = getEmojisGroupedBy('category', { versionAbove: '12.1' })
const categories = Object.keys(groupedEmojis)

const localeCategoryNames = {
	'face-emotion': 'Emociones',
	'food-drink': 'Comida',
	'animals-nature': 'Naturaleza',
	'activities-events': 'Actividades',
	'person-people': 'Personas',
	'travel-places': 'Lugares',
	objects: 'Objetos',
	symbols: 'Símbolos',
	flags: 'Banderas',
}

const categorrySimbols = {
	'face-emotion': '😀',
	'food-drink': '🍕',
	'animals-nature': '🐵',
	'activities-events': '🎈',
	'person-people': '👨',
	'travel-places': '🌍',
	objects: '💣',
	symbols: '❤',
	flags: '🏳',
}

export default function EmojiPicker({ onPick }) {
	const [category, setCategory] = useState('face-emotion')
	const emojis = groupedEmojis[category]
	const emojiContainerRef = useRef(null)

	return (
		<div className="flex flex-col grow  h-[300px]  bg-introBG shadow-sm p-3 select-none">
			<div className="flex gap-2 mb-2 text-2xl">
				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => {
							setCategory(cat)
							emojiContainerRef.current?.scroll({ top: 0 })
						}}
						className={`grow focus:ring-0 border-b-[4px] ${
							cat === category ? ' border-teal' : ' border-introBG'
						}  `}
						title={localeCategoryNames[cat]}
					>
						{categorrySimbols[cat]}
					</button>
				))}
			</div>
			<div className="scroll px-2 grid grid-cols-auto " ref={emojiContainerRef}>
				<div className="font-semibold my-2 text-secondary text-sm" id={category}>
					{localeCategoryNames[category]}
				</div>

				<div key={category}>
					{emojis.map((emoji) => (
						<button
							key={emoji.emoji}
							className="text-2xl gap-2"
							onClick={() => onPick(emoji.emoji)}
						>
							{emoji.emoji}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
