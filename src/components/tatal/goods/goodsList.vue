<template>
    <div class="tableListWrap">
        <el-table :data="list" tooltip-effect="dark" border stripe :header-cell-style="{background:'#f4f4f4',color:'#666'}" style="width:1156px" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称" width="230" show-overflow-tooltip></el-table-column>
            <el-table-column prop="goodsCode" label="商品编号" width="100"></el-table-column>
            <el-table-column prop="stock" label="库存数量" width="100"></el-table-column>
            <el-table-column prop="lastStock" label="剩余库存" width="85" show-overflow-tooltip></el-table-column>
            <el-table-column prop="moonCash" label="兑换金额" width="120"></el-table-column>
            <el-table-column prop="goodsDesc" label="商品描述" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isPublicString" label="状态" width="100" show-overflow-tooltip></el-table-column>

            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.isPublicString != '已上架'" @click="getEdit(scope.row.goodsCode)" size="small">修改</el-button>
                    <el-button type="text" @click="getGoodsDetail(scope.row.goodsId)" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

import Bus from "../../common/bus.js";

export default {
    data() {
        return {
            list:[],
        }
    },
    methods:{
        getGoodsDetail: function (x) {
            // 跳转到详情页
            this.$router.push({name: 'goodsDetail', query: {goodsId: x}})
        },
        getEdit: function (x) {
            // 跳转到编辑页
            this.$router.push({name: 'editGoods', query: {goodsCode: x}})
        },
        handleSelectionChange(val) {
            // 单选框
            this.$emit("getGoodsId",val)
        }
    },
    computed:{
    },
    mounted () {
        Bus.$on('getdata', (data) => {
            // 接收并展示列表的数据
            var data = JSON.parse(data);
            // 给兑换金额加上单位
            data.data.list.forEach(itme => {
                itme.moonCash += '币'
            })
            this.list=data.data.list
        })
    },
    components:{
        Bus
    }
}

</script>
<style scoped >
   table
        {
            border-collapse: collapse;
            
            text-align: center;
        }
        table td, table th
        {
            border: 1px solid #cad9ea;
            color: #666;
            height: 30px;
             text-align: center;
        }
        table thead th
        {
            background-color: #CCE8EB;
            width: 100px;
             text-align: center;
        }
        table th a{
            padding-right:10px;
        }
        table td:nth-child(2){
            width:30px;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis; 
        }
        table tr:nth-child(odd)
        {
            background: #fff;
             text-align: center;
        }
        table tr:nth-child(even)
        {
            background: #F5FAFA;
             text-align: center;
        }
        *{margin: 0; padding: 0}
  .add{
    position: fixed;
    top: 50px ;
    left:500px;
    background: #ffffff;
    height: 565px;
    width: 533px;

}
    
</style>
