import React from 'react'
import { useSetRecoilState } from 'recoil'
import { NvcMargins } from '../../commonSpecs'
import { NvcFactorExposuresPopoverState, nvcFactorExposuresPopoverStateAtom } from '../../popoverAtoms'

export type PNvcFactorExposuresPopoverDetector = {
	uniqueChartID: string,
	rect: DOMRect,
	margins: NvcMargins,
	axisW: number,
	axisH: number,
	windowScrollYDuringCalc: number,
	getDataPoints: (mouseYWithinAxis: number) => Exclude<NvcFactorExposuresPopoverState, null>['data']
}
export const NvcFactorExposuresPopoverDetector: React.FC<PNvcFactorExposuresPopoverDetector> = ({
	uniqueChartID,
	rect,
	margins,
	axisW,
	axisH,
	windowScrollYDuringCalc,
	getDataPoints
}) => {

	const setPopoverState = useSetRecoilState(nvcFactorExposuresPopoverStateAtom(uniqueChartID))

	return <rect
		className='z-5-svgpopoverdetector'
		transform={`translate(${margins.left}, ${margins.top})`}
		x={0}
		y={0}
		fill='rgba(0,0,0,0)'
		width={axisW}
		height={axisH}
		onMouseMove={(ev) => {
			const mouseY = ev.clientY - (ev.target as SVGRectElement).getBoundingClientRect().y
			if (mouseY >= 0) {
				const data = getDataPoints(mouseY)
				if (data) {
					const props = {
						data,
						pos: {
							xOrig: mouseY,
							chartWidth: axisW,
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
