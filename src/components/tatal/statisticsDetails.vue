<template>
    <div id="TAdministration">
        <Heads></Heads>
        <div class="content">
            <!-- 新增start -->
            <div class="addTel">
                回答人员列表
            </div>
            <!-- 新增end -->
            <!-- 查询结果表格start -->
            <div class="telTable">
                <el-table
                    :data="tableData4"
                    style="width: 100%"
                    border
                    >
                    <el-table-column
                    prop="userName"
                    label="姓名"
                    align='center'
                    >
                    </el-table-column>
                    <el-table-column
                    label="得分"
                    align='center'
                    >
                    <template slot-scope="scope">
                        {{this.type==1?'':scope.row.totalScore}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="ctimeString"
                    label="回答时间"
                    align='center'
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align='center'
                    width="90">
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="detailsRow(scope.row.ballotId, scope.row.userId, scope.row.userName)"
                        type="text"
                        size="small">
                        详情
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
import { getAnswersByIdReq } from "../../service/getData.js";
export default {
  data() {
    return {
      type: '',
      page: 1,
      pageSize: 10,
      pageTotal: 0,
      tableData4: [] // 表格数据
    };
  },
  components: {
    Heads
  },
  created() {
    // 请求数据
    this.getCountBallotReqFuc();
  },
  methods: {
    getCountBallotReqFuc() {
      let ballotId = this.$router.currentRoute.query.ballotId;
      let fromId = this.$router.currentRoute.query.fromId;
      this.type = this.$router.currentRoute.query.type;
      let params = {
        ballotId: ballotId,
        fromId: fromId,
        type: this.type,
        page: this.page,
        pageSize: this.pageSize
      };
      getAnswersByIdReq(params)
        .then(res => {
          let data = JSON.parse(res);
          if (data.respCode == 0) {
            this.pageTotal = data.data.total;
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
      this.getCountBallotReqFuc();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getCountBallotReqFuc();
    },
    // 点击详情得操作
    detailsRow(ballotId, userId,name) {
      // 跳转详情页面
      let fromId = this.$router.currentRoute.query.fromId;
      let type = this.type;
      let ballotTitle = this.$router.currentRoute.query.qName
      let ballotType = this.$router.currentRoute.query.ballotType
      this.$router.push({
        path: "/scrollsDetails",
        name: "scrollsDetails",
        query: {
          ballotId,
          userId,
          fromId,
          type,
          name,
          ballotTitle,
          ballotType
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#TAdministration {
  .content {
    padding: 24px;
    .addTel {
      margin-bottom: 22px;
      font-weight: 700;
      font-size: 14px;
      line-height: 14px;
    }
    .telTable {
      margin-bottom: 20px;
    }
  }
}
</style>

