import { calculator } from '../../calculator'
import { fmt } from '../../utils/fmt'
import { SimpleRow } from '../components/ResultTable'

export const ResultsIntroductionSection: React.FC<{ results: calculator.Results }> = ({ results }) => {
	return <>
		<div className='mb-4 font-semibold text-H16 text-neutral-13'>Fund Cash Flows (Sub-Fund)</div>
		{/* <div className='bg-[#ebeff5] h-px w-full' /> */}
		<SimpleRow label='Gross dollar return' value={fmt.money(results.estimatedReturn)} />
		<div className='bg-[#ebeff5] h-px w-full' />
		<SimpleRow label='Management fee' value={fmt.money(results.fees.managementFeeDec)} />
		<div className='bg-[#ebeff5] h-px w-full' />
		<SimpleRow label='Performance fee' value={fmt.money(results.fees.performanceFeeDec)} />
		<div className='bg-[#ebeff5] h-px w-full' />
		<SimpleRow label='Total fees' value={fmt.money(results.fees.totalFeeDec)} />
		{/* <div className='bg-[#ebeff5] h-px w-full' /> */}
	</>
}
