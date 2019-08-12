/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 13:59:59 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-08-05 14:43:54
 */
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 条件查询 -->
      <el-input
        v-model="listQuery.name"
        placeholder="可查询姓名和手机号"
        style="width: 300px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select v-model="listQuery.service_type_id" class="filter-item" placeholder="选择服务类型">
        <el-option v-for="item in types" :key="item.id" :label="item.type_name" :value="item.id" />
      </el-select>

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
      size="mini"
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        :label="$t('table.id')"
        type="index"
        sortable="custom"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column label="用户名" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="100px" align="center">
        <template slot-scope="scope">
          <img
            class="user-avatar"
            style="width:50px;height:50px;"
            :src="scope.row.avatar.preview_image"
            alt
          />
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
          <span>{{ scope.row.team_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="星级" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <el-rate disabled v-model="row.start"></el-rate>
        </template>
      </el-table-column>

      <el-table-column label="最后登录时间" width="130px" align="center">
        <template slot-scope="scope">
          <span
            v-if="scope.row.login_time"
          >{{ scope.row.login_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delUser(row)">移除</el-button>
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
    <el-dialog class="model" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="身份类型" prop="type">
          <el-select v-model="temp.team_leader_id" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="头像" prop="title">
          <el-upload
            class="avatar-uploader"
            action="http://up.qiniup.com/"
            :show-file-list="false"
            :data="upData"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="images" :src="images" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="所属团队" prop="id">
          <!-- <span v-if="dialogStatus != 'create'">{{temp.team_name}}</span> -->
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
          <el-cascader
            v-model="temp.area_id"
            :props="{ checkStrictly: true }"
            :options="areaList"
            clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="用户姓名" prop="title">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="密码" prop="title">
          <el-input type="password" v-model="temp.password" />
        </el-form-item>
        <el-form-item label="登陆手机号" prop="title">
          <el-input v-model="temp.mobile" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus=='create'?addXzmember():updateData()"
        >{{ $t('table.confirm') }}</el-button>
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
import { userIndex, need_type, update_user, get_area, token, add_xzmember, remove_xzmember, volunteers_team } from '@/api/yunzhijia'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 1, display_name: '团员' },
  { key: 2, display_name: '团队长' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})


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
      teamList: [],
      images: '',
      upData: {
        token: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      areaList: [],
      types: [],
      listQuery: {
        p: 1,
        row: 20,
        type: 2,
        name: undefined,
        service_type_id: ''
      },
      calendarTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],

      temp: {
        avatar: '',
        username: '',
        password: '',
        mobile: '',
        type: '',
        team_leader_id: '',
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
  watch: {
    'listQuery.service_type_id' (val) {
      this.getList()
    }
  },
  created () {
    this.getXzteam()
    this.getList()
    this.getArea()
    this.getToken()
    this.getNeedType()
  },
  methods: {
    getNeedType () {
      need_type().then(res => {
        this.types = res.result
        this.types.unshift({
          type_name: '全部',
          value: ''
        })
      })
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
      this.temp.avatar.key = res.key
    },
    /* 获取 七牛云token */
    getToken () {
      token().then(res => {
        this.upData.token = res.result
      })
    },
    delUser (row) {
      remove_xzmember({ user_id: row.id }).then(res => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
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
    /* 行政志愿者团队 */
    getXzteam () {
      this.teamList = []
      volunteers_team({
        p: 1,
        row: 20,
        type: 2
      }).then(response => {
        response.result.list.forEach(item => {
          this.teamList.push({ key: item.id, display_name: item.team_name })
        });
      })
    },
    /* 添加 志愿者 */
    addXzmember () {
      this.temp.area_id = this.temp.area_id[this.temp.area_id.length - 1]
      this.temp.user_name = this.temp.username
      add_xzmember(this.temp).then(response => {
        this.dialogFormVisible = false
        this.$message.success(response.msg)
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
        this.list = []
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
        avatar: '',
        username: '',
        password: '',
        mobile: '',
        type: '',
        team_id: '',
        area_id: '',
        team_leader_id: ''
      }
    },
    handleCreate () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.resetTemp()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          this.temp.user_name = this.temp.username
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
      /* 更改 temp  */
      // this.temp.password = ''
      // this.temp.type = row.team_leader_id
      this.temp.avatar.key = row.avatar.key
      this.images = row.avatar.preview_image
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var tempData = Object.assign({}, this.temp)
          // tempData.type = this.temp.type_id
          tempData.is_society_vol = this.temp.is_society_vol_id
          tempData.service_type_id = this.temp.service_type_id_id
          tempData.user_name = this.temp.username
          tempData.avatar = this.temp.avatar.key
          // console.log(this.temp);
          // if (tempData.password == '') delete tempData.password

          add_xzmember(tempData).then(() => {
            this.getList()
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

<style scoped lang="less">
/deep/.model .el-select .el-input__inner,
/deep/.model .el-cascader .el-input__inner {
  width: 278px;
  // width: 100%;
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
