<template>
  <el-dialog class="u-modal" v-model="isShowModal" title="新建用户" width="650" draggable overflow @close="handleCloseModal">
    <el-form ref="userForm" :model="form" :rules="rules" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model="form.userName" :disabled="props.type == 'detail'" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名：" prop="uName">
            <el-input v-model="form.uName" :disabled="props.type == 'detail'" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别：" prop="gender">
            <el-radio-group v-model="form.gender" :disabled="props.type == 'detail'">
              <el-radio value="1">男</el-radio>
              <el-radio value="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="form.mobile" :disabled="props.type == 'detail'" placeholder="请输入11位手机号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户状态：">
            <el-select v-model="form.state" :disabled="props.type == 'detail'">
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
        <el-button type="primary" v-if="props.type !== 'detail'" @click="saveUserHandle">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineEmits, ref, watch, onMounted } from 'vue'
import axios from 'axios'

const emit = defineEmits(['closeAddModal', 'updateData'])

const props = defineProps(['visible', 'userInfo', 'type'])

const isShowModal = ref(false)

onMounted(() => {
  if (['detail', 'edit'].includes(props.type)) queryUserInfo()
})

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

const queryUserInfo = () => {
  axios.post('/api/users/queryUserById', { userId: props.userInfo.userId }).then(res => {
    form.value = res.data;
  })
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
  let param = props.type === 'add' ? form.value : { ...form.value, userId: props.userInfo.userId }

  let url = props.type === 'add' ? '/api/users/insertUser' : '/api/users/updateUserInfoById';
  return axios.post(url, param).then(response => {
    emit('updateData')
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
