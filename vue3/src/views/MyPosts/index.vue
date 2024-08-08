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
    <p class="mx-1">{{ item.content }}</p>
    <div class="bottom">
      <el-button type="primary" :icon="Edit" plain @click="EditPostVisible(item)" style="margin: 0 10px;">
        {{ $t('btn.updated') }}
      </el-button>
      <el-button type="danger" plain :icon="Delete" @click="DeletePost(item)">{{ $t('btn.delete') }}</el-button>
    </div>
  </el-card>

  <el-dialog v-model="dialogVisible" :title="$t('table.tip')" width="500" @close="close" destroy-on-close>
    <el-form ref="formRef" style="max-width: 600px" :model="Form" label-width="auto" class="demo-ruleForm"
      :rules="Rules">
      <el-form-item :label="$t('table.title')" prop="title">
        <el-input v-model="Form.title" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('table.content')" prop="content">
        <el-input v-model="Form.content" type="textarea" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('btn.cancel') }}</el-button>
        <el-button type="primary" @click="updated(formRef)">
          {{ $t('btn.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>

<script setup>
import './index.scss'
import { ref, } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { GetPosts, DeletePosts, EditPosts } from './api'
import tokenStore from '@/store/token'
let { user } = JSON.parse(tokenStore().user)

// 获取文章
const loading = ref(true)
let PostLists = ref([])
const getPosts = async () => {
  try {
    let params = {
      author_id: user._id
    }

    const { data: res } = await GetPosts(params)
    // console.log(res.data)
    PostLists.value = res.data
    setTimeout(() => {
      loading.value = false
    }, 1000)
  } catch (error) {
    console.log('MyPosts页面获取数据失败', error);
  }
}
getPosts()

// 弹出层
const dialogVisible = ref(false)
const formRef = ref()
const Form = ref({
  title: '',
  content: '',
})

const Rules = ref({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
})

const close = () => {
  Form.value = {
    title: '',
    content: '',
  }
}

const updated = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      EditPost(Form.value)
    } else {
      console.log('error submit!')
    }
  })

}

// 编辑文章
const EditPostVisible = (item) => {
  Form.value = item
  dialogVisible.value = true
}
const EditPost = async (item) => {
  try {
    let params = {
      id: item._id,
      title: item.title,
      content: item.content
    }
    const { data: res } = await EditPosts(params)
    await getPosts()
    dialogVisible.value = false
  } catch (error) {
    console.log('编辑文章失败', error)
  }
}

// 删除文章
const DeletePost = async (item) => {
  try {
    let params = {
      id: item._id
    }
    const { data: res } = await DeletePosts(params)
    getPosts()
  } catch (error) {
    console.log('删除文章失败', error);
  }
}


</script>

<style scope lang="scss"></style>