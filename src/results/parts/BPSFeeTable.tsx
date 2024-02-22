import { calculator } from 'calculator'
import { fmt } from 'utils/fmt'
import { TD, TR, Table } from '../components/Td'
import { Title } from '../components/Title'

export const BPSFeeTable: React.FC<{ results: calculator.Results }> = ({ results }) => {

	return <>
		<Title>Noviscient Fees Scale Down as AUM Grows</Title>
		<Table fullWidth>
			<TR>
				<TD>Fund AUM (min)</TD>
				{ results.cumulPricingTiers.map((tier, idx) => <TD key={`${idx}_${tier.minDec}`}>{fmt.money(tier.minDec, 0, ',')}</TD>) }
			</TR>
			<TR>
				<TD>Fund AUM (max)</TD>
				{ results.cumulPricingTiers.map((tier, idx) => <TD key={`${idx}_${tier.maxDec}`}>{fmt.money(tier.maxDec, 0, ',')}</TD>) }
			</TR>
			<TR>
				<TD>Noviscient (bps)</TD>
				{ results.cumulPricingTiers.map((tier, idx) => <TD key={`${idx}_${tier.bpsDec}`}>{ tier.bpsDec }</TD>) }
			</TR>
		</Table>
	</>
}
