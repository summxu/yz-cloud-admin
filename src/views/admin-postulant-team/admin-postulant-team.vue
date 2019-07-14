/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 13:59:59 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-07-13 16:05:32
 */
<template>
  <div class="app-container">
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
        sortable="custom"
        align="center"
        width="80"
        type="index"
      ></el-table-column>
      <el-table-column label="团队名称" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.team_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属类型" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.type_id.toString()}}</span>
        </template>
      </el-table-column>

      <el-table-column label="团队简介" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="团队长姓名和电话" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.team_leader_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实践中心相册" width="100px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.album" alt />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="100px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="warning">未审核</el-tag>
          <el-tag v-if="scope.row.status == 1" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status == 2" type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            v-if="row.status == 1"
            type="primary"
            size="mini"
            @click="viewNumbers(row)"
          >查看团队成员</el-button>
          <el-button v-if="!row.status" type="success" size="mini" @click="agree(row)">通过</el-button>
          <el-button v-if="!row.status" type="danger" size="mini" @click="reject(row)">拒绝</el-button>
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
    <el-dialog title="团队成员列表" :visible.sync="dialogFormVisible">
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        action="http://yzj.yb.qqiang.net/admin/volunteers/upload_excel"
        :on-preview="handlePreview"
        :limit="1"
        :data="upData"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">导入数据</el-button>
      </el-upload>
      <el-table :data="numbers" style="width: 100%;" max-height="350" v-loading="numberLoading">
        <el-table-column label="序号" type="index" width="150" align="center"></el-table-column>
        <el-table-column prop="user_id" label="用户名：用户手机号" width="auto" align="left"></el-table-column>
        <el-table-column label="审核状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
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
import { volunteers_team, team_member, token, need_type, cat, volunteers_team_check, addVal, updateVal, delVal } from '@/api/yunzhijia'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import axios from "@/utils/request";
import { getToken, getAdminId } from '@/utils/auth'
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
  name: 'admin-postulant-team',
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
      upData: {
        token: getToken(),
        admin_id: getAdminId()
      },
      cats: [],
      numbers: [],
      dialogFormVisible: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      numberLoading: true,
      listQuery: {
        p: 1,
        row: 20,
        type: 1
      },
      calendarTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],

      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false,
      fileList: []
    }
  },
  created () {
    this.getList()
    this.getToken()
  },
  methods: {

    /* 获取 七牛云token */
    getToken () {
      token().then(res => {
        this.upData.token = res.result
      })
    },
    handlePreview (file) {
      console.log(file);
    },
    getNumber (id) {
      team_member({ team_id: id, p: 1, row: 99999 }).then(response => {
        this.numbers = response.result.list
        this.numberLoading = false
      })
    },
    agree (row) {
      volunteers_team_check({ team_id: row.id, status: 1 }).then(res => {
        let tempArr = this.list.filter(item => {
          return item.id == row.id
        })
        tempArr[0].status = 1
      })
    },
    reject (row) {
      volunteers_team_check({ team_id: row.id, status: 2 }).then(res => {
        let tempArr = this.list.filter(item => {
          return item.id == row.id
        })
        tempArr[0].status = 2
      })
    },
    viewNumbers (e) {
      this.numberLoading = true
      this.dialogFormVisible = true
      this.getNumber(e.id)
    },
    getList () {
      this.listLoading = true
      volunteers_team(this.listQuery).then(response => {
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
.fixed-width .el-button--mini {
  width: auto;
}
</style>
