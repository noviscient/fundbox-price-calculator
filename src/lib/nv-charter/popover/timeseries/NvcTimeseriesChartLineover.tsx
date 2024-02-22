import React from 'react'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import { nvcTimeseriesChartPopoverStateAtom } from 'lib/nv-charter/popoverAtoms'
import { useRecoilValue } from 'recoil'

export const NvcTimeseriesChartLineover: React.FC<{ uniqueChartID: string, margins: NvcMargins }> = ({ uniqueChartID, margins }) => {
	const state = useRecoilValue(nvcTimeseriesChartPopoverStateAtom(uniqueChartID))
	return state && <line
		key='line'
		x1={state.pos.xOrig + margins.left}
		x2={state.pos.xOrig + margins.left}
		y1={margins.top}
		y2={margins.top + state.pos.chartHeight}
		className='stroke-primary-3'
		strokeWidth='1'
	/>
}