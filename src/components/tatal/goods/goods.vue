<template>
<div class="goods">
    <Heads></Heads>
    <div style="margin-top:20px;">
        <Listhead :head='head' @getparams="searchAction"></Listhead>
    </div>
    <div>
        <div class="btn">
            <el-button plain @click="dialogFormVisible=true">新增</el-button>
            <el-button plain @click="publicGoods">上架</el-button> 
            <el-button plain @click="unPublicGoods">下架</el-button> 
            <el-button plain @click="deleteGoods">删除</el-button> 
        </div>

        <!-- 商品列表 -->
        <List style="padding-left:30px;" :data='data' @getGoodsId="getGoodsId"></List>

        <!-- 分页 -->
        <Pagination style="padding-left:30px; margin-top:10px;" class="pag" @getparams="searchAction"></Pagination>

        <!-- 新增弹出框 -->
        <el-dialog title="新增商品" :visible.sync="dialogFormVisible" @close="closeDialog">
          <AddGoodstable ref="AddGoodstable" @getGoodsParams="addNewGoods" @getparams="searchAction"></AddGoodstable>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button @click="addNewGoods">确定</el-button>
          </div>
        </el-dialog>
    </div>
</div>
    
</template>
<script>
import Bus from "../../common/bus.js";
import Heads from "../../common/head.vue";
import Listhead from "../../common/listhead.vue";
import AddGoodstable from './addGoodsTable.vue'
import List from "./goodsList.vue";
import Pagination from "../../common/Pagination.vue";

import { getGoodsList,uploadGoods,downGoods,deleteGoods } from "../../../service/getData.js";

export default {
  data() {
    return {
      head: [
        {
          id: "01",
          name: "商品名称",
          names: { value: "" },
          type: "text",
          keys: "goodsName",
          plaseholder: "",
          flag: true
        },
        {
          id: "02",
          name: "商品编号",
          names: { value: "" },
          type: "text",
          keys: "goodsCode",
          plaseholder: "",
          flag: true
        },{
          id: "03",
          name: "状态",
          names: { value: "" },
          type: "select",
          keys:'isPublic',
          option:[
              {
                  id:'04',
                  value:'',
                  key:"全部"
              }, {
                  id:'05',
                  value:'0',
                  key:"未上架"
              }, {
                  id:'06',
                  value:'1',
                  key:"已上架"
              },{
                  id:'07',
                  value:'2',
                  key:"已下架"
              }
          ]
        }
      ],
      dialogFormVisible :false,
      addGoodsTable:'',
      data: {},
      goodsIds:''
    };
  },
  methods: {
    searchAction(str) {
      // 保存搜索条件，删除后拉新数据，仍然保持当前搜索条件
      this.headData = str;
      this.isLoading = true;

      // 获取商品列表
      getGoodsList(str)
        .then(res => {

          // 向分页组件发送数据
          Bus.$emit("getpage", res);

          // 向 List 组件发送数据
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
    addNewGoods(){
      // 新增商品
      this.$refs.AddGoodstable.addGoods(this.str)
      this.dialogFormVisible=false
    },
    closeDialog(){
      this.$refs.AddGoodstable.resetForm('ruleForm');
    },
    getGoodsId(arr){
      var ids = []
      arr.forEach(item => {
        ids.push(item.goodsId)
      });
      this.goodsIds = ids;
    },
    publicGoods(){
      // 上架商品
     
      if(this.goodsIds.length==0){
        this.$message.error('请先选中一条数据！')
        return false
      }else if(this.goodsIds.length>1){
         this.$message.error('请先选中一条数据！')
        return false
      }
      var params = {}
      params.goodIds = this.goodsIds
      uploadGoods(params).then(res => {
        console.log(res)

        this.searchAction(this.headData)
      }).catch(err => {
        console.log('error '+err)
      })
    },
    unPublicGoods(){
      // 下架商品
       if(this.goodsIds.length==0){
        this.$message.error('请先选中一条数据！')
        return false
      }else if(this.goodsIds.length>1){
         this.$message.error('请先选中一条数据！')
        return false
      }
      var params = {}
      params.goodIds = this.goodsIds
      downGoods(params).then(res => {
        console.log(res)

        this.searchAction(this.headData)
      }).catch(err => {
        console.log('error '+err)
      })
    },
    deleteGoods(){
      // 删除商品
        if(this.goodsIds.length==0){
        this.$message.error('请先选中一条数据！')
        return false
      }else if(this.goodsIds.length>1){
         this.$message.error('请先选中一条数据！')
        return false
      }
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {}
                params.goodIds = this.goodsIds
                deleteGoods(params).then(res => {
                  console.log(res)

                  this.searchAction(this.headData)
                }).catch(err => {
                  console.log('error '+err)
                })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  },
  components: {
    Bus,
    Heads,
    Listhead,
    AddGoodstable,
    Pagination,
    List
  }
};
</script>
<style lang="less">
.goods {
  margin-left: 5px;
  padding-bottom: 30px;
  .btn {
    margin: 15px;
    margin-left: 0;
    padding-left: 30px;
  }
}
</style>
