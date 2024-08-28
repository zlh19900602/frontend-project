<template>
  <div>
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
            <el-select v-model="form.status" placeholder="please select your zone">
              <el-option label="正常" value="1" />
              <el-option label="禁用" value="2" />
              <el-option label="注销" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="u-f-btngroup">
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button>重置</el-button>
      </div>
    </el-form>
    <div class="u-f-opt-btngroup">
      <el-button type="danger" round @click="HandleAddUser">新建用户</el-button>
    </div>
    <el-table class="s-u-table" :border="true" :header-cell-style="headerCellStyle" :data="tableData" style="width: 100%">
      <el-table-column v-for="item in columns" :fixed="item.isFixed" :prop="item.prop" :label="item.label" :width="item.width" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            详情
          </el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" size="small">编辑</el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" size="small">禁用</el-button>
          <el-divider direction="vertical" />
          <el-button link type="primary" size="small">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addUserModal v-if="showModal" :visible.sync="showModal" @closeAddModal="handleCloseModal"/>
  </div>
</template>

<script setup>
import addUserModal from '../../components/user/addUserModal.vue'
import { ref } from 'vue'

// 新建用户
const HandleAddUser = () => {
  showModal.value = true;
}

const handleClick = () => {
  console.log('click')
}

const handleCloseModal = () => {
  showModal.value = false;
}

const handleQuery = () => {
  console.log('submit!')
}

const form = ref({
  userName: '',
  mobile: '',
  status: '1'
})
const showModal = ref(false)

const columns = ref([
  { prop: 'userId', label: '用户ID', width: 120, isFixed: true },
  { prop: 'userName', label: '用户名', width: 100 },
  { prop: 'name', label: '姓名', width: 80 },
  { prop: 'gender', label: '性别', width: 80 },
  { prop: 'mobile', label: '手机号', width: 120 },
  { prop: 'status', label: '状态', width: 70 },
  { prop: 'createTime', label: '创建时间', width: 180 },
  { prop: 'updateTime', label: '修改时间', width: 180 },
])

const tableData = [
  {
    userId: 'U10001',
    userName: 'zhangs',
    name: '张三',
    gender: '女',
    mobile: '13325321223',
    status: '正常',
    createTime: '2023-08-18 12:00:00',
    updateTime: '2024-03-20 15:40:00'
  },
  {
    userId: 'U10002',
    userName: 'lis',
    name: '李四',
    gender: '男',
    mobile: '17313243332',
    status: '正常',
    createTime: '2023-12-18 09:00:00',
    updateTime: '2024-05-20 18:40:00'
  },
  {
    userId: 'U10003',
    userName: 'wangw',
    name: '王五',
    gender: '女',
    mobile: '15823432111',
    status: '注销',
    createTime: '2024-02-10 14:00:00',
    updateTime: '2024-03-20 10:40:00'
  },
]

const headerCellStyle = {
  backgroundColor: '#e5e5e5', // 设置表头背景色
  color: '#333'              // 设置表头字体颜色
};
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