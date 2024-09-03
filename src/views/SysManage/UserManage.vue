<template>
  <div class="page-wrapper">
    <el-form :model="form" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名：">
            <el-input v-model="form.userName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号：">
            <el-input v-model="form.mobile" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户状态：">
            <el-select v-model="form.state" placeholder="please select your zone">
              <el-option label="正常" value="1" />
              <el-option label="禁用" value="2" />
              <el-option label="注销" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="u-f-btngroup">
        <el-button type="primary" @click="queryUserHandle">查询</el-button>
        <el-button>重置</el-button>
      </div>
    </el-form>
    <div class="u-f-opt-btngroup">
      <el-button type="danger" round @click="handleAddUser">新建用户</el-button>
    </div>
    <el-table class="s-u-table" :border="true" :header-cell-style="headerCellStyle" :data="tableData" style="width: 100%">
      <el-table-column align="center" v-for="item in columns" :fixed="item.isFixed" :prop="item.prop" :label="item.label"
        :width="item.width" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="queryUserInfoHandle(scope, 'detail')"> 详情 </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" size="small" @click="queryUserInfoHandle(scope, 'edit')">编辑</el-button>
          <template v-if="scope.row.state !== '禁用'">
            <el-divider direction="vertical" />
            <el-button link type="primary" size="small" @click="forbiddenHandle(scope, '2')">禁用</el-button>
          </template>
          <template v-if="scope.row.state !== '注销'">
            <el-divider direction="vertical" />
            <el-button link type="primary" size="small" @click="forbiddenHandle(scope, '0')">注销</el-button>
          </template>
          <el-divider direction="vertical" />
          <el-button link type="primary" size="small">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addUserModal v-if="showModal" :visible.sync="showModal" :userInfo.sync="currentUser" :type.sync="type"
      @closeAddModal="handleCloseModal" @updateData="queryUserHandle" />
  </div>
</template>

<script setup>
import addUserModal from '../../components/user/addUserModal.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
  queryUserHandle()
})

const queryUserHandle = () => {
  axios.post('/api/users/queryUser').then(res => {
    let data = res.data;
    tableData.value = data.map(item => {
      return {
        userName: item.userName,
        uName: item.uName,
        gender: item.gender == '2' ? '女' : '男',
        mobile: item.mobile,
        state: item.state == '1' ? '正常' : item.state == '2' ? '禁用' : '注销',
        createTime: item.createTime,
        updateTime: item.updateTime,
        userId: item.userId
      }
    })
  })
}

// 新建用户
const handleAddUser = () => {
  type.value = 'add'
  showModal.value = true;
}

const queryUserInfoHandle = (data, actionType) => {
  type.value = actionType
  currentUser.value = data.row;
  showModal.value = true;
}

const forbiddenHandle = (data, type) => {
  ElMessageBox.confirm(`您确认要更改为${type === '2' ? '禁用' : '注销'}状态吗?`, '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    updateUserState(data, type)
  }).catch(() => {

  })
}

const updateUserState = (data, type) => {
  if (type === '2') {
    axios.post('/api/users/updateStateForbiddenById', { userId: data.row.userId }).then(res => {
      if (res.data.code === '0') {
        ElMessage({
          message: '状态更新成功！',
          type: 'success',
        })
        queryUserHandle()
      } else {
        ElMessage.error('状态更新失败！')
      }
    })
  } else {
    axios.post('/api/users/updateStateLogoutById', { userId: data.row.userId }).then(res => {
      if (res.data.code === '0') {
        ElMessage({
          message: '状态更新成功！',
          type: 'success',
        })
        queryUserHandle()
      } else {
        ElMessage.error('状态更新失败！')
      }
    })
  }
}

const handleCloseModal = () => {
  showModal.value = false
}

const form = ref({
  userName: '',
  mobile: '',
  state: '1'
})
const showModal = ref(false);
const currentUser = ref(null);
const type = ref('');

const columns = ref([
  { prop: 'userName', label: '用户名', width: 100 },
  { prop: 'uName', label: '姓名', width: 100 },
  { prop: 'gender', label: '性别', width: 80 },
  { prop: 'mobile', label: '手机号', width: 120 },
  { prop: 'state', label: '状态', width: 80 },
  { prop: 'createTime', label: '创建时间', width: 180 },
  { prop: 'updateTime', label: '修改时间', width: 180 }
])

const tableData = ref([])

const headerCellStyle = {
  backgroundColor: '#e5e5e5', // 设置表头背景色
  color: '#333' // 设置表头字体颜色
}
</script>
<style scoped>
.u-f-btngroup {
  text-align: center;
  margin: 20px 0;
}

.u-f-opt-btngroup {
  margin-bottom: 20px;
}
</style>
