<template>
  <el-skeleton :loading="loading" :rows="5" animated style="max-width: 480px;margin: 0 auto;" />
  <el-card v-if="!loading" class="home" v-for="item in PostLists" :key="item.id" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span>{{ item.author_name }}</span>
      </div>
    </template>
    <h2 style="margin: 0 auto;text-align: center;">{{ item.title }}</h2>
    <p>{{ item.content }}</p>
  </el-card>
</template>

<script setup>
import './index.scss'
import { ref, reactive } from 'vue'
import { GetPosts } from './api'


const loading = ref(true)
let PostLists = reactive([])
const getPosts = async () => {
  try {
    const { data: res } = await GetPosts()
    // console.log(res.data)
    PostLists = res.data
    setTimeout(() => {
      loading.value = false
    }, 1000)
  } catch (error) {
    console.log('home页面获取数据失败', error);
  }
}
getPosts()
</script>

<style scope lang="scss"></style>