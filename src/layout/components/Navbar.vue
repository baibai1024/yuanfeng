<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <el-tag
      v-for="(item,index) in tag"
      :key="item.name"
      :class="{ color: color === index || falg===item.path}"
      class="tag"
      :closable="item.name==='工作台'?false:true"
      type="info"
      @close="sotp(tag,index)"
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

          <el-dropdown-item icon="el-icon-back" @click.native="stopLeft">关闭左侧</el-dropdown-item>

          <el-dropdown-item icon="el-icon-right" @click.native="stopRight">关闭右侧</el-dropdown-item>

          <el-dropdown-item icon="el-icon-close" @click.native="stopQi">关闭其他</el-dropdown-item>

          <el-dropdown-item icon="el-icon-error" @click.native="stopQuan">关闭全部
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
      falg: '',
      color: 0,
      tag: [
        {
          name: '工作台',
          path: '/dashboard'
        }
      ]
    }
  },
  created() {
    this.bus.$on('sendTo', aa => {
      this.color = null
      this.falg = aa.path
      console.log(this.tag.every(item => item.name !== aa.name))
      if (this.tag.every(item => item.name !== aa.name)) {
        this.tag.push(aa)
      }
    })
  },
  mounted() {
    // console.log(this.$router.options.routes)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    bb(e, index) {
      this.color = index
      this.$router.push(e.path)
    },
    sotp(tag, index) {
      this.tag.splice(index, 1)
      console.log(this.tag.findIndex(item => item.path === this.falg))
      if (this.tag.findIndex(item => item.path === this.falg) !== index) {
        this.color = index - 1
        this.$router.push(this.tag[index - 1].path)
      }
    },
    stopLeft() {
      const index = this.tag.findIndex(item => item.path === this.falg)

      this.tag = this.tag.filter((item, ind) => index <= ind || ind === 0)
    },
    stopRight() {
      const index = this.tag.findIndex(item => item.path === this.falg)

      this.tag = this.tag.filter((item, ind) => index >= ind)
    },
    stopQi() {
      const index = this.tag.findIndex(item => item.path === this.falg)

      this.tag = this.tag.filter((item, ind) => index === ind || ind === 0)
    },
    stopQuan() {
      if (this.tag.length > 1) {
        this.$router.push(this.tag[0].path)
        this.tag = this.tag.filter((item, ind) => ind === 0)
      }
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
