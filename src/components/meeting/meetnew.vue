<template>
<div class="MeetnewWrap">
    <heads></heads>
    <div style="margin-top:20px;">
        <Listhead :head='head' @getparams="searchAction"></Listhead>
    </div>
    <div>
        <div class="btn">
            <el-button plain @click="gettoMeetadd()">新增</el-button>
            <el-button plain @click="gettoMeetup(1)">上架</el-button>
            <el-button plain @click="gettoMeetup(2)">下架</el-button>
            <el-button plain @click="deleteMeet">删除</el-button>
        </div>
        <List style="padding-left:30px;" :isLoading="isLoading" :head='head' @getMeetId="getMeetId" @getparams="searchAction"></List>
        <!-- <Pagination  class="pag"></Pagination>  -->
        <Pagination style="padding-left:30px;"  class="pag" @getparams="searchAction"></Pagination>   
    </div>
    <!-- 推送问卷组件 -->
    <popUp v-if="popUpShow" class="pushArea">
        <div slot="center">
            <div class="pushTit"><span>问卷推送</span></div>
            <div class="pushName">
                <span>会议标题：</span>
                <el-input class="pushInput" :disabled="true" v-model="send.meetName" placeholder="请输入会议标题"></el-input>
            </div>
            <div class="pushTime pushName">
                <span>推送时间：</span>
                <el-date-picker
                    class="pushInput"
                    v-model="send.pushTimeDate"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class="pushTime pushName">
                <span>结束时间：</span>
                <el-date-picker
                    class="pushInput"
                    v-model="send.pushEndTime"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
                <!-- <el-date-picker
                    class="pushInput"
                    v-model="send.pushEndTime"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker> -->
            </div>
            <div class="pushSelect pushName">
                <span>问卷选择：</span>
                <el-select  class="pushInput" v-model="send.quesSelect" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.ballotId"
                    :label="item.ballotTitle"
                    :value="item.ballotId">
                    </el-option>
                </el-select>
            </div>
            <div class="pushName">
                <el-button type="info" @click="cancelButton">取消</el-button>
                <el-button type="primary" @click="pushBalloSave">保存</el-button>
            </div>
        </div>
    </popUp>
