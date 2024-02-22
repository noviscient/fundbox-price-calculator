import React from 'react'

export type PNvcSVGDefs = {
}
export const NvcSVGDefs: React.FC<PNvcSVGDefs> = () => {
	return <defs>
		<marker
			id='chevron-arrow'
			viewBox='0 0 10 10'
			refX='5'
			refY='5'
			orient='auto'
		>
			<path d='M 0 0 L 10 5 L 0 10' fill='none' stroke='currentColor' />
		</marker>
	</defs>
}
