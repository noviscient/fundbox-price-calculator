import React, { useEffect, useRef } from 'react'

export const NvPopoverDetectorDiv: React.FC<{
	className?: string,
	style?: React.CSSProperties,
	onDetect (coords: { mouseLocal: { x: number, y: number }, mouseOnClient: { x: number, y: number } }, ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void,
	onMouseOut?(ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void,
	margins?: { top: number }
}> = ({ onDetect, className, style, margins, onMouseOut }) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const rectRef = useRef<{ atScrollY: number, rect: DOMRect } | null>(null)

	useEffect(() => {
		if (ref.current) {
			rectRef.current = { rect: ref.current.getBoundingClientRect(), atScrollY: window.scrollY }
			const lis = () => {
				if (ref.current) rectRef.current = { rect: ref.current.getBoundingClientRect(), atScrollY: window.scrollY }
			}
			ref.current.addEventListener('resize', lis)
			return () => ref.current?.removeEventListener('resize', lis)
		}
	}, [ref.current])

	return <div
		ref={ref}
		className={className}
		style={style}
		onMouseOut={onMouseOut}
		onMouseMove={(ev) => {
			if (rectRef.current) {
				const mouseY =
					ev.clientY
					- rectRef.current.rect.y
					- rectRef.current.atScrollY
					+ window.scrollY
					- (margins?.top ?? 0)

				onDetect({
					mouseOnClient: {
						x: ev.clientX,
						y: ev.clientY
					},
					mouseLocal: {
						x: ev.pageX - rectRef.current.rect.x,
						y: mouseY
					},
				}, ev)
			}
		}}
	/>
}

export const NvPopoverDetectorRect: React.FC<{
	className?: string,
	style?: React.CSSProperties,
	onDetect (coords: { mouseLocal: { x: number, y: number }, mouseOnClient: { x: number, y: number } }, ev: React.MouseEvent<SVGRectElement, MouseEvent>): void,
	onMouseOut?(ev: React.MouseEvent<SVGRectElement, MouseEvent>): void,
	margins?: { top: number },
	width?: number,
	height?: number,
	x?: number,
	y?: number
}> = ({ onDetect, className, style, margins, onMouseOut, width, height, x, y }) => {
	const ref = useRef<SVGRectElement | null>(null)
	const rectRef = useRef<{ atScrollY: number, rect: DOMRect } | null>(null)

	useEffect(() => {
		if (ref.current) {
			rectRef.current = { rect: ref.current.getBoundingClientRect(), atScrollY: window.scrollY }
			const lis = () => {
				if (ref.current) rectRef.current = { rect: ref.current.getBoundingClientRect(), atScrollY: window.scrollY }
			}
			ref.current.addEventListener('resize', lis)
			return () => ref.current?.removeEventListener('resize', lis)
		}
	}, [ref.current])

	return <rect
		ref={ref}
		className={className}
		style={style}
		width={width}
		height={height}
		x={x}
		y={y}
		fill='transparent'
		onMouseOut={onMouseOut}
		onMouseMove={(ev) => {
			if (rectRef.current) {
				const mouseY =
					ev.clientY
					- rectRef.current.rect.y
					- rectRef.current.atScrollY
					+ window.scrollY
					- (margins?.top ?? 0)

				onDetect({
					mouseOnClient: {
						x: ev.clientX,
						y: ev.clientY
					},
					mouseLocal: {
						x: ev.pageX - rectRef.current.rect.x,
						y: mouseY
					},
				}, ev)
			}
		}}
	/>
}
