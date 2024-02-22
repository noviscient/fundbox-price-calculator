import { ScaleLinear } from 'd3-scale'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import { useMemo } from 'react'

export const prefix$ = (value: string) => {
	if (value.startsWith('-')) return `-$${value.slice(1)}`
	return `$${value}`
}

export const ColourLegend: React.FC<{ legend: { name: string, color: string }[] }> = ({ legend }) => {
	return <div className='flex flex-row flex-wrap items-center justify-center mt-4'>
		{ legend.map((l) => <div key={l.name} className='flex items-center mx-[8px] my-1'>
			<svg viewBox='0 0 100 100' className='w-[8px] h-[8px] grow-0 shrink-0 mr-1.5'>
				<rect
					rx={50}
					ry={50}
					width={100}
					height={100}
					fill={l.color}
				/>
			</svg>
			<div className='font-medium leading-4 text-H13 text-neutral-11'>
				{l.name}
			</div>
		</div>) }
	</div>
}


export const BarSeries: React.FC<{ data: number[], bandwidth: number, yScale: ScaleLinear<number, number, never>, margins: NvcMargins, shiftX?: number, hideFirst?: boolean, widthRatioOfBandwidth?: number, color?: string, totalNumOfBars?: number, barIdx?: number }> = ({
	data, bandwidth, yScale, margins, hideFirst, widthRatioOfBandwidth = 0.75, color, totalNumOfBars = 1, barIdx = 0
}) => {
	const { x, width } = useMemo(() => {
		const leftPad = (bandwidth * (1 - widthRatioOfBandwidth)) / 2
		const barsSpace = bandwidth * widthRatioOfBandwidth
		const eachBarSpace = barsSpace / totalNumOfBars
		return {
			x: leftPad + (barIdx * eachBarSpace),
			width: eachBarSpace
		}
	}, [bandwidth, widthRatioOfBandwidth, totalNumOfBars])

	return <g transform={`translate(${margins.left}, ${margins.top})`} data-label='bars-series'>
		{ data.map((d, index) => {
			const yStart = !d ? yScale(0) : (d > 0 ? yScale(d) : yScale(0))
			let h = 0
			let offset = false
			if (d) {
				const yd = yScale(d)
				const y0 = yScale(0)
				const diff = Math.abs(yd - y0)
				if (diff < 4) {
					h = 4
					offset = true
				} else {
					h = diff
				}
			}
			const key = `${index}-${d}`
			return (hideFirst && (index === 0)) ? null : <g key={key} transform={`translate(${(bandwidth * (index - 0.5))}, ${yStart})`}>
				<rect
					rx={5}
					ry={5}
					x={x}
					y={offset ? -4 : 0}
					width={width}
					height={h || 2}
					{...color
						? { fill: color }
						: { className: !d ? 'fill-neutral-6' : (d > 0 ? 'fill-green-4' : 'fill-red-4') }
					}
					// className='fill-primary-2/50'
				/>
			</g>
		}) }
	</g>
}
