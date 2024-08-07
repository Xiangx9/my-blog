//主题色
import { defineStore } from "pinia";
const themeStore = defineStore("theme", {
  state: () => {
    return {
      theme: '', //主题色
    };
  },
  getters: {
  },
  actions: {

  },
  persist: {
    enabled: true, // 开启持久化
    key: 'theme',
    storage: window.localStorage,
    paths: ['theme'],
  },
});

export default themeStore;
