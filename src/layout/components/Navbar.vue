<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <el-tag
      v-for="(item,index) in tag"
      :key="item.name"
      :class="{ color: color === index }"
      class="tag"
      :closable="item.name==='工作台'?false:true"
      type="info"
      @click="bb(item,index)"
    >
      {{ item.name }}
    </el-tag>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <i class="el-icon-arrow-down" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">

          <el-dropdown-item>关闭左侧</el-dropdown-item>

          <el-dropdown-item>关闭右侧</el-dropdown-item>

          <el-dropdown-item>关闭其他</el-dropdown-item>

          <el-dropdown-item divided>
            <span style="display:block;">关闭全部</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'Navbar',
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data() {
    return {
      color: 0,
      tag: [
        {
          name: '工作台',
          path: '/dashboard'
        }

      ]
    }
  },
  watch: {
    color: {
      handler() {

      }

    }
  },
  created() {
    this.bus.$on('sendTo', aa => {
      console.log(this.tag.every(item => item.name !== aa.name))
      if (this.tag.every(item => item.name !== aa.name)) {
        this.tag.push(aa)
        console.log(this.tag.findIndex(item => item === aa))
      } else {
        console.log(this.tag.findIndex(item => item === aa))
      }
      this.color = this.tag.findIndex(item => item === aa)
      // this.color = this.tag.length - 1

      // this.color = this.tag.indexOf(aa)

      console.log(aa)
      console.log(this.tag)
    })
  },
  mounted() {
    console.log(this.$router.options.routes)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    bb(e, index) {
      this.color = index
      // console.log(this.$router.options.routes)
      console.log(this.a)
      // this.tag = this.tag.filter(item => item.name !== e.name)
      this.$router.push(e.path)
    }
    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #f5f1f1;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        border-radius: 6px;
        width: 40px;
        height: 40px;
        background-color: #fff;
        text-align: center;

        .el-icon-arrow-down {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
  .tag{
    margin-top: 6px;
    margin-right: 5px;
    //  color: rgb(255, 178, 0)

  }
  .color {
   color: rgb(255, 178, 0)
  }

}
</style>
