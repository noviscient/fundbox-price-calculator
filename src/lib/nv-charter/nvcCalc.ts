import { bisect, extent } from 'd3-array'
import { ScaleBand, ScaleLinear } from 'd3-scale'
import { Line, line } from 'd3-shape'
import isValid from 'date-fns/isValid'
import parse from 'date-fns/parse'
import sub from 'date-fns/sub'
import { RUseNvColorRegister } from 'lib/color-register/useNvColorRegister'
import { NvcMargins } from './commonSpecs'

const today = new Date()

export type GenericGraph = {
  x: string[],
  graphs: GraphItem[],
}

export type GraphItem = {
  data: number[],
  /**
   * Name
   * @minLength 1
   */
  name: string,
}

export type NvcYTicksMetadata = { maxYPlace: 1 | 1_000 | 1_000_000 | 1_000_000_000 }
export namespace nvcCalc {

	export const getLinearScaleMetadata = (yScale: ScaleLinear<number, number, never>): NvcYTicksMetadata => {
		const max = Math.max(...yScale.domain().map((val) => Math.abs(val)), 1)
		if (max >= 1_000_000_000) return { maxYPlace: 1_000_000_000 }
		else if (max >= 1_000_000) return { maxYPlace: 1_000_000 }
		else if (max >= 1_000) return { maxYPlace: 1_000 }
		else return { maxYPlace: 1 }
	}

	export const axisSize = (rect: DOMRect, margins: NvcMargins): { axisH: number, axisW: number } => ({
		axisH: rect.height - margins.top - margins.bottom,
		axisW: rect.width - margins.left - margins.right
	})
	// export const nvcCalcAxisSize = axisSize

	export const lineProps = <DatumType = [number, number]>(
		name: string,
		cr: RUseNvColorRegister,
		xResolver: Parameters<typeof line<DatumType>>[0],
		yResolver: Parameters<typeof line<DatumType>>[0],
		data: DatumType[]
	) => {
		const lineCalc = line(xResolver, yResolver)
		const color = cr.getOrAllocateFor(name)
		return { name, color, line: lineCalc, lineD: lineCalc(data) }
	}

	export type RLinePropsWithXFinder<DatumType = [number, number]> = {
		name: string,
		color: string,
		line: Line<DatumType>,
		lineD: string | null,
		xFinderList: number[],
		xListFinder: (valToFindNearest: number) => { index: number },
		hasData: boolean
	}

	export const produceGenericGraphLineProps = (
		gg: GenericGraph,
		cr: RUseNvColorRegister,
		xScale: ScaleBand<string>,
		yScale: ScaleLinear<number, number, never>,
		yAltAxis?: { scale: ScaleLinear<number, number, never>, fields: Set<string> },
		primaryKey?: string,
		barSeriesName?: string
	) => {
		const lineCalc = line<number>(
			(_d, i) => xScale(gg.x[i]) ?? 0,
			(d) => yScale(d)
		)
		const yAltLineCalc = yAltAxis ? line<number>(
			(_d, i) => xScale(gg.x[i]) ?? 0,
			(d) => yAltAxis.scale(d)
		) : lineCalc

		const crAllocatedNames = new Set<string>()
		let anyLineHasData = false
		const lines = gg.graphs.map((graph) => {
			const name = graph.name
			const color = cr.getOrAllocateFor(name, 1, primaryKey && primaryKey === name ? [85, 102, 186] : undefined)
			crAllocatedNames.add(name)

			let dataStartIdxIfNot0: number | null = null
			let dataEndIdxFromEndIfNotLast: number | null = null
			if (graph.data.at(0) === null) {
				const firstIdxWData = graph.data.findIndex((val) => typeof val === 'number')
				if (firstIdxWData !== -1) dataStartIdxIfNot0 = firstIdxWData
			}
			if (graph.data.at(-1) === null) {
				const lastIdxWData = [...graph.data].reverse().findIndex((val) => typeof val === 'number')
				if (lastIdxWData !== -1) dataEndIdxFromEndIfNotLast = lastIdxWData
				// if 3rd last item has data, lastIdxWData = 2.
			}
			let currLineCalc = yAltAxis?.fields.has(name) ? yAltLineCalc : lineCalc
			if (dataStartIdxIfNot0 !== null) {
				currLineCalc = yAltAxis?.fields.has(name)
					? line(
						(_, i) => xScale(gg.x[i + (dataStartIdxIfNot0 ?? 0)]) ?? 0,
						(d) => yAltAxis.scale(d)
					)
					: line(
						(_, i) => xScale(gg.x[i + (dataStartIdxIfNot0 ?? 0)]) ?? 0,
						(d) => yScale(d)
					)
			}

			const dataSlice = graph.data.slice(dataStartIdxIfNot0 ?? 0, dataEndIdxFromEndIfNotLast === null ? undefined : (-(dataEndIdxFromEndIfNotLast + 1)))
			let lineD = currLineCalc(dataSlice)
			
			// if there is only 1 dot, the dot is not drawn, d3 only moves to the spot.
			if (lineD && graph.data.length === 1) lineD = (lineD.slice(0, -1) + 'm-1,0 h2Z') // remove Z at the end, add 1 pixel of width to the right
			const hasData = Boolean(lineD && (graph.data.length > 0))
			anyLineHasData ||= hasData
			const isBar = barSeriesName === name
			return { name, color, lineD, hasData, data: graph.data, isBar }
		})

		return { lines, lineCalc, yAltLineCalc, crAllocatedNames, anyLineHasData }
	}
	export const linePropsWithXFinder = <DatumType = [number, number]> (
		name: string,
		cr: RUseNvColorRegister,
		xResolver: Parameters<typeof line<DatumType>>[0],
		yResolver: Parameters<typeof line<DatumType>>[0],
		data: DatumType[],
		xFinderStatGeneratorOrList: ((datum: DatumType) => number) | number[]
	): RLinePropsWithXFinder<DatumType> => {
		const lineCalc: Line<DatumType> = line<DatumType>(xResolver, yResolver)
		const color = cr.getOrAllocateFor(name)
		const xFinderList = Array.isArray(xFinderStatGeneratorOrList) ? xFinderStatGeneratorOrList : data.map(xFinderStatGeneratorOrList)
		const xListFinder = (valToFindNearest: number) => {
			const index = bisect(xFinderList, valToFindNearest)
			return { index }
		}
		return { name, color, line: lineCalc, lineD: lineCalc(data), xFinderList, xListFinder, hasData: data.length > 0 }
	}

