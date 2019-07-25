<template>
  <div id="outModal">
    <div class="modalArea">
      <div class="modal-type">
        <div class="type-item">
          <div class="Title">选择需求类型</div>
          <el-select v-model="type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.type_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="modal-addr">
        <div class="aTitle">活动地点</div>
        <el-cascader
          value-format="timestamp"
          class="form-input"
          v-model="area_id"
          placeholder="选择所属区域"
          :options="areaList"
          :props="{ checkStrictly: true }"
          clearable
        ></el-cascader>
      </div>
      <div class="addr-detl">
        <div class="aTitle">上传图片</div>
        <div class="upImg">
          <el-upload
            class="avatar-uploader"
            action="http://up.qiniup.com/"
            :show-file-list="false"
            :data="upData"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="modal-time">
        <div class="aTitle">开始结束时间</div>
        <el-date-picker
          v-model="time"
          value-format="timestamp"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </div>
      <div class="modal-time">
        <div class="aTitle">需要人数</div>
        <el-input v-model="people" placeholder="请输入人数"></el-input>
      </div>
      <div class="modal-time">
        <div class="aTitle">需求名字</div>
        <el-input v-model="title" placeholder="请输入需求名字"></el-input>
      </div>
      <div class="modal-time">
        <div class="aTitle">需求详情</div>
        <el-input type="detail" v-model="detail" placeholder="请输入需求详情"></el-input>
      </div>
      <div class="modal-time">
        <div class="aTitle">详细地址</div>
        <el-input type="detail" v-model="address" placeholder="请输入详细地址"></el-input>
      </div>
      <div class="modal-time">
        <div class="aTitle">审核状态</div>
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 发布需求 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!show" @click="upPost">发布需求</el-button>
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
      </span>
    </div>
  </div>
</template>
<script>
import { edit_need, need_info, get_area, need_type, token } from "@/api/yunzhijia";
export default {
  name: "outModal",
  data () {
    return {
      type: '',
      typeList: [],
      imageUrl: '',
      upData: {
        token: ""
      },
      title: '',
      detail: '',
      status: '',
      statusList: [
        {
          value: 0,
          label: "审核中"
        },
        {
          value: 1,
          label: "招募中"
        },
        {
          value: 2,
          label: "进行中"
        },
        {
          value: 3,
          label: "已完成"
        },
        {
          value: 4,
          label: "撤销"
        }
      ],
      optionsThere: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      valueOne: "",
      valueTwo: "",
      valueThere: "",
      address: "",
      time: "",
      people: "",
      area_id: [],
      areaList: [],
      images: ''
    };
  },
  props: ['id', 'show'],
  created () {
    this.getArea()
    this.getType()
    this.getToken()
    if (this.id) {
      this.getneed_detail()
    } else {
      this.reset()
    }
  },
  watch: {
    id (val) {
      if (val) {
        this.getneed_detail()
      } else {
        this.reset()
      }
    }
  },
  methods: {
    getneed_detail () {
      need_info({ id: this.id }).then(res => {
        /* 数据赋值 */
        this.type = res.result.need_type_id
        this.area_id = res.result.area_id
        this.time = [res.result.start_time * 1000, res.result.end_time * 1000]
        this.imageUrl = res.result.imageUrl
        this.people = res.result.people_count
        this.title = res.result.name
        this.detail = res.result.detail
        this.status = res.result.status
        this.address = res.result.address
        /* 图片 */
        if (res.result.images) {
          this.imageUrl = res.result.images[0].preview_image
          this.images = res.result.images[0].key
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.images = res.key
    },
    /* 获取 七牛云token */
    getToken () {
      token().then(res => {
        this.upData.token = res.result
      })
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    getType () {
      need_type().then(res => {
        this.typeList = res.result
      })
    },
    upPost () {
      let params = {
        id: this.id ? this.id : undefined,
        type: 0,
        from: 1,
        start_time: this.time[0],
        end_time: this.time[1],
        need_type_id: this.type,
        name: this.title,
        detail: this.detail,
        // apply_user_id: this.$store.getters.userInfo.id,
        images: this.images,
        area_id: this.area_id,
        people_count: this.people,
        address: this.address,
        status: this.status,
        has_reward: 0,
        problem: '',
        is_top: 0
      }
      edit_need(params).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.centerDialogVisible = false
        this.$emit('close')
      })
      /* 发布需求 */
    },
    reset () {
      this.type = ''
      this.area_id = []
      this.time = ''
      this.imageUrl = ''
      this.people = ''
      this.title = ''
      this.detail = ''
      /* 图片 */
      this.imageUrl = ''
      this.images = ''
      this.address = ''
      this.status = ''
    },
    getArea () {
      get_area().then(response => {
        this.areaList.push(response.result)
        console.log(this.areaList);
      })
    }
  }
};
</script>
<style lang="less" scoped>
// @import url("../../assets/base.less");
.upImg {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    margin-top: 15px;
  }
}
.modalArea {
  width: 90%;
  margin: 0 auto;
  .modal-type {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .type-item {
      width: 50%;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .Title {
    width: 25%;
  }
  .modal-addr {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .aTitle {
      width: 12%;
    }
    /deep/.el-select {
      width: 60%;
    }
  }
  .addr-detl {
    height: 220px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .aTitle {
      width: 12%;
    }
    /deep/.el-detail {
      width: 60%;
    }
  }
  .modal-time {
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .aTitle {
      width: 12%;
    }
    /deep/.el-date-editor--datetimerange,
    .el-input {
      width: 60%;
    }
  }
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


