/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 13:59:59 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-08-02 10:01:23
 */ 
<template>
  <div class="app-container">
    <!-- 模态窗 -->
    <el-form :v-model="item" label-width="150px" ref="dataForm" label-position="left">
      <el-form-item label="当前密码：">
        <el-input type="password" v-model="item.oldpwd" style="width:400px;" />
      </el-form-item>
      <el-form-item label="新密码：">
        <el-input type="password" v-model="item.password1" style="width:400px;" />
      </el-form-item>
      <el-form-item label="确认密码：">
        <el-input type="password" v-model="item.password2" style="width:400px;" />
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="update">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update_pwd } from '@/api/yunzhijia'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'demand',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter (type) {
      return calendarTypeKeyValue[type]
    }
  },
  data () {
    return {
      item: {
        oldpwd: '',
        password1: '',
        password2: ''
      }
    }
  },
  created () {
  },
  methods: {
    update () {
      update_pwd(this.item).then(async res => {
        this.$message.success(res.msg)
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style scoped>
</style>
