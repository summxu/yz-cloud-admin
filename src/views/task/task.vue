/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 13:59:59 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-07-25 18:45:46
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
      <el-table-column label="需求名称" min-width="120px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="申请方名称" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.apply_name }}</span>
        </template>
      </el-table-column>-->

      <el-table-column label="申请方 姓名：电话" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.apply_user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.area_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="详细地址" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="需求详情" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.detail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.start_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.end_time }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="需求人数" min-width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.people_count }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="上级区域" min-width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.up_area_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="奖励状态" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.has_reward }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求类型" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.need_type_id.toString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="反馈问题" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.problem }}</span>
        </template>
      </el-table-column>
      <el-table-column label="反馈时间" min-width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.com_time }}</span>
        </template>
      </el-table-column>-->

      <el-table-column label="图片组" min-width="100px" align="center">
        <template slot-scope="scope">
          <img
            style="width:50px;height:50px;"
            v-for="(item,index) in scope.row.images"
            :src="item.preview_image"
            :key="index"
            alt
          />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == '招募中'" type="success">{{scope.row.status}}</el-tag>
          <el-tag v-if="scope.row.status == '审核中'">{{scope.row.status}}</el-tag>
          <span v-if="scope.row.status == '已完成'">{{scope.row.status}}</span>
          <el-tag v-if="scope.row.status == '撤销'" type="danger">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" @click="showDetail(row)">查看详情</el-button>
          <el-button type="success" size="mini" @click="handEdit(row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="feedback(row)">反馈</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.p"
      :limit.sync="listQuery.row"
      @pagination="getList"
    />

    <el-dialog :visible.sync="centerDialogVisible" :before-close="close" width="55%" center>
      <out-modal @close="close" :show="show" :id="rowId"></out-modal>
    </el-dialog>

    <!-- 模态窗 -->
    <el-dialog title="反馈内容" :visible.sync="dialogFormVisible">
      <el-form ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="反馈内容">
          <el-input type="textarea" v-model.number="feedContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="feedbackUp">提交</el-button>
          <el-button @click="dialogFormVisible =!dialogFormVisible">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { task, check_need, need_member, ce_need, com_task, need_top } from '@/api/yunzhijia'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import outModal from "./outModal.vue";

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'task',
  components: { Pagination, outModal },
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
      feedContent: [],
      numbers: [],
      dialogFormVisible: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      numberLoading: true,
      listQuery: {
        p: 1,
        row: 20
      },
      rowId: '',
      calendarTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false,
      rowId: '',
      show: false,
      centerDialogVisible: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /* 打开编辑窗口 */
    handEdit (row) {
      this.rowId = row.id
      this.centerDialogVisible = true;
    },
    /* 查看详情 */
    showDetail (row) {
      this.rowId = row.id
      this.show = true
      this.centerDialogVisible = true;
    },
    close () {
      this.centerDialogVisible = false;
      this.getList()
      this.show = false
      this.rowId = undefined
    },
    top (row, top) {
      need_top({ top: top, id: row.id }).then(res => {
        this.getList()
        this.$message({
          type: 'success',
          message: res.msg
        })
      })
    },
    getNumber (id) {
      need_member({ id: id, p: 1, row: 99999 }).then(response => {
        this.numbers = response.result.list
        this.numberLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },
    feedback (row) {
      this.dialogFormVisible = true
      this.rowId = row.id
    },
    feedbackUp () {
      com_task({ id: this.rowId, problem: this.feedContent }).then(res => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: res.msg
        })
      })
    },
    reject (row) {
      ce_need({ id: row.id }).then(res => {
        let tempArr = this.list.filter(item => {
          return item.id == row.id
        })
        tempArr[0].status = "撤销"

      })
    },
    viewNumbers (e) {
      this.numberLoading = true
      this.dialogFormVisible = true
      this.getNumber(e.id)
    },
    getList () {
      this.listLoading = true
      task(this.listQuery).then(response => {
        this.list = response.result.list
        this.total = response.result.count
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },
    handleFilter () {
      this.listQuery.p = 1
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
