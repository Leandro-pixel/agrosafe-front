<template>
	<q-card class="default-box-shadow column flex-center big-border-radius">
		<q-card-section class="text-h6">{{ title }}</q-card-section>
		<vue-apex-charts
			type="pie"
			:series="series"
			:options="chartOptions"
		></vue-apex-charts>
	</q-card>
  </template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	labels: {
		type: Array as () => Array<string>,
		required: true
	},
	series: {
		type: Array as () => Array<number>,
		required: true
	},
	theme: {
		type: String,
		default: 'light'
	}
})

const chartOptions = ref({
	series: props.series,
	theme: {
		mode: props.theme
	},
	chart: {
		type: 'pie'
	},
	labels: props.labels,
	responsive: [{
		options: {
			chart: {
				width: '100%'
			}
		}
	}],
	legend: {
		show: false
	},
	dataLabels: {
		enabled: true
	}
})
watch(() => props.labels, (newValue) => {
	chartOptions.value = {
		...chartOptions.value,
		...{
			labels: newValue
		}
	}
})

watch(() => props.series, (newValue) => {
	chartOptions.value = {
		...chartOptions.value,
		...{
			series: newValue
		}
	}
})
</script>
