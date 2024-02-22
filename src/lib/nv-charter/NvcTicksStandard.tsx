import { ScaleLinear } from 'd3-scale'
import { motion } from 'framer-motion'
import React from 'react'
import { NvcMargins } from './commonSpecs'

export type PNvcTicksStandard = {
	enableAnimations: boolean,
	renderYTicks: number[] | false,
	renderXTicks: number[] | false
	margins: NvcMargins,
	yScale: ScaleLinear<number, number, never> | false,
	xScale: ScaleLinear<number, number, never>,
	axisW: number,
	axisH: number,
	formatXTicks?(num: number): string | number
}
export const NvcTicksStandard: React.FC<PNvcTicksStandard> = ({
	enableAnimations,
	renderYTicks,
	renderXTicks,
	margins,
	yScale,
	xScale,
	axisW,
	axisH,
	formatXTicks
}) => {

	return <>
		{
			renderYTicks && yScale && renderYTicks.map((tick, idx) => {
				return <g
					key={tick}
					className='text-neutral-8 text-H11'
					transform={`translate(0, ${margins.top + yScale(tick)})`}
				>
					<motion.text
						initial={{ opacity: 0, translateX: -20 }}
						animate={{ opacity: 1, translateX: 0 }}
						transition={enableAnimations ? { duration: 0.6, delay: 1 + (idx * 0.1) } : { duration: 0, delay: 0 }}
						// https://stackoverflow.com/a/27666858
						alignmentBaseline='middle'
						fill='currentColor'
						x={margins.left - 10}
						textAnchor='end'
					>
						{tick}
					</motion.text>

					{
						(tick !== 0 || (!yScale.domain().includes(tick))) && <g className='text-neutral-4'>
							<motion.line
								strokeDasharray='4px 4px'
								strokeWidth={1}
								stroke='currentColor'
								x1={margins.left + 2}
								x2={margins.left + axisW}
								y1={0}
								y2={0}
								initial={{ opacity: 0 }} // cannot animate line length as framer-motion's method of doing so corrupts stroke-dasharray which breaks the dotted design.
								animate={{ opacity: 1 }}
								transition={enableAnimations ? { duration: 1, delay: 1.4 + (idx * 0.1) } : { duration: 0, delay: 0 }}
							/>
						</g>
					}
				</g>
			})
		}
		{
			renderXTicks && renderXTicks.map((tick, idx) => {
				const x = xScale(tick)
				return <g
					className='text-H11 text-neutral-8'
					key={tick}
					transform={`translate(${margins.left + x}, ${axisH + margins.top})`}
				>
					<motion.line
						className='stroke-neutral-5'
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={enableAnimations ? { duration: 0.5, delay: 1 + (idx * 0.1) } : { duration: 0, delay: 0 }}
						strokeWidth='2'
						x1={0}
						x2={0}
						y1={0}
						y2={6}
					/>
					<motion.text
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={enableAnimations ? { duration: 0.5, delay: 1.2 + (idx * 0.1) } : { duration: 0, delay: 0 }}
						dominantBaseline='hanging'
						fill='currentColor'
						textAnchor='middle'
						transform='translate(0, 8)'
					>
						{ formatXTicks?.(tick) ?? tick }
					</motion.text>
				</g>
			})
		}
	</>
}
