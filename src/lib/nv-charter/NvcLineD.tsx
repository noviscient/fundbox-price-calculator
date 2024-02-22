import { motion } from 'framer-motion'
import React from 'react'
import { NvcMargins } from './commonSpecs'

export type PNvcLineD = {
	margins: NvcMargins,
	lineD: string | null,
	gClassName?: string,
	className?: string,
	strokeColor?: string,
	enableAnimations: boolean
}
export const NvcLineD: React.FC<PNvcLineD> = ({
	margins, lineD, className, gClassName, strokeColor, enableAnimations
}) => {
	return lineD ? <g
		transform={`translate(${margins.left}, ${margins.top})`}
		className={`text-primary-4 ${gClassName}`}
	>
		{ lineD && <motion.path
			d={lineD}
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			strokeWidth={2}
			className={className}
			stroke={strokeColor ?? '#5566ba'}
			fill='none'
			transition={enableAnimations ? { duration: 2, delay: 2 } : { duration: 0, delay: 0 }}
		/> }
	</g> : null
}
