<template>
<div class="tableListWrap">
         <el-table
            ref="multipleTable"
            :data="list"
            tooltip-effect="dark"
            border
            stripe
            :header-cell-style="{background:'#f4f4f4',color:'#666'}"
            style="width:1400px"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="40">
            </el-table-column>
            <el-table-column
            label="昵称"
            width="100">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column
            prop="userRealName"
            label="真实姓名"
            width="80">
            </el-table-column>
            <el-table-column
            prop="phoneNum"
            label="手机号"
            width="110"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="userHospital"
            label="医院"
            width="120"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="userOffice"
            label="科室"
            width="120"
            show-overflow-tooltip>
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
            width="130"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="userIdentity"
            label="身份"
            width="60"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="ischeckLevel"
            label="审核状态"
            width="100"
            show-overflow-tooltip>
            </el-table-column>
              <el-table-column
            prop="lastLoginTimeString"
            label="最近登录时间"
            width="160"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.ischeck !==1&&scope.row.ischeck !==0"  @click="getischeck(scope.row.userId)" type="text" size="small">审核</el-button>
                    <el-button @click="gettotail(scope.row.userId)" type="text" size="small">详情</el-button>
                </template>
             </el-table-column>
        </el-table>


</div>

</template>

<script>
import Bus from '../common/bus.js'
import { GetDetails } from '../../service/getData.js'


  export default {
    props:['isLoading'],
    data() {
      return {
       rowChecked:'',
       isChecked:false,
       ths:this.th,
       datas:{},
       list:[],
       value:{},
       phonenum:[],
       tableData3:[ {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
       dialogFormVisible1 :false,
       dialogFormVisible :false
      }
    },
   methods:{

       getischeck(x){
           var  params = {};
              params.userId=x
            GetDetails(params).then((res) => {
                var res = JSON.parse(res);
                   this.$router.push({name:"Ischeck",  query:{...res}})
				}).catch(err => {
				 	alert('error'+err);
				})
       },
       gettotail(x){
           var  params = {};
              params.userId=x
           this.$router.push({name:"Totail",  query:{...params}})
       },
       handleSelectionChange(val) {
           var phones=[]
           for(let  x in val){
              phones=[...phones,val[x].phoneNum]
           }
           console.log(phones)
           // phones=Array.from(new Set(phones))
           // console.log(phones)
           this.$emit("getphonenum",phones)
      }

    },
    computed:{


    },
    mounted () {
      Bus.$on('getdata', (data) => {
        var data = JSON.parse(data);
      this.datas=data
      this.list=data.data.list
      })

    }
    }

</script>
<style  lang="less">

.tableListWrap{
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
  .add{
        position: fixed;
        top: 50px ;
        left:500px;
        background: #ffffff;
        height: 565px;
        width: 533px;
    }
}
</style>
