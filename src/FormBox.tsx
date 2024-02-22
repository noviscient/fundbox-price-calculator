import { Element1, Element2 } from 'components/Elements'
import { useState } from 'react'
import { useImmer } from 'use-immer'
import { calculator } from './calculator'
import { Card } from './components/Card'
import { FormField } from './components/FormField'
import { PrimaryButton } from './components/PrimaryButton'

export const FormBox: React.FC<{ performCalc: (data: calculator.FormInput) => Promise<void> }> = ({ performCalc }) => {

   const [startingAUM, setStartingAUM] = useState('')
	const [inputEstimatedReturnOfFund, setInputEstimatedReturnOfFund] = useState('')
	const [inputMgmtFee, setInputMgmtFee] = useState('')
	const [inputPerfFee, setInputPerfFee] = useState('')

	const [errors, setErrors] = useImmer<Partial<Record<'stAUM' | 'estReturn' | 'mgmtFee' | 'perfFee', string>>>({})
	const [isLoading, setIsLoading] = useState(false)
	
	const onSubmit = async () => {
		const newErrors: Partial<Record<'stAUM' | 'estReturn' | 'mgmtFee' | 'perfFee', string>> = {}

		const startingAUMNum = calculator.parseNumInput(startingAUM)
		if (typeof startingAUMNum === 'string') newErrors.stAUM = startingAUMNum
		const inputEstimatedReturnOfFundDec = calculator.parsePercentInputToDec(inputEstimatedReturnOfFund)
		if (typeof inputEstimatedReturnOfFundDec === 'string') newErrors.estReturn = inputEstimatedReturnOfFundDec
		const inputMgmtFeeDec = calculator.parsePercentInputToDec(inputMgmtFee)
		if (typeof inputMgmtFeeDec === 'string') newErrors.mgmtFee = inputMgmtFeeDec
		const inputPerfFeeDec = calculator.parsePercentInputToDec(inputPerfFee)
		if (typeof inputPerfFeeDec === 'string') newErrors.perfFee = inputPerfFeeDec 		
		if (Object.keys(newErrors).length > 0) return setErrors(newErrors)

		setIsLoading(true)
		await performCalc({
			startingAUMDec: startingAUMNum as number,
			estimatedReturnOfFundRatioDec: inputEstimatedReturnOfFundDec as number,
			managementFeeRatioDec: inputMgmtFeeDec as number,
			performanceFeeRatioDec: inputPerfFeeDec as number,
		}).finally(() => setIsLoading(false))
	}

	return <div className='relative'>
		<Element1 className='absolute -right-[40px] top-[59px]' />
		<Element2 className='absolute top-[183px] -left-[108px]' />
		<Card className='relative flex flex-col w-[95vw] max-w-[656px] items-stretch'>
			<div className='font-medium text-H16 self-center text-[#0D1F40] text-center'>
				Enter your business details into the cash flow calculator
			</div>
			<div className='h-[19px] shrink-0' />

			<div className='grid grid-cols-2 gap-x-[32px] gap-y-[20px]'>
				<FormField
					label='Starting AUM'
					value={startingAUM}
					enableThousandsSpacer
					onChange={setStartingAUM}
					error={errors.stAUM}
				/>
				<FormField
					label='Estimated Return of Fund (%)'
					value={inputEstimatedReturnOfFund}
					onChange={setInputEstimatedReturnOfFund}
					error={errors.estReturn}
					trailingSuffix='%'
				/>
				<FormField
					label='Management Fee (%)'
					value={inputMgmtFee}
					onChange={setInputMgmtFee}
					error={errors.mgmtFee}
					subLabel='Paid from fund'
					trailingSuffix='%'
				/>
				<FormField
					label='Performance Fee (%)'
					value={inputPerfFee}
					onChange={setInputPerfFee}
					error={errors.perfFee}
					subLabel='Paid from fund'
					trailingSuffix='%'
					onEnter={() => onSubmit()}
				/>
			</div>
			<div className='h-[32px] shrink-0' />
			<PrimaryButton isLoading={isLoading} clsFontSize='text-H16' onClick={onSubmit}>
				<div className='grow' />
				Calculate
				<div className='grow' />
			</PrimaryButton>
		</Card>
	</div>
}
