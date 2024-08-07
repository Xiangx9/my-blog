<template>
  <div style="text-align: center;">
    <HelloWorld></HelloWorld>
    <br>--------------------------------------------------<br>
    <div class="text">
      pinia {{ counter.count }} {{ counter.doubleCount }}
    </div>
    <br>---------------------------------------------------<br>
    <el-button type="primary" @click="goParent()">{{ $t(`table.Parent`) }}</el-button>
    <el-button type="success" @click="goTailwindCSS()">{{ $t(`table.TailwindCSS`) }}</el-button>
  </div>
</template>

<script setup>
import './index.scss'

import { useRouter } from 'vue-router'
const router = useRouter()
import HelloWorld from '@/components/HelloWorld.vue'
import useCounterStore from '@/store/counter.js'

//pinia
const counter = useCounterStore()

// 跳转
const goParent = () => {
  router.push({
    path: '/parent',
    query: { id: 1 }
  })
}

const goTailwindCSS = () => {
  router.push({
    name: 'TailwindCSS',
    params: { id: 1 }
  })
}






</script>

<style scope lang="scss"></style>