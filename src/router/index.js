import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserManage from '../views/UserManage.vue'
import MenuManage from '../views/MenuManage.vue'
import RoleManage from '../views/RoleManage.vue'
import UserList from '../views/userManage/UserList.vue'
import UserPermissions from '../views/userManage/UserPermissions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/user-manage',
          name: 'user-manage',
          meta: { title: '用户管理', icon: 'UserFilled' },
          children: [
            {
              path: 'user-list',
              name: 'user-list',
              component: UserList,
              meta: { title: '用户列表' }
            },
            {
              path: 'user-permissions',
              name: 'user-permissions',
              component: UserPermissions,
              meta: { title: '用户权限' }
            }
          ]
        },
        {
          path: '/menu-manage',
          name: 'menu-manage',
          component: MenuManage,
          meta: { title: '菜单管理', icon: 'Menu' }
        },
        {
          path: '/role-manage',
          name: 'role-manage',
          component: RoleManage,
          meta: { title: '角色管理', icon: 'Management' }
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
