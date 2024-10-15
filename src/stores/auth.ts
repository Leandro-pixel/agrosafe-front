import { defineStore } from 'pinia';

interface User { //tipagem
  name: string;
  password: string;
}

interface AuthStoreState {
  user: User|false
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    user: false
  }),

  getters: {
    name (state) {
      return state.user ? state.user.name : ''
    },
    password (state) {
      return state.user ? state.user.password : ''
    }
  },

  actions: {
    login (username: string, password: string): User|false {
      this.user = false
      if (username === 'admin' && password === '123') {
        this.user = {
          name: 'administrator',
          password: '123'
        }
      }
      return this.user
    },
    loggout () {
      this.user = false
    }
  }
});
