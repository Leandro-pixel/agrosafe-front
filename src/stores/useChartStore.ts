import { defineStore } from 'pinia'
import Chart from 'src/models/chart'
import ChartRepository from 'src/repositories/chartRepository'
import { FetchChartUseCase } from 'src/usecases/fetchChartUseCase'
import { Formatter } from 'src/utils/formatter'
import { computed, ref } from 'vue'

const repository = new ChartRepository()
const fetchChartUseCase = new FetchChartUseCase(repository)

export const useChartStore = defineStore('chart', () => {
	const chart = ref(new Chart())
	const totalSalesMonthsWithYear = ref([] as string[])
	const timer = ref(0)
	const interval = ref()

	const getChart = computed(() => chart.value)
	const getTotalSalesMonthsWithYear = computed(() => totalSalesMonthsWithYear.value)
	const getMonthTotalApprovedSales = computed(() => {
		return chart.value.totalSalesInCurrentMonthByStatus ? chart.value.totalSalesInCurrentMonthByStatus
			.filter(item => ['approved', 'manuallyApproved'].includes(item.status))
			.reduce((acc, curr) => acc + curr.total, 0) : 0
	})
	const getMonthTotalSales = computed(() => {
		return chart.value.totalSalesInCurrentMonthByStatus ? chart.value.totalSalesInCurrentMonthByStatus
			.reduce((acc, curr) => acc + curr.total, 0) : 0
	})
	const getMonthTotalApprovedAmountSold = computed(() => {
		return chart.value.amountSoldInCurrentMonthByStatus ? chart.value.amountSoldInCurrentMonthByStatus
			.filter(item => ['approved', 'manuallyApproved'].includes(item.status))
			.reduce((acc, curr) => acc + parseInt(curr.total), 0) : 0
	})
	const getMonthTotalAmountSold = computed(() => {
		return chart.value.amountSoldInCurrentMonthByStatus ? chart.value.amountSoldInCurrentMonthByStatus
			.reduce((acc, curr) => acc + parseFloat(curr.total), 0) : 0
	})

	async function fetchChart () {
		if (timer.value > 0) return
		const response = await fetchChartUseCase.execute()
		chart.value = response
		totalSalesMonthsWithYear.value = response.totalSalesInRecentMonths ? response.totalSalesInRecentMonths.map((item) => `${Formatter.intToMonth(item.month)} ${item.year}`) : []
		timer.value = 3600
		interval.value = setInterval(() => {
			timer.value <= 0
				? clearInterval(interval.value)
				: timer.value--
		}, 1000)
	}

	return {
		fetchChart,
		getChart,
		getTotalSalesMonthsWithYear,
		getMonthTotalApprovedSales,
		getMonthTotalSales,
		getMonthTotalApprovedAmountSold,
		getMonthTotalAmountSold
	}
})
