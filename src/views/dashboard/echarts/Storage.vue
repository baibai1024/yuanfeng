<template>
  <div id="mychart" ref="chart" class="inout-charts" />
</template>

<script>
import * as echarts from 'echarts'
import { sumList } from '@/api/dashboard'

export default {
  name: 'Mychart1',
  props: {
    // sumlists: {
    //   type: [Array, Object],
    //   required: true
    // },
    id: {
      type: String,
      required: true,
      default: 'w'

    }
  },
  data() {
    return {

      sumlists: []
    }
  },
  watch: {
    sumlists: {
      handler() {
        this.initEcharts()
      },
      deep: true
    },
    id: {
      handler() {
        this.weekEcharts(this.id)
      },
      deep: true
    }
  },
  created() {
    this.weekEcharts(this.id)
  },
  mounted() {
    // this.initEcharts()
  },

  methods: {
    initEcharts() {
      const option = {
        legend: {
          data: [this.sumlists.data[0].name, this.sumlists.data[1].name],
          bottom: '0%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: 'rgba(0,0,0,0.2)'
            }
          }
          // shadowColor: 'red'
        },
        xAxis: {
          type: 'category',
          // data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
          data: this.sumlists.x
        },
        yAxis: {
          type: 'value'
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{
          type: 'bar',
          name: this.sumlists.data[0].name,
          data: this.sumlists.data[0].data,
          itemStyle: {
            color: '#ff7100'
          }
        },
        {
          type: 'bar',
          name: this.sumlists.data[1].name,
          barGap: '0%', // 两个柱子之间的距离相对于柱条宽度的百分比;
          barCategoryGap: '40%',
          data: this.sumlists.data[1].data, // 每侧空余的距离相对于柱条宽度的百分比
          itemStyle: {
            color: '#dfb52d'
          }
        }]
      }

      // const myChart = echarts.init(document.getElementById('mychart'))
      const myChart = echarts.init(document.getElementById('mychart'))
      // console.log(myChart)
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      return option
    },
    async weekEcharts(id) {
      const { data } = await sumList(id)
      this.sumlists = data.data
      console.log(this.sumlists)
    }

  }

}

</script>

<style lang="scss" scoped>
.inout-charts{
  height: 430px;
    }
</style>
