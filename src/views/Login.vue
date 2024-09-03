<template>
  <div class="login">
    <div class="login-body">
      <img class="login-img" src="../image/login/login-img.png" alt="login image" />
      <el-form ref="loginForm" class="login-form" :model="form" :rules="rules" label-width="auto"
        style="max-width: 300px">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="form.pwd" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item class="login-btn-wrap">
          <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <div class="update-pwd">
          <el-button link type="primary" size="small" @click="updatePwdHandle">更改密码</el-button>
        </div>
      </el-form>
    </div>
    <updatePwd v-if="showModal" :visible.sync="showModal" :userName.sync="form.name" @closeModal="closeModalHandle">
    </updatePwd>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import updatePwd from '../components/updatePwd.vue'
import axios from 'axios'

const router = useRouter()
const loginForm = ref(null)
const showModal = ref(false);

const form = ref({
  name: '',
  pwd: ''
})

const rules = {
  name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}

const updatePwdHandle = () => {
  showModal.value = true;
}

const closeModalHandle = () => {
  showModal.value = false;
}

const onSubmit = () => {
  loginForm.value.validate(valid => {
    if (valid) {
      let param = {
        userName: form.value.name,
        password: form.value.pwd
      }
      console.log(param, 'param')
      try {
        axios.post('/api/users/login', param).then(res => {
          console.log(res, 'resres')
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            ElMessage.success('登录成功')
            router.push({ name: 'home' })
          } else {
            ElMessage.error(res.data.message || '登录失败，请重试');
          }
        }).catch(err => {
          ElMessage.error(err.response.data.message || '登录失败，请重试');
        })
      } catch (error) {
        ElMessage.error('登录失败，请检查用户名或密码');
        console.error('登录失败：', error);
      }
    }
  })
}
</script>
<style>
.login {
  width: 100vw;
  height: 100vh;
  background: url(../image/login/bg.jpg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-body {
  width: 650px;
  height: 300px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
}

.login-img {
  width: 400px;
  height: 300px;
}

.login-form {
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-btn {
  width: 100%;
}

.login-btn-wrap {
  margin-bottom: 10px;
}

.update-pwd {
  display: flex;
  justify-content: center;
}
</style>
