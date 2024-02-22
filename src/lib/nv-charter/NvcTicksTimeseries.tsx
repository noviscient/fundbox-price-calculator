import { ScaleLinear, ScaleTime } from 'd3-scale'
import React from 'react'
import { NvcMargins } from './commonSpecs'
import { motion } from 'framer-motion'
import format from 'date-fns/format'

export type PNvcTicksTimeseries = {
	enableAnimations: boolean,
	renderYTicks: number[],
	renderXTicks: Date[]
	margins: NvcMargins,
	yScale: ScaleLinear<number, number, never>,
	xScale: ScaleTime<number, number, never>,
	axisW: number,
	axisH: number,
	fmtYTicks?(y: number): string
}
export const NvcTicksTimeseries: React.FC<PNvcTicksTimeseries> = ({
	enableAnimations,
	renderYTicks,
	renderXTicks,
	margins,
	yScale,
	xScale,
	axisW,
	axisH,
	fmtYTicks
}) => {

	return <>
		{
			renderYTicks.map((tick, idx) => {
				return <g
					key={`${idx}-${tick}`}
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
						x={margins.left - 6}
						textAnchor='end'
					>
						{fmtYTicks ? fmtYTicks(tick) : tick}
					</motion.text>

					<g className='text-neutral-4'>
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
				</g>
			})
		}
		{
			renderXTicks.map((tick, idx) => {
				// if (
				// 	idx + 1 === renderXTicks.length
				// 	&& renderXTicks.length > 3
				// ) return null
				const x = xScale(tick)
				// if (x < 100 && idx !== 0) return null // just in case initial ticks are too close to the injected & compulsory 0 tick
				return <g
					className='text-H11 text-neutral-8'
					key={tick.getTime()}
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
						transform={`translate(${(idx + 1 === renderXTicks.length ? -15 : 0)}, 8)`}
					>
						{ format(tick, 'MMM d, yy') }
					</motion.text>
				</g>
			})
		}
	</>
}
