<template>
  <div class="login">
    <div class="login-body">
      <img class="login-img" src="../image/login/login-img.png" alt="login image">
      <el-form ref="loginForm" class="login-form" :model="form" :rules="rules" label-width="auto" style="max-width: 300px">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="form.pwd" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus'

  const router = useRouter();
  const loginForm = ref(null);

  const form = ref({
    name: '',
    pwd: ''
  })

  const rules = {
    name: [
      { required: true, message: '用户名不能为空', trigger: 'blur'}
    ],
    pwd: [
      { required: true, message: '密码不能为空', trigger: 'blur'}
    ]
  }
  
  const onSubmit = () => {
    loginForm.value.validate(valid => {
      if (valid) {
        router.push({ name: 'home' });
      } else {
        // ElMessage.error('请正确填写表单');
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
.login-body{
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
</style>
