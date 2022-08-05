<template>
  <div class="demo-Warehouse">
    <div class="demo-top">
      <inputTop :input-list="inputList" :falg="falg" @getBtn="getBtn" @getinput="getinput" />
    </div>
    <div class="demo-bottom">
      <el-card v-loading="loading" style="border-radius: 12px;">
        <el-button type="success" class="btn1" round @click="newAdded">新增仓库</el-button>
        <tableBottom :page="page" :list="list" :headers="headers" :total="total" @sizechange="sizechange" @changePage="changePage">
          <template>
            <el-table-column label="操作" fixed="right" width="200">
              <template v-slot="{row}">
                <el-button type="text" size="18px" style="color:#ffb200" @click="bianji(row)">编辑</el-button>
                <el-button type="text" size="18px" style="color:#ffb200" @click="dialogVisibles(row)">{{ row.status===1?'停用' :'启用' }}</el-button>
                <el-button type="text" size="18px" style="color:#ffb200" @click="open">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </tableBottom>
      </el-card>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <span>是否要{{ val.status===1?'启用':'停用' }}：{{ val.name }}吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="warehouseStatus(val)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import inputTop from '@/views/components/inputTop/index.vue'
import tableBottom from '@/views/components/tableBottom/index.vue'
import { warehouse, warehouseput } from '@/api/manage-base-info/warehouse'

export default {
  name: 'Warehouse',
  components: {
    inputTop,
    tableBottom
  },
  data() {
    return {
      inputList: ['仓库编号', '仓库名称', '仓库状态'],
      val: {},
      dialogVisible: false,
      falg: false,
      loading: false,
      list: [],
      total: 0,
      page: {
        current: 1, // 当前页码
        size: 10
      },
      headers: {
        '仓库编码': {
          key: 'code'
        },
        '仓库名称': {
          key: 'name'
        },
        '仓库类型': {
          key: 'type',
          filter(value) {
            if (value === 'ZZ') {
              return '中转仓'
            } else if (value === 'JG') {
              return '加工仓'
            } else if (value === 'CB') {
              return '储备仓'
            } else {
              return '冷藏仓'
            }
          } },
        '省/市/区': { key: 'location' },
        '详细地址': { key: 'address' },
        '仓库状态': {
          key: 'status',
          filter(value) {
            return value === 1 ? '启用' : '停用'
          }
        },
        '仓库面积m²': { key: 'surface' },
        '库区数量': { key: 'includedNum' },
        '负责人': { key: 'personName' },
        '联系电话': { key: 'phone' },
        '更新时间': { key: 'updateTime' }
      }
    }
  },
  created() {
    this.warehouse(this.page)
  },
  methods: {
    async warehouse(page) {
      this.loading = true
      const { data } = await warehouse(page)
      console.log(data)
      this.list = data.data.records
      this.total = Number(data.data.total)
      console.log(this.total)
      this.loading = false
    },
    changePage(value) {
      this.page.current = value
      this.warehouse()
    },
    sizechange(value) {
      this.page.size = value
      this.warehouse()
    },
    getBtn(data) {
      this.warehouse(data)
    },
    getinput() {
      this.warehouse()
    },
    open() {
      this.$notify({
        title: '警告',
        message: '演示系统，不支持删除',
        type: 'warning'
      })
    },
    dialogVisibles(val) {
      this.val = val
      this.dialogVisible = true
    },
    async warehouseStatus(val) {
      this.dialogVisible = false
      console.log(val)
      const data = {}
      data.id = val.id
      data.status = val.status ? 0 : 1
      console.log(data)
      await warehouseput(data)
      await this.warehouse()
      this.$message({
        showClose: true,
        message: '状态改变成功',
        type: 'success'
      })
    },
    async newAdded() {
      this.$router.push(`warehouse/details/${null}`)
    },
    bianji(e) {
      console.log(e)
      this.$router.push(`warehouse/details/${e.id}`)
    }

  }

}
</script>

<style lang="scss" scoped>

.demo-Warehouse{
  margin:30px;
  .demo-botton{
    background: red;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    padding: 20px 0;
}

 }
 .el-card__body{
  .btn1 {
    margin-left: 10px;
    margin-bottom: 20px ;
    background-color: #00be76;
    &.btn1:hover{
     background-color: #007a4c;
    }
}
}
::v-deep .el-table .cell{
  display: flex ;
  justify-content: space-evenly;
  // font-size: 18px;
}

</style>
