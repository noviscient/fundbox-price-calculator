import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { fmt } from '../utils/fmt'
import { RCFwdSVGElement } from '../utils/react-ext'

const _insertSpacers = fmt.insertSpacers

export const FormField: React.FC<{
	label: string,
	value: string,
	onChange: (value: string) => void,
	error?: string | null | undefined,
	tooltip?: string,
	subLabel?: string,
	enableThousandsSpacer?: boolean,
	trailingSuffix?: string,
	onEnter?: () => void
}> = ({ label, value, onChange, error, tooltip, enableThousandsSpacer, subLabel, trailingSuffix, onEnter }) => {

	const [isHoveringTooltip, setIsHoveringTooltip] = useState(false)

	return <div className='block'>
		<div className='flex items-center justify-start'>
			<div className='font-medium text-H14 text-neutral-11'>
				{ label }
			</div>
			<div className='w-[5px] shrink-0' />
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
			{ subLabel ? <div className='text-H12 text-neutral-6'>{ subLabel }</div> : null }
		</div>
		<div className='h-[8px] shrink-0' />
		<div className='relative w-full'>
			<input
				type='text'
				className={clsx('w-full py-[9px] focus:border-primary-5 transition-colors px-[12px] text-H14 border rounded-md text-neutral-13 hover:border-primary-3 rounded-sm-4px outline-none', error ? 'border-red-5' : 'border-neutral-4')}
				value={value}
				onChange={enableThousandsSpacer
					? (e) => {
						const val = e.target.value.replace(/[ ,]/g, '')
						const [bef, aft] = val.split('.')
						const newVal = _insertSpacers(bef, ',') + (typeof aft === 'string' ? `.${aft}` : '')
						onChange(newVal)
					}
					: (e) => onChange(e.target.value)
				}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault()
						onEnter?.()
					}
				}}
			/>
			{ trailingSuffix
				? <div
					className='absolute right-0 top-0 bottom-0 flex items-center justify-center px-[12px] text-H14 text-neutral-11/50'
					// ref={trailingSuffixRef}
				>
					{ trailingSuffix }
				</div>
				: null
			}
		</div>
		{ error && <>
			<div className='h-[4px] shrink-0' />
			<div className='text-H11 text-red-5'>
				{ error }
			</div>
		</> }
	</div>
}

const IconInfoSign: RCFwdSVGElement = (props) => {
	return <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.99984 1.66675C5.39706 1.66675 1.6665 5.3973 1.6665 10.0001C1.6665 14.6029 5.39706 18.3334 9.99984 18.3334C14.6026 18.3334 18.3332 14.6029 18.3332 10.0001C18.3332 5.3973 14.6026 1.66675 9.99984 1.66675ZM9.99984 16.6667C6.31753 16.6667 3.33317 13.6824 3.33317 10.0001C3.33317 6.31778 6.31753 3.33341 9.99984 3.33341C13.6821 3.33341 16.6665 6.31778 16.6665 10.0001C16.6665 13.6824 13.6821 16.6667 9.99984 16.6667ZM9.1665 9.16675C9.1665 8.70651 9.5396 8.33341 9.99984 8.33341C10.4601 8.33341 10.8332 8.70651 10.8332 9.16675V13.3334C10.8332 13.7937 10.4601 14.1667 9.99984 14.1667C9.5396 14.1667 9.1665 13.7937 9.1665 13.3334V9.16675ZM9.99984 7.50008C10.4601 7.50008 10.8332 7.12699 10.8332 6.66675C10.8332 6.20651 10.4601 5.83342 9.99984 5.83342C9.5396 5.83342 9.1665 6.20651 9.1665 6.66675C9.1665 7.12699 9.5396 7.50008 9.99984 7.50008Z"
			fill="#98A0AE"
		/>
	</svg>
}
