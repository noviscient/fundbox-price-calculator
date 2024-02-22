import { AnimatePresence, motion } from 'framer-motion'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import { nvcTimeseriesChartPopoverStateAtom } from 'lib/nv-charter/popoverAtoms'
import React from 'react'
import { useRecoilValue } from 'recoil'

export const NvcTimeseriesChartShadeover: React.FC<{ uniqueChartID: string, margins: NvcMargins, bandwidth: number }> = ({ uniqueChartID, margins, bandwidth }) => {
	const state = useRecoilValue(nvcTimeseriesChartPopoverStateAtom(uniqueChartID))

	return <AnimatePresence>
		{ state && state.data.x !== undefined && state.data.xStart !== undefined && <motion.rect
			key='nvcTimeseriesChartShadeover'
			width={bandwidth}
			y={margins.top}
			// x={state.data.xFromOrig + margins.left}
			height={state.pos.chartHeight}
			className='fill-cyan-1/50'
			layout
			initial={{ opacity: 0, x: (state.data.xStart ?? 0) + margins.left }}
			animate={{
				opacity: 1,
				x: (state.data.xStart ?? 0) + margins.left
			}}
			exit={{ opacity: 0 }}
			transition={{ ease: 'easeOut', duration: 0.1 }}
		/> }
	</AnimatePresence>
}