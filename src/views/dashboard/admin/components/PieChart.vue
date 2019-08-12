<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { home } from "@/api/yunzhijia";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null,
      data: {}
    }
  },
  mounted () {

  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      home().then(res => {
        this.data = res.result
        this.initChart()
      })
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['审核中需求数量', '招募中需求数量', '进行中需求数量', '已完成需求数量', '已撤销需求数量']
        },
        calculable: true,
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 80],
            center: ['50%', '38%'],
            data: [
              { value: this.data.need_status0_count, name: '审核中需求数量' },
              { value: this.data.need_status1_count, name: '招募中需求数量' },
              { value: this.data.need_status2_count, name: '进行中需求数量' },
              { value: this.data.need_status3_count, name: '已完成需求数量' },
              { value: this.data.need_status4_count, name: '已撤销需求数量' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
