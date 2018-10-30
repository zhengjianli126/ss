<template>
  <el-dialog :title="addTextAble.title" :visible.sync="addTextAble.dialogFormVisible">
    <div class="addtextableWrap">
      <div class="add">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"
                 class="demo-ruleForm">
          <el-form-item label="标签类别：" prop="level">
            <el-select v-model="ruleForm.level" placeholder="请选择">
              <el-option label="一级标签" value="1"></el-option>
              <el-option label="二级标签" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签名称：" prop="labelName">
            <el-input type="text" v-model="ruleForm.labelName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.level==='2'" label="上级标签：" prop="pid">
            <el-select v-model="ruleForm.pid" filterable placeholder="请选择">
              <el-option v-for="(item, index) in oneLabels" :label="item.labelName" :value="item.labelId"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { getOneLabels } from '../../../service/getData.js'//引入接口
  export default {
    props: {
      addTextAble: {
        type: Object,
        default: function () {
          return {
            title: '新增',
            isAdd: false,
            dialogFormVisible: false
          }
        }
      },
      dialogFormVisible: {
        type: Boolean,
        default: false
      },
      currentRow: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        ruleForm: {
          labelId: '',
          labelName: '',
          level: '1',
          pid: ''
        },
        oneLabels: [],
        rules: {
          pid: [
            {required: true, message: '该项目不能为空', trigger: 'change'}
          ],
          labelName: [
            {required: true, message: '该项目不能为空', trigger: 'blur'}
          ],
          level: [
            {required: true, message: '该项目不能为空', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      /**
       * 查询所有一级标签
       */
      textableadd () {
        getOneLabels({labelType: 2}).then((res) => {
          let resObj = JSON.parse(res)
          this.$set(this, 'oneLabels', resObj.data)
          this.ruleForm.pid = this.oneLabels[0].labelId || ''
        }).catch(err => {
          alert('error' + err)
        })
      },
      /**
       * 确定
       */
      confirm () {
        let pid = this.ruleForm.pid
        if (this.ruleForm.level === '1') {pid = '0000'}
        if (!this.ruleForm.labelName) {
          this.$message.warning('标签名称不能为空')
          return
        }
        this.$emit('onConfirm', {
          labelName: this.ruleForm.labelName,
          level: this.ruleForm.level,
          pid: pid,
          labelType: '2',
          isPro: ''
        })
      },
      /**
       * 取消
       */
      cancel () {
        this.$emit('onCancel')
      }
    },
    created () {
      // 查询一级标签
      this.textableadd()
    },
    watch: {
      'addTextAble.dialogFormVisible': function (val, oldval) {
        let currentRow = this.currentRow
        if (val === true) {
          if (this.addTextAble.isAdd) {
            this.ruleForm = {
              labelId: '',
              level: '1',
              labelName: '',
              pid: ''
            }
          } else {
            this.ruleForm = {
              labelId: currentRow.labelId || '',
              level: currentRow.level + '' || '1',
              labelName: currentRow.labelName || '',
              pid: currentRow.pid || ''
            }
          }
        }
      }
    }
  }
</script>
<style lang="less">
  .addtextableWrap {
    width: 460px;
  }
</style>

