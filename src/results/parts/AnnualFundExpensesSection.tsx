import { calculator } from '../../calculator'
import { TD, TH, TR, Table } from '../components/Td'
import { Title } from '../components/Title'

export const AnnualFundExpensesSection: React.FC<{ results: calculator.Results }> = ({ results }) => {

	

	return <>
		<Title>Annual Fund Expenses</Title>
		<Table fullWidth noAutoTBody>
			<thead>
				<TH />
				<TH>Sub-fund</TH>
				<TH>VCC Umbrella</TH>
			</thead>
			<tbody>
				<TR>
					<TD>Fund Admin (monthly NAV)</TD>
					<TD value={results.subFundAnnualExpenses.fundAdmin} />
					<TD value={results.vccUmbrellaAnnualExpenses.fundAdmin} />
				</TR>
				<TR>
					<TD>Audit (annual)</TD>
					<TD value={results.subFundAnnualExpenses.audit} />
					<TD value={results.vccUmbrellaAnnualExpenses.audit} />
				</TR>
				<TR>
					<TD>Legal</TD>
					<TD value={results.subFundAnnualExpenses.legal} />
					<TD value={results.vccUmbrellaAnnualExpenses.legal} />
				</TR>
				<TR>
					<TD>Annual Return Filing (ACRA)</TD>
					<TD value={results.subFundAnnualExpenses.acraReturnFiling} />
					<TD value={results.vccUmbrellaAnnualExpenses.acraReturnFiling} />
				</TR>
				<TR>
					<TD>Risk and trading system fees</TD>
					<TD value={results.subFundAnnualExpenses.riskAndTradingSystemFees} />
					<TD value={results.vccUmbrellaAnnualExpenses.riskAndTradingSystemFees} />
				</TR>
				<TR>
					<TD>Director Services</TD>
					<TD value={results.subFundAnnualExpenses.directorServices} />
					<TD value={results.vccUmbrellaAnnualExpenses.directorServices} />
				</TR>
				<TR>
					<TD>Reimbursement of Setup Expenses</TD>
					<TD value={results.subFundAnnualExpenses.reimbursement} />
					<TD value={results.vccUmbrellaAnnualExpenses.reimbursement} />
				</TR>
				<TR>
					<TD>Total</TD>
					<TD value={results.subFundAnnualExpenses.total} />
					<TD value={results.vccUmbrellaAnnualExpenses.total} />
				</TR>
				<TR>
					<TD>Basic points of AUM</TD>
					<TD>{ ((results.subFundAnnualExpenses.total / results.input.startingAUMDec) * 100 * 100).toFixed(1) }</TD>
					<TD>{ ((results.vccUmbrellaAnnualExpenses.total / results.input.startingAUMDec) * 100 * 100).toFixed(1) }</TD>
				</TR>
			</tbody>
		</Table>
	</>
}
