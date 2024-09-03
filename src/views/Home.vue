<template>
  <el-row :gutter="20">
    <el-col :span="14" class="quick-entry">
      <h3 class="quick-entry-title">快捷入口</h3>
      <ul class="quick-entry-card">
        <li class="card-wrap" v-for="item in cardList" @click="toJumpHandle(item)">
          <el-icon>
            <component :is="getIconComponent(item.icon)" />
          </el-icon>
          {{ item.name }}
        </li>
      </ul>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const cardList = ref([
  { name: '用户管理', path: 'user-manage', icon: 'UserFilled' },
  { name: '菜单管理', path: 'menu-manage', icon: 'Menu' },
  { name: '参数管理', path: 'param-manage', icon: 'Tools' },
  { name: '角色管理', path: 'role-manage', icon: 'Avatar' },
])

const toJumpHandle = (data) => {
  router.push({ name: data.path })
}

// 动态获取图标组件
const getIconComponent = (iconName) => {
  return ElementPlusIconsVue[iconName]
}
</script>
<style scoped>
.quick-entry {
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  background: #fff;
}

.quick-entry-title {
  font-size: 16px;
  padding-bottom: 10px;
}

/deep/ .el-card__body {
  display: flex;
  width: 100%;
}

.quick-entry-card {
  display: flex;
  padding-top: 10px;
}

.card-wrap {
  flex: 1;
  text-align: center;
  color: #202020;
}
</style>