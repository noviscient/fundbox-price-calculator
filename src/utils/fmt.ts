export namespace fmt {

	export const insertSpacers = (str: string, spacer: string) => {
		for (let i = str.length - 3; i > 0; i -= 3) {
			str = str.slice(0, i) + spacer + str.slice(i)
		}
		return str
	}

	export const money = (value: number, dp: number = 0, thousandsSpacer = ',', decimalToken = '.') => {
		const str = value.toFixed(dp)
		const [int, dec] = str.split('.')
		const sign = int[0] === '-' ? '-' : ''
		const intWithoutSign = sign ? int.slice(1) : int
		return `${sign}$${ insertSpacers(intWithoutSign, thousandsSpacer)}${dec === undefined ? '' : `${decimalToken}${dec}`}`
	}

	export const percent = (value: number, dp: number = 0) => {
		return `${(value * 100).toFixed(dp)}%`
	}
}
