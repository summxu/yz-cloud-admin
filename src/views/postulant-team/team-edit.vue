/*
 * @Author: Chenxu 
 * @Date: 2019-07-04 13:59:59 
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-07-25 11:30:57
 */
<template>
  <!-- 模态窗 -->
  <el-dialog class="model" title="修改信息" :before-close="beforeClose" :visible.sync="show">
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
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
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
          <el-option v-for="item in types" :key="item.id" :label="item.type_name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="type">
        <el-select v-model="team.status" class="filter-item" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="团队长" prop="type">
        <el-select v-model="team.team_leader_id" filterable class="filter-item" placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="update_team">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { user_id_name, team_info, need_type, token, update_team } from "@/api/yunzhijia.js";
export default {
  data () {
    return {
      userList: [],
      upData: {
        token: ''
      },
      images: [],
      team: {
        team_name: '',
        description: '',
        type_id: '',
        type: 1,
        status: '',
        team_leader_id: ''
      },
      types: [],
      show: false,
      statusList: [{
        value: 0,
        label: '审核中'
      }, {
        value: 1,
        label: '审核成功'
      }, {
        value: 2,
        label: '审核失败'
      }],
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.team_info()
        this.getUserIndex()
        this.getNeedType()
        this.getToken()
      }
    }
  },
  created () {
  },
  methods: {
    /* 修改接口 */
    update_team () {
      /* 转换一下 */
      this.team.type_id = this.team.type_id.toString()
      let tempArr = []
      this.team.album.forEach(element => {
        tempArr.push(element.key)
      });
      this.team.album = tempArr.toString()
      update_team(this.team).then(res => {
        this.$message.success(res.msg)
        this.show = false
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
      this.team.avatar = res.key
    },
    getNeedType () {
      need_type().then(res => {
        this.types = res.result
      })
    },
    /* 获取 七牛云token */
    getToken () {
      token().then(res => {
        this.upData.token = res.result
      })
    },
    /* 获取详情信息 */
    team_info () {
      team_info({ id: this.id }).then(res => {
        this.team = res.result
        this.team.type_id = res.result.type_id.split(',')
        this.team.type_id = this.team.type_id.map(Number)
        this.images = res.result.avatar.preview_image
        this.team.avatar = res.result.avatar.key
      })
    },
    /* 获取团队长 */
    getUserIndex () {
      let params = {
        p: 1,
        row: 99999999
      }
      user_id_name(params).then(res => {
        this.userList = res.result.list
      })
    },
    beforeClose () {
      this.$emit('close')
    }
  },
  props: ['show', 'id']
}
</script>

<style scoped lang="less">
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
