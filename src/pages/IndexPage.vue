<template>
	<q-page class="column q-pa-md">
		<div class="gt-sm row justify-evenly">
      <!--
			<timeline-chart-component
				type="area"
				:colors="[secondaryColor, secondaryColor]"
				:title="chartTitle()"
				:xaxis="chartStore.getTotalSalesMonthsWithYear.map((item:any) => item)"
				:series="[
					{ name: 'Vendas', data: chart.totalSalesInRecentMonths ? chart.totalSalesInRecentMonths.map((item:any) => item.quantity.toString()) : [] },
				]"
				:loading="loading"
				/>
			<bar-chart-component
				:series="[
					{ name: 'Un.', data: chart.totalSalesInCurrentMonthByStatus ? chart.totalSalesInCurrentMonthByStatus.map((item:any) => item.total.toString()) : [], type: 'column' },
				]"
				title="Quantia de vendas por status no mês atual"
				:xaxis="chart.totalSalesInCurrentMonthByStatus ? chart.totalSalesInCurrentMonthByStatus.map((item:any) => translateSaleStatus(item.status)) : []"
				:colors="[secondaryColor]"
				:y-title="['Num. de vendas']"
				theme="light"
				:loading="loading"
			/>-->
      <!--<timeline-chart-component>0</timeline-chart-component>-->
      <bar-chart-component
      :series="[
					{ name: 'Un.' ,type:'column',data:['1','2']},
				]"
				title="Quantia de vendas por status no mês atual"
				:xaxis=" []"
				:colors="[secondaryColor]"
				:y-title="['Num. de vendas']"
				theme="light"
				:loading="loading"
      />
		</div>
		<div class="flex-direction-setter row justify-between items-stretch">
			<div class="col">
				<q-card class="default-box-shadow column text-center justify-evenly big-border-radius full-height">
					<q-card-section class="text-h6">{{ pastTwoMonths.toString().replace(',', ' para ') }} (Núm. de vendas)</q-card-section>
					<q-card-section class="text-h4">
						<div v-if="percentage > 0" class="text-positive">
							{{ percentage.toFixed(2) }}%
						</div>
						<div v-else-if="percentage < 0" class="text-negative">
							{{ percentage.toFixed(2) }}%
						</div>
						<div v-else class="text-warning">
							{{ percentage.toFixed(2) }}%
						</div>
						<q-icon name="trending_up" class="text-positive" v-if="percentage > 0"/>
						<q-icon name="trending_down" class="text-negative" v-else-if="percentage < 0"/>
						<q-icon name="trending_flat" class="text-warning" v-else/>
					</q-card-section>
				</q-card>
			</div>
			<div class="col">
				<q-card class="default-box-shadow column text-center justify-evenly q-ma-md q-pa-md big-border-radius">
					<q-card-section class="text-h6">Valor total de vendas (mês)</q-card-section>
					<!--<q-card-section class="text-h5">{{ Formatter.formatNumberToBRCurrency(chartStore.getMonthTotalAmountSold) }}</q-card-section>-->
				</q-card>
				<q-card class="default-box-shadow column text-center justify-evenly q-ma-md q-pa-md big-border-radius">
					<q-card-section class="text-h6">Valor total de vendas aprovadas (mês)</q-card-section>
					<!--<q-card-section class="text-h5">{{ Formatter.formatNumberToBRCurrency(chartStore.getMonthTotalApprovedAmountSold) }}</q-card-section>-->
				</q-card>
			</div>
			<div class="col">
				<q-card class="default-box-shadow column text-center justify-evenly q-ma-md q-pa-md big-border-radius">
					<q-card-section class="text-h6">Número total de vendas (mês)</q-card-section>
					<!--<q-card-section class="text-h5">{{ chartStore.getMonthTotalSales }}</q-card-section>-->
				</q-card>
				<q-card class="default-box-shadow column text-center justify-evenly q-ma-md q-pa-md big-border-radius">
					<q-card-section class="text-h6">Número total de vendas aprovadas (mês)</q-card-section>
					<!--<q-card-section class="text-h5">{{ chartStore.getMonthTotalApprovedSales }}</q-card-section>-->
				</q-card>
			</div>
      <pie-chart-component
      :labels="['label 1', 'label 2']"
      :series="[44, 55]"
      title="Quantidade de transações em % no mês atual"
      />
      <!--
			<pie-chart-component class="gt-sm col-3" v-if="chart.amountSoldInCurrentMonthByStatus && chart.amountSoldInCurrentMonthByStatus.length > 0"
				:labels="chart.amountSoldInCurrentMonthByStatus.map((item:any) => translateSaleStatus(item.status))"
				:series="chart.totalSalesInCurrentMonthByStatus!.map((item:any) => parseInt(item.total.toString()))"
				title="Quantidade de transações em % no mês atual"
			/>-->
		</div>
	</q-page>
</template>

<script setup lang="ts">
//import TimelineChartComponent from 'src/components/chart/TimelineChartComponent.vue'
//import Chart from 'src/models/chart'
//import { useChartStore } from 'src/stores/useChartStore'
import { useConfigStore } from 'src/stores/useConfigStore'
import { NotifyError } from 'src/utils/utils'
//import { Formatter } from 'src/utils/formatter'
import { onMounted, ref } from 'vue'
//import { translateSaleStatus } from 'src/models/enums/saleEnum'
import BarChartComponent from 'src/components/chart/BarChartComponent.vue'
import PieChartComponent from 'src/components/chart/PieChartComponent.vue'
//import { data } from 'autoprefixer'
//import { useUserStore } from 'src/stores/useUserStore'

const configStore = useConfigStore()
const secondaryColor = configStore.getConfig.secondary
//const chart = ref(new Chart())
//const chartStore = useChartStore()
const percentage = ref(0)
const pastTwoMonths = ref([] as Array<string>)
//const userStore = useUserStore()
const loading = ref(false)
/*
const months = [
	'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
	'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const chartTitle = () => {
	const currentMonth = new Date().getMonth()
	return `Vendas mensais até o mês de ${months[currentMonth]}`
}
  */

onMounted(async () => {
	loading.value = true
	try {
		await Promise.all([
			//await chartStore.fetchChart(),
			//await userStore.fetchUserData()
		])
		//chart.value = chartStore.getChart
		//const subArray = chart.value.totalSalesInRecentMonths ? chart.value.totalSalesInRecentMonths.slice(-2) : []
		//if (subArray.length < 2) {
			//pastTwoMonths.value = [months[new Date().getMonth() - 1], months[new Date().getMonth()]]
			//return
		//}
		//percentage.value = ((subArray[1].quantity - subArray[0].quantity) / subArray[0].quantity) * 100
		//pastTwoMonths.value = subArray.map((item) => Formatter.intToMonth(item.month))
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error:any) {
		NotifyError.error(error.message)
	} finally {
		loading.value = false
	}
})

</script>
