import type React from 'react'
import { useEffect, type SVGProps } from 'react'

export type Children = {
	children?: React.ReactNode | React.ReactNode[]
}
export type ClassName = {
	className?: string
}

export const cn = (...classNames: (string | null | undefined)[]): string => (
	classNames.reduce<string>((acc, val) => val ? acc + ' ' + val : acc, '')
)

export const inputSelectAll = (e: React.FocusEvent<HTMLInputElement>) => {
	e.target.setSelectionRange(0, e.target.value.length)
}

export type FReactSetState<T> = React.Dispatch<React.SetStateAction<T>>

type ResolveAttributesFor<E extends HTMLElement> =
	E extends HTMLTableHeaderCellElement ? React.ThHTMLAttributes<E>
	: E extends HTMLTableDataCellElement ? React.TdHTMLAttributes<E>
	: E extends HTMLTableElement ? React.TableHTMLAttributes<E>
	: E extends HTMLLIElement ? React.LiHTMLAttributes<E>
	: E extends HTMLOListElement ? React.OlHTMLAttributes<E>
	: E extends HTMLImageElement ? React.ImgHTMLAttributes<E>
	: E extends HTMLInputElement ? React.InputHTMLAttributes<E>
	: E extends HTMLTextAreaElement ? React.TextareaHTMLAttributes<E>
	: E extends HTMLAnchorElement ? React.AnchorHTMLAttributes<E>
	: React.HTMLAttributes<E>
export type PDOMElement<E extends HTMLElement> = React.DetailedHTMLProps<ResolveAttributesFor<E>, E>
export type RCFwdDOMElement<E extends HTMLElement, Extension = object> = React.FC<PDOMElement<E> & Extension>
export type RCFwdSVGElement = React.FC<SVGProps<SVGSVGElement>>

export const useBackButtonHandler = (onBack: () => void) => {
	useEffect(() => {
		const handler = (e: PopStateEvent) => {
			e.preventDefault()
			onBack()
		}
		window.addEventListener('popstate', handler)
		return () => window.removeEventListener('popstate', handler)
	}, [onBack])
}
