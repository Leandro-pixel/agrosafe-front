import { defineStore } from 'pinia';
import { UserCard } from 'src/models/userCard';
import { UserCardRepository } from 'src/repositories/userCardRepository';
import FetchUserCardsUseCase from 'src/usecases/fetchUserCardUseCase';

const repository = new UserCardRepository();
const fetchUserCardsUseCase = new FetchUserCardsUseCase(repository);

export const useUserCardsStore = defineStore('userCard', {
  state: () => ({
    cards: [] as UserCard[],
    totalItemsInDB: 0,
  }),
  getters: {
    getCards: (state) => state.cards,
  },
  actions: {
    async fetchUserCards(
      userId?: number,
    cardId?: number
    ) {
      const response = await fetchUserCardsUseCase.execute(
        userId,
        cardId
      );
      console.log('voltou');
      this.cards = response.data;
      this.totalItemsInDB = response.totalItems;
    },
  },
});
