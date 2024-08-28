import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import MenuManage from '../views/SysManage/MenuManage.vue'
import RoleManage from '../views/SysManage/RoleManage.vue'
import ParamManage from '../views/SysManage/ParamManage.vue'
import UserManage from '../views/SysManage/UserManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { title: '首页', icon: 'HomeFilled' },
        },
        {
          path: '/sys-manage',
          name: 'sys-manage',
          meta: { title: '系统管理', icon: 'UserFilled' },
          children: [
            {
              path: 'user-manage',
              name: 'user-manage',
              component: UserManage,
              meta: { title: '用户管理' }
            },
            {
              path: 'menu-manage',
              name: 'menu-manage',
              component: MenuManage,
              meta: { title: '菜单管理' }
            },
            {
              path: 'param-manage',
              name: 'param-manage',
              component: ParamManage,
              meta: { title: '参数管理' }
            },
            {
              path: 'role-manage',
              name: 'role-manage',
              component: RoleManage,
              meta: { title: '角色管理' }
            }
          ],
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
