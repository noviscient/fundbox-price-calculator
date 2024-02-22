import { AnimatePresence, motion } from 'framer-motion'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import { nvcFactorExposuresPopoverStateAtom } from 'lib/nv-charter/popoverAtoms'
import React from 'react'
import { useRecoilValue } from 'recoil'

export const NvcFactorExposuresShadeover: React.FC<{ uniqueChartID: string, margins: NvcMargins }> = ({ uniqueChartID, margins }) => {
	const state = useRecoilValue(nvcFactorExposuresPopoverStateAtom(uniqueChartID))

	return <AnimatePresence>
		{ state && state.data.yStartOrig !== undefined && <motion.rect
			key='nvcDMRChartShadeover'
			height={state.data.yBandwidth}
			x={margins.left}
			// x={state.data.xFromOrig + margins.left}
			width={state.pos.chartWidth}
			className='fill-primary-4/10'
			layout
			initial={{ opacity: 0, y: (state.data.yStartOrig ?? 0) + margins.top }}
			animate={{
				opacity: 1,
				y: (state.data.yStartOrig ?? 0) + margins.top
			}}
			exit={{ opacity: 0 }}
			transition={{ ease: 'easeOut', duration: 0.2 }}
		/> }
	</AnimatePresence>
}