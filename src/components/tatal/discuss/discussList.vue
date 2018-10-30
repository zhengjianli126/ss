<template>
    <div class="tableListWrap">
        <el-table ref="multipleTable" :data="list" tooltip-effect="dark" border stripe :header-cell-style="{background:'#f4f4f4',color:'#666'}" style="width:1156px" @selection-change="handleSelectionChange">
            <el-table-column type="selection" :selectable="selectable" width="40"></el-table-column>
            <el-table-column prop="keyDisTitle" label="题目" width="230" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type" label="类型" width="100"></el-table-column>
            <el-table-column prop="commentNum" label="讨论数" width="100"></el-table-column>
            <el-table-column prop="userName" label="操作员" width="85" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userAccount" label="操作账号" width="120"></el-table-column>
            <el-table-column prop="updateTimeString" label="最近更新时间" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="selfIspublic" label="状态" width="100" show-overflow-tooltip></el-table-column>

            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isPublic !==1"  @click="getDisUp(scope.row)" type="text" size="small">上架</el-button>
                    <el-button v-if="scope.row.isPublic ===1"  @click="getDisUp(scope.row)" type="text" size="small">下架</el-button>
                    <el-button v-if="scope.row.isPublic !==1"  @click="gettoChange(scope.row.keyDisId)" type="text" size="small">修改</el-button>
                    <el-button @click="gettodetail(scope.row.keyDisId)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Bus from '../../common/bus.js'
import { publicKeydis } from '../../../service/getData.js'

export default {
    props:['headData'],
    data() {
        return {
            datas:{},
            list:[],
        }
    },
    methods:{
        selectable(row,index){
            if(row.isPublic === 1){
                return false
            }else{
                return true
            }
        },
        getDisUp(str){
            // 上架、下架
            var params = {}
            params.keydisId = str.keyDisId;
            if(str.isPublic == 0 || str.isPublic == 2){
                params.isPublic = 1;
            }else{
                params.isPublic = 2;
            }

            params.userId = str.userId;
            params.userName = str.userName;
            
            publicKeydis(params).then((res) => {
                this.$emit('getDisUp',this.headData);
            }).catch(err => {
                console.log('error'+err);
            })
        },
        gettodetail: function (x) {
            var params = {};
                params.keyDisId=x
                this.$router.push({name: 'discussDetail', query: {keydisId: x}})
        },
        gettoChange: function (x) {
            // 跳转至修改
            this.$router.push({name: 'editDiscuss', query: {keydisId: x}})
        },
        handleSelectionChange(val) {
            // 单选框
            this.$emit("getkeydisId",val)
        }
    },
    computed:{
    },
    mounted () {
        Bus.$on('getdata', (data) => {
            // 接收并展示列表的数据
            var data = JSON.parse(data);
            this.datas=data
            this.list=data.data.list

            console.log(this.list)
            
            this.list.forEach(item => {
                if(parseInt(item.type) == 0){
                    item.type = '正在讨论'
                }else{
                    item.type = '问题征集'
                }
                switch(parseInt(item.isPublic)){
                    case 0:
                        item.selfIspublic = '未上架'
                        break;
                    case 1:
                        item.selfIspublic = '已上架'
                        break;    
                    default:
                        item.selfIspublic = '已下架'
                }
            })
        })
    },
     components:{
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
