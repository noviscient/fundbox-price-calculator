import { motion } from 'framer-motion'
import { fmt } from '../../utils/fmt'
import { Children, RCFwdDOMElement, cn } from '../../utils/react-ext'
import { useIsContainerHorizontallyScrolled } from './useHorizontalScrolledListener'

export const TD: RCFwdDOMElement<HTMLTableCellElement, { value?: string | number, dark?: boolean, light?: boolean, allowWrap?: boolean, sticky?: boolean, listenToHorizontalScroll?: string }> = ({ value, dark, light, allowWrap, sticky, listenToHorizontalScroll, ...props }) => {
	const valType = typeof value
	const displayVal = valType === 'string' ? value : valType === 'number' ? fmt.money(value as number) : props.children

	return <td
		{...props}
		className={cn(
			allowWrap ? '' : 'whitespace-nowrap',
			'py-4 font-base text-H14 px-[15px] first:text-left text-right first:pl-0 last:pr-0 text-neutral-10',
			dark ? 'text-neutral-13' : light ? 'text-neutral-6' : 'text-neutral-10',
			sticky ? 'sticky left-0 bg-neutral-0' : '',
			props.className
		)}
	>
		{ displayVal }
		{ (sticky && listenToHorizontalScroll) && <HorizontalScrollBorderApplier instanceID={listenToHorizontalScroll} /> }
	</td>
}

const HorizontalScrollBorderApplier: React.FC<{ instanceID: string }> = ({ instanceID }) => {
	const isScrolled = useIsContainerHorizontallyScrolled(instanceID)
	return <motion.span
		animate={{ opacity: isScrolled ? 1 : 0 }}
		transition={{ ease: 'easeOut', duration: 0.3 }}
		key='divl-29'
		className='absolute top-0 right-0 w-px h-full bg-neutral-3'
	/>
}
/** `light` by default */
export const TH: RCFwdDOMElement<HTMLTableCellElement, { value?: string | number, dark?: boolean, light?: boolean, sticky?: boolean }> = ({ value, dark, light = true, sticky, ...props }) => {
	const valType = typeof value
	const displayVal = valType === 'string' ? value : valType === 'number' ? fmt.money(value as number) : props.children
	return <th
		{...props}
		className={cn(
			'py-2 font-medium text-H10 uppercase px-[15px] first:text-left text-right first:pl-0 last:pr-0 whitespace-nowrap',
			dark ? 'text-neutral-13' : light ? 'text-neutral-6' : 'text-neutral-10',
			sticky ? 'sticky left-0 bg-neutral-0' : '',
			props.className
		)}
		children={displayVal}
	/>
}
export const TR: RCFwdDOMElement<HTMLTableRowElement> = (props) => {
	return <tr {...props} className={cn('border-b border-neutral-3 last:border-b-0', props.className)} />
}

export const Table: React.FC<{ className?: string, fullWidth?: boolean, noAutoTBody?: boolean } & Children> = ({ className, fullWidth = true, noAutoTBody, children }) => {
	return <table className={cn('border-collapse', fullWidth ? 'w-full' : '', className)}>
		{ noAutoTBody ? children : <tbody>
			{ children }
		</tbody> }
	</table>
}