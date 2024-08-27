<template>
  <div>
    <div>
      <el-form :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input v-model="form.userName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户状态">
              <el-select v-model="form.status" placeholder="please select your zone">
                <el-option label="正常" value="1" />
                <el-option label="禁用" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="u-f-btngroup">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button>重置</el-button>
        </div>
      </el-form>
    </div>
    <el-table class="s-u-table" :border="true" :align="center" :header-cell-style="headerCellStyle" :data="tableData" style="width: 100%">
      <el-table-column v-for="item in columns" :fixed="item.isFixed" :prop="item.prop" :label="item.label" :width="item.width" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            查看详情
          </el-button>
          <el-button link type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const handleClick = () => {
  console.log('click')
}

const handleQuery = () => {
  console.log('submit!')
}

const columns = ref([
  { prop: 'userId', label: '用户ID', width: 120, isFixed: true },
  { prop: 'userName', label: '用户名', width: 120 },
  { prop: 'status', label: '状态', width: 120 },
  { prop: 'createTime', label: '创建时间', width: 200 },
  { prop: 'updateTime', label: '修改时间', width: 200 },
])
const form = ref({
  userName: '',
  status: '1',
  desc: ''
})
const tableData = [
  {
    userId: 'U10001',
    userName: '张三',
    status: '正常',
    createTime: '2023-08-18 12:00:00',
    updateTime: '2024-03-20 15:40:00'
  },
  {
    userId: 'U10002',
    userName: '李四',
    status: '正常',
    createTime: '2023-12-18 09:00:00',
    updateTime: '2024-05-20 18:40:00'
  },
  {
    userId: 'U10003',
    userName: '王五',
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
</style>