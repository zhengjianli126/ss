<template>
    <div id="TAdministration">
        <Heads></Heads>
        <div class="content">
            <div class="titleCenterH">{{this.ballotTitle}}</div>
            <div class="tips">
              <span class="tipsOne">提交人：{{this.userName}}</span>
              <span v-if="ballotType==0?true:false">得分：{{this.score}}</span>
            </div>
            <div class="answer" v-for="(item,index) of this.dataList">
              <div class="num">{{index-0+1}}、</div>
              <div class="answerCon" :style="{marginLeft:String(index).length-0+1+'em'}">
                <span>{{item.questionTitle}}</span>
                <span v-show="item.questionType ==0">（单选）</span>
                <span v-show="item.questionType ==1">（多选）</span>
                <span v-show="item.questionType ==3">（问答）</span>
                <span v-if="ballotType==0?true:false" class="scoreItem">（得分：{{item.questionScore }}）</span>
                <div class="answerItem">回答：{{item.questionAnswer}}</div>
              </div>
            </div>
            <div class="closeBtn">
              <el-button type="primary" @click="close">关闭</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import Heads from "../common/head.vue"
import { getAnswerInfoByBallotIdAndUserIdReq } from "../../service/getData.js";
export default {
  data() {
    return {
      ballotTitle: "",
      userName: "",
      score: 0,
      dataList: "",
      type:0,
      ballotType: 0
    };
  },
  components: {
    Heads
  },
  created () {
    this.getAnswerInfoByBallotIdAndUserIdReqFuc()
    this.ballotType = this.$router.currentRoute.query.ballotType
  },
  methods: {
    // 请求数据
    getAnswerInfoByBallotIdAndUserIdReqFuc() {
      let ballotId = this.$router.currentRoute.query.ballotId
      let fromId = this.$router.currentRoute.query.fromId
      this.type = this.$router.currentRoute.query.type
      let userId = this.$router.currentRoute.query.userId
      this.ballotTitle = this.$router.currentRoute.query.ballotTitle
      this.userName = this.$router.currentRoute.query.name
      let params = {
        ballotId,
        fromId,
        type: this.type,
        userId
      }
      getAnswerInfoByBallotIdAndUserIdReq(params)
        .then(res => {
        let data = JSON.parse(res);
        if (data.respCode == 0) {
          this.dataList = data.data;
          this.dataList.some(item => {
            this.score += item.questionScore
          })
        } else {
          this.$message({
            message: data.respMsg,
            type: "error"
          });
        }
      })
    },
    // 点击关闭
    close() {
        this.$router.back(-1)
    }
  }
};
</script>
<style lang="less" scoped>
#TAdministration {
  .content {
    padding: 24px;
    .titleCenterH {
      font-size: 26px;
      font-weight: 700;
      color: #0099ff;
      text-align: center;
    }
    .tips {
      font-weight: 700;
      color: #0099ff;
      text-align: right;
      margin: 20px 0px;
      .tipsOne {
        color: #000;
        margin-right: 20px;
      }
    }
    .answer {
      position: relative;
      .num {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        height: 100%;
      }
      .answerCon {
        display: inline-block;
        .scoreItem {
          color: #0099ff;
        }
        .answerItem {
          margin: 10px 0;
        }
      }
    }
    .closeBtn {
      text-align: right;
      margin-top: 20px;
    }
  }
}
</style>

