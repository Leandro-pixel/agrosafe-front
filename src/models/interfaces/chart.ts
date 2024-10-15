export interface TotalSalesInRecentMonths {
	month: number,
	quantity: number,
	year: number
}

export interface AmountSoldInCurrentMonthByStatus {
	status: string
	total: string
}

export interface TotalSalesInCurrentMonthByStatus {
	status: string
	total: number
}
