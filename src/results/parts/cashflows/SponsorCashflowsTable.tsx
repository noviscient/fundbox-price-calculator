import { calculator } from '../../../calculator'
import { fmt } from '../../../utils/fmt'
import { TD, TH, TR, Table } from '../../components/Td'
import { Title } from '../../components/Title'
import { useIsContainerHorizontallyScrolledSetter } from '../../components/useHorizontalScrolledListener'

const _horizontalScrollAtomID = 'sponsor-cashflows-table' as const

export const SponsorCashflowsTable: React.FC<{ results: calculator.Results }> = ({ results }) => {

	const { ref } = useIsContainerHorizontallyScrolledSetter(_horizontalScrollAtomID)

	return <>
		<Title>Cash Flows to Sponsor</Title>
		<div ref={ref} className='w-full overflow-x-auto overflow-y-hidden nvs-scrollbars'>
			<Table fullWidth={false} noAutoTBody>
				<thead>
					<TR>
						<TH sticky />
						{ [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((mthNum) => <TH key={mthNum}>{mthNum} M</TH>) }
						<TH>Total</TH>
					</TR>
				</thead>
				<tbody>
					<TR>
						<TD sticky listenToHorizontalScroll={_horizontalScrollAtomID}>Setup</TD>
						{ results.cashflows.sponsorSetup.map((fee, idx) => <TD key={`${idx}_${fee}`}>{fmt.money(fee)}</TD>) }
					</TR>
					<TR>
						<TD sticky listenToHorizontalScroll={_horizontalScrollAtomID}>Management Fee</TD>
						{ results.cashflows.sponsorManagementFee.map((fee, idx) => <TD key={`${idx}_${fee}`}>{fee ? fmt.money(fee) : '—'}</TD>) }
					</TR>
					<TR>
						<TD sticky listenToHorizontalScroll={_horizontalScrollAtomID}>Performance Fee</TD>
						{ results.cashflows.sponsorPerformanceFee.map((fee, idx) => <TD key={`${idx}_${fee}`}>{fee ? fmt.money(fee) : '—'}</TD>) }
					</TR>
					<TR>
						<TD sticky allowWrap listenToHorizontalScroll={_horizontalScrollAtomID}>Sponsor cum. cash flow (RHS)</TD>
						{ results.cashflows.sponsorCashFlow.map((fee, idx) => <TD key={`${idx}_${fee}`}>{fee ? fmt.money(fee) : '—'}</TD>) }
					</TR>
				</tbody>
			</Table>
		</div>
	</>
}
