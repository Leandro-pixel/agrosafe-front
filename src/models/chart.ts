import { AmountSoldInCurrentMonthByStatus, TotalSalesInCurrentMonthByStatus, TotalSalesInRecentMonths } from './interfaces/chart'

class Chart {
	constructor (
		public totalSalesInRecentMonths?: TotalSalesInRecentMonths[],
		public amountSoldInCurrentMonthByStatus?: AmountSoldInCurrentMonthByStatus[],
		public totalSalesInCurrentMonthByStatus?: TotalSalesInCurrentMonthByStatus[]
	) {}

	static fromJson (json: any): Chart {
		return new Chart(
			json.totalSalesInRecentMonths,
			json.amountSoldInCurrentMonthByStatus,
			json.totalSalesInCurrentMonthByStatus
		)
	}
}

export default Chart
