import api from 'src/lib/api'
import Chart from '../models/chart'

class ChartRepository {
	fetchChart = async (): Promise<Chart> => {
		try {
			const data = await api.requestGet('/dashboard/sale')
			return Chart.fromJson(data)
		} catch (error: any) {
			throw new Error('Erro ao buscar dados do gráfico')
		}
	}
}

export default ChartRepository
