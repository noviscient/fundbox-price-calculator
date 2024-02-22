import clsx from 'clsx'
import { type RCFwdDOMElement } from '../utils/react-ext'

export const Card: RCFwdDOMElement<HTMLDivElement> = (props) => {

	return <div
		{...props}
		className={clsx(
			'ring-[8px] ring-neutral-0/50',
			'bg-neutral-0',
			'shadow-[0px_12.057px_60.287px_0px_rgba(58,86,143,0.08)]',
			'p-[32px]',
			'rounded-[16px]',
			props.className
		)}
	/>
}