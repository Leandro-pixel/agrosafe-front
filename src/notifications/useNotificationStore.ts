import { defineStore } from 'pinia';
import { Notifications } from 'src/models/notifications';
import { NotificationRepository } from 'src/repositories/notificationRepository';
import FetchNotificationUseCase from 'src/usecases/fetchNotificationUseCase';

const repository = new NotificationRepository();
const fetchNotificationUseCase = new FetchNotificationUseCase(repository);

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notifications[],
    totalItemsInDB: 0,
  }),
  getters: {
    getNotifications: (state) => state.notifications,
  },
  actions: {
    async fetchNotifications(limit: number, offset: number, filter: string) {
      console.log('veio aqui')
      const response = await fetchNotificationUseCase.execute(limit, offset, filter);
      console.log('voltou')
      this.notifications = response.data;
      this.totalItemsInDB = response.totalItems;
    },
  },
});
