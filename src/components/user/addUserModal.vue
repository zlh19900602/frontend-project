<template>
  <el-dialog class="u-modal" v-model="isShowModal" title="新建用户" width="650" draggable overflow @close="handleCloseModal">
    <el-form ref="userForm" :model="form" :rules="rules" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名：" prop="uName">
            <el-input v-model="form.uName" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别：" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio value="1">男</el-radio>
              <el-radio value="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入11位手机号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户状态：">
            <el-select v-model="form.state" placeholder="please select your zone">
              <el-option label="正常" value="1" />
              <el-option label="禁用" value="2" />
              <el-option label="注销" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCloseModal">取消</el-button>
        <el-button type="primary" @click="saveUserHandle">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineEmits, ref, watch } from 'vue'
import axios from 'axios'

const emit = defineEmits(['closeAddModal'])

const props = defineProps(['visible'])

const isShowModal = ref(false)

watch(
  () => props.visible,
  (val) => {
    isShowModal.value = val
  },
  { immediate: true }
)

const handleCloseModal = () => {
  emit('closeAddModal', '子组件通知父组件了')
}

const saveUserHandle = () => {
  userForm.value.validate((valid) => {
    if (valid) {
      console.info(form.value, 'value')
      submitForm().then(() => {
        handleCloseModal()
      }).catch(error => {
        console.error('Error:', error)
      })
    }
  })
}

const submitForm = () => {
  return axios.post('/api/insertUser', form.value).then(response => {
    ElMessage({
      message: response.data.message,
      type: 'success',
    })
  })
}

const userForm = ref(null)

const form = ref({
  userName: '',
  uName: '',
  gender: '1',
  mobile: '',
  state: '1'
})

const rules = ref({
  userName: [{ required: true, message: '用户名不能为空', trigger: 'change' }],
  mobile: [
    { required: true, message: '手机号不能为空', trigger: 'change' },
    { pattern: /^[0-9]{11}$/, message: '手机号只能是11位数字', trigger: 'change' }
  ]
})
</script>
<style scoped></style>
