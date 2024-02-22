import { AnimatePresence, motion } from 'framer-motion'
import { useNvColorRegisterValues } from 'lib/color-register/useNvColorRegister'
import { nvcDMRChartPopoverStateAtom } from 'lib/nv-charter/popoverAtoms'
import { classNames } from 'lib/utils/classnames'
import React from 'react'
import { useRecoilValue } from 'recoil'

const formatXDecAsPercentage = (dec: number | null): number | string => (dec && `${(dec * 100).toFixed(1)}%`) ?? '?'
const renderRangeDescription = (xFrom: number | null, xTo: number | null) => {
	const fr = formatXDecAsPercentage(xFrom)
	const to = formatXDecAsPercentage(xTo)
	if (xFrom !== null) {
		if (xTo !== null) {
			return `${fr} to ${to}`
		} else {
			return `≥${fr} (not recorded)`
		}
	} else {
		if (xTo !== null) {
			return `<${to} (not recorded)`
		} else {
			return '(not recorded)'
		}
	}
}

export type PNvcDMRChartPopover = {
	uniqueChartID: string,
}
export const NvcDMRChartPopover: React.FC<PNvcDMRChartPopover> = ({
	uniqueChartID
}) => {
	const state = useRecoilValue(nvcDMRChartPopoverStateAtom(uniqueChartID))
	const legend = useNvColorRegisterValues(uniqueChartID)

	return <AnimatePresence>
		{
			state ? <motion.div
				key='window'
				id='nvc-timeseries-popover'
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
					'border-primary-5 bg-neutral-0/90 border rounded-sm-4px px-3 py-1 w-[230px] z-[11000] pointer-events-none',
					// useAbsolutePositionWithOffsets ? 'absolute' : 'fixed'
					'fixed'
				)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className='font-medium text-H12 text-neutral-7 whitespace-nowrap'>
					{ renderRangeDescription(state.data.xFrom, state.data.xTo) }
				</div>
				{ state.data.items.map((d) => {
					const backgroundColor = legend.getFor(d.name ?? '-', 1, 'grey') ?? undefined
					return <div key={d.name ?? '-'} className='flex items-center my-1'>
						<div className='w-[8px] h-[8px] grow-0 shrink-0 mr-2 rounded-full' style={{ backgroundColor }} />
						<div className='font-medium leading-4 text-H13 text-primary-7'>
							{ d.name }
						</div>
						<div className='grow' />
						<div className='text-right text-H13 text-neutral-11'>
							{/* { (d.y * 100).toFixed(2) }% */}
							{ d.y ?? 0 }
						</div>
					</div>
				})}
			</motion.div>
			: null
		}
	</AnimatePresence>
}

