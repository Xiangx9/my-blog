import { defineStore } from "pinia";
// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示 例如：counter
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 1,
    };
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++;
      }, 1000);
    },
  },
  // 所有数据持久化
  // persist: true,
  // 持久化存储插件其他配置
  persist: {
    enabled: true, // 是否开启此模块的数据持久化
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'counter',
    // 修改为 sessionStorage，默认为 localStorage
    storage: window.sessionStorage,
    // // 默认所有 state 都会进行缓存，你能够通过 paths 指定要长久化的字段，其余的则不会进行持久化
    paths: ['count'],
  },
});

export default useCounterStore;
