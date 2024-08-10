<template>
  <div class="content">
    <div class="login-container">
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <h1>{{ $t('login.title') }}</h1>
        <el-form-item :label="$t('login.username')" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>

        <el-form-item :label="$t('login.password')" prop="password">
          <el-input v-model="ruleForm.password" type="password" show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            {{ $t('login.login') }}
          </el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>

</template>

<script setup>
import './index.scss'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import tokenStore from '@/store/token.js'
import { Logins } from '@/api/api'
const router = useRouter()
const store = tokenStore()
const { register, login } = Logins


const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [
    { required: true, message: 'Please input  username', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please select  password', trigger: 'blur', },
  ],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', valid, ruleForm)
      let pram = {
        username: ruleForm.username,
        password: ruleForm.password,
        email: ruleForm.username
      }
      loginss(pram)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const loginss = (pram) => {
  login(pram).then(res => {
    let user = res.data
    if (res.data.message == "该用户未注册") {
      registers(pram)
    } else {
      store.user = user.user
      store.token = user.token
      store.refreshToken = user.refreshToken
      router.replace('/')
    }
  })
}
const registers = (pram) => {
  register(pram).then(res => {
    loginss(pram)
  })
}
</script>

<style scope lang="scss"></style>