import { RUseNvColorRegister, useNvColorRegister } from 'lib/color-register/useNvColorRegister'
import { useEffect, useRef, useState } from 'react'
import { NvcMargins } from './commonSpecs'

export type FCalcRenderPropsFn<P = {}, R = any> = (rect: DOMRect, props: P, cr: RUseNvColorRegister, margins: NvcMargins) => R

export const useCalcState = <P extends object, F extends FCalcRenderPropsFn<P>, CRKey extends string | null>(calcRenderPropsFn: F, data: P, colorRegisterKey: CRKey, margins: NvcMargins, rerenderPing?: number) => {

	const ref = useRef<SVGSVGElement | null>(null)
	const isInit = useRef<boolean>(true)
	const [calc, setCalc] = useState<ReturnType<typeof calcRenderPropsFn> | null>(null)

	const cr = useNvColorRegister(colorRegisterKey ?? '')

	useEffect(() => {
		if (ref.current && data) {
			if (isInit.current) {
				isInit.current = false
				setTimeout(() => {
					ref.current && setCalc(calcRenderPropsFn(ref.current!.getBoundingClientRect(), data, cr, margins))
				}, 500)
			} else {
				setCalc(calcRenderPropsFn(ref.current!.getBoundingClientRect(), data, cr, margins))
			}
		}
	}, [rerenderPing, data, ref.current])

	useEffect(() => {
		if (data && ref.current) {
			const lis = () => ref.current && setCalc(calcRenderPropsFn(ref.current!.getBoundingClientRect(), data, cr, margins))
			window.addEventListener('resize', lis)
			return () => window.removeEventListener('resize', lis)
		}
	}, [rerenderPing, data, ref.current])

	return { ref, calc }
}

export default useCalcState

export const useCalcStateWithDivRef = <P extends object, F extends FCalcRenderPropsFn<P>, CRKey extends string | null> (calcRenderPropsFn: F, data: P, colorRegisterKey: CRKey, margins: NvcMargins, rerenderPing?: number) => {

	const ref = useRef<HTMLDivElement | null>(null)
	const isInit = useRef<boolean>(true)
	const [calc, setCalc] = useState<ReturnType<typeof calcRenderPropsFn> | null>(null)

	const cr = useNvColorRegister(colorRegisterKey ?? '')

	useEffect(() => {
		if (ref.current && data) {
			if (isInit.current) {
				isInit.current = false
				setTimeout(() => {
					ref.current && setCalc(calcRenderPropsFn(ref.current!.getBoundingClientRect(), data, cr, margins))
				}, 500)
			} else {
				setCalc(calcRenderPropsFn(ref.current!.getBoundingClientRect(), data, cr, margins))
			}
		}
	}, [rerenderPing, data, ref.current])

	return { ref, calc }
}
