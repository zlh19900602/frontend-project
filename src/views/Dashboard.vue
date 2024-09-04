<template>
  <el-container class="">
    <el-aside width="200px">
      <SideMenu />
    </el-aside>
    <el-container>
      <el-header class="sys-header">
        <el-breadcrumb separator="/" class="sys-breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="item.path">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="sys-right">
          <el-button link type="primary" size="small" @click="updatePwdHandle">更改密码</el-button>
          <img src="../image/login/exit.jpg" class="exit-icon" @click="exitSysHandle" />
        </div>
      </el-header>
      <el-main class="sys-main">
        <router-view />
      </el-main>
    </el-container>
    <updatePwd v-if="showModal" :visible.sync="showModal" @closeModal="closeModalHandle">
    </updatePwd>
  </el-container>
</template>

<script setup>
import updatePwd from '../components/updatePwd.vue'
import SideMenu from '../components/SideMenu.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 获取当前路由信息
const route = useRoute()
const router = useRouter()

// 动态生成面包屑导航
const breadcrumbs = computed(() => {
  const matched = route.matched.filter((r) => r.meta && r.meta.title) // 过滤出有title的路由
  return matched.map((route) => {
    return {
      path: route.path,
      meta: route.meta
    }
  })
})
const showModal = ref(false);
const closeModalHandle = () => {
  showModal.value = false;
}

const exitSysHandle = () => {
  localStorage.removeItem('userInfo');
  router.push('/')
}

const updatePwdHandle = () => {
  showModal.value = true;
}
</script>
<style scoped>
.sys-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sys-header,
.sys-breadcrumb {
  height: 40px;
  line-height: 40px;
  background: #eee;
}

.exit-icon {
  width: 30px;
  height: 30px;
  padding-left: 10px;
}

.sys-right {
  display: flex;
}

.sys-main {
  padding-top: 0;
  background: #eee;
  margin-top: 10px;
}
</style>
