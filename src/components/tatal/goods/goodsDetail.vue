<template>
    <div>
        <h4>
            商品信息
        </h4>
        <div class="detailWarp">
            <el-container>
                <el-main>
                    <el-form :data="data" label-width="150px" size="small" class="demo-ruleForm">
                        <el-form-item label="商品名称：" style="overflow:hidden">
                            <div>{{data.goodsName}}</div>
                        </el-form-item>
                        <el-form-item label="商品描述：" style="overflow:hidden">
                            <div>{{data.goodsDesc}}</div>
                        </el-form-item>
                        <el-form-item v-if="data.goodsImg !== ''" label="商品图片：">
                            <div class="img"><img :src="data.goodsImg" alt=""></div>
                        </el-form-item>
                        <el-form-item label="库存数量：">
                            <span>{{data.stock}}</span>
                        </el-form-item>
                        <el-form-item label="剩余库存：">
                            <span>{{data.lastStock}}</span>
                        </el-form-item>
                        <el-form-item label="价格：">
                            <span>{{data.moonCash}} /月亮币</span>
                        </el-form-item>
                        <el-form-item label="购买须知：">
                            <div>{{data.goodsTips}}</div>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>

            <div class="ex-topbar">
              <h5>兑换记录</h5>
              <el-form size="small" :inline="true" :model="formSearch" class="form-inline">
                  <el-form-item label="手机号">
                      <el-input v-model="formSearch.phoneNum" placeholder="手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="状态">
                      <el-select class="comSelect" v-model="formSearch.status" placeholder="兑换状态">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="未兑换" value="0"></el-option>
                      <el-option label="已兑换" value="1"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item>
                      <el-button icon="el-icon-search" type="primary" @click="searchAction">查询</el-button>
                  </el-form-item>
              </el-form>
              <div class="top-bar">
                  <el-row>
                      <el-col :span="6">
                          <el-button @click="exChange">兑换</el-button>
                      </el-col>
                      <el-col :span="18">
                          <div class="right-text">
                              <span>未兑换：{{exData.notExNum}}</span>
                              <span>已兑换：{{exData.exNum}}</span>
                              <span>已回收月亮币：{{exData.exMoonCash}}</span>
                          </div>
                      </el-col>
                  </el-row>
              </div>
          </div>
        </div>

        <!-- 兑换列表 -->
        <List style="padding-left:30px; margin-top:10px;" :data='data' @getExList="getExList" @getkeyGoodsId="getChecked"></List>

        <!-- 分页 -->
        <Pagination style="padding-left:30px; margin-top:10px;" class="pag" @getparams="getExList"></Pagination>

        <div class="closebtn">
            <el-button @click="close">关闭</el-button>
        </div>
    </div>
</template>
<script>
import Heads from "../../common/head.vue";
import Listhead from "../../common/listhead.vue";
import Bus from "../../common/bus.js";
import List from "./exList.vue";
import Pagination from "../../common/Pagination.vue";

import {
  getGoodsList,
  getGoodsDetail,
  getGoodsExByCondition,
  exchangeGoods
} from "../../../service/getData.js";

export default {
  data() {
    return {
      formSearch: {
        phoneNum: "",
        status: ""
      },
      data: {},
      exData: {},
      goodsId:'',
      goodExIds:''
    };
  },
  methods: {
    searchAction(str){
      console.log(str)
      // 获取兑换商品列表
      var params = {
        goodsId: this.goodsId,
        phoneNum: this.formSearch.phoneNum,
        status: this.formSearch.status
      }
      this.getExList(params);
    },
    getChecked(str){
      // 获取被选中的兑换商品订单的id
      var arr = [];
      str.forEach(item => {
        arr.push(item.goodsExId)
      })
      this.goodExIds = arr.join(',')
    },
    close() {
      this.$router.go(-1);
    },
    getDetail(str) {
      // 获取商品详情，进入页面首先执行这里
      var paramsExList = {
        goodsId: str.goodsId,
        phoneNum: this.formSearch.phoneNum,
        status: this.formSearch.status
      };

      var goodsInfo = {
        goodsId: str.goodsId
      };
      // 获取商品详情
      getGoodsDetail(goodsInfo)
        .then(res => {
          var res = JSON.parse(res);
          this.data = res.data[0];

          // 兑换统计数据
          this.exData = {
            exMoonCash: this.data.exMoonCash,
            exNum: this.data.exNum,
            notExNum: this.data.notExNum
          }

          // 获取商品兑换列表
          this.getExList(paramsExList);
        })
        .catch(err => {
          alert("error" + err);
        });
    },
    getExList(str) {
      console.log('---------------------------------')
      //获取商品兑换列表
      getGoodsExByCondition(str)
        .then(res => {
          var o = JSON.parse(res)
          console.log(o);
          // 向分页组件发送数据
          Bus.$emit("getpage", res);

          // 向兑换列表发送数据
          Bus.$emit("getdata", res);
        })
        .catch(err => {
          alert("error" + err);
        });
    },
    exChange() {
      var adminId = JSON.parse(localStorage["users"]).admin.id;
      var o = {
        goodExIds: this.goodExIds,
        goodsId: this.goodsId,
        adminId: adminId
      };
      // 兑换商品操作
      exchangeGoods(o)
        .then(res => {
          // console.log('兑换操作后返回的数据：')
          // console.log(res);

          // 更新页面
          var params = {
            goodsId: this.goodsId
          }
          this.getDetail(params);
        })
        .catch(err => {
          console.log("err " + err);
        });
    },
  },
  components: {
    Heads,
    Bus,
    Listhead,
    List,
    Pagination
  },
  created() {
    this.goodsId = this.$route.query.goodsId
    var o = {
      goodsId: this.goodsId
    }
    this.getDetail(o);
  }
};
</script>
<style lang="less">
h4 {
  height: 40px;
  background: #666;
  color: #fff;
  line-height: 40px;
  padding-left: 30px;
}
h5 {
  margin-bottom: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
}
.closebtn {
  padding: 40px 0 0 600px;
  // z-index: 8889999;
  // position: fixed;
  bottom: 0px;
  width: 100%;
  height: 120px;
  // border-top: 1px solid #ccc;
  background: #ffffff;
}
.img {
  width: 200px;
  border: 1px solid #ccc;
  img {
    width: 100%;
  }
}
.ex-topbar {
  margin-left: 30px;
}
.top-bar {
  width: 1024px;
  margin-bottom: 20px;
}
.right-text {
  text-align: right;
  line-height: 40px;
}
.right-text span {
  display: inline-block;
  margin-left: 20px;
  font-size: 14px;
}
</style>
