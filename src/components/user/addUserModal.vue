<template>
  <el-dialog class="u-modal" v-model="isShowModal" title="新建用户" width="650" draggable overflow @close="handleCloseModal">
    <el-form :model="form" label-width="100px">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="用户名：">
                    <el-input v-model="form.userName" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="姓名：">
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="性别：">
                    <el-input v-model="form.gender" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号：">
                    <el-input v-model="form.mobile" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="用户状态：">
                    <el-select v-model="form.status" placeholder="please select your zone">
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
        <el-button type="primary" @click="handleCloseModal">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineEmits, ref, watch } from 'vue';
const emit = defineEmits(['closeAddModal']);

const props = defineProps(['visible'])

const isShowModal = ref(false);

watch(() => props.visible, (val) => {
    isShowModal.value = val;
}, 
{immediate: true}
)

const handleCloseModal = () => {
    emit('closeAddModal', '子组件通知父组件了');
}

const form = ref({
  userName: '',
  name: '',
  gender: '',
  mobile: '',
  status: '1'
})
</script>
<style scoped>
</style>