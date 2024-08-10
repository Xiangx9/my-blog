<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import themeStore from '@/store/theme'
import { ElButton } from 'element-plus'

//i18n
const I18n = useI18n()
const { locale } = useI18n()
// 切换语言更改locale.value的值即可但要跟你index.js中message设置的值一致！
const translate = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}

const type = ref(themeStore().theme || 'light')
const onChange = (e) => {
  themeStore().theme = type.value
  document.documentElement.setAttribute('theme-mode', type.value)
}
onChange()
</script>

<template>
  <div class="nav">
    <div>
      <router-link to="/">
        <el-Button type="info">{{ $t('btn.home') }}</el-Button>
      </router-link>
      <router-link to="/AddPosts">
        <el-Button type="success" style="margin: 0 20px;">{{ $t('btn.addPosts') }}</el-Button>
      </router-link>
      <router-link to="/MyPosts">
        <el-Button type="primary">{{ $t('btn.myPosts') }}</el-Button>
      </router-link>
    </div>
    <div class="selects">
      <el-select style="width: 80px;" v-model="locale" @change="translate">
        <el-option label="zh-cn" value="zh-cn" />
        <el-option label="en-us" value="en-us" />
      </el-select>
      <el-select style="width: 80px;margin: 10px;" v-model="type" @change="onChange">
        <el-option label="light" value="light" />
        <el-option label="dark" value="dark" />
        <el-option label="red" value="red" />
      </el-select>
    </div>
  </div>


  <!-- <keep-alive> -->
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- </keep-alive> -->
</template>

<style scoped lang="scss">
.nav {
  width: 100%;
  height: 50px;
  background-color: var(--bg-color);
  position: sticky;
  top: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.selects {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .nav {
    display: block;
    margin: 10px 0;
  }

  .nav .selects {
    display: none;
  }

}
</style>
