<template>
    <el-dialog class="u-modal" v-model="isShowModal" title="更改密码" width="450" draggable overflow @close="handleCloseModal">
        <el-form class="update-pwd-form" ref="userForm" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="旧密码：" prop="oldPwd">
                <el-input v-model="form.oldPwd" type="password" placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item label="新密码：" prop="newPwd">
                <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="确认密码：" prop="surePwd">
                <el-input v-model="form.surePwd" type="password" placeholder="请输入确认密码：" />
            </el-form-item>
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
import { ref, defineEmits, watch } from 'vue'
import axios from 'axios'

const props = defineProps(['visible'])
const emit = defineEmits(['closeModal', 'updateData'])

const isShowModal = ref(false)
const userForm = ref(null)
const form = ref({
    oldPwd: '',
    newPwd: '',
    surePwd: ''
})

watch(
    () => props.visible,
    (val) => {
        isShowModal.value = val
    },
    { immediate: true }
)

const validatePasswordMatch = (rule, value, callback) => {
    if (value !== form.value.newPwd) {
        callback(new Error('两次输入的密码不一致'));
    } else {
        callback();
    }
};

const rules = ref({
    oldPwd: [{ required: true, message: '旧密码不能为空', trigger: 'change' }],
    newPwd: [{ required: true, message: '新密码不能为空', trigger: 'change' }],
    surePwd: [
        { required: true, message: '确认密码不能为空', trigger: 'change' },
        { validator: validatePasswordMatch, trigger: 'change' }
    ]
})

const saveUserHandle = () => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    userForm.value.validate((valid) => {
        if (valid) {
            let params = {
                userId: userInfo.userId,
                oldPwd: form.value.oldPwd,
                newPwd: form.value.newPwd
            }
            axios.post('/api/users/updatePassword', params).then(res => {
                if (res.data.code === '0') {
                    ElMessage({
                        message: '密码更新成功！',
                        type: 'success',
                    })
                    handleCloseModal()
                } else {
                    ElMessage.error('密码更新失败！')
                }
            })
        }
    })
}

const handleCloseModal = () => {
    // 清空表单
    form.value.oldPwd = '';
    form.value.newPwd = '';
    form.value.surePwd = '';
    userForm.value.resetFields();
    emit('closeModal', '子组件通知父组件了')
}
</script>
<style scoped>
.update-pwd-form {
    padding: 0 30px 0 20px;
}
</style>