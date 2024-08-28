<template>
  <el-menu active-text-color="#ffd04b" background-color="#092847" text-color="#fff" :default-active="activeMenu" class="el-menu-vertical-demo side-menu" router>
    <template v-for="route in menuRoutes" :key="route.path">
      <!-- 一级菜单 -->
      <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
        <template #title>
          <el-icon>
            <component :is="getIconComponent(route.meta.icon)" />
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item v-for="childRoute in route.children" :key="childRoute.path" :index="`${route.path}/${childRoute.path}`">
          {{ childRoute.meta.title }}
        </el-menu-item>
      </el-sub-menu>
      <!-- 只有一级菜单 -->
      <el-menu-item v-else :index="route.path">
        <el-icon>
          <component :is="getIconComponent(route.meta.icon)" />
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup>

import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const router = useRouter()
const route = useRoute()

// 获取需要在菜单中展示的路由
const menuRoutes = computed(() => {
  const homeRoute = router.options.routes.find((r) => r.name === 'dashboard');
  return homeRoute && homeRoute.children ? homeRoute.children : [];
})

// 当前激活的菜单项
const activeMenu = computed(() => route.path);

// 动态获取图标组件
const getIconComponent = (iconName) => {
  return ElementPlusIconsVue[iconName];
};

</script>
<style scoped>
.side-menu {
  height: 100vh;
}
</style>