<template>
  <div class="peanl">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link
          tag="div"
          to="/postulant/normal"
          class="card-panel"
          @click="handleSetLineChartData('shoppings')"
        >
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日新增会员总数</div>
            <count-to
              :start-val="0"
              :end-val="data.user_today_count"
              :duration="3600"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link
          tag="div"
          to="/activity"
          class="card-panel"
          @click="handleSetLineChartData('newVisitis')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="documentation" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日新增需求</div>
            <count-to
              :start-val="0"
              :end-val="data.need_today_count"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link
          tag="div"
          to="/task"
          class="card-panel"
          @click="handleSetLineChartData('messages')"
        >
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">超时任务数量</div>
            <count-to
              :start-val="0"
              :end-val="data.task_count"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link
          tag="div"
          to="/news"
          class="card-panel"
          @click="handleSetLineChartData('purchases')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="nested" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">新闻数量</div>
            <count-to
              :start-val="0"
              :end-val="data.news_count"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </el-col>
    </el-row>

    <!-- 下一列 -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link
          tag="div"
          to="/postulant/normal"
          class="card-panel"
          @click="handleSetLineChartData('newVisitis')"
        >
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">会员数</div>
            <count-to
              :start-val="0"
              :end-val="data.user_all_count"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link
          tag="div"
          to="/activity"
          class="card-panel"
          @click="handleSetLineChartData('newVisitis')"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="documentation" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">全部需求数量</div>
            <count-to
              :start-val="0"
              :end-val="data.need_all_count"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link
          tag="div"
          to="/postulant/normal"
          class="card-panel"
          @click="handleSetLineChartData('messages')"
        >
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="people" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">普通志愿者总数</div>
            <count-to
              :start-val="0"
              :end-val="data.user_type1_count"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <router-link
          tag="div"
          to="/postulant/administrative"
          class="card-panel"
          @click="handleSetLineChartData('purchases')"
        >
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="people" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">行政志愿者总数</div>
            <count-to
              :start-val="0"
              :end-val="data.user_type2_count"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </router-link>
      </el-col>
    </el-row>

    <!-- 下一列 -->
    <el-row :gutter="40" class="panel-group"></el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { home } from "@/api/yunzhijia";
export default {
  components: {
    CountTo
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.getData()
  },

  methods: {
    handleSetLineChartData (type) {
      this.$emit('handleSetLineChartData', type)
    },
    getData () {
      home().then(res => {
        this.data = res.result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      text-align: right;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
