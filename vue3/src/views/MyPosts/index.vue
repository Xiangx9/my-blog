<template>
  <!-- 添加分类/添加标签 -->
  <div class="add">
    <el-button type="success" plain @click="dialogCategory = true">{{ $t('btn.Category') }}</el-button>
    <el-button type="success" plain @click="dialogTags = true">{{ $t('btn.tags') }}</el-button>
  </div>

  <!-- 添加分类 -->
  <el-dialog v-model="dialogCategory" @close="CategoryForm.CategoryName = ''">
    <el-form :model="CategoryForm" ref="CategoryRef">
      <el-form-item :label="$t('table.CategoryName')" prop="CategoryName" :rules="[
        { required: true, message: '请输入分类名称', trigger: 'blur' },
      ]">
        <el-input v-model="CategoryForm.CategoryName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddCategorys(CategoryRef)">{{ $t('btn.confirm') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 添加标签 -->
  <el-dialog v-model="dialogTags" @close="tagForm.tagName = ''">
    <el-form :model="tagForm" ref="tagRef">
      <el-form-item :label="$t('table.tagName')" prop="tagName" :rules="[
        { required: true, message: '请输入标签名称', trigger: 'blur' },
      ]">
        <el-input v-model="tagForm.tagName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Addtags(tagRef)">{{ $t('btn.confirm') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 分类/标签查询下拉框 -->
  <div class="add">
    <el-select @change="CategoryChange" v-model="query.CategoryID" clearable placeholder="按分类查询" size="large"
      style="width: 200px;margin:0 10px">
      <el-option v-for="item in CategoryLists" :key="item._id" :label="item.name" :value="item._id" />
    </el-select>
    <el-select @change="TagsChange" v-model="query.TagsID" clearable placeholder="按标签查询" size="large"
      style="width: 200px;margin:0 10px;">
      <el-option v-for="item in TagLists" :key="item._id" :label="item.name" :value="item._id" />
    </el-select>
  </div>

  <!-- 文章 -->
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
    <h2 style="margin: 0 auto;text-align: center;">{{ item.title }}</h2>
    <p style="max-height: 200px; overflow: auto;">{{ item.content }}</p>
    <div class="bottom">
      <el-button type="primary" :icon="Edit" plain @click="EditPostVisible(item)" style="margin: 0 10px;">
        {{ $t('btn.updated') }}
      </el-button>
      <el-button type="danger" plain :icon="Delete" @click="DeletePost(item)">{{ $t('btn.delete') }}</el-button>
    </div>
  </el-card>

  <!-- 编辑文章 -->
  <el-dialog v-model="dialogVisible" :title="$t('table.tip')" width="500" @close="close" destroy-on-close>
    <el-form ref="formRef" style="max-width: 600px" :model="Form" label-width="auto" class="demo-ruleForm"
      :rules="Rules">
      <el-form-item :label="$t('table.title')" prop="title">
        <el-input v-model="Form.title" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('table.content')" prop="content">
        <el-input v-model="Form.content" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('table.CategoryName')" prop="categories">
        <el-select v-model="Form.categories" placeholder="选择分类" size="large" clearable
          style="width: 200px;margin:0 10px">
          <el-option v-for="item in CategoryLists" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.tagName')" prop="tags">
        <el-select v-model="Form.tags" placeholder="选择标签" size="large" clearable style="width: 200px;margin:0 10px;">
          <el-option v-for="item in TagLists" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
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
import { ref, reactive } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { GetPosts, DeletePosts, EditPosts, AddCategory, AddTag, GetTag, GetCategory } from './api'
import tokenStore from '@/store/token'
let user = tokenStore().user
console.log(user);


// 查询参数
const query = reactive({
  CategoryID: '',
  TagsID: ''
})

const CategoryChange = (e) => {
  console.log(e);
  getPosts()
}

const TagsChange = (e) => {
  console.log(e);
  getPosts()
}

// 获取文章
const loading = ref(true)
let PostLists = ref([])
const getPosts = async () => {
  try {
    let params = {
      author_id: user._id,
      CategoryID: query.CategoryID,
      TagsID: query.TagsID
    }

    const { data: res } = await GetPosts(params)
    console.log("获取文章", res.data)
    PostLists.value = res.data
    setTimeout(() => {
      loading.value = false
    }, 1000)
  } catch (error) {
    console.log('MyPosts页面获取数据失败', error);
  }
}
getPosts()

// 编辑弹出层
const dialogVisible = ref(false)
const formRef = ref()
const Form = ref({
  title: '',
  content: '',
  categories: '',
  tags: '',
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
  Form.value = {}
  dialogVisible.value = false
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
  Form.value = Object.assign({}, item)
  Form.value.categories = item.categories[0]._id
  Form.value.tags = item.tags[0]._id
  console.log(Form.value);

  dialogVisible.value = true
}
const EditPost = async (item) => {
  try {
    // let params = Object.assign({ id: item._id, }, item)
    let params = {
      id: item._id,
      title: item.title,
      content: item.content,
      tags: item.tags,
      categories: item.categories
    }
    console.log(params);

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


// 添加分类
const CategoryRef = ref()
const dialogCategory = ref(false)
const CategoryForm = ref({
  CategoryName: '',
})
const AddCategorys = (formEl) => {
  try {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        let params = {
          name: CategoryForm.value.CategoryName
        }
        const { data: res } = await AddCategory(params)
        await getCategory()
        dialogCategory.value = false
      } else {
        console.log('error submit!')
      }
    })
  } catch (error) {
    console.log('添加分类失败', error);
  }
}


// 添加标签
const tagRef = ref()
const dialogTags = ref(false)
const tagForm = ref({
  tagName: '',
})
const Addtags = (formEl) => {
  try {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        console.log(valid);
        let params = {
          name: tagForm.value.tagName
        }
        const { data: res } = await AddTag(params)
        await getTag()
        dialogTags.value = false
      } else {
        console.log('error submit!')
      }
    })

  } catch (error) {
    console.log('添加标签失败', error);
  }
}

</script>

<style scope lang="scss"></style>