</div>
</template>
<script>
import Heads from "../common/head.vue";
import Bus from "../common/bus.js";
import List from "./meetlist.vue";
import Listhead from "./listhead.vue";
import Pagination from "../common/Pagination.vue";
import popUp from "../common/popUp.vue";
import {
  getMeetsByCondition,
  UpDownMeetingApi,
  searchQuesList,
  PushBalloApi,
  operateArticleBatch,
  DeleteMeetingApi
} from "../../service/getData.js";
import { getToday, getFullTime, getEndPartTime } from "../../util/date.js";
export default {
  data() {
    return {
      head: [
        {
          id: "01",
          name: "会议名称",
          type: "text",
          plaseholder: "",
          keys: "meetTitle",
          names: { value: "" },
          flag: true
        },
        {
          id: "02",
          name: "会议状态",
          type: "select",
          keys: "meetFinishStatus",
          names: { value: "" },
          option: [
            {
              id: "01",
              value: "",
              key: "全部"
            },
            {
              id: "02",
              value: "0",
              key: "未开始"
            },
            {
              id: "03",
              value: "1",
              key: "报名中"
            },
            {
              id: "04",
              value: "2",
              key: "进行中"
            },
            {
              id: "05",
              value: "3",
              key: "已结束"
            }
          ]
        },
        {
          id: "03",
          name: "上架状态",
          type: "select",
          plaseholder: "",
          keys: "meetPublishStatus",
          names: { value: "" },
          option: [
            {
              id: "01",
              value: "",
              key: "全部"
            },
            {
              id: "02",
              value: "0",
              key: "未上架"
            },
            {
              id: "03",
              value: "1",
              key: "已上架"
            },
            {
              id: "04",
              value: "2",
              key: "已下架"
            }
          ]
        },
        {
          id: "04",
          name: "开始时间",
          type: "daterange",
          keys: "beginTime",
          names: { value: "" }
        },
        {
          id: "05",
          name: "结束时间",
          type: "daterange",
          keys: "endTime",
          names: { value: "" }
        }
      ],
      data: "",
      meetIds: "",
      deleteArr: [],
      operateType: "",
      isLoading: true,
      popUpShow: false,
      send: {
        meetName: "",
        pushTimeDate: "",
        pushEndTime: "",
        quesSelect: ""
      },
      options: [],
      pushBallParams: {
        meetId: "",
        pushTime: "",
        ballotId: ""
      }
    };
  },
  create() {},
  mounted() {
    this.Emit.$on("sendQuestion", this.sendQuestion);
  },
  destoryed() {
    this.Emit.$off("sendQuestion");
  },
  methods: {
    getMeetId(arr) {
      var ids = [];
      var del = [];
      arr.forEach(item => {
        ids.push(item.meetId);
        del.push({
          id: item.meetId,
          isPublic: item.ispublic
        });
      });
      this.meetIds = ids.join(",");
      this.deleteArr = del;
    },
    sendQuestion(item) {
      this.send.pushTimeDate = "";
      this.send.quesSelect = "";
      this.send.meetName = item.meetTitle;
      // this.send.pushEndTime = item.endTimeString;
      this.send.pushEndTime = "";

      this.pushBallParams.meetId = item.meetId;

      //根据会议ID查询问卷列表
      this.searchQuesList();
      this.popUpShow = true;
    },
    searchQuesList() {
      searchQuesList()
        .then(res => {
          res = JSON.parse(res);
          this.options = res.data;
        })
        .catch(err => {
          alert("问卷列表接口请求出错！");
        });
    },
    searchAction(str) {
      //处理返回的日期格式-开始时间开始
      if (typeof str.beginTime == "object") {
        if (
          !(
            !str.beginTime &&
            typeof str.beginTime != "undefined" &&
            str.beginTime != 0
          )
        ) {
          str.beginLeftTime =
            getToday(str.beginTime[0]) + " " + getEndPartTime(str.beginTime[0]);
          str.beginRightTime =
            getToday(str.beginTime[1]) + " " + getEndPartTime(str.beginTime[1]);
        }
      }
      //处理返回的日期格式-开始时间结束
      //处理返回的日期格式-结束时间开始
      if (typeof str.endTime == "object") {
        if (
          !(
            !str.endTime &&
            typeof str.endTime != "undefined" &&
            str.endTime != 0
          )
        ) {
          str.endLeftTime =
            getToday(str.endTime[0]) + " " + getEndPartTime(str.endTime[0]);
          str.endRightTime =
            getToday(str.endTime[1]) + " " + getEndPartTime(str.endTime[1]);
        }
      }
      //处理返回的日期格式-结束时间结束
      this.isLoading = true;
      console.log(str);
      getMeetsByCondition(str)
        .then(res => {
          this.listdata = res;
          Bus.$emit("getpage", res);
          Bus.$emit("getdata", res);
          //关闭查询按钮loading
          this.Emit.$emit("closeLoading");
          //关闭表格loading
          this.isLoading = false;
        })
        .catch(err => {
          console.log("error" + err);
        });
    },
    gettoMeetadd: function() {
      // 跳转至新增
      this.$router.push({ name: "meetnewadd" });
    },
    gettoMeetup(index) {
      var params = {};
      params.meetIds = this.meetIds;
      params.operateType = index;
      UpDownMeetingApi(params)
        .then(res => {
          res = JSON.parse(res);
          if (res.respCode == 0) {
            this.Emit.$emit("deleteSuccess");
            if (index == 1) {
              this.$notify.info({
                title: "消息",
                message: "上架成功"
              });
            } else if (index == 2) {
              this.$notify.info({
                title: "消息",
                message: "下架成功"
              });
            }
          } else {
            if (index == 1) {
              this.$notify.info({
                title: "消息",
                message: "上架失败"
              });
            } else if (index == 2) {
              this.$notify.info({
                title: "消息",
                message: "下架失败"
              });
            }
          }
        })
        .catch(err => {
          if (index == 1) {
            this.$notify.info({
              title: "消息",
              message: "上架失败"
            });
          } else if (index == 2) {
            this.$notify.info({
              title: "消息",
              message: "下架失败"
            });
          }
        });
    },
    cancelButton() {
      this.popUpShow = false;
      this.move();
    },
    /***取消滑动限制***/
    move() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },
    pushBalloSave() {
      console.log("推送问卷");
      //推送问卷
      this.pushBallParams.ballotId = this.send.quesSelect;
      this.pushBallParams.pushTime = getFullTime(this.send.pushTimeDate);
      this.pushBallParams.endTime = getFullTime(this.send.pushEndTime);

      //调用推送问卷接口
      PushBalloApi(this.pushBallParams)
        .then(res => {
          res = JSON.parse(res);
          if (res.respCode == 0) {
            this.$notify.info({
              title: "消息",
              message: "推送问卷成功！"
            });
          } else {
            this.$notify.error({
              title: "消息",
              message: res.respMsg
            });
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    //披露删除会议
    deleteMeet() {
      // 更改了获取 meetIds 的方式，不再使用 Cookies
      //var meetIds = this.Cookies.get("meetIds");

      // 如果被选中的包含非未上架的会议，则进行提示，不执行删除操作
      this.deleteArr.forEach(item => {
        if (item.isPublic !== 0) {
          this.$notify.info({
            title: "消息",
            message: "只能删除未上架的会议"
          });
          return false;
        }
      });

      var params = {};
      params.meetIds = this.meetIds;
      DeleteMeetingApi(params)
        .then(res => {
          res = JSON.parse(res);
          if (res.respCode == 0) {
            this.Emit.$emit("deleteSuccess");
            this.$notify.info({
              title: "消息",
              message: "删除成功"
            });
          } else {
            this.$notify.error({
              title: "消息",
              message: "删除失败"
            });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "消息",
            message: "接口请求出错！"
          });
        });
    }
  },
  components: {
    Listhead,
    List,
    Pagination,
    Heads,
    popUp
  }
};
</script>
<style lang="less">
.MeetnewWrap {
  margin-left: 5px;
  // padding-top:30px;
  padding-bottom: 30px;
  .btn {
    margin: 15px;
    margin-left: 0;
    padding-left: 30px;
  }
  .pushArea {
    @pushPL: 10px;
    .pushTit {
      width: 100%;
      height: 44px;
      border: 1px solid #efefef;
      span {
        line-height: 44px;
      }
      padding-left: @pushPL;
    }
    .pushName {
      padding: 10px 0;
      padding-left: @pushPL;
    }
    .pushInput {
      display: inline-block;
      width: 300px;
    }
  }
}
</style>

