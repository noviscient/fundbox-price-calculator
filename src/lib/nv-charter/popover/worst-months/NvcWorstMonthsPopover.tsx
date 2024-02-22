import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { AnimatePresence, motion } from 'framer-motion'
import { useNvColorRegisterValues } from 'lib/color-register/useNvColorRegister'
import { nvcWorstMonthsPopoverStateAtom } from 'lib/nv-charter/popoverAtoms'
import { classNames } from 'lib/utils/classnames'
import React from 'react'
import { useRecoilValue } from 'recoil'

export const NvcWorstMonthsPopover: React.FC<{ uniqueChartID: string }> = ({ uniqueChartID }) => {

	const state = useRecoilValue(nvcWorstMonthsPopoverStateAtom(uniqueChartID))
	const legend = useNvColorRegisterValues(uniqueChartID)

	return <AnimatePresence>
		{state && <motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ ease: 'easeOut', duration: 0. }}
			key='divl-13'
			className={classNames(
				'border-primary-5 bg-neutral-0/90 border rounded-sm-4px px-3 py-1 min-w-[230px] z-[11000] pointer-events-none',
				'fixed',
			)}
			style={{ top: state.pos.mouseTop - 80, left: state.pos.mouseLeft + 40 }}
		>
			<div className='text-H12'>
				{format(parse(state.coordData.date, 'yyyy-MM-dd', new Date()), 'MMM dd, yy')}
			</div>
			{state.coordData.items.map((nvi) => <div key={nvi.name} className='flex items-center justify-between py-0.5'>
				<ColourBead colour={legend.getFor(nvi.name ?? '') ?? 'gray'} />
				<div className='w-[8px]' />
				<div className='grow text-H12 text-primary-5 max-w-[180px]'>{nvi.name}</div>
				<div className='w-[8px]' />
				<div className='text-H11 text-neutral-12'>{(nvi.value * 100).toFixed(1)}%</div>
			</div>)}

		</motion.div>}

	</AnimatePresence>
}
const ColourBead: React.FC<{ colour: string }> = ({ colour }) => {
	return <div className='w-[8px] h-[8px] rounded-full' style={{ backgroundColor: colour }} />
}