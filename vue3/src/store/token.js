import { defineStore } from "pinia";
const tokenStore = defineStore("user", {
  state: () => {
    return {
        token: '',
        user:{}
    };
  },
  getters: {
    setToken: (state) => {
      // console.log(state.user); // 获取state中的user
      let token = JSON.parse(state.user).token;
     return state.token = token;
    }
  },
  actions: {

  },
  persist: {
    enabled: true, // 开启持久化
    key: 'user',
    storage: window.localStorage,
    paths: ['user'],
  },
});

export default tokenStore;
