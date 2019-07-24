/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 13:59:59 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-07-24 19:56:14
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
      <el-table-column label="实践中心相册" min-width="100px" align="center">
        <template slot-scope="scope">
          <img
            style="width:50px;height:50px;"
            v-for="(item,index) in scope.row.album"
            :key="index"
            :src="item.preview_image"
            alt
          />
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
      <!-- 修改狂 -->

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            v-if="row.status == 1"
            type="primary"
            size="mini"
            @click="viewNumbers(row)"
          >查看团队成员</el-button>
          <el-button v-if="!row.status" type="success" size="mini" @click="agree(row)">通过</el-button>
          <el-button v-if="!row.status" type="danger" size="mini" @click="reject(row)">拒绝</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.row"
      @pagination="getList"
    />

    <!-- 模态窗 -->
    <el-dialog class="model" title="修改信息" :visible.sync="dialogFormVisible1">
      <el-form
        ref="dataForm"
        :model="team"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="团队名称" prop="title">
          <el-input v-model="team.team_name" />
        </el-form-item>
        <el-form-item label="团徽" prop="title">
          <el-upload
            class="avatar-uploader"
            action="http://up.qiniup.com/"
            :show-file-list="false"
            :data="upData"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload1"
          >
            <img v-if="images" :src="images" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="实践中心相册" prop="title">
          <el-upload
            class="avatar-uploader"
            action="http://up.qiniup.com/"
            :show-file-list="false"
            :data="upData1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>-->
        <el-form-item label="团队简介描述" prop="title">
          <el-input type="textarea" v-model="team.description" />
        </el-form-item>

        <el-form-item label="团队类型" prop="type">
          <el-select v-model="team.type_id" multiple class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.type_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="团队类别" prop="type">
          <el-select v-model="team.type" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in typesss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="type">
          <el-select v-model="team.status" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="团队长" prop="type">
          <el-select v-model="team.team_leader_id" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 模态窗 -->
    <el-dialog title="团队成员列表" :visible.sync="dialogFormVisible">
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
import { volunteers_team, need_type, token, team_member, volunteers_team_check, get_area } from '@/api/yunzhijia'
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

var teamList = []

export default {
  name: 'postulant-team',
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
      fileList: [],
      dialogFormVisible1: false,
      upData: {
        token: ''
      },
      team: {
        team_name: '',
        description: '',
        type_id: '',
        type: 1,
        status: '',
        team_leader_id: ''
      },
      typesss: [{
        label: '普通团队',
        value: 1
      }, {
        label: '行政团队',
        value: 2
      }],
      statusList: [{
        label: '0',
        value: '审核中'
      }, {
        label: 1,
        value: '审核成功'
      }, {
        label: 2,
        value: '审核失败'
      }],
      teamList,
      images: '',
      areaList: [],
      types: [],
      temp: {
        avatar: '',
        username: '',
        password: '',
        mobile: '',
        identity_card: '',
        type: '2',
        team_id: '',
        area_id: []
      },
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
      downloadLoading: false
    }
  },
  created () {
    this.getList()
    this.getArea()
    this.getNeedType()
    this.getToken()
  },
  methods: {
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible1 = true
    },
    getNeedType () {
      need_type().then(res => {
        this.types = res.result
      })
    },
    /* 获取地理位置 */
    getArea () {
      get_area().then(response => {
        // this.areaList = response.result
        this.areaList.push(response.result)
        // console.log();
      })
    },
    beforeAvatarUpload1 (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleAvatarSuccess1 (res, file) {
      this.fileList.push({ name: 'food.jpeg', url: URL.createObjectURL(file.raw) })
      this.temp.avatar = res.key
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleAvatarSuccess (res, file) {
      this.images = URL.createObjectURL(file.raw)
      this.temp.avatar = res.key
    },
    /* 获取 七牛云token */
    getToken () {
      token().then(res => {
        this.upData.token = res.result
      })
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
      this.numbers = []
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
        /* 下拉框 赋值 */
        response.result.list.forEach(item => {
          teamList.push({ key: item.id, display_name: item.team_name })
        });
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

<style scoped lang="less">
.fixed-width .el-button--mini {
  width: auto;
}

/deep/.avatar-uploader .el-upload {
  border: 1px dashed #000000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
