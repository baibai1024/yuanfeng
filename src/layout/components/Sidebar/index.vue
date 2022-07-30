<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" style="padding-bottom: 50px;">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="(route,index) in routes" :key="index" :item="route" :base-path="route.path" />

      </el-menu>
      <el-menu />

    </el-scrollbar>
    <template>
      <div class="box-card">
        <img src="http://www-wms-java.itheima.net/img/avatar@2x.4f4a758f.png" alt="">
        <p class="title" style="">admin</p>
        <img class="el-icon-d-arrow-right" src="@/assets/下载.png" @click="$router.push('/login')">
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      aa: {},
      cc: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },

    activeMenu(e) {
      this.bus.$on('send', index => {
        this.cc = index
      })
      console.log(e)
      const route = this.$route
      console.log(route)
      const { meta, path } = route
      const aa = {}
      aa.name = route.name
      aa.path = route.path

      // const ee = dd.filter(item => item.name === aa.name)
      // console.log(ee)
      this.bus.$emit('sendTo', aa)// 注册事件，传值
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {

  }

}
</script>
<style lang="scss" scoped>
.has-logo{
  padding-bottom: 60px;
}
.box-card{
  // margin-top: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 210px;
    height: 60px;
    // background-color: red;
    display:flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #ccc;
       font-size:18px;
    img{
      width: 40px;
      height: 40px;

    }
    .title{
     padding-right: 20px;
     border-right: 1px solid #ccc;
    }
    .el-icon-d-arrow-right{
      font-size: 30px;
    }
  }
</style>
