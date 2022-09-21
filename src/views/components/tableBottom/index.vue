<template>
  <div>
    <!-- 无数据显示 -->
    <div v-if="list.length === 0" class="tablecang">
      <div class="tablezi"> <img src="http://www-wms-java.itheima.net/img/empty.4300e933.png"><p>暂无数据</p></div></div>
    <div v-else>
      <!-- 表格 -->
      <el-table
        :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#f9f6ee',color:'#887e7e'}"
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          v-for="(value, key) in headers"
          :key="value.key"
          :label="key"
          width="180"
        >
          <template v-slot="{row}">
            <span v-if="!value.filter">{{ row[value.key] }}</span>
            <span v-else>{{ value.filter(row[value.key]) }}</span>
          </template>
        </el-table-column>
        <slot />
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="page.size"
          :current-page="page.current"
          :total="total"
          @current-change="getList"
          @size-change="getLists"
        />
      </el-row>
    </div>

  </div>
</template>
<script>
export default {
  name: 'TableBottom',
  props: {
    total: {
      type: Number,
      required: true,
      default: () => ({})
    }, // 接分页总数
    page: {
      type: Object,
      required: true,
      default: () => ({})
    }, // 接分页第几页显示几条
    list: {
      type: [Object, Array],
      default: () => ({})
    }, // 接数据的
    headers: {
      type: [Object, Array],
      default: () => ({})
    }// 表头映射
  },
  data() {
    return {
    }
  },
  methods: {
    // 表格隔行变色添加类名
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return ''
      } else {
        return 'statistics-warning-row'
      }
    },
    getList(value) {
      console.log(value)
      this.$emit('changePage', value)
    },
    getLists(value) {
      console.log(value)
      this.$emit('sizechange', value)
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-table__row.statistics-warning-row {
  background: #fdfcf9;}
::v-deep .el-table__body tr:hover>td{
    background-color: #fff6e2!important;
  }
  .el-table__body tr.current-row>td{
    background-color: #fff6e2!important;
  }
::v-deep .el-table__body .el-table__row.hover-row td{
	background-color:#fff6e2!important;
	}
 ::v-deep .el-pager li.active {
    color: #ffb200;
    cursor: default;
}
::v-deep .el-pager li:hover {
    color: #ffb200;
}

::v-deep .tablecang{
  .tablezi{
    text-align: center;
    img{
      width: 200px;
    }
  }
  display:flex;
  justify-content: center;
  align-items: center;
  width: 500xp;
  height: 500px;
  }

</style>
