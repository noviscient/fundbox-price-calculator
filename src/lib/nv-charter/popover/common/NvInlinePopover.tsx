import { AnimatePresence, motion } from 'framer-motion'
import { classNames } from 'lib/utils/classnames'
import React from 'react'

export type PNvInlinePopoverState = {
	mouse: { x: number, y: number },
	popoverStyle?: React.CSSProperties,
	className?: string
}
/** instead of `position: fixed`, is `absolute`, and does not calculate scrollY because coordinates given should be local. */
export const NvInlinePopover: React.FC<{
	display: null | PNvInlinePopoverState,
	children?: React.ReactNode[] | React.ReactNode,
	containerPos?: DOMRect | null,
	/** if `mouse.x + containerPos.x + popoverWidthForInvertCalc > document.body.clientWidth`, invert the popover to be on left side instead of right. */
	popoverWidthForInvertCalc?: number
}> = ({ display, children, containerPos, popoverWidthForInvertCalc }) => {
	return <AnimatePresence>
		{
			display
				? <motion.div
					key='nvzonalpopover'
					transition={{ duration: 0.2 }}
					style={{
						...popoverWidthForInvertCalc && containerPos && ((containerPos.left + display?.mouse.x + popoverWidthForInvertCalc + 10) > document.body.clientWidth) ? {
							right: containerPos.width - display.mouse.x + 30,
							top: display.mouse.y - 50,
						} : {
							left: display.mouse.x + 40,
							top: display.mouse.y - 50,
						},
						...display.popoverStyle ?? {}
					}}
					className={classNames(
						'border-primary-5 bg-neutral-0/90 border rounded-sm-4px px-3 py-1 min-w-[230px] z-[11000] pointer-events-none',
						'absolute',
						display.className
					)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{ children }
				</motion.div>
				: null
		}
	</AnimatePresence>
}

