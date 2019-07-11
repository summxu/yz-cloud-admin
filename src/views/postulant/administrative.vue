/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 13:59:59 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-07-10 20:43:24
 */
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 条件查询 -->
      <el-input
        v-model="listQuery.name"
        placeholder="请输入查询条件"
        style="width: 300px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 操作按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('table.add') }}</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        :label="$t('table.id')"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="100px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="100px" align="center">
        <template slot-scope="scope">
          <img class="user-avatar" :src="scope.row.avatar" alt />
        </template>
      </el-table-column>

      <el-table-column label="身份证号" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.identity_card }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份类型" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务类型" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.service_type_id.toString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务时长" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.service_hour }} 小时</span>
        </template>
      </el-table-column>
      <el-table-column label="活跃天数" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.login_statis }} 天</span>
        </template>
      </el-table-column>
      <el-table-column label="所属团队" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.team_name }} 天</span>
        </template>
      </el-table-column>

      <el-table-column label="星级" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <el-rate disabled v-model="row.start"></el-rate>
        </template>
      </el-table-column>

      <el-table-column label="最后登录时间" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.login_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->

      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button> -->
          <el-button type="danger" size="mini" @click="delUser(row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 模态窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="身份类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="所属团队" prop="id">
          <el-select v-model="temp.team_id" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in teamList"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="所属区域" prop="id">
          <el-cascader v-model="temp.area_id" :options="areaList"></el-cascader>
        </el-form-item>

        <el-form-item label="用户姓名" prop="title">
          <el-input v-model="temp.user_name" />
        </el-form-item>
        <el-form-item label="密码" prop="title">
          <el-input type="password" v-model="temp.password" />
        </el-form-item>
        <el-form-item label="登陆手机号" prop="title">
          <el-input v-model="temp.mobile" />
        </el-form-item>
        <el-form-item label="身份证号" prop="title">
          <el-input v-model="temp.identity_card" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="addXzmember">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userIndex, get_area, add_xzmember, remove_xzmember, volunteers_team } from '@/api/yunzhijia'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '1', display_name: '团员' },
  { key: '2', display_name: '团队长' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

var teamList = []

export default {
  name: 'Administrative',
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
      list: null,
      total: 0,
      listLoading: true,
      areaList: [],
      listQuery: {
        p: 1,
        row: 20,
        type: 2,
        name: undefined
      },
      calendarTypeOptions,
      teamList,
      statusOptions: ['published', 'draft', 'deleted'],
      temp: {
        user_name: '',
        password: '',
        mobile: '',
        identity_card: '',
        type: '',
        team_id: '',
        area_id: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],

      downloadLoading: false
    }
  },
  created () {
    this.getXzteam()
    this.getList()
    this.getArea()
  },
  methods: {
    /* 获取地理位置 */
    getArea () {
      get_area().then(response => {
        // this.areaList = response.result
        this.areaList.push(response.result)
        // console.log();
      })
    },
    /* 行政志愿者团队 */
    getXzteam () {
      volunteers_team({
        p: 1,
        row: 20,
        type: 1
      }).then(response => {
        response.result.list.forEach(item => {
          teamList.push({ key: item.id, display_name: item.team_name })
        });
      })
    },
    /* 添加 志愿者 */
    addXzmember () {
      this.temp.area_id = this.temp.area_id[2]
      add_xzmember(this.temp).then(response => {
        this.list = response.result.list
        this.total = response.result.count
        this.dialogFormVisible = false
        this.getList()
      })
    },
    getList () {
      this.listLoading = true
      userIndex(this.listQuery).then(response => {
        this.list = response.result.list
        this.total = response.result.count
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },

    sortChange (data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID (order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp)
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
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
    handleDelete (row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv (pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
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
