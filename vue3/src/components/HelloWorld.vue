<template>
  {{ $t('table.HelloWorld') }}
</template>
<script setup>
import { onMounted } from 'vue'
import { Logins } from '../api/api'
import tokenStore from '@/store/token.js'

//登录
const GoLogin = async () => {
  const pram = {
    user_name: "x2",
    password: '123456'
  }
  const { data: res } = await Logins.register(pram)
  tokenStore().token = res.result.token
}
onMounted(() => {
  // GoLogin()
})
</script>
<style scoped></style>
