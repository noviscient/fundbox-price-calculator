import format from 'date-fns/format'
import { AnimatePresence, motion } from 'framer-motion'
import { useNvColorRegisterValues } from 'lib/color-register/useNvColorRegister'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import { nvcTimeseriesChartPopoverStateAtom } from 'lib/nv-charter/popoverAtoms'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { cn } from 'utils/react-ext'

export type PNvcTimeseriesChartPopover = {
	uniqueChartID: string,
	/** if the chart is contained in a container that disables `position: fixed`, use this and provide the offsets to the svg, as well as the margins. */
	useAbsolutePositionWithOffsets?: { top: number, left: number, margins: NvcMargins },
	formatYTicks?: (y: number) => string
}
export const NvcTimeseriesChartPopover: React.FC<PNvcTimeseriesChartPopover> = ({
	uniqueChartID, useAbsolutePositionWithOffsets, formatYTicks
}) => {
	const state = useRecoilValue(nvcTimeseriesChartPopoverStateAtom(uniqueChartID))
	const legend = useNvColorRegisterValues(uniqueChartID)

	return <AnimatePresence>
		{
			state ? <motion.div
				key='window'
				id='nvc-timeseries-popover'
				transition={{ duration: 0.2 }}
				style={useAbsolutePositionWithOffsets
					? {
						...state.pos.chartPageRight - state.mouse.x < 230
							? { right: state.pos.chartPageRight - state.mouse.x + 60 }
							: { left: state.mouse.x - useAbsolutePositionWithOffsets.left + 60 },
						top: state.mouse.y - useAbsolutePositionWithOffsets.top
					}
					: { left: state.mouse.x + 30, top: state.mouse.y - 50 - window.scrollY }
				}
				className={cn(
					'border-primary-5 bg-neutral-0/90 border rounded-sm-4px px-3 py-1 w-[230px] z-[11000] pointer-events-none',
					useAbsolutePositionWithOffsets ? 'absolute' : 'fixed'
				)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className='font-medium text-H12 text-neutral-7'>{ state.data.x instanceof Date ? format(state.data.x as Date, 'MMM dd, yy') : state.data.x }</div>
				{ state.data.graphs.map((d) => {
					const backgroundColor = d.color ?? legend.getFor(d.name ?? '-', 1, 'grey') ?? undefined
					return <div key={d.name ?? '-'} className='flex items-center my-1'>
						<div className='w-[8px] h-[8px] grow-0 shrink-0 mr-2 rounded-full' style={{ backgroundColor }} />
						<div className='font-medium leading-4 text-H13 text-primary-7'>
							{ d.name }
						</div>
						<div className='grow' />
						<div className='text-right text-H13 text-neutral-11'>
							{ /* requested by Scott: https://github.com/noviscient/factsheet-builder-ui/issues/121 */ }
							{ formatYTicks ? formatYTicks(d.y) : (d.y?.toFixed(2) ?? '-') }
							{/* { d.y.toFixed(2) } */}
						</div>
					</div>
				})}
			</motion.div>
			: null
		}
	</AnimatePresence>
}

