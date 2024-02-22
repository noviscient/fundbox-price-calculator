import { Element3, Element4, Element5, Element6, Element7, Element8 } from 'components/Elements'
import { calculator } from '../calculator'
import { Card } from '../components/Card'
import { Title } from './components/Title'
import { AUMFeeTable } from './parts/AUMFeeTable'
import { AnnualFundExpensesSection } from './parts/AnnualFundExpensesSection'
import { BPSFeeTable } from './parts/BPSFeeTable'
import { FeesPaidToNoviscientAndManagerSection } from './parts/FeesPaidToNoviscientAndManagerSection'
import { ResultsIntroductionSection } from './parts/ResultsIntroductionSection'
import { SetupExpensesSection } from './parts/SetupExpensesSection'
import { NoviscientCashflowsTable } from './parts/cashflows/NoviscientCashflowsTable'
import { SponsorCashflowsTable } from './parts/cashflows/SponsorCashflowsTable'
import { NoviscientMonthlyFeeChart } from './parts/graphs/NoviscientMonthlyFeeChart'
import { SponsorCashflowProjectionChart } from './parts/graphs/SponsorCashflowProjectionChart'

export const ResultsBox: React.FC<{ results: calculator.Results }> = ({ results }) => {

	return <div className='relative'>
		<Element3 className='absolute top-[428px] -right-[91px]' />
		<Element4 className='absolute top-[1268px] -right-[63px]' />
		<Element5 className='absolute top-[1957px] -left-[94px]' />
		<Element6 className='absolute top-[2496px] -right-[55px]' />
		<Element7 className='absolute bottom-[273px] -left-[210px]' />
		<Element8 className='absolute -bottom-[53px] -right-[53px]' />
		<Card className='relative flex flex-col w-[95vw] max-w-[656px] p-[24px] items-stretch'>
			<ResultsIntroductionSection results={results} />
			<div className='h-[100px] shrink-0' />

			<Title>
				One Year Cash Flow Projections for Sponsor
			</Title>
			<SponsorCashflowProjectionChart results={results} />
			{/* <div className='grid bg-neutral-2 text-neutral-8 place-items-center text-H12 rounded-sm-4px py-[100px]'>
				(work in progress)
			</div> */}
			<div className='h-[100px] shrink-0' />
			<Title>
				Noviscient Monthly fee
			</Title>
			<NoviscientMonthlyFeeChart results={results} />
			{/* <div className='grid bg-neutral-2 text-neutral-8 place-items-center text-H12 rounded-sm-4px py-[100px]'>
				(work in progress)
			</div> */}

			<div className='h-[100px] shrink-0' />
			<NoviscientCashflowsTable results={results} />

			<div className='h-[100px] shrink-0' />
			<SponsorCashflowsTable results={results} />

			{/* <div className='h-[100px] shrink-0' /> */}
			{/* <NoviscientServiceFeePayableTable results={results} /> */}

			<div className='h-[100px] shrink-0' />
			{ /* OK I think */ }
			<FeesPaidToNoviscientAndManagerSection results={results} />

			<div className='h-[100px] shrink-0' />
			{ /* OK */ }
			<BPSFeeTable results={results} />

			<div className='h-[100px] shrink-0' />
			{ /* should be OK */ }
			<AnnualFundExpensesSection results={results} />
				
			<div className='h-[100px] shrink-0' />
			{ /* should be OK */ }
			<SetupExpensesSection results={results} />

			<div className='h-[100px] shrink-0' />

			{ /* should be OK */ }
			<AUMFeeTable results={results} />

		</Card>
	</div>
}
