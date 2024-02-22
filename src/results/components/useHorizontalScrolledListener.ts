import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { useEffect, useRef } from 'react'

const horizontalScrollListenerStateAtom = atomFamily((_id: string) => atom(false))

export const useIsContainerHorizontallyScrolled = (id: string) => {
	return useAtomValue(horizontalScrollListenerStateAtom(id))
}

export const useIsContainerHorizontallyScrolledSetter = (id: string) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const setIsScrolled = useSetAtom(horizontalScrollListenerStateAtom(id))

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current
		if (!scrollContainer) return

		const handleScroll = () => {
			const { scrollLeft } = scrollContainer
			const isScrolled = scrollLeft > 0
			setIsScrolled(isScrolled)
		}

		scrollContainer.addEventListener('scroll', handleScroll)
		return () => {
			scrollContainer.removeEventListener('scroll', handleScroll)
		}
	}, [scrollContainerRef.current])

	return { ref: scrollContainerRef }
}
