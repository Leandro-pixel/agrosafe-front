import { defineStore } from 'pinia'
import Config from 'src/models/config'
import ConfigRepository from 'src/repositories/configRepository'
import { ref } from 'vue'

const repository = new ConfigRepository()

export const useConfigStore = defineStore('config', {
	state: () => ({
		config: ref(new Config())
	}),
	getters: {
		getConfig: (state) => state.config
	},
	actions: {
		fetchConfig (): void {
			if (this.config.tenantName === '') {
				this.config = repository.fetchConfig()
			}
		}
	}
})
