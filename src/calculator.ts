import { PricingTierEnvValues, env } from './utils/env'

export namespace calculator {

	export const parsePercentInputToDec = (input: string): number | string => {
		let s = input.replace(/[ ,]/g, '').trim()
		if (!s) return 'This field is required'
		if (s.endsWith('%')) {
			s = s.slice(0, -1)
		}
		const f = parseFloat(s)
		if (isNaN(f)) {
			return 'This field must be a number'
		}
		return f / 100
	}
	export const parseNumInput = (input: string): number | string => {
		const s = input.replace(/[ ,]/g, '').trim()
		if (!s) return 'This field is required'
		const f = parseFloat(s)
		if (isNaN(f)) {
			return 'This field must be a number'
		}
		return f
	}

	export type FormInput = {
		startingAUMDec: number,
		estimatedReturnOfFundRatioDec: number,
		managementFeeRatioDec: number,
		performanceFeeRatioDec: number
	}
	export type Results = ReturnType<typeof calculate>

	type ServiceFeeTier = { aumCovered: number, fee: number }
	export type ServiceFeeResult = {
		total: number,
		breakdown: { bpsDec: number, amtDec: number }[],
		exMinimum: number
	}
	export type CashflowTableRowData = number[] & { length: 14 }
	export type CashflowResult = {
		noviscientFees: CashflowTableRowData,
		sponsorSetup: CashflowTableRowData,
		sponsorManagementFee: CashflowTableRowData,
		sponsorPerformanceFee: CashflowTableRowData,
		sponsorCumulativeCashFlow: CashflowTableRowData,
		sponsorCashFlow: CashflowTableRowData
	}

	const calcCumulPricingTierTable = (tiers: PricingTierEnvValues) => {
		console.log(tiers)
		const table: { minDec: number, maxDec: number, bpsDec: number }[] = []
		let cumulAUMDec = 0
		for (const tier of tiers) {
			table.push({
				minDec: cumulAUMDec,
				maxDec: cumulAUMDec + tier.aumCovered,
				bpsDec: (tier.fee * 100)
			})
			cumulAUMDec += tier.aumCovered
		}
		return table
	}

