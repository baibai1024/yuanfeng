<template>
  <div class="contair">
    <el-card v-loading="loading" shadow="always">
      <el-form
        ref="forms"
        label-position="top"
        :inline="true"
        class="demo-form-inline"
        :model="formdata"
        :rules="rules"
      >
        <el-row type="flex">
          <el-form-item label="仓库编码">
            <el-input v-model="formdata.code" disabled placeholder="请输入" />
          </el-form-item>
          <el-form-item prop="name" label="仓库名称">
            <el-input v-model="formdata.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item prop="type" label="仓库类型">
            <el-select v-model="formdata.type" placeholder="请选择">
              <el-option label="中转仓" value="ZZ" />
              <el-option label="加工仓" value="JG" />
              <el-option label="储备仓" value="CB" />
              <el-option label="冷藏仓" value="LC" />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-col :span="16">
            <el-form-item label="省市区" prop="location" class="areaid">
              <el-cascader
                v-model="formdata.location"
                size="large"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="chengshi"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="16">
            <el-form-item
              label="详细地址"
              prop="address"
              class="areaid"
            >
              <el-input v-model="formdata.address" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库状态" prop="status">
              <el-radio-group v-model="formdata.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-form-item
            label="仓库面积"
            prop="surface"
            class="areaHouse"
          >
            <el-input v-model="formdata.surface" placeholder="请输入">
              <i slot="suffix" class="icons">m³</i>
            </el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="personName">
            <el-input v-model="formdata.personName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="formdata.phone" placeholder="请输入" />
          </el-form-item>
        </el-row>
        <el-row class="bottoms">
          <el-form-item class="buttons">
            <el-button @click="outList">返回</el-button>
            <el-button type="primary" @click="submitList">提交</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { warehouse, warehouseput, newAdded, warehousepost } from '@/api/manage-base-info/warehouse'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  name: 'WarehouseForm',
  data() {
    return {
      loading: false,
      options: regionData,
      selectedOptions: [],
      value: '',
      formdata: {
        province: '',
        city: '',
        area: '',
        code: '',
        name: '',
        type: '',
        location: '',
        address: '',
        status: 1,
        surface: '',
        personName: '',
        phone: ''
      },
      rules: {
        name: [{ max: 10, required: true, trigger: 'blur', message: '仓库名称不能为空' }],
        type: [{ required: true, trigger: 'blur', message: '仓库类型不能为空' }],
        location: [{ type: 'array', required: true, message: '地址不能为空', trigger: 'blur' }],
        status: [{ required: true, trigger: 'blur', message: '仓库状态不能为空' }],
        personName: [{ required: true, trigger: 'blur', message: '负责人必填' }],
        phone: [{ required: true, trigger: 'blur', message: '负责人必填' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机格式不对',
            trigger: true
          }]
      }
    }
  },
  computed: {
  },
  created() {
    this.fromlist()
  },
  mounted() {
  },
  methods: {
    chengshi(e) {
      this.formdata.province = e[0]
      this.formdata.city = e[1]
      this.formdata.area = e[2]
    },
    async fromlist() {
      this.loading = true

      if (this.$route.params.id !== 'null') {
        const { data } = await warehouse(this.$route.params)

        data.data.records[0].status = Number(data.data.records[0].status)
        this.formdata = data.data.records[0]
        const a = this.formdata.location.split('/')
        this.formdata.location = [TextToCode[a[0]].code, TextToCode[a[0]][a[1]].code, TextToCode[a[0]][a[1]][a[2]].code]
      } else {
        const { data } = await newAdded()
        console.log(data)
        this.formdata.code = data.data
      }
      this.loading = false
    },
    outList() {
      this.$router.back()
    },
    async submitList() {
      try {
        this.loading = true
        await this.$refs.forms.validate()
        this.formdata.location = `${CodeToText[this.formdata.location[0]]}/${CodeToText[this.formdata.location[1]]}/${
          CodeToText[this.formdata.location[2]]
        }`
        console.log(this.formdata)
        if (this.$route.params.id !== 'null') {
          console.log(this.formdata)
          await warehouseput(this.formdata)
        } else {
          console.log(this.formdata)
          await warehousepost(this.formdata)
        }
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
        this.$router.back()
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$mainColor: #feb202;
.contair {
  padding: 20px;
}
.el-card {
  border-radius: 10px;
  margin-bottom: 20px;
}
::v-deep .demo-form-inline {
  .el-input {
    .el-input__inner {
      border-radius: 8px !important;
      background-color: #f8f5f5 !important;
    }
  }
}
::v-deep .el-cascader {
  width: 100%;
  .el-input--suffix .el-input__inner {
    border-radius: 8px !important;
    background-color: #f8f5f5 !important;
  }
}
.el-select {
  width: 100% !important;
  border-radius: 8px !important;
  ::v-deep .el-input__inner {
    border-radius: 8px !important;
    background-color: #f8f5f5 !important;
  }
}
::v-deep.el-radio {
  &.is-checked {
    .el-radio__inner {
      color: $mainColor;
      border-color: $mainColor;
      background-color: $mainColor;
    }
    .el-radio__label {
      color: $mainColor;
    }
  }
}
.el-form-item {
  flex: 1;
  padding: 0 15px;
  ::v-deep .el-form-item__label {
    color: #9fa4ac !important;
    font-size: 14px;
    input:focus {
      border: none;
      border: 1px solid $mainColor;
    }
  }
}
//下拉框选中
.el-select-dropdown__item.selected {
  color: $mainColor;
  background-color: #fff;
}
.el-select-dropdown__item:hover {
  background-color: #fff6e2;
}
::v-deep input:focus {
  border: none;
  border: 1px solid $mainColor !important;
}
.buttons {
  padding-right: 10px;
  .el-button {
    margin: 0 10px;
    width: 180px;
    &:hover {
      background-color: $mainColor;
    }
  }
  .el-button--primary {
    background-color: $mainColor;
    border: none;
    border-radius: 20px;
    color: black;
    &:hover {
      background-color: #ff8e00;
    }
  }
  .el-button--default {
    background-color: #f8f5f5;
    border: none;
    border-radius: 20px;
    color: black;
  }
}
.areaid {
  width: 100%;
  input {
    width: 100%;
  }
}
.bottoms {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
.areaHouse {
  .el-input {
    border-radius: none;
    padding-right: 40px;
    ::v-deep .el-input__inner {
      border-radius: 8px 0 0 8px !important;
    }
    ::v-deep .el-input__suffix {
      right: 0;
      width: 40px;
      color: #999;
      border-radius: 0 8px 8px 0;
      background-color: #e7dfdf;
    }
  }
}
</style>
