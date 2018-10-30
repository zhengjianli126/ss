<template>
<div >
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
            prop="replayTitle"
            label="会议名称"
            width="240"
            show-overflow-tooltip>
            </el-table-column>
            
            <el-table-column
            prop="endTimeString"
            label="结束时间"
            width="100">
            </el-table-column>
            <el-table-column
            prop="lookNum"
            label="视频数"
            width="100">
            </el-table-column>
             <el-table-column
            prop="playNum"
            label="播放数"
            width="80"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="supportNum"
            label="获赞数"
            width="80">
            </el-table-column>
             <el-table-column
            prop="selfIspublic"
            label="状态"
            width="100"
            show-overflow-tooltip>
            </el-table-column>
            
            <el-table-column
                label="操作"
                width="400">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.ispublic !==1"  @click="gettoChange(scope.row.userId)" type="text" size="small">修改</el-button>
                    <el-button @click="gettodetail(scope.row.userId)" type="text" size="small">详情</el-button>
                </template>
             </el-table-column>
        </el-table>
</div>
  
</template>

<script>
import Bus from '../common/bus.js'
import { GetDetails,getEndMeets } from '../../service/getData.js'


  export default {
    props:['th','checked'],
    data() {
      return {
       ths:this.th,
       datas:{},
       list:[],
       value:{},
       phonenum:[]
      }
    },
    created(){
        this.getEndMeets()
    },
    methods:{
        getEndMeets(){
              var  params = {};
              getEndMeets(params).then((res) => {
                   console.log(res)
                    }).catch(err => {
                        alert('error'+err);
             })  
        },
       getischeck(x){
           var  params = {};
              params.userId=x
            GetDetails(params).then((res) => {
                Bus.$emit("getuserdatas",res)
				}).catch(err => {
				 	alert('error'+err);
				})
       },
       aa(e){
          
            this.phonenum=[...this.phonenum,e.target.value]
              console.log( this.phonenum)
              this.$emit('childByValue', this.phonenum)
       },
       gettodetail: function () { // 跳转至详情
          this.$router.push({name: 'backdetail'})
        },
       gettoChange: function () { // 跳转至修改
          this.$router.push({name: 'backChange'})
        },
    },
    computed:{
     

    },
    mounted () {
      Bus.$on('getdata', (data) => {
        var data = JSON.parse(data);
      this.datas=data
      this.list=data.data.list
        this.list.forEach(item => {
            switch(parseInt(item.ispublic)){
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
        console.log(this.list);
      })
     
    },
     components:{
            
    }
     
    }

</script>
<style  >
   
    
</style>
