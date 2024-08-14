<template>
  <div>
    <div class="content">
      <h1>{{ PostsDetails.title }}</h1>
      <h3>{{ PostsDetails.author_name }}</h3>
      <p>{{ PostsDetails.content }}</p>
    </div>
    <el-tag type="primary" v-for="item in PostsDetails.categories" style="margin: 0 10px;">{{ item.name }}</el-tag>
    <el-tag type="primary" v-for="item in PostsDetails.tags" style="margin: 0 10px;">{{ item.name }}</el-tag>
    <div style="height: 50px;"></div>
    <h2>评论区</h2>
    <div style="margin-bottom: 200px;">
      <div class="comments" v-for="item in CommentLists">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span>{{ item.author.username }}</span>
        <p>{{ item.content }}</p>
      </div>
    </div>

    <footer class="footer">
      <el-input v-model="content" type="textarea" autocomplete="off" />
      <el-button type="primary" @click="Add()">{{ $t('btn.comments') }}</el-button>
    </footer>
  </div>
</template>

<script setup>
import './index.scss'
import { getPostsDetails, addComment, getComments } from './api';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import tokenStore from "@/store/token.js";
const route = useRoute();
let store = tokenStore().user


// 获取文章详情
let PostsDetails = ref({});
const getPostsDetailsData = async () => {
  const { data: res } = await getPostsDetails(route.query._id);
  PostsDetails.value = res.data;
};

// 添加评论
const content = ref('');
const Add = async () => {
  try {
    console.log(content.value);
    let pram = {
      content: content.value,
      postId: route.query._id,
    }
    const { data: res } = await addComment(pram)
    await getCommentsData()
    console.log(res);
  } catch (error) {
    console.log('添加评论', error);
  }
};

// 获取评论
const CommentLists = ref([]);
const getCommentsData = async () => {
  const { data: res } = await getComments(route.query._id);
  CommentLists.value = res.data;
  console.log(res.data);
};

onMounted(() => {
  // console.log(route, route.query);
  getPostsDetailsData();
  getCommentsData()
});

</script>