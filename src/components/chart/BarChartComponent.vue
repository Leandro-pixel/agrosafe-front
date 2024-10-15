<template>
	<div class="half-width q-pa-md">
		<q-card class="full-width default-box-shadow q-pa-md big-border-radius">
			<q-circular-progress
				indeterminate
				rounded
				color="primary"
				v-if="loading"
				/>
			<vue-apex-charts
				v-else-if="series.length > 0"
				:width="width"
				:type="type"
				:options="chartOptions"
				:series="series"
				:title="title"
				/>
			<div v-else class="text-h6 text-center column justify-center items-center" style="height:500px">
				<p>Ainda não há dados para exibir o gráfico</p>
				<q-icon size="md" name="sentiment_dissatisfied" color="primary"/>
			</div>
		</q-card>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
const props = defineProps({
	title: {
		type: String,
		required: true
	},
	xaxis: {
		type: Array as () => Array<string>,
		required: true
	},
	series: {
		type: Array as () => Array<{ name: string; type: string; data: string[] }>,
		required: true
	},
	width: {
		type: String,
		default: '100%'
	},
	type: {
		type: String,
		default: 'bar'
	},
	colors: {
		type: Array as () => Array<string>,
		default: () => ['#546E7A']
	},
	yTitle: {
		type: Array as () => Array<string>,
		default: () => ['R$']
	},
	theme: {
		type: String,
		default: 'dark'
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const chartOptions = ref({
	colors: props.colors,
	theme: {
		mode: props.theme
	},
	chart: {
		background: 'transparent',
		locales: [{
			name: 'pt-br',
			options: {
				toolbar: {
					exportToSVG: 'Baixar SVG',
					exportToPNG: 'Baixar PNG',
					exportToCSV: 'Baixar CSV',
					menu: 'Menu',
					selection: 'Selecionar',
					selectionZoom: 'Selecionar Zoom',
					zoomIn: 'Aumentar',
					zoomOut: 'Diminuir',
					pan: 'Navegação',
					reset: 'Reiniciar Zoom'
				}
			}
		}
		],
		defaultLocale: 'pt-br',
		type: props.type,
		dropShadow: {
			enabled: true,
			top: 0,
			left: 0,
			blur: 3,
			opacity: 0.5
		}
	},
	plotOptions: {
		bar: {
			borderRadius: 5,
			borderRadiusApplication: 'end', // 'around', 'end'
			horizontal: false,
			columnHeight: '80%',
			columnWidth: '30%'
		}
	},
	dataLabels: {
		enabled: true,
		enabledOnSeries: [1]
	},
	xaxis: {
		categories: props.xaxis
	},
	yaxis:
		{
			title: {
				text: props.yTitle[0],
				style: {
					color: props.colors[0]
				}
			}
		},
	title: {
		text: props.title,
		align: 'center',
		style: {
			fontSize: '16px',
			color: props.colors[0]
		}
	}
})

watch(() => props.xaxis, (newValue) => {
	chartOptions.value = {
		...chartOptions.value,
		...{
			xaxis: {
				categories: newValue
			}
		}
	}
})
</script>
