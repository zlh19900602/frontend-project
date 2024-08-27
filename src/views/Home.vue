<template>
  <el-container class="">
    <el-aside width="200px">
      <SideMenu  />
    </el-aside>
    <el-container>
      <el-header class="sys-header">
        <el-breadcrumb separator="/" class="sys-breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="item.path">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import SideMenu  from '../components/SideMenu.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 获取当前路由信息
const route = useRoute();

// 动态生成面包屑导航
const breadcrumbs = computed(() => {
  const matched = route.matched.filter(r => r.meta && r.meta.title); // 过滤出有title的路由
  return matched.map(route => {
    return {
      path: route.path,
      meta: route.meta
    };
  });
});
</script>
<style scoped>
.sys-header, .sys-breadcrumb {
  height: 40px;
  line-height: 40px;
  background: #eee;
}
</style>