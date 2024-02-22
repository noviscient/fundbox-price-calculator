import { calculator } from '../../../calculator'
import { fmt } from '../../../utils/fmt'
import { TD, TH, TR, Table } from '../../components/Td'
import { Title } from '../../components/Title'
import { useIsContainerHorizontallyScrolledSetter } from '../../components/useHorizontalScrolledListener'

const _horizontalScrollAtomID = 'noviscient-cashflows-table' as const

export const NoviscientCashflowsTable: React.FC<{ results: calculator.Results }> = ({ results }) => {

	const { ref } = useIsContainerHorizontallyScrolledSetter(_horizontalScrollAtomID)

	return <>
		<Title>Cash Flows to Noviscient</Title>
		<div className='w-full overflow-x-auto overflow-y-hidden nvs-scrollbars' ref={ref}>
			<Table fullWidth={false} noAutoTBody>
				<thead>
					<TR>
						<TH sticky />
						{ [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((mthNum) => <TH key={mthNum}>{ mthNum } Month</TH>) }
						<TH>Total</TH>
					</TR>
				</thead>
				<tbody>
					<TR>
						<TD sticky listenToHorizontalScroll={_horizontalScrollAtomID}>Noviscient</TD>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, '-'].map((key, idx) => <TD key={`${idx}_${key}`}>—</TD>)}
					</TR>
					<TR>
						<TD sticky listenToHorizontalScroll={_horizontalScrollAtomID}>Fees</TD>
						{results.cashflows.noviscientFees.map((fee, idx) => <TD key={`${idx}_${fee}`}>{ fmt.money(fee) }</TD>)}
					</TR>
				</tbody>
			</Table>
		</div>
	</>
}
