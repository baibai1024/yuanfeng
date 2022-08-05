<template>
  <div class="inpntTop">
    <el-row :gutter="20" type="flex">
      <el-col :span="6" type="flex"><div class="grid-content bg-purple">
        <p class="span-a">{{ inputList[0] }}</p>
        <el-input
          v-model="input1"
          :maxlength="10"
          placeholder="请输入"
          clearable
        />
      </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <p class="span-a">{{ inputList[1] }}</p>
        <el-input
          v-model="input2"
          :maxlength="10"
          placeholder="请输入"
          clearable
        />
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <p class="span-a">{{ inputList[2] }}</p>
        <el-input
          v-if="falg"
          v-model="input3"
          :maxlength="10"
          placeholder="请输入"
          clearable
        />
        <el-select v-else v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-row type="flex" justify="end" align="middle">
          <el-button type="warning" round @click="getBtn">搜索</el-button>
          <el-button plain round @click="empty">重置</el-button>
        </el-row>
      </div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'InpntTop',
  props: {
    falg: {
      type: Boolean,
      required: true
    },
    inputList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      options: [{
        value: ' ',
        label: '全部'
      }, {
        value: 1,
        label: '启用'
      }, {
        value: 0,
        label: '停用'
      }],
      value: '',
      page: {
        like_code: '',
        like_name: '',
        status: '',
        current: 1,
        size: 10,
        ownerName: ''
      }
    }
  },
  methods: {
    getBtn() {
      this.page.like_code = this.input1
      this.page.like_name = this.input2
      this.page.ownerName = this.input3
      this.page.status = this.value
      const data = {}
      for (const i in this.page) {
        if (this.page[i] !== '') {
          data[i] = this.page[i]
        }
      }
      this.$emit('getBtn', data)
    },
    empty() {
      this.input1 = ''
      this.input2 = ''
      this.input3 = ''
      this.value = ''
      this.$emit('getinput')
    }
  }
}
</script>
<style lang="scss" scoped>
.inpntTop{
    height: 140px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    padding: 30px;
    margin-bottom: 20px;

}
  .el-row {
    margin-bottom: 20px;
    height: 100%;
    .el-button{
      width: 90px;
      height: 45px;
      font-size: 16px;
      color: black;
      margin-left: 20px;
      margin-right: 5px;
      &.el-button:hover{
        background-color: #ff8e00;
      }
    }
    &:last-child {
      margin-bottom: 0;
      // padding:20px 5px 0 0
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
 ::v-deep .bg-purple {

    height: 100%;
    .el-select{
      width: 100%;
    }

   .el-input__inner{
      background-color:#f8f5f5 ;
      border-radius: 10px;
    }

    .span-a{
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
