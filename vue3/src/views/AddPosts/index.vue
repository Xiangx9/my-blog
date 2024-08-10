<template>
  <div class="addPosts">
    <el-form ref="formRef" style="max-width: 600px" :model="AddForm" label-width="auto" class="demo-ruleForm"
      :rules="AddRules">
      <el-form-item :label="$t('table.title')" prop="title">
        <el-input v-model="AddForm.title" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('table.content')" prop="content">
        <el-input v-model="AddForm.content" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button style="margin: 0 auto;" type="primary" @click="Add(formRef)">{{ $t('btn.addPosts') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import './index.scss'
import { addPosts } from './api'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import tokenStore from '@/store/token'
let user = tokenStore().user
const router = useRouter()

const formRef = ref()
const AddForm = reactive({
  title: '',
  content: '',
})

const AddRules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
})

const Add = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let params = {
        title: AddForm.title,
        content: AddForm.content,
        author_id: user._id,
        author_name: user.username,
      }
      const { data: res } = await addPosts(params)
      console.log(res.data);

      router.push('/')
    } else {
      console.log('error submit!')
    }
  })

}




</script>

<style scope lang="scss"></style>