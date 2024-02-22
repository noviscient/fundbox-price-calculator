import { ScaleBand, ScaleLinear } from 'd3-scale'
import { motion } from 'framer-motion'
import { tickFmt } from 'lib/utils/nvcFmt'
import React from 'react'
import { NvcMargins } from '../commonSpecs'
import { NvcYTicksMetadata } from '../nvcCalc'

export type PNvcTicksXBandYLinear = {
	enableAnimations: boolean,
	renderYTicks: number[] | false,
	renderXTicks: string[] | false,
	margins: NvcMargins,
	yScale: ScaleLinear<number, number, never> | false,
	xScale: ScaleBand<string>,
	axisW: number,
	axisH: number,
	formatXTicks?: (band: string) => string,
	formatYTicks?: tickFmt.LinearFmtFn,
	yTicksMetadata: NvcYTicksMetadata,
	verticalXTicks?: boolean
}
export const NvcTicksXBandYLinear: React.FC<PNvcTicksXBandYLinear> = ({
	enableAnimations,
	renderYTicks,
	renderXTicks,
	margins,
	yScale,
	xScale,
	axisW,
	axisH,
	formatXTicks,
	formatYTicks,
	yTicksMetadata,
	verticalXTicks
}) => {

	const yEnd = yScale ? yScale(yScale.domain()[1]) : null

	return <>
		{
			renderYTicks && yScale && renderYTicks.map((tick, idx) => {
				return <g
					key={tick}
					className='text-neutral-8 text-H11'
					transform={`translate(0, ${ margins.top + yScale(tick) })`}
				>
					<motion.text
						initial={{ opacity: 0, translateX: -20 }}
						animate={{ opacity: 1, translateX: 0 }}
						transition={enableAnimations ? { duration: 0.6, delay: 1 + (idx * 0.1) } : { duration: 0, delay: 0 }}
						// https://stackoverflow.com/a/27666858
						alignmentBaseline='middle'
						dominantBaseline='middle'
						fill='currentColor'
						x={margins.left - 10}
						textAnchor='end'
					>
						{formatYTicks ? formatYTicks(tick, yTicksMetadata) : tick }
					</motion.text>

					{
						(yEnd !== null && Math.abs(yEnd - tick) < 3) || <g className='text-neutral-4'>
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
				// if (idx !== 0) return null
				const disp = xScale(tick)
				return disp !== undefined && <g
					className='text-H11 text-neutral-8'
					key={tick}
					transform={`translate(${ margins.left + disp }, ${ axisH + margins.top })`}
				>
					<motion.line
						className='stroke-neutral-5'
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={enableAnimations ? { duration: 0.5, delay: 1 + (idx * 0.1) } : { duration: 0, delay: 0 }}
						strokeWidth='2'
						x1={(xScale.bandwidth() / 2) - 1}
						x2={(xScale.bandwidth() / 2) - 1}
						y1={0}
						y2={6}
					/>
					<motion.text
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						x={(xScale.bandwidth() / 2) + (verticalXTicks ? 8 : 0)}
						y={verticalXTicks ? -4 : 8}
						transition={enableAnimations ? { duration: 0.5, delay: 1.2 + (idx * 0.1) } : { duration: 0, delay: 0 }}
						fill='currentColor'
						{...verticalXTicks
							? {
								textAnchor: 'start',
								alignmentBaseline: 'middle',
								transform: 'rotate(90)'
							}
							: {
								textAnchor: 'middle',
								alignmentBaseline: 'before-edge'
							}}
					>
						{ formatXTicks?.(tick) ?? tick }
					</motion.text>
				</g>
			})
		}
	</>
}
