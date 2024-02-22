import { fmt } from '../../utils/fmt'
import { RCFwdDOMElement, cn } from '../../utils/react-ext'

export const DivTR: RCFwdDOMElement<HTMLDivElement> = (props) => {
	return <div {...props} className={cn('border-b border-neutral-3 last:border-b-0 flex items-start justify-between', props.className)} />
}

export const DivTD: RCFwdDOMElement<HTMLDivElement, { value?: string | number, dark?: boolean, light?: boolean }> = ({ value, dark, light, ...props }) => {
	const valType = typeof value
	const displayVal = valType === 'string' ? value : valType === 'number' ? fmt.money(value as number) : props.children
	return <div
		{...props}
		className={cn(
			'py-4 font-base text-H14 text-neutral-10 whitespace-nowrap',
			dark ? 'text-neutral-13' : light ? 'text-neutral-6' : 'text-neutral-10',
			props.className
		)}
		children={displayVal}
	/>
}