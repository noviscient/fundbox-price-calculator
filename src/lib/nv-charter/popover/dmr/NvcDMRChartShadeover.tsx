import { AnimatePresence, motion } from 'framer-motion'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import { nvcDMRChartPopoverStateAtom } from 'lib/nv-charter/popoverAtoms'
import React from 'react'
import { useRecoilValue } from 'recoil'

export const NvcDMRChartShadeover: React.FC<{ uniqueChartID: string, margins: NvcMargins }> = ({ uniqueChartID, margins }) => {
	const state = useRecoilValue(nvcDMRChartPopoverStateAtom(uniqueChartID))

	return <AnimatePresence>
		{ state && state.data.xFromOrig !== undefined && <motion.rect
			key='nvcDMRChartShadeover'
			width={state.data.xWidthOrig}
			y={margins.top}
			// x={state.data.xFromOrig + margins.left}
			height={state.pos.chartHeight}
			className='fill-primary-4/10'
			layout
			initial={{ opacity: 0, x: (state.data.xFromOrig ?? 0) + margins.left }}
			animate={{
				opacity: 1,
				x: (state.data.xFromOrig ?? 0) + margins.left
			}}
			exit={{ opacity: 0 }}
			transition={{ ease: 'easeOut', duration: 0.2 }}
		/> }
	</AnimatePresence>
}