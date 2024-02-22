import { scaleBand, scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
import { NvcAxesStandard } from 'lib/nv-charter/NvcAxesStandard'
import { NvcLineD } from 'lib/nv-charter/NvcLineD'
import { NvcSVGDefs } from 'lib/nv-charter/NvcSVGDefs'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import { NvcTicksXBandYLinear } from 'lib/nv-charter/geometry/NvcTicksXBandYLinear'
import { nvcCalc } from 'lib/nv-charter/nvcCalc'
import { NvcTimeseriesChartLineover } from 'lib/nv-charter/popover/timeseries/NvcTimeseriesChartLineover'
import { NvcTimeseriesChartShadeover } from 'lib/nv-charter/popover/timeseries/NvcTimeseriesChartShadeover'
import { NvcTimeseriesChartPopover } from 'lib/nv-charter/popover/timeseries/NvcTimeseriesPopover'
import { NvcTimeseriesPopoverDetector } from 'lib/nv-charter/popover/timeseries/NvcTimeseriesPopoverDetector'
import { tickFmt } from 'lib/utils/nvcFmt'
import { fmt } from 'utils/fmt'
import { cn } from 'utils/react-ext'
import { calculator } from '../../../calculator'
import useCalcState from '../../../lib/nv-charter/useCalcState'
import { ColourLegend } from './common'

const margins: NvcMargins = { top: 5, right: 0, bottom: 50, left: 40 }

const constructGraph = (rect: DOMRect, results: calculator.Results) => {
	const values = results.fees.serviceFeeProjectionsDec
	const xExt = [values[0]?.[0], values[values.length - 1]?.[0]]
	const yExt = [0, values[values.length - 1]?.[1]]
	if (xExt[0] === undefined || xExt[1] === undefined || yExt[0] === undefined || yExt[1] === undefined) {
		return null
	}
	const { axisH, axisW } = nvcCalc.axisSize(rect, margins)

	const xScale = scaleBand()
		.domain(values.map(([x]) => x.toString()))
		.range([0, axisW])
		.padding(0.1)
	const yScale = scaleLinear()
		.domain(yExt)
		.range([axisH, 0])
	const renderYTicks = yScale.ticks(5)
	const lineEq = line<[number, number]>()
		.x(([x]) => xScale(x.toString()) ?? 0)
		.y(([, y]) => yScale(y))
	const lineD = lineEq(values) ?? ''
	const windowScrollYDuringCalc = window.scrollY
	const yTicksMetadata = nvcCalc.getLinearScaleMetadata(yScale)
	return {
		xScale,
		yScale,
		renderYTicks,
		lineD,
		windowScrollYDuringCalc,
		axisH, axisW,
		values,
		yTicksMetadata,
		rect
	}

}

export const NoviscientMonthlyFeeChart: React.FC<{ results: calculator.Results }> = ({ results }) => {

	const { ref, calc } = useCalcState(constructGraph, results, null, margins)

	return <>
		<svg ref={ref} className={cn('w-full h-[280px] rounded-sm-4px')}>
			<NvcSVGDefs />
			{
				calc
					? <>
						<NvcAxesStandard
							margins={margins}
							axisH={calc.axisH}
							axisW={calc.axisW}
							enableAnimations={false}
						/>
						<NvcTicksXBandYLinear
							margins={margins}
							axisH={calc.axisH}
							axisW={calc.axisW}  
							xScale={calc.xScale}
							yScale={calc.yScale}
							renderYTicks={calc.renderYTicks}
							enableAnimations={false}
							renderXTicks={calc.xScale.domain()}
							verticalXTicks
							yTicksMetadata={calc.yTicksMetadata}
							formatXTicks={(band) => tickFmt.standardisedMultiplierSuffix0DP(parseFloat(band), { maxYPlace: 1_000_000 })}
							formatYTicks={(tick, meta) => tickFmt.standardisedMultiplierSuffix0DP(tick, meta)}
						/>

						<NvcLineD margins={margins} lineD={calc.lineD} enableAnimations={false} />
						<NvcTimeseriesChartShadeover margins={margins} uniqueChartID='monthlyfeechart' bandwidth={calc.xScale.bandwidth()} />
						<NvcTimeseriesChartLineover margins={margins} uniqueChartID='monthlyfeechart' />
						<NvcTimeseriesPopoverDetector
							// see NvcTimeseriesPopover for the rendering.
							axisH={calc.axisH}
							axisW={calc.axisW}
							windowScrollYDuringCalc={calc.windowScrollYDuringCalc}
							rect={calc.rect}
							getDataPoints={(idx) => {
								const xCoord = calc.xScale.domain()[idx]
								return {
									x: `AUM: ${tickFmt.standardisedMultiplierSuffix0DP(parseFloat(xCoord), { maxYPlace: 1_000_000 })}`,
									graphs: [{ name: 'Monthly fee', y: calc.values[idx][1], color: '#5566ba' }]
								}
							}}
							xScale={calc.xScale}
							uniqueChartID='monthlyfeechart'
							margins={margins}
						/>
					</>
					: null
			}
		</svg>

		<NvcTimeseriesChartPopover
			formatYTicks={(y) => fmt.money(y, 2, ',', '.')}
			uniqueChartID='monthlyfeechart'
		/>
		<ColourLegend legend={[{ name: 'Monthly fee', color: '#5566ba' }]} />
	</>
}
