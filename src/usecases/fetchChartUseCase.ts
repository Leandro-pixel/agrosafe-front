import ChartRepository from 'src/repositories/chartRepository'

export class FetchChartUseCase {
	constructor (private repository: ChartRepository) {
		this.repository = repository
	}

	async execute () {
		return await this.repository.fetchChart()
	}
}
