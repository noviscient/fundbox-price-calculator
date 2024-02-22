import { useState } from 'react'
import { FormBox } from './FormBox'
import { calculator } from './calculator'
import { DebugJSONDump } from './components/DebugJSONDump'
import { ResultsBox } from './results/ResultsBox'
import { env } from './utils/env'

export const App: React.FC = () => {

	const [results, setResults] = useState<calculator.Results | null>(null)

	return <div className='max-w-[662px]'>
		<FormBox performCalc={async (input) => { setResults(calculator.calculate(input)) }} />

		<div className='h-[32px] shrink-0' />

		{ results ? <ResultsBox results={results} /> : null }

		{ env.IS_DEMO_STANDALONE_LAYOUT
			? <>
				<div className='h-[32px] shrink-0' />
				<DebugJSONDump header='Debugging data will be shown here (only for this test page). Screenshot me as needed 📸' data={results} />
				<div className='h-[10px] shrink-0' />
				<DebugJSONDump header='Environment variables' data={env} />
			</>
			: null }
		
	</div>
}
