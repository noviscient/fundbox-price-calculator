import { AnimatePresence, motion } from 'framer-motion'
import { nvcFactorExposuresPopoverStateAtom } from 'lib/nv-charter/popoverAtoms'
import { classNames } from 'lib/utils/classnames'
import React from 'react'
import { useRecoilValue } from 'recoil'

// const formatXDecAsPercentage = (dec: number | null): number | string => (dec && `${(dec * 100).toFixed(1)}%`) ?? '?'
// const _renderRangeDescription = (xFrom: number | null, xTo: number | null) => {
// 	const fr = formatXDecAsPercentage(xFrom)
// 	const to = formatXDecAsPercentage(xTo)
// 	if (xFrom !== null) {
// 		if (xTo !== null) {
// 			return `${fr} to ${to}`
// 		} else {
// 			return `≥${fr} (not recorded)`
// 		}
// 	} else {
// 		if (xTo !== null) {
// 			return `<${to} (not recorded)`
// 		} else {
// 			return '(not recorded)'
// 		}
// 	}
// }

export type PNvcFactorExposuresPopover = {
	uniqueChartID: string,
}
export const NvcFactorExposuresPopover: React.FC<PNvcFactorExposuresPopover> = ({
	uniqueChartID
}) => {
	const state = useRecoilValue(nvcFactorExposuresPopoverStateAtom(uniqueChartID))
	// const _legend = useNvColorRegisterValues(uniqueChartID)

	return <AnimatePresence>
		{
			state ? <motion.div
				key='window'
				id='nvc-factor-exposures-popover'
				transition={{ duration: 0.2 }}
				style={{ left: state.mouse.x + 60, top: state.mouse.y - 50 - window.scrollY }}
				// style={useAbsolutePositionWithOffsets
				// 	? {
				// 		...state.pos.chartPageRight - state.mouse.x < 230
				// 			? { right: state.pos.chartPageRight - state.mouse.x + 60 }
				// 			: { left: state.mouse.x - useAbsolutePositionWithOffsets.left + 60 },
				// 		top: state.mouse.y - useAbsolutePositionWithOffsets.top
				// 	}
				// 	: { left: state.mouse.x + 30, top: state.mouse.y - 50 - window.scrollY }
				// }
				className={classNames(
					'border-primary-5 bg-neutral-0/90 border rounded-sm-4px px-3 py-1 min-w-[120px] z-[11000] pointer-events-none',
					// useAbsolutePositionWithOffsets ? 'absolute' : 'fixed'
					'fixed'
				)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className='font-medium text-H13 text-primary-5 whitespace-nowrap'>
					{ state.data.item.name }
				</div>
				<div className='text-right text-H13 text-neutral-11'>
					{/* { (d.y * 100).toFixed(2) }% */}
					{ state.data.item.value }
				</div>
			</motion.div>
			: null
		}
	</AnimatePresence>
}

