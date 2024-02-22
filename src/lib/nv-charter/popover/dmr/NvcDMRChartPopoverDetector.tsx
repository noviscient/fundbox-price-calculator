import React from 'react'
import { useSetRecoilState } from 'recoil'
import { NvcMargins } from '../../commonSpecs'
import { NvcDMRChartPopoverState, nvcDMRChartPopoverStateAtom } from '../../popoverAtoms'

export type PNvcDMRChartPopoverDetector = {
	uniqueChartID: string,
	rect: DOMRect,
	margins: NvcMargins,
	axisW: number,
	axisH: number,
	windowScrollYDuringCalc: number,
	getDataPoints: (mouseXWithinAxis: number) => NvcDMRChartPopoverState['data'] | null
}
export const NvcDMRChartPopoverDetector: React.FC<PNvcDMRChartPopoverDetector> = ({
	uniqueChartID,
	rect,
	margins,
	axisW,
	axisH,
	windowScrollYDuringCalc,
	getDataPoints
}) => {

	const setPopoverState = useSetRecoilState(nvcDMRChartPopoverStateAtom(uniqueChartID))

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
			if (xVal >= 0) {
				const data = getDataPoints(xVal)
				if (data) {
					const props = {
						data,
						pos: {
							xOrig: xVal,
							chartHeight: axisH,
							chartPageTop: rect.y + windowScrollYDuringCalc,
							chartPageRight: axisW + rect.x + margins.left + margins.right
						},
						mouse: { x: ev.pageX, y: ev.pageY }
					}
					setPopoverState(props)
				} else {
					setPopoverState(null)
				}
			}
		}}
		onMouseLeave={() => setPopoverState(null)}
	/>
}