	/** auto perform inversion */
	export const yAxisExtentMapped = <T>(y: T[], accessor: (val: T) => number, opts?: { fallback?: [number, number], allowYMinMoreThan0?: boolean }): [number, number] => {
		const fallback = opts?.fallback ?? [0, 1]

		const [min, max] = extent(y, accessor)
		if (typeof min === 'number' && typeof max === 'number') return [max, (opts?.allowYMinMoreThan0 ? min : Math.min(min, 0))]
		return fallback.reverse() as [number, number]
	}
	/** auto perform inversion */
	export const yAxisExtent = (y: number[], fallback: [number, number] = [0, 1]): [number, number] => {
		const [min, max] = extent(y)
		if (typeof min === 'number' && typeof max === 'number') return [max, min]
		return fallback.reverse() as [number, number]
	}

	export const xAxisYYYYMMDDExtent = (x: string[]): [Date, Date] => {
		if (x.length >= 1) {
			const first = x.at(0)
			const last = x.at(-1)
			if (first && last) {
				const firstDate = parse(first.split(' ')[0], 'yyyy-MM-dd', today)
				const lastDate = parse(last.split(' ')[0], 'yyyy-MM-dd', today)
				if (isValid(firstDate) && isValid(lastDate)) return [firstDate, lastDate]
			}
			console.warn('@xAxisYYYYMMDDExtent: invalid x values', first, last)
		}
		const todayCloned = new Date()
		const yearAgo = sub(todayCloned, { years: 1 })
		return [yearAgo, todayCloned] // clone
	}

	export const bandScalePaddingForFixedLength = (
		availSpacePx: number,
		numItems: number,
		eachItemDesiredWidth: number,
		desiredOuterPaddingEachSide: number
	) => {
		const totalOuterPadding = 2 * desiredOuterPaddingEachSide
		const outer = totalOuterPadding / availSpacePx

		const totalInnerSpace = availSpacePx - outer
		const desiredUsedSpace = eachItemDesiredWidth * numItems
		const innerUnusedSpaceRatio = (totalInnerSpace - desiredUsedSpace) / totalInnerSpace
		return {
			inner: innerUnusedSpaceRatio,
			outer
		}
	}

	/** returns `string[]` because that's easier to consume. `yScale(band)` to get tick offset. */
	export const getRenderXTicksForTimeseriesBands = (bands: string[], axisW: number, minTickSpace = 60): string[] => {
		// always include first band
		const numBands = bands.length
		const spacePerBand = axisW / numBands
		if (spacePerBand > minTickSpace) return [...bands]

		const maxNumBands = Math.floor(axisW / minTickSpace)
		const displayEveryNBands = Math.floor(numBands / maxNumBands)
		return bands.filter((_band, idx) => idx % displayEveryNBands === 0)
	}
}
export const nvcCalcAxisSize = nvcCalc.axisSize