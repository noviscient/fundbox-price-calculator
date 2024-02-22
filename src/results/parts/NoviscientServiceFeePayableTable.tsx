import { calculator } from '../../calculator'
import { fmt } from '../../utils/fmt'
import { DivTD } from '../components/DivTD'
import { Title } from '../components/Title'

export const NoviscientServiceFeePayableTable: React.FC<{ results: calculator.Results }> = ({ results }) => {

	// rendering uses a serious hack because tables cannot be made to look like this with CSS with first item aligned left and rest aligned right. There would be a lot of extra space between the first and second item.
	return <>
		<Title>Service Fee paid to Noviscient</Title>
		<div className='relative flex items-start justify-between'>
			<div className='w-full h-px bg-neutral-3 absolute top-[52px] left-0' />
			{ results.fees.serviceFeeBreakdown.map((tier, i) => (
				<div
					key={tier.bpsDec.toString()}
					className='text-right'
				>
					<DivTD className={i === 0 ? 'text-left' : 'text-right'}>{ tier.bpsDec.toFixed(1) }</DivTD>
					<DivTD className={i === 0 ? 'text-left' : 'text-right'}>{ tier.amtDec ? fmt.money(tier.amtDec) : '—' }</DivTD>
				</div>
			)) }
		</div>
	</>
}
