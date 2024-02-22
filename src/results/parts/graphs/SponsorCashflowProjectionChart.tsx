import { extent } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
import { NvcAxesStandard } from 'lib/nv-charter/NvcAxesStandard'
import { NvcLineD } from 'lib/nv-charter/NvcLineD'
import { NvcSVGDefs } from 'lib/nv-charter/NvcSVGDefs'
import { NvcMargins } from 'lib/nv-charter/commonSpecs'
import { NvcTicksXBandYLinear } from 'lib/nv-charter/geometry/NvcTicksXBandYLinear'
import { nvcCalc } from 'lib/nv-charter/nvcCalc'
import { NvcTimeseriesChartShadeover } from 'lib/nv-charter/popover/timeseries/NvcTimeseriesChartShadeover'
import { NvcTimeseriesChartPopover } from 'lib/nv-charter/popover/timeseries/NvcTimeseriesPopover'
import { NvcTimeseriesPopoverDetector } from 'lib/nv-charter/popover/timeseries/NvcTimeseriesPopoverDetector'
import { tickFmt } from 'lib/utils/nvcFmt'
import { fmt } from 'utils/fmt'
import { cn } from 'utils/react-ext'
import { calculator } from '../../../calculator'
import useCalcState from '../../../lib/nv-charter/useCalcState'
import { BarSeries, ColourLegend } from './common'

const margins: NvcMargins = { top: 5, right: 0, bottom: 20, left: 50 }

const constructGraph = (rect: DOMRect, results: calculator.Results) => {

	const sponsSetup = results.cashflows.sponsorSetup.slice(0, -1)
	const sponsMgmtFee = results.cashflows.sponsorManagementFee.slice(0, -1)
	const sponsPerfFee = results.cashflows.sponsorPerformanceFee.slice(0, -1)
	const sponsCumulCashflow = results.cashflows.sponsorCumulativeCashFlow.slice(0, -1)
	
	const xExt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const yExt = extent([0, ...sponsSetup, ...sponsMgmtFee, ...sponsPerfFee, ...sponsCumulCashflow])
	if (xExt[0] === undefined || xExt[1] === undefined || yExt[0] === undefined || yExt[1] === undefined) {
		return null
	}
	const { axisH, axisW } = nvcCalc.axisSize(rect, margins)

	const xScale = scaleBand()
		.domain(xExt.map((x) => x.toString()))
		.range([0, axisW])
	const yScale = scaleLinear()
		.domain(yExt)
		.range([axisH, 0])
	const renderYTicks = yScale.ticks(5)
	const lineEq = line<number>()
		.x((_, idx) => xScale(idx.toString()) ?? 0)
		.y((d) => yScale(d))
	const graphs = [
		{ name: 'Setup', data: sponsSetup, d: lineEq(sponsSetup) ?? '', color: '#91E0EF', bar: true },
		{ name: 'Management Fee', data: sponsMgmtFee, d: lineEq(sponsMgmtFee) ?? '', bar: true, color: '#A6C7FF' },
		{ name: 'Performance Fee', data: sponsPerfFee, d: lineEq(sponsPerfFee) ?? '', bar: true, color: '#7784d3' },
		{ name: 'Sponsor cum. cash flow (RHS)', data: sponsCumulCashflow, d: lineEq(sponsCumulCashflow) ?? '', bar: false, color: '#3c86f7' },
	]
	const windowScrollYDuringCalc = window.scrollY
	const yTicksMetadata = nvcCalc.getLinearScaleMetadata(yScale)
	const _margins = { ...margins, left: margins.left + (xScale.bandwidth() / 2) }
	return {
		xScale,
		yScale,
		renderYTicks,
		graphs,
		windowScrollYDuringCalc,
		axisH, axisW,
		yTicksMetadata,
		rect,
		margins: _margins
	}

}

export const SponsorCashflowProjectionChart: React.FC<{ results: calculator.Results }> = ({ results }) => {

	const { ref, calc } = useCalcState(constructGraph, results, null, margins)

	return <>
		<svg ref={ref} className={cn('w-full h-[280px] rounded-sm-4px')}>
			<NvcSVGDefs />
			{
				calc
					? <>
						<NvcTimeseriesChartShadeover margins={margins} uniqueChartID='cashflowprojectionchart' bandwidth={calc.xScale.bandwidth()} />
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
							yTicksMetadata={calc.yTicksMetadata}
							formatXTicks={(band) => `${band} M`}
							formatYTicks={(tick, meta) => tickFmt.standardisedMultiplierSuffix1DP(tick, meta)}
						/>

						{ calc.graphs.map((graph) => 
							graph.bar
								? <BarSeries
									key={graph.name}
									data={graph.data}
									bandwidth={calc.xScale.bandwidth()}
									yScale={calc.yScale}
									margins={calc.margins}
									color={graph.color}
									totalNumOfBars={3}
									barIdx={graph.name === 'Setup' ? 0 : graph.name === 'Management Fee' ? 1 : 2}
								/>
								: <NvcLineD
									key={graph.name}
									enableAnimations={false}
									margins={calc.margins}
									lineD={graph.d}
									strokeColor={graph.color}
								/>
						) }
						{/* <NvcTimeseriesChartLineover margins={margins} uniqueChartID='cashflowprojectionchart' /> */}
						<NvcTimeseriesPopoverDetector
							// see NvcTimeseriesPopover for the rendering.
							axisH={calc.axisH}
							axisW={calc.axisW}
							windowScrollYDuringCalc={calc.windowScrollYDuringCalc}
							rect={calc.rect}
							getDataPoints={(idx) => {
								const xCoord = calc.xScale.domain()[idx]
								return {
									x: `Month ${xCoord}`,
									xStart: calc.xScale(xCoord) ?? undefined,
									graphs: calc.graphs.map((g) => ({
										name: g.name,
										y: g.data[idx],
										color: g.color
									}))
								}
							}}
							xScale={calc.xScale}
							uniqueChartID='cashflowprojectionchart'
							margins={margins}
						/>

					</>
					: null
			}
		</svg>

		<NvcTimeseriesChartPopover
			uniqueChartID='cashflowprojectionchart'
			formatYTicks={(y) => y === 0 ? '-' : fmt.money(y, 0, ',', '.')}
		/>
		<ColourLegend
			legend={[
				{ name: 'Setup', color: '#91E0EF' },
				{ name: 'Management Fee', color: '#A6C7FF' },
				{ name: 'Performance Fee', color: '#7784d3' },
				{ name: 'Sponsor cum. cash flow (RHS)', color: '#3c86f7' }
			]}
		/>
	</>
}


