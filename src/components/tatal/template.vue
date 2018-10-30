<template>
    <div id="TAdministration">
        <Heads></Heads>
        <div class="content">
            <!-- 查询头部start -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="模板名称：">
                    <el-input @blur="blur" v-model.trim="formInline.themeContent" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="模板类型：">
                    <el-select v-model="formInline.type" @change="selectChange">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="投票/问卷模板" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 查询头部end -->
            <!-- 新增start -->
            <div class="addTel">
                <el-button @click="dialogFormVisible = true" style="margin-bottom: 22px">新增</el-button>
                <el-dialog :before-close="closeDilog" title="新增" :visible.sync="dialogFormVisible" width="500px">
                    <el-form :model="addTelRef" ref="addTelRef" :rules="rules">
                        <el-form-item label="模板名称：" :label-width="formLabelWidth" prop="themeContent">
                            <el-input v-model.trim="addTelRef.themeContent" autocomplete="off" placeholder="请输入模板名称"></el-input>
                        </el-form-item>
                        <el-form-item label="模板类型：" :label-width="formLabelWidth" prop="type">
                            <el-select v-model="addTelRef.type" placeholder="请选择">
                                <el-option label="投票/问卷模板" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancleAddTel('addTelRef')">取 消</el-button>
                        <el-button type="primary" @click="addTelFuc('addTelRef')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <!-- 新增end -->
            <!-- 查询结果表格start -->
            <div class="telTable">
                <el-table
                    :data="tableDataReq"
                    style="width: 100%"
                    border
                    >
                    <el-table-column
                    prop="themeContent"
                    label="模板名称"
                    align='center'
                    >
                    </el-table-column>
                    <el-table-column
                    label="模板类型"
                    align='center'
                    >
                    <template slot-scope="scope">
                        {{scope.row.type == 0?'投票/问卷模板':''}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="上传时间"
                    align='center'
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align='center'
                    width="90">
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="deleteRow(scope.row.themeId,scope.row.themeContent)"
                        type="text"
                        size="small">
                        删除
                        </el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                style="text-align:right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30]"
                :page-size.sync="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageTotal">
            </el-pagination>
            <!-- 查询结果表格end -->
        </div>
    </div>
</template>
<script>
import Heads from "../common/head.vue";
import {
  getVotethemesByCondition,
  addTelHtf,
  delTelHtf
} from "../../service/getData.js";
export default {
  data() {
    return {
      pageTotal: 0,
      themeContent: "",
      type: "",
      page: 1,
      pageSize: 10,
      tableDataReq: [], // 表格数据
      formInline: {
        themeContent: "",
        type: ""
      },
      dialogFormVisible: false,
      addTelRef: {
        themeContent: "",
        type: ""
      }, // 新增modal得表单数据
      formLabelWidth: "120px",
      //   新增模板的校验
      rules: {
        themeContent: [
          { required: true, message: "请输入模板名称", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择模板类型", trigger: "change" }]
      }
    };
  },
  components: {
    Heads
  },
  created() {
    //  获取列表数据
    this.getTableData();
  },
  methods: {
    onSubmit() {
      this.getTableData();
    },
    // 删除操作
    deleteRow(id,name) {
      // 弹出确认框
      this.$confirm('<div>您确定要删除模板[<strong style="color:red">'+name+'</strong>]嘛？</div>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        delTelHtf({ votethemeId: id })
        .then(res => {
          let data = JSON.parse(res);
          if (data.respCode == 0) {
            this.$message({
              message: data.respMsg,
              type: "success"
            });
            this.getTableData();
          } else {
            this.$message({
              message: data.respMsg,
              type: "error"
            });
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },
    // 请求数据
    getTableData() {
      this.themeContent = this.formInline.themeContent;
      this.type = this.formInline.type;
      let params = {
        themeContent: this.themeContent,
        type: this.type,
        page: this.page,
        pageSize: this.pageSize
      };
      getVotethemesByCondition(params)
        .then(res => {
          let data = JSON.parse(res);
          if (data.respCode == 0) {
            this.pageTotal = data.data.total;
            this.tableDataReq = data.data.list;
          } else {
            this.$message({
              message: data.respMsg,
              type: "error"
            });
          }
        })
    },
    // 模板下拉框得选择
    selectChange(value) {
      this.getTableData();
    },
    // 失去焦点事件
    blur() {
        this.getTableData();
    },
    // 分页逻辑
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    // 新增模板
    addTelFuc(addTelRef) {
      this.$refs[addTelRef].validate(valid => {
        if (valid) {
          // 请求数据
          addTelHtf(this.addTelRef)
            .then(res => {
              let data = JSON.parse(res);
              if (data.respCode == 0) {
                this.$message({
                  message: data.respMsg,
                  type: "success"
                });
                this.getTableData();
              } else {
                this.$message({
                  message: data.respMsg,
                  type: "error"
                });
              }
            })
          this.dialogFormVisible = false;
          this.$refs[addTelRef].resetFields()
        }
      });
    },
    // 取消新增
    cancleAddTel(addTelRef) {
        this.$refs[addTelRef].resetFields()
        this.dialogFormVisible = false
    },
    // 关闭前回调
    closeDilog(addTelRef) {
        this.$refs['addTelRef'].resetFields()
        this.dialogFormVisible = false
    }
  }
};
</script>
<style lang="less" scoped>
#TAdministration {
  .content {
    padding: 24px;
    .addTel {
      form {
        .el-input {
          width: 300px;
        }
        .el-select {
          width: 300px;
        }
      }
    }
    .telTable {
      margin-bottom: 20px;
    }
  }
}
</style>

