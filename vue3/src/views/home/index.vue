<template>
  <div class="arrow-box">
    <div class="triangular"></div>
  </div>
  <div class="add">
    <el-select @change="getPosts()" v-model="filters.CategoryID" clearable placeholder="按分类查询" size="large"
      style="width: 200px;margin:0 10px">
      <el-option v-for="item in CategoryLists" :key="item._id" :label="item.name" :value="item._id" />
    </el-select>
    <el-select @change="getPosts()" v-model="filters.TagsID" clearable placeholder="按标签查询" size="large"
      style="width: 200px;margin:0 10px;">
      <el-option v-for="item in TagLists" :key="item._id" :label="item.name" :value="item._id" />
    </el-select>
  </div>
  <el-skeleton :loading="loading" :rows="5" animated style="max-width: 480px;margin: 0 auto;" />
  <el-card v-if="!loading" class="home" v-for="item in PostLists" :key="item.id" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span>{{ item.author_name }}</span>
        <el-tag type="primary" v-for="item in item.categories" style="margin: 0 10px;">{{ item.name }}</el-tag>
        <el-tag type="primary" v-for="item in item.tags" style="margin: 0 10px;">{{ item.name }}</el-tag>
      </div>
    </template>
    <div @click="goPostsDetail(item)">
      <h2 style="margin: 0 auto;text-align: center;">{{ item.title }}</h2>
      <p style="cursor: pointer;">{{ item.content }}</p>
    </div>
  </el-card>
</template>

<script setup>
import './index.scss'
import { ref, reactive } from 'vue'
import { GetPosts, GetCategory, GetTag } from './api'
import { useRouter } from 'vue-router'
const router = useRouter()

// 分类查询
const filters = reactive({
  CategoryID: '',
  TagsID: ''
})

// 获取文章
const loading = ref(true)
let PostLists = ref([])
const getPosts = async () => {
  try {
    let params = {
      CategoryID: filters.CategoryID,
      TagsID: filters.TagsID
    }
    const { data: res } = await GetPosts(params)
    // console.log(res.data)
    PostLists.value = res.data
    setTimeout(() => {
      loading.value = false
    }, 1000)
  } catch (error) {
    console.log('home页面获取数据失败', error);
  }
}
getPosts()

// 获取分类
const CategoryLists = ref([])
const getCategory = async () => {
  try {
    const { data: res } = await GetCategory()
    CategoryLists.value = res
  } catch (error) {
    console.log('获取分类失败', error);
  }
}
getCategory()

// 获取标签
const TagLists = ref([])
const getTag = async () => {
  try {
    const { data: res } = await GetTag()
    TagLists.value = res
  } catch (error) {
    console.log('获取标签失败', error);
  }
}
getTag()


// 去帖子详情页
const goPostsDetail = (item) => {
  router.push({
    path: '/PostsDetails',
    query: item
  })
}
</script>

<style scope lang="scss"></style>