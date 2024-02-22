import { RCFwdDOMElement, cn } from '../../utils/react-ext'

export const Title: RCFwdDOMElement<HTMLDivElement> = (props) => {
	return <div {...props} className={cn('mb-4 font-semibold text-H16 text-neutral-13', props.className)} />
}