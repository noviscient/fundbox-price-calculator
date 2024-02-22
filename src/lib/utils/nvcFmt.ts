import type { NvcYTicksMetadata } from 'lib/nv-charter/nvcCalc'

const sign = (val: number) => val < 0 ? '-' : ''

export type NvcTickFormatter = tickFmt.LinearFmtFn
export namespace tickFmt {
	const maxYPlaceMapper = { '1000': 'k', '1000000': 'M', '1': '', '1000000000': 'B' } as const
	export const currencyStandardisedAcrossAxis1DP: NvcTickFormatter = (y, meta) => {
		const absVal = Math.abs(y / meta.maxYPlace).toFixed(1)
		return `${ sign(y) }$${ absVal }${ maxYPlaceMapper[meta.maxYPlace] }`
	}

	export const standardisedMultiplierSuffix1DP: NvcTickFormatter = (y, meta) => {
		const absVal = Math.abs(y / meta.maxYPlace).toFixed(1)
		return `${ sign(y) }$${ absVal }${ maxYPlaceMapper[meta.maxYPlace] }`
	}

	export const standardisedMultiplierSuffix0DP: NvcTickFormatter = (y, meta) => {
		const absVal = Math.abs(y / meta.maxYPlace).toFixed(0)
		return `${ sign(y) }$${ absVal }${ maxYPlaceMapper[meta.maxYPlace] }`
	}

	

	// export const separatorWithoutDecimals: NvcTickFormatter = (y, meta) => legacySepWODecimals(y)

	export type LinearFmtFn = (y: number, meta: NvcYTicksMetadata) => string
	export type BandFmtFn = (b: string) => string
}
