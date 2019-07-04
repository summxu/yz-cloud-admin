/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 13:59:59 
 * @Last Modified by: chenjie
 * @Last Modified time: 2019-07-04 18:15:25
 */
<template>
  <div class="app-container">
    <!-- 模态窗 -->
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="temp"
      label-position="left"
      label-width="200px"
      style="width: 600px; margin-left:50px;"
    >
      <el-form-item label="七牛云accessKey" prop="access_key">
        <el-input v-model="temp.access_key" />
      </el-form-item>
      <el-form-item label="七牛云secret_key" prop="secret_key">
        <el-input v-model="temp.secret_key" />
      </el-form-item>
      <el-form-item label="创蓝短信appid" prop="certification_appid">
        <el-input v-model="temp.certification_appid" />
      </el-form-item>
      <el-form-item label="创蓝短信key" prop="certification_appkey">
        <el-input v-model="temp.certification_appkey" />
      </el-form-item>
      <el-form-item label="七牛云包名" prop="bucket">
        <el-input v-model="temp.bucket" />
      </el-form-item>

      <el-form-item>
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get_config, update_config } from '@/api/yunzhijia'
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
  name: 'Site-option',
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
      tableKey: 0,
      total: 0,
      listLoading: true,
      calendarTypeOptions,
      temp: {
        access_key: '',
        secret_key: '',
        certification_appid: '',
        certification_appkey: '',
        bucket: ''
      },
      rules: {
        access_key: [{ required: true, message: '该字段不能为空', trigger: 'change' }],
        secret_key: [{ required: true, message: '该字段不能为空', trigger: 'change' }],
        certification_appid: [{ required: true, message: '该字段不能为空', trigger: 'change' }],
        certification_appkey: [{ required: true, message: '该字段不能为空', trigger: 'change' }],
        bucket: [{ required: true, message: '该字段不能为空', trigger: 'change' }],
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      get_config().then(response => {
        response.result.forEach(item => {
          this.temp[item.name] = item.value
        });
        this.listLoading = false
      })
    },

    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update_config(tempData).then(() => {

            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
</style>