	const calculateCashflows = (
		totalNoviscientFeeDec: number,
		upfrontDepositDec: number,
		estSubfundSetupCostsDec: number,
		mgmtFeePaidFromFundDec: number,
		performanceFeeDec: number
	): CashflowResult => {
		const _nvsMthly = totalNoviscientFeeDec / 12
		const noviscientFees: CashflowTableRowData = [0, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, _nvsMthly, totalNoviscientFeeDec]
		const _baseSponsorSetup = -(upfrontDepositDec + estSubfundSetupCostsDec)
		const _mthlySponsorSetup = -_baseSponsorSetup / 60
		const sponsorSetup: CashflowTableRowData = [
			_baseSponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_mthlySponsorSetup,
			_baseSponsorSetup + _mthlySponsorSetup * 12
		]
		const _mf = (mgmtFeePaidFromFundDec / 12) - _mthlySponsorSetup
		const mgmtFees: CashflowTableRowData = [
			0, _mf, _mf, _mf, _mf, _mf, _mf, _mf, _mf, _mf, _mf, _mf, _mf, (mgmtFeePaidFromFundDec - (_mthlySponsorSetup * 12))
		]
		const perfFees: CashflowTableRowData = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, performanceFeeDec, performanceFeeDec
		]
		const sponsorCumulativeCashFlow: CashflowTableRowData = [sponsorSetup[0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		const sponsorCashFlow: CashflowTableRowData = [sponsorSetup[0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		for (let i = 1; i < 14; i++) {
			sponsorCashFlow[i] = sponsorSetup[i] + mgmtFees[i] + perfFees[i]
			sponsorCumulativeCashFlow[i] = sponsorCumulativeCashFlow[i - 1] + sponsorCashFlow[i]
		}
		return {
			noviscientFees,
			sponsorSetup,
			sponsorManagementFee: mgmtFees,
			sponsorPerformanceFee: perfFees,
			sponsorCumulativeCashFlow,
			sponsorCashFlow
		}
	}

	const calculateServiceFee = (
		aumDec: number,
		tiers: ServiceFeeTier[],
		minimumServiceFee: number
	): ServiceFeeResult => {

		const breakdown: ServiceFeeResult['breakdown'] = tiers.map((tier) => {
			return {
				bpsDec: tier.fee * 100 * 100,
				amtDec: 0
			}
		})

		let fee = 0
		let remainingAUM = aumDec
		let topupFee = 0
		for (const [index, tier] of tiers.entries()) {
			if (remainingAUM <= 0) break
			const applicable = Math.min(remainingAUM, tier.aumCovered)
			const currentTierFee = applicable * tier.fee
			
			breakdown[index].amtDec = currentTierFee
			fee += currentTierFee
			remainingAUM -= applicable
		}

		if (fee < minimumServiceFee) {
			topupFee = minimumServiceFee - fee
			fee = minimumServiceFee
		}
		return {
			total: fee,
			breakdown,
			exMinimum: topupFee
		}
	}

	const calculateServiceFeeWithoutBreakdown = (
		aumDec: number,
		tiers: ServiceFeeTier[],
		minimumServiceFee: number
	) => {
		let fee = 0
		let remainingAUM = aumDec
		for (const tier of tiers) {
			if (remainingAUM <= 0) break
			const applicable = Math.min(remainingAUM, tier.aumCovered)
			const currentTierFee = applicable * tier.fee
			fee += currentTierFee
			remainingAUM -= applicable
		}
		if (fee < minimumServiceFee) {
			fee = minimumServiceFee
		}
		return fee
	}

	export const calculate = (input: FormInput) => {

		const serviceFeeDec = calculateServiceFee(
			input.startingAUMDec,

			// service fee tiers
			env.F_PRICING_TIERS,

			// minimum service fee
			env.F_MINIMUM_ANNUAL_NOVISCIENT_FEE
		)
		const serviceFeeProjectionsDec: [number, number][] = [
			1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170,
			175, 180, 185, 190, 195, 200
		].map((mil) => [mil * 1_000_000, calculateServiceFeeWithoutBreakdown(mil * 1_000_000, env.F_PRICING_TIERS, env.F_MINIMUM_ANNUAL_NOVISCIENT_FEE) / 12])
		
		const estimatedReturn = input.startingAUMDec * input.estimatedReturnOfFundRatioDec
		const grossDollarReturn = input.startingAUMDec * (1 + input.estimatedReturnOfFundRatioDec)

		// SETUP EXPENSES
		const subfundSetupCosts = {
			legal: env.SUB_FUND_SETUP__LEGAL_COST_DEC,
			taxInput: env.SUB_FUND_SETUP__TAX_INPUT_COST_DEC,
			acraSetup: env.SUB_FUND_SETUP__ACRA_SETUP_COST_DEC,
			serviceProviderOnboarding: env.SUB_FUND_SETUP__SERVICE_PROVIDER_ONBOARDING_COST_DEC,
			total: env.SUB_FUND_SETUP__LEGAL_COST_DEC + env.SUB_FUND_SETUP__TAX_INPUT_COST_DEC + env.SUB_FUND_SETUP__ACRA_SETUP_COST_DEC + env.SUB_FUND_SETUP__SERVICE_PROVIDER_ONBOARDING_COST_DEC
		}
		const vccUmbrellaSetupCosts ={
			legal: env.VCC_UMBRELLA_SETUP__LEGAL_COST_DEC,
			taxInput: env.VCC_UMBRELLA_SETUP__TAX_INPUT_COST_DEC,
			acraSetup: env.VCC_UMBRELLA_SETUP__ACRA_SETUP_COST_DEC,
			serviceProviderOnboarding: env.VCC_UMBRELLA_SETUP__SERVICE_PROVIDER_ONBOARDING_COST_DEC,
			total: env.VCC_UMBRELLA_SETUP__LEGAL_COST_DEC + env.VCC_UMBRELLA_SETUP__TAX_INPUT_COST_DEC + env.VCC_UMBRELLA_SETUP__ACRA_SETUP_COST_DEC + env.VCC_UMBRELLA_SETUP__SERVICE_PROVIDER_ONBOARDING_COST_DEC
		}

		// ANNUAL FUND EXPENSES
		const sfFundAdmin = Math.max(env.SUB_FUND_ANNUAL__FUND_ADMIN_COST_MIN_DEC, input.startingAUMDec * 0.0001 * 4)
		const sfAudit = Math.max(env.SUB_FUND_ANNUAL__AUDIT_COST_MIN_DEC, input.startingAUMDec * 0.0001 * 2.5)
		const sfLegal = env.SUB_FUND_ANNUAL__LEGAL_COST_DEC
		const sfAcraReturnFiling = env.SUB_FUND_ANNUAL__ACRA_RETURN_FILING_COST_DEC
		const sfRiskAndTradingSystemFees = env.SUB_FUND_ANNUAL__RISK_AND_TRADING_SYSTEM_FEES_DEC
		const sfDirectorServices = env.SUB_FUND_ANNUAL__DIRECTOR_SERVICES_FEE_DEC
		const sfReimbursement = subfundSetupCosts.total / 5
		const subFundAnnualExpenses = {
			fundAdmin: sfFundAdmin,
			audit: sfAudit,
			legal: sfLegal,
			acraReturnFiling: sfAcraReturnFiling,
			riskAndTradingSystemFees: sfRiskAndTradingSystemFees,
			directorServices: sfDirectorServices,
			reimbursement: sfReimbursement,
			total: sfFundAdmin + sfAudit + sfLegal + sfAcraReturnFiling + sfRiskAndTradingSystemFees + sfDirectorServices + sfReimbursement
		}

		const upfrontDepositDec = env.F_UPFRONT_DEPOSIT_DEC
		const managementFeeDec = input.managementFeeRatioDec * input.startingAUMDec
		// const performanceFeeDec = input.performanceFeeRatioDec * input.startingAUMDec
		// "The performance fee amount should be Performance fee (10%) x {Gross dollar return ($800,000) - Management fee ($150,000) - Total Annual Fund Expenses ($47,530)} = $60,247" - Scott, 20 Feb 2024
		console.log(input.performanceFeeRatioDec, estimatedReturn, managementFeeDec, subFundAnnualExpenses.total)
		const performanceFeeDec = input.performanceFeeRatioDec * (estimatedReturn - managementFeeDec - subFundAnnualExpenses.total)
		const totalFeeDec = managementFeeDec + performanceFeeDec
		const feesPaidToNoviscientDec = serviceFeeDec.total
		const feesPaidToManagerDec = totalFeeDec - feesPaidToNoviscientDec
		
		const vccUmbrellaFundAdmin = env.VCC_UMBRELLA_ANNUAL__FUND_ADMIN_COST_DEC
		const vccUmbrellaAudit = sfAudit * 2
		const vccUmbrellaLegal = env.VCC_UMBRELLA_ANNUAL__LEGAL_COST_DEC
		const vccUmbrellaAcraReturnFiling = env.VCC_UMBRELLA_ANNUAL__ACRA_RETURN_FILING_COST_DEC
		const vccUmbrellaRiskAndTradingSystemFees = env.VCC_UMBRELLA_ANNUAL__RISK_AND_TRADING_SYSTEM_FEES_DEC
		const vccUmbrellaDirectorServices = env.VCC_UMBRELLA_ANNUAL__DIRECTOR_SERVICES_FEE_DEC
		const vccUmbrellaReimbursement = vccUmbrellaSetupCosts.total / 5
		const vccUmbrellaAnnualExpenses = {
			fundAdmin: vccUmbrellaFundAdmin,
			audit: vccUmbrellaAudit,
			legal: vccUmbrellaLegal,
			acraReturnFiling: vccUmbrellaAcraReturnFiling,
			riskAndTradingSystemFees: vccUmbrellaRiskAndTradingSystemFees,
			directorServices: vccUmbrellaDirectorServices,
			reimbursement: vccUmbrellaReimbursement,
			total: vccUmbrellaFundAdmin + vccUmbrellaAudit + vccUmbrellaLegal + vccUmbrellaAcraReturnFiling + vccUmbrellaRiskAndTradingSystemFees + vccUmbrellaDirectorServices + vccUmbrellaReimbursement
		}

		return {
			input,

			// setup expenses
			subfundSetupCosts,
			subFundAnnualExpenses,

			// annual fund expenses
			vccUmbrellaSetupCosts,
			vccUmbrellaAnnualExpenses,
			
			fees: {
				serviceFeeBreakdown: serviceFeeDec.breakdown,
				/** [aum, monthlyFee][] */
				serviceFeeProjectionsDec,
				serviceFeeTopup: serviceFeeDec.exMinimum,
				serviceFeeDec: serviceFeeDec.total,
				upfrontDepositDec,
				managementFeeDec,
				performanceFeeDec,
				totalFeeDec,
				feesPaidToNoviscientDec,
				feesPaidToManagerDec,
			},

			cashflows: calculateCashflows(
				feesPaidToNoviscientDec,
				upfrontDepositDec,
				subfundSetupCosts.total,
				managementFeeDec,
				performanceFeeDec
			),

			grossDollarReturn,
			estimatedReturn,
			cumulPricingTiers: calcCumulPricingTierTable(env.F_PRICING_TIERS)
		}
	}
}