import './style.css'
import './theme/index.scss' 
import { createApp } from 'vue'
import router from './router'
import pinia from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './langurage'

// 持久化插件
pinia.use(piniaPluginPersistedstate);
// 创建app
const app = createApp(App)
// 注入
app.use(i18n)
app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 挂载实例
app.mount('#app')
