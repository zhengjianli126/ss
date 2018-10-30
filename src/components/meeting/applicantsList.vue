<template>
<div class="tableListWrap">
    <el-table
            ref="multipleTable"
            :data="list"
            tooltip-effect="dark"
            border
            stripe
            :header-cell-style="{background:'#f4f4f4',color:'#666'}"
            style="width:1024px"
            @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="40">
        </el-table-column>
            <el-table-column
            prop="userRealName"
            label="真实姓名"
            width="80"
            show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column
            prop="userName"
            label="用户姓名"
            width="240"
            show-overflow-tooltip>
            </el-table-column> -->
            <el-table-column
            prop="userSex"
            label="性别"
            width="60">
            </el-table-column>
            <el-table-column
            prop="phoneNum"
            label="手机号"
            width="120">
            </el-table-column>
             <el-table-column
            prop="userHospital"
            label="医院"
            width="80"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="userOffice"
            label="科室"
            width="80">
            </el-table-column>
             <el-table-column
            prop="userPost"
            label="职务"
            width="100"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="specialCommittee"
            label="专委会"
            width="100"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="userPost"
            label="身份"
            width="80"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="selfIsCheck"
            label="审核状态"
            width="80"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="selfIsSign"
            label="签到状态"
            width="80"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoCheck(scope.row)" size="small">审核</el-button>
                    <el-button type="text" @click="gotoDetail(scope.row)" size="small">详情</el-button>
                </template>
             </el-table-column>
        </el-table>
</div>
</template>
<script>
import Bus from "../common/bus.js";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    handleSelectionChange(val){
      this.$emit("getparmas",val)
    },
    gotoDetail(res){
      res = {
        meetId: res.meetId,
        userId: res.userId
      }
      this.$router.push({name:"applicantDetail", query:{...res}})
    },
    gotoCheck(res){
      res = {
        meetId: res.meetId,
        userId: res.userId
      }
      this.$router.push({name:"checkApplicant", query:{...res}})
    }
  },
  computed: {},
  mounted() {
    Bus.$on("getdata", data => {
      var data = JSON.parse(data);
      console.log(data)
      this.datas = data;
      this.list = data.data.list;

      this.list.forEach(item => {
        switch(item.isCheck){
          case 0:
            item.selfIsCheck = "待审核"
            break;
          case 1:
            item.selfIsCheck = "通过"
            break;
          default:
            item.selfIsCheck = "未通过"
        }

        if(item.isSign === 0){
          item.selfIsSign = "未签到"
        }else{
          item.selfIsSign = "已签到"
        }
      })
    });
  },
  components: {
  }
};
</script>
<style scoped >
table {
  border-collapse: collapse;

  text-align: center;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
  text-align: center;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
  text-align: center;
}
table th a {
  padding-right: 10px;
}
table td:nth-child(2) {
  width: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
table tr:nth-child(odd) {
  background: #fff;
  text-align: center;
}
table tr:nth-child(even) {
  background: #f5fafa;
  text-align: center;
}
* {
  margin: 0;
  padding: 0;
}
.add {
  position: fixed;
  top: 50px;
  left: 500px;
  background: #ffffff;
  height: 565px;
  width: 533px;
}
</style>
