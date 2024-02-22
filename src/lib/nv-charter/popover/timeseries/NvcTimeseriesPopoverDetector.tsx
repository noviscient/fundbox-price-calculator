import { ScaleBand } from 'd3-scale'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { NvcTimeseriesChartPopoverState, nvcTimeseriesChartPopoverStateAtom } from '../../popoverAtoms'

export type PNvcTimeseriesPopoverDetector = {
	uniqueChartID: string,
	rect: DOMRect,
	margins: NvcMargins,
	axisW: number,
	axisH: number,
	xScale: ScaleBand<string>,
	windowScrollYDuringCalc: number,
	getDataPoints: (
		idx: number
	) => Exclude<NvcTimeseriesChartPopoverState, null>['data']
}
export const NvcTimeseriesPopoverDetector: React.FC<PNvcTimeseriesPopoverDetector> = ({
	uniqueChartID,
	rect,
	margins,
	axisW,
	axisH,
	xScale,
	windowScrollYDuringCalc,
	getDataPoints
}) => {

	const setPopoverState = useSetRecoilState(nvcTimeseriesChartPopoverStateAtom(uniqueChartID))

	return <rect
		className='z-5-svgpopoverdetector'
		transform={`translate(${margins.left}, ${margins.top})`}
		x={0}
		y={0}
		fill='rgba(0,0,0,0)'
		width={axisW}
		height={axisH}
		onMouseMove={(ev) => {
			const xVal = ev.pageX - rect.x - margins.left
			const ratio = (xVal - (xScale.bandwidth() / 2)) / (rect.width - margins.left - margins.right)
			const idx = Math.round(ratio * xScale.domain().length)

			// +0.5 to handle centering. By default, tick 0 uses space from 0 to 1. However, we want tick 0 to appear to cover -0.5 to 0.5, tick 1 to cover 0.5 to 1.5 and so on.
			// problem with this is that bar 0 goes from 0 to 1. So it creates a problem where the line positions are correct but the bar positions are wrong. The only way to fix this is to either shift all lines ahead to 0.5 so that line tick 0 is at 0.5, bar is at 0~1, and popover detector detects tick 0 values at 0 ~ 1.
			const ptData = getDataPoints(idx)
			setPopoverState({
				data: ptData,
				pos: {
					xOrig: xVal,
					chartHeight: axisH,
					chartPageTop: rect.y + windowScrollYDuringCalc,
					chartPageRight: axisW + rect.x + margins.left + margins.right
				},
				mouse: { x: ev.pageX, y: ev.pageY }
			})
		}}
		onMouseLeave={() => setPopoverState(null)}
	/>
}
