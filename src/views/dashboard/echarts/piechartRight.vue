<template>
  <div class="big">
    <div id="mychartRight" class="inout-chartss" />
    <div class="textyou">
      <div class="aaaa">
        <i /><b>拣货区</b> <span>19%</span>348
      </div>
      <div class="aaaa">
        <i style="background:#5ae9ff" /><b>出库区</b> <span>26%</span>487
      </div>
      <div class="aaaa">
        <i style="background:#667ba0" /><b>暂存库区</b> <span>37%</span>677
      </div>
      <div class="aaaa">
        <i style="background:#ffc300" /><b>进货暂存区</b> <span>6%</span>126
      </div>
      <div class="aaaa">
        <i style="background:#ff7100" /><b>出货暂存区</b> <span>16%</span>298
      </div>
    </div>
  </div>
</template>

<script>
import { areaUseStatus } from '@/api/dashboard'
import * as echarts from 'echarts'
export default {
  name: 'MychartRight',
  // props: {
  //   stockusestatuss: {
  //     type: Array,
  //     required: true
  //   }
  // },

  data() {
    return {
      myChart: {},
      areaUseStatuss: []
    }
  },
  watch: {
    areaUseStatuss: {
      handler() {
        this.initEchart()
      },
      deep: true
    }

  },

  mounted() {
    this.initEchart()
  },
  created() {
    this.areaUseStatus()
  },
  methods: {
    initEchart() {
      const option = {
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.6)',
          textStyle: {	color: '#fff' }

        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left'
        // },
        series: [
          {
            type: 'pie',
            radius: '80%',
            startAngle: 290,
            center: ['50%', '50%'],
            label: {
              normal: {
                show: true,
                formatter: '{c}',
                position: 'inner',
                // color: '#fff'
                textStyle: {
                  color: '#fff',	// 提示文字颜色
                  fontSize: 16		// 提示文字大小
                }
              }
            },
            data: [
              { value: 677, name: '暂存库区', itemStyle: { color: '#667ba0' }},
              { value: 126, name: '进货暂存区', itemStyle: { color: '#ffc300' }},
              { value: 298, name: '出货暂且区', itemStyle: { color: '#ff7c00' }},
              { value: 348, name: '拣货区', itemStyle: { color: '#0076ff' }},
              { value: 487, name: '出库区', itemStyle: { color: '#5ae9ff' }}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#FFFFFF',
                borderWidth: 1,
                label: {
                  show: false,
                  formatter: '{d}%'
                },
                labelLine: {
                  show: false
                }
              }
            }

          }
        ]
      }
      const myChart = echarts.init(document.getElementById('mychartRight'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      return option
    },
    async areaUseStatus() {
      const res = await areaUseStatus()
      console.log(res)
      this.areaUseStatuss = res.data.data
      console.log(this.areaUseStatuss)
    }
  }
}
</script>

<style lang="scss" scoped>
.big {
   display:flex;
   justify-content: space-between;
   width: 100%;
   height: 100%;
.inout-chartss{
  height: 280px;
  width: 50%;

    }
    .textyou{
    flex:1;
    margin: 50px -100px 0 0 ;
    height: 200px;
    width:80%;
    // background-color: red ;
    .aaaa{
      width: 80%;
      // background-color: pink;
      margin-top: 15px;
      font-size: 14px;
      b{
        display: inline-block;

        width: 80px;
      }
      i{
        margin-right: 10px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #0076ff;

      }
      span{
        display: inline-block;
        width: 20px;
        margin:0 50px
      }
    }

  }
}

</style>
