import { calculator } from '../../calculator'
import { fmt } from '../../utils/fmt'
import { SimpleRow } from '../components/ResultTable'
import { Title } from '../components/Title'

export const FeesPaidToNoviscientAndManagerSection: React.FC<{ results: calculator.Results }> = ({ results }) => {

	return <>
		<Title>Fees paid to manager</Title>
		<SimpleRow label='Fee paid to manager' value={fmt.money(results.fees.feesPaidToManagerDec)} />
		<div className='bg-[#ebeff5] h-px w-full' />
		<SimpleRow label='Manager share of fees' value={fmt.percent(results.fees.feesPaidToManagerDec / results.fees.totalFeeDec)} />

		<div className='h-[100px] shrink-0' />
		<Title>Fees</Title>
		<SimpleRow label='Minimum Annual Noviscient fee' value={fmt.money(results.fees.serviceFeeDec)} />
		<div className='bg-[#ebeff5] h-px w-full' />
		<SimpleRow label='Estimated subfund setup costs' value={fmt.money(results.subfundSetupCosts.total)} />
	</>
}
