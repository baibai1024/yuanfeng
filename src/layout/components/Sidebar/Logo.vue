<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">

      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">

      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo: '	http://www-wms-java.itheima.net/img/logo@2x.2c4f2c76.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    // height: 200px;
    width: 100%;
    background-color: #fff;
    // margin-bottom: 200px;

    & .sidebar-logo {
      width: 80%;
      height: 80%;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
  // .scrollbar-wrapper{
  //   margin-top: 200px;
  // }
  // .el-scrollbar{
  //    margin-top: 200px;
  //    background-color: #fff;
  // }
  // .el-scrollbar__view{
  //   position: relative;
  //   .el-menu{
  //     position: absolute;
  //     top: 200px;
  //     margin-top: 200px !important;
  //   }
  // }
}
</style>
