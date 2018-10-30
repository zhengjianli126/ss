<template>
    <div class="tableListWrap">
        <el-table :data="list" tooltip-effect="dark" border stripe :header-cell-style="{background:'#f4f4f4',color:'#666'}" style="width:1024px" @selection-change="handleSelectionChange">
            <el-table-column type="selection" :selectable="selectable" width="40"></el-table-column>
            <el-table-column prop="orderNum" label="订单号" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="goodsCode" label="昵称"></el-table-column> -->
            <el-table-column prop="userName" label="用户姓名"></el-table-column>
            <el-table-column prop="phoneNum" label="手机号"></el-table-column>
            <el-table-column prop="exchangeNum" label="兑换数量"></el-table-column>
            <el-table-column prop="moonCash" label="月亮币"></el-table-column>
            <el-table-column prop="ctimeString" label="兑换时间"></el-table-column>
            <el-table-column prop="statusString" label="状态"></el-table-column>
            <el-table-column prop="dealAdminName" label="处理人"></el-table-column>
            <el-table-column prop="dealTime" label="处理时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import Bus from "../../common/bus.js";
import {
  getGoodsExByCondition
} from "../../../service/getData.js";

export default {
  data() {
    return {
      formSearch: {
        phoneNum: "",
        status: ""
      },
      list: [],
      goodExIds: ""
    };
  },
  methods: {
    selectable(row,index){
      //判断兑换列表是否可以被选中，如果是已兑换状态，则不能被选中
      if(row.status === 1){
        return false
      }else{
        return true
      }
    },
    handleSelectionChange(val) {
      var ids = [];
      val.forEach(item => {
        ids.push(item.goodsExId);
      });
      this.goodExIds = ids.join(",");
      //console.log('显示被选中数据的id：')
      //console.log(this.goodExIds);

      // 单选框
      this.$emit("getkeyGoodsId", val);
    }
  },
  computed: {},
  mounted() {
    Bus.$on("getdata", data => {
      // 接收并展示列表的数据
      var data = JSON.parse(data);
      // console.log("进入页面获取到的兑换列表数据：");
      // console.log(data);
      this.list = data.data.list;
    });
  },
  components: {
    Bus,
    getGoodsExByCondition
  }
};
</script>
<style scoped>
h5 {
  margin-bottom: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
}
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
.add {
  position: fixed;
  top: 50px;
  left: 500px;
  background: #ffffff;
  height: 565px;
  width: 533px;
}
.form-inline {
  margin: 25px 0;
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
