import { defineStore } from 'pinia';
import { Supplier } from 'src/models/suplier';
import { SuplierRepository } from 'src/repositories/suplierRepository';
import ActivateSuplierUseCase from 'src/usecases/activateSuplierUseCase';
import FetchSuplierUseCase from 'src/usecases/fetchSuplierUseCase';
import CreateSuplierUseCase from 'src/usecases/createSuplierUseCase';
import DisableSuplierUseCase from 'src/usecases/disableSuplierUseCase';

const repository = new SuplierRepository();
const fetchSuplierUseCase = new FetchSuplierUseCase(repository);
const createSuplierUseCase = new CreateSuplierUseCase(repository);
const activateSuplierUseCase = new ActivateSuplierUseCase(repository);
const disableSuplierUseCase = new DisableSuplierUseCase(repository);

export const useSuplierStore = defineStore('suplier', {
  state: () => ({
    supliers: [] as Supplier[],
    totalItemsInDB: 0,
  }),
  getters: {
    getSuplier: (state) => state.supliers,
  },
  actions: {
    async activateSuplier(ecId: string, status: boolean) {
      return await activateSuplierUseCase.executeEC(ecId, status);
    },
    async disableSuplier(ecId: string) {
      return await disableSuplierUseCase.execute(ecId);
    },
    async fetchSupliers(limit: number, offset: number, filter: string) {
      console.log('veio aqui')
      const response = await fetchSuplierUseCase.executeSuplier(limit, offset, filter);
      console.log('voltou')
      this.supliers = response.data;
      this.totalItemsInDB = response.totalItems;
    },

    async fetchOneStore(id?: number, supplierStatus?: boolean) {
      console.log('veio aqui')
      return await fetchSuplierUseCase.executeFindOne(id, supplierStatus);
    },


    async createSuplier(suplier: Supplier) {
      return await createSuplierUseCase.executeSuplier(suplier);
    },
  },
});
