import { defineStore } from "pinia";
const tokenStore = defineStore("user", {
  state: () => {
    return {
        token: '',
        refreshToken:'',
        user:{}
    };
  },
  getters: {
    setToken: (state) => {
      // console.log(state); // 获取state中的user
    }
  },
  actions: {

  },
  persist: {
    enabled: true, // 开启持久化
    key: 'user',
    storage: window.localStorage,
    paths: ["token","refreshToken","user"],
  },
});

export default tokenStore;
