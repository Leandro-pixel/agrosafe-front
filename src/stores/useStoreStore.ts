import { defineStore } from 'pinia';
import { EC, Store } from 'src/models/store';
import FetchStoreByIdUseCase from 'src/usecases/fetchStoreByIdUseCase';
import FetchStoresUseCase from 'src/usecases/fetchStoresUseCase';
import { StoreRepository } from 'src/repositories/storeRepository';
import DisableStoreUseCase from 'src/usecases/disableStoreUseCase';
import CreateStoreUseCase from 'src/usecases/createStoreUseCase';
import ActivateStoreUseCase from 'src/usecases/activateStoreUseCase';

const repository = new StoreRepository();
const fetchStoreByIdUseCase = new FetchStoreByIdUseCase(repository);
const fetchStoresUseCase = new FetchStoresUseCase(repository);
const createStoreUseCase = new CreateStoreUseCase(repository);
const activateStoreUseCase = new ActivateStoreUseCase(repository);
const disableStoreUseCase = new DisableStoreUseCase(repository);

export const useStoreStore = defineStore('store', {
  state: () => ({
    stores: [] as Store[],
    totalItemsInDB: 0,
  }),
  getters: {
    getStores: (state) => state.stores,
  },
  actions: {
    async activateStore(storeId: string) {
      return await activateStoreUseCase.execute(storeId);
    },
    async disableStore(storeId: string) {
      return await disableStoreUseCase.execute(storeId);
    },
    async fetchStores(limit: number, offset: number, filter: string) {
      console.log('veio aqui')
      const response = await fetchStoresUseCase.execute(limit, offset, filter);
      console.log('voltou')
      this.stores = response.data;
      this.totalItemsInDB = response.totalItems;
    },
    async createStore(store: Store) {
      return await createStoreUseCase.execute(store);
    },
    async createEC(store: EC) {
      return await createStoreUseCase.executeEC(store);
    },
    async fetchStoreById(id: string) {
      return await fetchStoreByIdUseCase.execute(id);
    },
  },
});
