import { calculator } from '../../calculator'
import { TD, TH, TR, Table } from '../components/Td'
import { Title } from '../components/Title'

export const SetupExpensesSection: React.FC<{ results: calculator.Results }> = ({ results }) => {
	return <>
		<Title>Setup Expenses</Title>
		<Table fullWidth noAutoTBody>
			<thead>
				<TH />
				<TH>Sub-fund</TH>
				<TH>VCC Umbrella</TH>
			</thead>
			<tbody>
				<TR>
					<TD>Legal (depending on lawyer choice)</TD>
					<TD value={results.subfundSetupCosts.legal} />
					<TD value={results.vccUmbrellaSetupCosts.legal} />
				</TR>
				<TR>
					<TD>Tax input</TD>
					<TD value={results.subfundSetupCosts.taxInput} />
					<TD value={results.vccUmbrellaSetupCosts.taxInput} />
				</TR>
				<TR>
					<TD>ACRA setup</TD>
					<TD value={results.subfundSetupCosts.acraSetup} />
					<TD value={results.vccUmbrellaSetupCosts.acraSetup} />
				</TR>
				<TR>
					<TD>Service Provider Onboarding</TD>
					<TD value={results.subfundSetupCosts.serviceProviderOnboarding} />
					<TD value={results.vccUmbrellaSetupCosts.serviceProviderOnboarding} />
				</TR>
				<TR>
					<TD>Total</TD>
					<TD value={results.subfundSetupCosts.total} />
					<TD value={results.vccUmbrellaSetupCosts.total} />
				</TR>
			</tbody>
		</Table>
	</>
}
