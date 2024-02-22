import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IconInfoSign } from '../../components/icons/IconInfoSign'

export const SimpleRow: React.FC<{ label: string, value: string, tooltip?: string }> = ({ tooltip, label, value }) => {
	const [isHoveringTooltip, setIsHoveringTooltip] = useState(false)
	return <div className='flex items-center py-[16px]'>
		<div className='text-H14 text-neutral-10'>{label}</div>
		{ tooltip ? <div
			className='relative'
			onPointerEnter={() => setIsHoveringTooltip(true)}
			onPointerLeave={() => setIsHoveringTooltip(false)}
		>
			<IconInfoSign className='h-[20px] w-[20px] fill-neutral-4' />
			<AnimatePresence>
				{ isHoveringTooltip ? <motion.div
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 5 }}
					transition={{ ease: 'easeOut', duration: 0.3 }}
					key='divl-28'
					className='absolute left-0 bottom-[calc(100%+5px)] w-[200px] rounded-md px-[10px] py-[6px] text-H12 text-neutral-0 bg-neutral-11 shadow-SH3 rounded-sm-4px'
				>
					{ tooltip }
				</motion.div> : null }
			</AnimatePresence>
		</div> : null }
		<div className='grow' />
		<div className='font-medium text-H14 text-neutral-9'>{ value }</div>
	</div>
}

export const TableRowMultiValue: React.FC<{ label: string, value: string[], tooltip?: string }> = ({ tooltip, label, value }) => {
	const [isHoveringTooltip, setIsHoveringTooltip] = useState(false)
	return <tr className='flex items-center my-4'>
		<td>
			<div className='text-H14 text-neutral-10'>{label}</div>
			{ tooltip ? <div
				className='relative'
				onPointerEnter={() => setIsHoveringTooltip(true)}
				onPointerLeave={() => setIsHoveringTooltip(false)}
			>
				<IconInfoSign className='h-[20px] w-[20px] fill-neutral-4' />
				<AnimatePresence>
					{ isHoveringTooltip ? <motion.div
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 5 }}
						transition={{ ease: 'easeOut', duration: 0.3 }}
						key='divl-28'
						className='absolute left-0 bottom-[calc(100%+5px)] w-[200px] rounded-md px-[10px] py-[6px] text-H12 text-neutral-0 bg-neutral-11 shadow-SH3 rounded-sm-4px'
					>
						{ tooltip }
					</motion.div> : null }
				</AnimatePresence>
			</div> : null }
		</td>
		{ value.map((v) => <td key={v} className='inline-block mx-2 font-medium text-H14 text-neutral-9'>{v}</td>) }
	</tr>
}