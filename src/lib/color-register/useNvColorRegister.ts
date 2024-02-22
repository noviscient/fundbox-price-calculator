import { useCallback, useEffect, useMemo } from 'react'
import { atomFamily, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { getRecoil, setRecoil } from 'recoil-nexus'

export type NvRGB = [number, number, number]

/** do not use; for default allocation. */
const defaultColoursTemplate: readonly NvRGB[] = [
	[67, 161, 183],
	[107, 213, 208],
	[96, 70, 226],
	[174, 79, 226],
	[231, 141, 240],
	[39, 163, 50],
	[127, 249, 95],
	[141, 183, 66],
	[183, 163, 0],
	[191, 115, 21],
	[76, 100, 102],
]

const defaultColours: {
	template: NvRGB[],
	allocatables: {
		[colorRegisterID: string]: NvRGB[]
	},
	onReset: (colorRegisterID: string) => void,
	allocateFor: (colorRegisterID: string) => NvRGB | undefined
} = {
	template: [...defaultColoursTemplate],
	allocatables: {},
	onReset(colorRegisterID: string) {
		this.allocatables[colorRegisterID] = [...defaultColoursTemplate]
	},
	allocateFor(colorRegisterID) {
		if (!this.allocatables[colorRegisterID]) this.allocatables[colorRegisterID] = [...defaultColoursTemplate]
		return this.allocatables[colorRegisterID].shift()
	},
}

export const makeColour = (rgb: NvRGB, rgbaOpacity = 1): string =>
	`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgbaOpacity})`

export type NvColourRegister = {
	allocations: { [keyID: string]: NvRGB | undefined }
}

/** Generates a number between 40 and 150. Not 0 ~ 255 in order to ensure that the colours used are... visible. */
const genRandomRGBNumber = (): number => {
	// 41 ~ 190
	return Math.round(Math.random() * 150) + 20
}

// use recoil so that state object is isolated, and does not cause re-renders throughout the component tree unlike React.Context
export const colorRegisterAtomFamily = atomFamily({
	key: 'colorRegister',
	default: <NvColourRegister>{
		allocations: {},
	},
})

export const useNvColorRegisterValues = (locationKey: string) => {
	const map = useRecoilValue(colorRegisterAtomFamily(locationKey))
	const getFor = (key: string, opacity = 1, fallback?: string): string => {
		const existing = map.allocations[key]
		if (existing) return makeColour(existing, opacity)

		return fallback ?? makeColour([124, 134, 152], opacity)
	}
	const result = useMemo(() => {
		return {
			map,
			list: Object.entries(map.allocations).map(([keyID, color]) => ({ keyID, color })),
			getFor
		}
	}, [map])

	return result
}

const isValidRGBInput = (userInput: NvRGB | null) => {
	if (userInput) {
		const [r, g, b] = userInput
		if (
			typeof r === 'number' &&
      r >= 0 &&
      r < 256 &&
      typeof g === 'number' &&
      g >= 0 &&
      g < 256 &&
      typeof b === 'number' &&
      b >= 0 &&
      b < 256
		) {
			return userInput
		}
		return null
	}
	return null
}

export const allocateColorFromRegister = (colorRegisterID: string, key: string, opacity = 1): string => {
	const color = defaultColours.allocateFor(colorRegisterID) ?? [
		genRandomRGBNumber(),
		genRandomRGBNumber(),
		genRandomRGBNumber(),
	]
	setRecoil(colorRegisterAtomFamily(colorRegisterID), (state) => {
		return {
			allocations: {
				...state.allocations,
				[key]: color,
			},
		}
	})
	return makeColour(color, opacity)
}

export const getExistingColorFromRegister = (colorRegisterID: string, key: string, opacity = 1): string => {
	const color = getRecoil(colorRegisterAtomFamily(colorRegisterID)).allocations[key]
	if (color) return makeColour(color, opacity)
	return 'transparent'
}

export type RUseNvColorRegister = {
	getOrAllocateFor: (key: string, opacity?: number, forceSetCustomColour?: NvRGB) => string,
	performReset: () => void,
	allocations: NvColourRegister['allocations'],
	pruneUnused: (keepKeys?: Set<string>) => void
}
export const useNvColorRegister = (
	locationKey: string,
	clearDataOnUnmount?: 'clear_data_on_unmount'
): RUseNvColorRegister => {
	const [colorRegisterState, setColorRegisterState] = useRecoilState(colorRegisterAtomFamily(locationKey))
	const resetRecoilState = useResetRecoilState(colorRegisterAtomFamily(locationKey))
	const performReset = useCallback(() => {
		defaultColours.onReset(locationKey)
		resetRecoilState()
	}, [locationKey])

	useEffect(() => {
		return clearDataOnUnmount ? performReset : () => {}
	}, [performReset])

	const getOrAllocateFor = (key: string, opacity = 1, forceSetCustomColour?: NvRGB): string => {
		if (forceSetCustomColour && isValidRGBInput(forceSetCustomColour)) {
			setColorRegisterState((s) => ({
				allocations: { ...s.allocations, [key]: forceSetCustomColour },
			}))
			return makeColour(forceSetCustomColour, opacity)
		}
		const existing = colorRegisterState.allocations[key]
		if (existing) return makeColour(existing, opacity)

		const nextColour = defaultColours.allocateFor(locationKey) ?? [
			genRandomRGBNumber(),
			genRandomRGBNumber(),
			genRandomRGBNumber(),
		]
		setColorRegisterState((s) => {
			return {
				allocations: { ...s.allocations, [key]: nextColour },
			}
		})
		return makeColour(nextColour, opacity)
	}

	const pruneUnused = (keepKeys?: Set<string>) => {
		if (keepKeys && keepKeys.size > 0) {
			setColorRegisterState((s) => ({
				...s,
				allocations: Object.fromEntries(
					Object.entries(s.allocations).filter(([key, _value]) => (
						keepKeys.has(key)
					))
				)
			}))
		} else {
			setColorRegisterState((_s) => ({ allocations: {} }))
		}
	}

	return { getOrAllocateFor, performReset, allocations: colorRegisterState.allocations, pruneUnused }
}
