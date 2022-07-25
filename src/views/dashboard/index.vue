<template>
  <div class="dashboard-container">
    <div class="demo-shouye">
      <div class="demo-left">
        <div class="demo-image">
          <div class="demo-zimg"><el-image style="height: 100%;" :src="url" />
            <div class="demo-toux"><img src="http://www-wms-java.itheima.net/img/avatar@2x.4f4a758f.png" alt="">
              <p>仓储管理员</p></div>

          </div>
          <div class="demo-zhong">
            <p class="p1">我不是为了输赢，我就是认真！</p>
            <p class="p2">—— 罗永浩</p>
          </div>
          <div class="demo-yimg">
            <img src="http://www-wms-java.itheima.net/img/dashboard-banner-right@2x.28195570.png" alt="">
            <p>北京总仓</p>
          </div>
        </div>
        <div class="demo-daiban">
          <div style="font-size: 16px; font-weight: bold; margin-bottom: 20px;">待办信息</div>
          <el-row :gutter="20" type="flex" justify="space-between" style="margin: 0;">
            <el-col v-for="(item,index) in todolist" :key="index">
              <div class="grid-content bg-purple">
                <div class="icontub">
                  <span class="icon-a" :style="{background:index===0&&'rgb(0, 118, 255)'||index===1&&'rgb(255, 178, 0)'||index===2&&'rgb(255, 113, 0)'}"><i class="el-icon-tickets" /></span>
                  <span class="wengzi">{{ item.name }}</span>
                </div>
                <div class="shuzi"><b>新增</b><span>{{ item.value1 }}</span><b>待审核</b><span :style="{color:index===0&&'rgb(0, 118, 255)'||index===1&&'rgb(255, 178, 0)'||index===2&&'rgb(255, 113, 0)'}">{{ item.value2 }}</span></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="demo-right">
        <div class="subject">通知/公告</div>
        <div class="item">
          <div class="title">紧急盘点通知</div>
          <div class="time">2020.12.30 18:23:14</div>
        </div>
        <div class="item"><div class="title">运维服务更新通知</div><div class="time">2021.01.25 18:23:14</div></div>
        <div class="item"><div class="title">客户入库变更通知</div><div class="time">2021.01.26 18:23:14</div></div>
        <div class="item"><div class="title">五一放假通知</div><div class="time">2021.02.15 18:23:14</div></div>
        <div class="item"><div class="title">品达物流系统对接通知</div><div class="time">2021.3.25 18:23:14</div></div>
      </div>
    </div>
    <div class="demo-task">
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 20px;">任务导航</div>
      <el-row :gutter="20" type="flex">
        <el-col v-for="(item,index) in tasklist" :key="index" :span="6"><div class="grid-content bg-purple"><p class="icon-b" :style="{background:item.color}"><i :class="item.icon" /></p><p style="font-size: 18px;">{{ item.name }}</p></div></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { tododaban } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([])
  },
  data() {
    return {
      todolist: [],
      tasklist: [{
        name: '收货任务',
        color: 'rgb(0, 118, 255)',
        icon: 'el-icon-truck'
      },
      {
        name: '上架任务',
        color: ' rgb(82, 212, 243)',
        icon: 'el-icon-document-add'
      }, {
        name: '盘点任务',
        color: 'rgb(255, 113, 0)',
        icon: 'el-icon-monitor'
      }, {
        name: '拣货任务',
        color: 'rgb(255, 96, 158)',
        icon: 'el-icon-shopping-cart-full'
      }, {
        name: '交接任务',
        color: 'rgb(255, 178, 0)',
        icon: 'el-icon-s-custom'
      }
      ],
      url: 'http://www-wms-java.itheima.net/img/dashboard-banner-left@2x.5afd2949.png'
    }
  },
  created() {
    this.tododaban()
  },
  methods: {
    async tododaban() {
      const res = await tododaban()
      console.log(res)
      this.todolist = res.data.data
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}
 .demo-shouye {
    display: flex;
    .demo-left {
      // width: 600px;
      flex: 7;
      .demo-image{
         height: 150px;
        display: flex;
        border-radius: 10px;
          background: linear-gradient(270deg,#ffc771,#ffa634);
        .demo-zimg{
          // flex:3;
           height: 150px;
           width: 170px;
           position: relative;
           .demo-toux{
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            line-height: 10px;
            img{
              margin-left: -10px;
            }
            p{
              margin-left: -10px;
            }
           }
        }
        .demo-zhong{
          flex:5;
          p{
            color:#fff;
            font-size:20px;
            text-align: center;
            &.p1{
              margin-top: 40px;

            }
            &.p2{
              margin-left: 240px;
            }

          }
        }
        .demo-yimg{
          position: relative;
          img{
            height: 100%;
          }
          p{
            width: 150px;
            height: 40px;
            background-color: #f8f5f5;
            border-radius: 6px;
                position: absolute;
                top: 10px;
               right: 20px;
               opacity: .79;
               text-align: center;
               line-height:40px

          }
          flex:5;
        }

      margin-bottom: 20px;
      }
       .demo-daiban {
    width: 100%;
    height: 282px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
      .el-row {
    margin-bottom: 20px;
    width: 100%;
    height: 100%;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    //  width: 300px;
    height: 80%;
    // &.el-col:hover {
    //   background-color: #fff;
    // }
  }
  .bg-purple-dark {
    background: #99a9bf;

  }
  .bg-purple {
    // width: 300px;
    padding:20px;

    background: rgb(245, 241, 241);
    display: flex;
    flex-direction: column;
    justify-content:space-between ;
    &.bg-purple:hover{
background-color: #fff;
// border: 1px solid #ccc;
box-shadow: 0 0 5px #ccc;
    }

    .icontub{
      .icon-a{
        display: inline-block;
        width: 50px;
        height: 50px;
        background-color: #0076ff;
        text-align: center;
        // line-height: 50px;
        border-radius: 10px;
        .el-icon-tickets{
          font-size: 35px;
          line-height: 50px;
          color: #fff;
        }
      }
      .wengzi{
        margin-left: 20px;
        // margin-top: -15px;
        // line-height: 120px;
        font-size: 18px;
        transform: translateY(-20px);
        // font-weight: normal;
      }
    }
    .shuzi{
      font-size: 16px;
      height: 50px;
      // line-height: 10px;
      span{
      font-size: 50px;
      margin: 0 20px 0 10px;
      }
      b{
        display: inline-block;
        // margin-top: -10px;
        transform: translateY(-10px);
        font-weight: normal;

      }
    }

  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 100%;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  }
    }

    .demo-right {
      // float: right;
      display:flex;
      flex-direction: column;
      flex: 2;
      margin-left: 20px;
      background: #fff;
      box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
      border-radius: 12px;
      padding: 30px;
      .subject{
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 20px;
      }
      .item{
        flex:2;
        border-top: 1px solid #ccc;
        line-height: 30px;
        margin-top: 10px;
        font-size: 14px;
        .title,.time{
          transform: translateY(10px);
        }

      }
    }
  }
    .demo-task{
    width: 100%;
    height: 190px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
    margin-top: 20px;

    .el-row {
    margin-bottom: 20px;
    height: 75%;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    height:100%;
  }
  .bg-purple-dark {
    background: #99a9bf;

  }
  .bg-purple {
    background: #f5f1f1;
    height:100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
      &.bg-purple:hover{
background-color: #fff;
// border: 1px solid #ccc;
box-shadow: 0 0 5px #ccc;
    }
    // font-size: 18px;
    .icon-b{
      width: 50px;
      height: 50px;
      // background-color: red;
      border-radius:50%;
      text-align: center;
      line-height: 50px;
      i{
        color:#fff;
        font-size:25px;
        transform: translateY(4px)
      }
    }

  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 100%;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
    }

</style>
