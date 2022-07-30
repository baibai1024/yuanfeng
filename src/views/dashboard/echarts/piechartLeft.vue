<template>
  <div id="mychartLeft" class="inout-chartss" />
</template>

<script>
import { stockUseStatus } from '@/api/dashboard'
import * as echarts from 'echarts'
export default {
  name: 'MychartLeft',
  // props: {
  //   stockusestatuss: {
  //     type: Array,
  //     required: true
  //   }
  // },

  data() {
    return {
      myChart: {},
      stockusestatuss: []
    }
  },
  watch: {
    stockusestatuss: {
      handler() {
        this.initEchart()
      },
      deep: true
    }

  },

  mounted() {
    // this.initEchart()
  },
  created() {
    this.stockUseStatus()
  },
  methods: {
    initEchart() {
      const option = {
        color: ['#e4dbda', '#ffaa00'],
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   top: '5%',
        //   left: 'center',
        //   textStyle: { // 图例文字的样式
        //     color: '#fff',
        //     fontSize: 16
        //   }
        // },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'

            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
                color: 'pink'

              }
            },
            labelLine: {
              show: false
            },
            data: this.stockusestatuss

          }

        ]
      }
      const myChart = echarts.init(document.getElementById('mychartLeft'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      return option
    },
    async stockUseStatus() {
      const res = await stockUseStatus()
      console.log(res)
      this.stockusestatuss = res.data.data
      console.log(this.stockusestatuss)
    }
  }
}
</script>

<style lang="scss" scoped>
.inout-chartss{
  height: 280px;

    }
</style>
