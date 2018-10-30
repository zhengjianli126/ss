<template>
    <div id="TAdministration">
        <Heads></Heads>
        <div class="content">
            <!-- 查询头部start -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="位置：">
                    <el-input @blur="onSubmit" v-model.trim="formInline.name" placeholder="请输入查询位置"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 查询头部end -->
            <!-- 查询结果表格start -->
            <div class="telTable">
              <el-table
                  :data="tableData4"
                  style="width: 100%"
                  border
                  >
                  <el-table-column
                  prop="ballotVOs.title"
                  label="位置"
                  align='center'
                  >
                  </el-table-column>
                  <el-table-column
                  prop="ballotVOs.date"
                  label="时间"
                  align='center'
                  >
                  </el-table-column>
                  <el-table-column
                  label="回答人数"
                  align='center'
                  width="100">
                  <template slot-scope="scope">
                      <el-button
                      @click.native.prevent="numberClick(scope.row.ballotVOs.ballotId, scope.row.ballotVOs.fromId, scope.row.ballotVOs.type)"
                      type="text"
                      >
                      {{scope.row.ballotVOs.replyNum}}
                      </el-button>
                  </template>
                  </el-table-column>
                  <el-table-column
                  label="操作"
                  align='center'
                  width="100">
                  <template slot-scope="scope">
                      <el-button
                      @click.native.prevent="deleteRow()"
                      type="text"
                      >
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
import Heads from "../common/head.vue";
import { getCountBallotReq } from "../../service/getData.js";
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      pageTotal: 0,
      formInline: {
        name: ""
      },
      tableData4: [], // 表格数据
      form: {
        name: "",
        type: ""
      }, // 新增modal得表单数据
      formLabelWidth: "120px"
    };
  },
  components: {
    Heads
  },
  created() {
    // 根据id请求表格数据
    this.getCountBallotReqFuc()
  },
  methods: {
    // 查询按钮
    onSubmit() {
      this.getCountBallotReqFuc()
    },
    // 删除操作
    deleteRow() {
      this.$message({
        message: "此功能尚未开发",
        type: "warning"
      });
    },
    // 点击回答人数
    numberClick(ballotId, fromId, type) {
      let qName = this.$router.currentRoute.query.qName
      let ballotType = this.$router.currentRoute.query.ballotType
      this.$router.push({
        path: "/statisticsDetails",
        name: "statisticsDetails",
        query: {
          ballotId : ballotId,
          fromId: fromId,
          type,
          qName,
          ballotType
        }
      });
    },
    // 请求数据
    getCountBallotReqFuc() {
      let ballotId = this.$router.currentRoute.query.id
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        ballotId: ballotId,
        location: this.formInline.name
      }
      getCountBallotReq(params)
      .then(res => {
        let data = JSON.parse(res);
        if (data.respCode == 0) {
          this.pageTotal = data.data.list.length;
          this.tableData4 = data.data.list;
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
      this.getCountBallotReqFuc()
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getCountBallotReqFuc()
    },
  }
};
</script>
<style lang="less" scoped>
#TAdministration {
  .content {
    padding: 24px;
    .telTable {
      margin-bottom: 20px;
    }
  }
}
</style>

