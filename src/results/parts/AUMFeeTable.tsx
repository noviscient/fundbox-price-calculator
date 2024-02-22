import React from 'react'
import { calculator } from '../../calculator'
import { fmt } from '../../utils/fmt'
import { TD, TR, Table } from '../components/Td'
import { Title } from '../components/Title'

// export type AUMMonthlyFeeSet = {
// 	aumDec: number,
// 	monthlyFeeDec: number,
// }
// const _fee = (aumDec: number, monthlyFeeDec: number) => ({ aumDec, monthlyFeeDec })
// const fees: AUMMonthlyFeeSet[] = [
// 	_fee(0, 3_333),
// 	_fee(1000000, 3_333),
// 	_fee(5_000_000, 3_333),
// 	_fee(10_000_000, 3_333),
// 	_fee(15_000_000, 3_750),
// 	_fee(20_000_000, 5_000),
// 	_fee(25_000_000, 6_042),
// 	_fee(30_000_000, 7_083),
// 	_fee(35_000_000, 8_125),
// 	_fee(40_000_000, 9_167),
// 	_fee(45_000_000, 10_208),
// 	_fee(50_000_000, 11_250),
// 	_fee(55_000_000, 12_292),
// 	_fee(60_000_000, 13_333),
// 	_fee(65_000_000, 14_375),
// 	_fee(70_000_000, 15_417),
// 	_fee(75_000_000, 16_458),
// 	_fee(80_000_000, 17_500),
// 	_fee(85_000_000, 18_542),
// 	_fee(90_000_000, 19_583),
// 	_fee(95_000_000, 20_625),
// 	_fee(100_000_000, 21_667),
// 	_fee(105_000_000, 22_500),
// 	_fee(110_000_000, 23_333),
// 	_fee(115_000_000, 24_167),
// 	_fee(120_000_000, 25_000),
// 	_fee(125_000_000, 25_833),
// 	_fee(130_000_000, 26_667),
// 	_fee(135_000_000, 27_500),
// 	_fee(140_000_000, 28_333),
// 	_fee(145_000_000, 29_167),
// 	_fee(150_000_000, 30_000),
// 	_fee(155_000_000, 30_625),
// 	_fee(160_000_000, 31_250),
// 	_fee(165_000_000, 31_875),
// 	_fee(170_000_000, 32_500),
// 	_fee(175_000_000, 33_125),
// 	_fee(180_000_000, 33_750),
// 	_fee(185_000_000, 34_375),
// 	_fee(190_000_000, 35_000),
// 	_fee(195_000_000, 35_625),
// 	_fee(200_000_000, 36_250),
// ]

export const AUMFeeTable: React.FC<{ results: calculator.Results }> = ({ results }) => {

	return <div className='max-w-full min-w-0 overflow-x-scroll nvs-scrollbars'>
		<Title>AUM</Title>
		<Table fullWidth={false}>
			<TR>
				<TD>Noviscient monthly fee</TD>
				{ results.fees.serviceFeeProjectionsDec.map(([_aumDec, monthlyFeeDec], idx) => <TD key={`${idx}_${monthlyFeeDec}`}>{fmt.money(monthlyFeeDec)}</TD>) }
			</TR>
			<TR>
				<TD>AUM</TD>
				{ results.fees.serviceFeeProjectionsDec.map(([aumDec], idx) => <TD key={`${idx}_${aumDec}`}>{aumDec ? fmt.money(aumDec) : '—'}</TD>) }
			</TR>
		</Table>
	</div>
}
