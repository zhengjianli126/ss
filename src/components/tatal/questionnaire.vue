<template>
    <div id="questionnaireAdm">
        <Heads></Heads>
        <div class="content">
            <!-- 查询头部start -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="问卷名称：">
                    <el-input @blur="blur" v-model.trim="formInline.name" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="问卷类型：">
                    <el-select v-model="formInline.type" @change="selectChange">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="问卷调查" value="0"></el-option>
                        <el-option label="投票" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 查询头部end -->
            <!-- 新增start -->
            <div class="addTel">
                <el-button @click="questNewAdd">新增</el-button>
                <el-button :disabled = !delQuestListFlag @click="delQuestList">删除</el-button>
            </div>
            <!-- 新增end -->
            <!-- 查询结果表格start -->
            <div class="telTable">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    border
                    >
                    <el-table-column
                    type="selection"
                    width="55"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="ballotTitle"
                    label="问卷名称"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="ballotQuesNum"
                    label="问题数"
                    width="120"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    label="类型"
                    width="120"
                    align="center"
                    >
                    <template slot-scope="scope">
                        {{scope.row.ballotType == 0?'问卷调查':'投票'}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="url"
                    label="链接地址"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="160"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="modify(scope.row.ballotId)"
                        type="text"
                        size="small">
                        修改
                        </el-button>
                        <el-button
                        @click.native.prevent="details(scope.row.ballotId)"
                        type="text"
                        size="small">
                        详情
                        </el-button>
                        <el-button
                        @click.native.prevent="Statistics(scope.row.ballotId,scope.row.ballotTitle,scope.row.ballotType)"
                        type="text"
                        size="small">
                        统计
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
import { getBallotsByCondition, delQuestList } from "../../service/getData.js";
import Heads from "../common/head.vue";
export default {
  data() {
    return {
      delQuestListArr: [],
      delQuestListFlag: false,   // 删除按钮的状态
      page: 1,
      pageSize: 10,
      pageTotal: 0,
      formInline: {
        name: "",
        type: ""
      },
      tableData3: [], // 表格数据
      multipleSelection: []
    };
  },
  components: {
    Heads
  },
  //   组件加载前
  created() {
    this.getBallotsByConditionFuc();
  },
  methods: {
    onSubmit() {
      this.getBallotsByConditionFuc()
    },
    handleSelectionChange(val) {
      this.delQuestListArr = []
      val.some((item,i) => {
        this.delQuestListArr.push(item.ballotId)
      })
      if(val.length == 0){
        this.delQuestListFlag = false
      }else {
        this.delQuestListFlag = true
      }
      this.multipleSelection = val;
    },
    // 修改操作
    modify(id) {
      this.$router.push({
        path: "/questNewAdd",
        name: "questNewAdd",
        query: {
          type: "modify",
          ballotId: id
        }
      });
    },
    // 详情操作
    details(id) {
      this.$router.push({
        path: "/questNewAdd",
        name: "questNewAdd",
        query: {
          type: "details",
          ballotId: id
        }
      });
    },
    // 统计操作
    Statistics(index,qName,ballotType) {
      this.$router.push({
        path: "/statistics",
        name: "statistics",
        query: {
          qName,
          id:index,
          ballotType
        }
      });
    },
    // 点击新增，路由跳转
    questNewAdd() {
      this.$router.push({
        path: "/questNewAdd",
        name: "questNewAdd",
        query: {
          type: "add"
        }
      });
    },
    // 请求表格数据
    getBallotsByConditionFuc() {
      let params = {
        bollotTile: this.formInline.name,
        ballotType: this.formInline.type,
        page: this.page,
        pageSize: this.pageSize
      };
      getBallotsByCondition(params)
        .then(res => {
          let data = JSON.parse(res);
          console.log(data)
          if (data.respCode == 0) {
            this.pageTotal = data.data.total;
            this.tableData3 = data.data.list;
          } else {
            this.$message({
              message: data.respMsg,
              type: "error"
            });
          }
        })
    },
    // 分页逻辑
    handleSizeChange(val) {
      this.pageSize = val;
      this.getBallotsByConditionFuc();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getBallotsByConditionFuc();
    },
    // 模板下拉框得选择
    selectChange(value) {
      this.getBallotsByConditionFuc();
    },
    // 失去焦点事件
    blur() {
      this.getBallotsByConditionFuc();
    },
    // 删除
    delQuestList() {
      var delQuestListArrStr = this.delQuestListArr.join()
      this.$confirm('您确定要删除选中的问卷嘛？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        delQuestList({ ballotIds: delQuestListArrStr })
        .then(res => {
          let data = JSON.parse(res);
          if (data.respCode == 0) {
            this.$message({
              message: data.respMsg,
              type: "success"
            });
            this.getBallotsByConditionFuc()
          } else {
            this.$message({
              message: data.respMsg,
              type: "error"
            });
          }
        })
      })
    }
  }
};
</script>
<style lang="less" scoped>
#questionnaireAdm {
  .content {
    padding: 24px;
    .addTel {
      margin-bottom: 22px;
    }
    .telTable {
      margin-bottom: 20px;
    }
  }
}
</style>

