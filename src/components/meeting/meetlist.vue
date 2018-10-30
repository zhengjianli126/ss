<template>
<div class="tableListWrap">
    <el-table
            ref="multipleTable"
            :data="list"
            tooltip-effect="dark"
            border
            stripe
            :header-cell-style="{background:'#f4f4f4',color:'#666'}"
            style="width:1156px"
            @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="40">
        </el-table-column>
            <el-table-column
            prop="meetTitle"
            label="会议名称"
            width="240"
            show-overflow-tooltip>
            </el-table-column>
            
            <el-table-column
            prop="beginTimeString"
            label="开始时间"
            width="100">
            </el-table-column>
            <el-table-column
            prop="endTimeString"
            label="结束时间"
            width="100">
            </el-table-column>

             <el-table-column
            prop="meetAttendCount"
            label="报名人数"
            width="80"
            show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button v-if="scope.row.meetAttendCount !== 0" @click="gotoApplicants(scope.row)" type="text" size="small">{{scope.row.meetAttendCount}}</el-button>
                  <span v-if="scope.row.meetAttendCount === 0">{{scope.row.meetAttendCount}}</span>
                </template>
            </el-table-column>

             <el-table-column
            prop="selfIsfinish"
            label="会议状态"
            width="80">
            </el-table-column>
             <el-table-column
            prop="selfIspublic"
            label="上架状态"
            width="100"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="操作"
                width="400">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.meetAttendCount !==0"  @click="getischeck(scope.row)" type="text" size="small">推送问卷</el-button>
                    <el-button v-if="scope.row.meetAttendCount !==0"  @click="gettotail(scope.row.meetId)" type="text" size="small">问卷统计</el-button>
                    <el-button v-if="scope.row.ischeck !==1"  @click="gettoChange(scope.row.meetId)" type="text" size="small">修改</el-button>
                    <el-button v-if="scope.row.isfinish === 1" @click="changeStatus(scope.row.meetId,1)" type="text" size="small">取消报名</el-button>
                    <el-button v-if="scope.row.isfinish === 0 || scope.row.isfinish === 2"  @click="changeStatus(scope.row.meetId,0)" type="text" size="small">开始报名</el-button>
                    <el-button @click="gettodetail(scope.row.meetId)" type="text" size="small">详情</el-button>
                </template>
             </el-table-column>
        </el-table>
</div>
</template>
<script>
import Bus from "../common/bus.js";
import { GetDetails, StartEndMeetingApi } from "../../service/getData.js";
export default {
  props: ["checked","head"],
  data() {
    return {
      headData:this.head,
      enter: 0,
      cancle: true,
      ths: this.th,
      datas: {},
      list: [],
      value: {},
      phonenum: []
    };
  },
  methods: {
    gotoApplicants(str){
      this.$router.push({
        name: "applicants",
        query: { meetId:str.meetId }
      }); // 跳转至修改
    },
    changeStatus(id, index) {
      var params = {};
      params.meetId = id;
      params.signStatus = index
      
      // 开始报名\取消报名
      StartEndMeetingApi(params)
        .then(res => {
          console.log(res)
          this.$emit("getparams",this.headData)
        })
        .catch(error => {
          alert(error);
        });
    },
    //推送问卷
    getischeck(item) {
      this.Emit.$emit("sendQuestion", item);
    },
    aa(e) {
      this.phonenum = [...this.phonenum, e.target.value];
      console.log(this.phonenum);
      this.$emit("childByValue", this.phonenum);
    },
    getEnter(index) {
      this.enter[index] = this.enter[index] === 0 ? 1 : 0;
    },
    gettodetail: function(meetId) {
      this.$router.push({
        name: "meetnewadd",
        query: { isDetail: true, meetId: meetId }
      }); // 跳转至详情
    },
    gettoChange: function(meetId) {
      this.$router.push({
        name: "meetnewadd",
        query: { isEdit: true, meetId: meetId }
      }); // 跳转至修改
    },
    handleSelectionChange(val) {
      // 单选框
      //    var meetids = [];
      //    for(var i = 0;i<val.length;i++){
      //        meetids.push(val[i].meetId);
      //    }
      //    var strMeetIds = meetids.join(',');
      //    this.Cookies.set('meetIds',strMeetIds);

      // 改成不用 Cookies
      this.$emit("getMeetId", val);
    },
    //问卷统计列表
    gettotail(meetId) {
      this.$router.push({ name: "quesDetail", query: { meetId: meetId } });
    }
  },
  computed: {},
  mounted() {
    Bus.$on("getdata", data => {
      var data = JSON.parse(data);
      this.datas = data;
      this.list = data.data.list;
      console.log(this.list);
      this.list.forEach(item => {

        //item.btnStatus = 0;

        switch (parseInt(item.isfinish)) {
          case 0:
            item.selfIsfinish = "未开始";
            break;
          case 1:
            item.selfIsfinish = "报名中";
            break;
          case 2:
            item.selfIsfinish = "进行中";
            break;
          default:
            item.selfIsfinish = "已结束";
        }
        switch (parseInt(item.ispublic)) {
          case 0:
            item.selfIspublic = "未上架";
            break;
          case 1:
            item.selfIspublic = "已上架";
            break;
          default:
            item.selfIspublic = "已下架";
        }
      });
    });
  },
  components: {}
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
