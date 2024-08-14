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
      <el-form-item :label="$t('table.CategoryName')" prop="categories">
        <el-select v-model="AddForm.categories" placeholder="选择分类" size="large" clearable
          style="width: 200px;margin:0 10px">
          <el-option v-for="item in CategoryLists" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.tagName')" prop="tags">
        <el-select v-model="AddForm.tags" placeholder="选择标签" size="large" clearable style="width: 200px;margin:0 10px;">
          <el-option v-for="item in TagLists" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="margin: 0 auto;" type="primary" @click="Add(formRef)">{{ $t('btn.addPosts') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import './index.scss'
import { addPosts, GetTag, GetCategory } from './api'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import tokenStore from '@/store/token'
let user = tokenStore().user
const router = useRouter()

const formRef = ref()
const AddForm = reactive({
  title: '',
  content: '',
  categories: '',
  tags: '',
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
      let users = {
        author_id: user._id,
        author_name: user.username,
      }
      let params = { ...AddForm, ...users }
      const { data: res } = await addPosts(params)
      console.log(res.data);

      router.push('/')
    } else {
      console.log('error submit!')
    }
  })

}

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


</script>

<style scope lang="scss"></style>