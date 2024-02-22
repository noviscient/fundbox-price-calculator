import React from 'react'
import { motion } from 'framer-motion'
import { NvcMargins } from './commonSpecs'

export type PNvAxesDefault = {
	margins: NvcMargins,
	axisW: number,
	axisH: number,
	enableAnimations: boolean
}
export const NvcAxesStandard: React.FC<PNvAxesDefault> = ({ margins, axisW, axisH, enableAnimations }) => {
	return <g className='text-neutral-5'>
		<motion.line
			// X axis line
			x1={margins.left}
			x2={margins.left + axisW}
			y1={margins.top + axisH}
			y2={margins.top + axisH}
			transition={{ duration: enableAnimations ? 1.5 : 0, ease: 'easeOut' }}
			strokeLinecap='round'
			markerEnd='chevron-arrow'

			strokeWidth={2}
			fill='currentColor'
			stroke='currentColor'
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
		/>
		<motion.line
			// Y axis line
			x1={margins.left}
			x2={margins.left}
			y1={margins.top + axisH}
			y2={margins.top}
			transition={{ duration: enableAnimations ? 1.5 : 0, ease: 'easeOut' }}
			strokeLinecap='round'
			markerEnd='chevron-arrow'

			strokeWidth={2}
			fill='currentColor'
			stroke='currentColor'
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
		/>
	</g>
}
