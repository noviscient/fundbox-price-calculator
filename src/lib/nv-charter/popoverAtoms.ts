import { atomFamily } from 'recoil'

export type NvcTimeseriesChartPopoverState =
	| null
	| {
		pos: {
			xOrig: number,
			chartHeight: number,
			chartPageTop: number,
			chartPageRight: number
		}
		data: {
			x: Date | string,
			xStart?: number,
			graphs: {
				name: string | null,
				y: number,
				color?: string
			}[]
		},
		mouse: {
			x: number,
			y: number
		}
	}
export const nvcTimeseriesChartPopoverStateAtom = atomFamily<NvcTimeseriesChartPopoverState | null, string>({
	key: 'nvcTimeseriesChartPopoverStateAtom',
	default: (_key) => null,
})

export type NvcDMRChartPopoverState =
	| {
		pos: {
			xOrig: number,
			chartHeight: number,
			chartPageTop: number,
			chartPageRight: number
		},
		data: {
			xFromOrig: number | undefined,
			xFrom: number | null,
			xWidthOrig: number,
			xTo: number | null,
			items: {
				y: number,
				name: string,
			}[]
		},
		mouse: {
			x: number,
			y: number
		}
	}

export const nvcDMRChartPopoverStateAtom = atomFamily<NvcDMRChartPopoverState | null, string>({
	key: 'nvcDMRChartPopoverStateAtom',
	default: (_key) => null,
})

export type NvcFactorExposuresPopoverState =
	| null
	| {
		pos: {
			xOrig: number,
			chartWidth: number,
			chartPageTop: number,
			chartPageRight: number
		},
		mouse: {
			x: number,
			y: number
		},
		data: {
			yStartOrig: number | undefined,
			yBandwidth: number,
			item: {
				name: string,
				value: string
			}
		},
	}

export const nvcFactorExposuresPopoverStateAtom = atomFamily<NvcFactorExposuresPopoverState | null, string>({
	key: 'nvcFactorExposuresPopoverStateAtom',
	default: (_key) => null,
})

export type NvcWorstMonthsPopoverStateAtomState = {
	pos: {
		xOrig: number,
		xWidth: number,
		xIndex: number,
		chartClientTop: number,
		chartClientLeft: number,
		mouseTop: number,
		mouseLeft: number
	},
	itemIndex: number,
	coordData: { date: string, items: { name: string, value: number }[] }
}

export const nvcWorstMonthsPopoverStateAtom = atomFamily<NvcWorstMonthsPopoverStateAtomState | null, string>({
	default: null,
	key: 'nvcWorstMonthsPopoverStateAtom',
})
