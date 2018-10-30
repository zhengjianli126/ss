<template>
<div class="textableListWrap">
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
            label="标签编号"
            width="200">
            <template slot-scope="scope">{{ scope.row.labelId }}</template>
            </el-table-column>
            <el-table-column
            prop="labelName"
            label="标签名称"
            width="160">
            </el-table-column>
            <el-table-column
            prop="level"
            label="标签类别"
            width="165"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="pid"
            label="上级标签编码"
            width="120"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="pLabelName"
            label="上级标签名称"
            width="150"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="isPro"
            label="标签类型"
            width="100"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="文章数量"
                width="120">
                <template slot-scope="scope">
                    <el-button @click="GetCheckedArticle(scope.row.labelName)" type="text" size="small">{{scope.row.articleCount}}</el-button>
                </template>
             </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="updatetextable(scope.row)" type="text" size="small">修改</el-button>
                </template>
             </el-table-column>
        </el-table>
   
         <el-dialog title="修改" :visible.sync="dialogFormVisible"> <!--弹出框-->
            <Updatetextable  :UpdatetextableList='UpdatetextableList' ref="Updatetextable"></Updatetextable>
            <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button @click="getsave">确定</el-button>
            </div>
        </el-dialog>
</div>
  
</template>

<script>
import Updatetextable from './updatetextable.vue'
import Bus from '../../common/bus.js'
import { getCheckedArticle } from '../../../service/getData.js'//引入接口
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    props:['isLoading'],
    data() {
      return {
       datas:{},
       list:[],
       value:{},
      phone:'',
       rowChecked:'',
       isChecked:false,
       phonenum:[],
       tableData3:[ {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
       dialogFormVisible :false,
       UpdatetextableList:{}
      }
    },
    watch:{
        dialogFormVisible(val){
            if(!val){
                 this.$refs.Updatetextable.clearData()
            }
        }
    },
   methods:{
       getsave(){
           console.log(this.$refs)
           this.$refs.Updatetextable.save()
            this.dialogFormVisible=false;
       },
       updatetextable(x){
           console.log(x,1)
           this.UpdatetextableList=x
           this.dialogFormVisible=true;
           
       },
       GetCheckedArticle(x){
             var params = {};
            params.articleTag=x              
             this.$router.push({name:"Textnum",  query:{...params}})
				
       },
         handleSelectionChange(val) {
             console.log(val)
           var onelabelIds=[]
           var twoLableIds=[]
           for(let  x in val){
               if(val[x].pid!=='0'){
                  twoLableIds=[...twoLableIds,val[x].labelId] 
               }else{
                    onelabelIds=[...onelabelIds,val[x].labelId] 
               }
           }
         
           this.$emit("getlabelId",{onelabelIds,twoLableIds})
      }
    },
    mounted () {
      Bus.$on('gettextable', (data) => {
        var data = JSON.parse(data);
      this.datas=data
      this.list=data.data.list
        this.list.forEach(item => {
            switch(parseInt(item.level)){
                case 1:
                    item.level = '一级标签'
                    break;
                default:
                    item.level = '二级标签'
            }
            switch(parseInt(item.isPro)){
                case 0:
                    item.isPro = '专业'
                    break;
                default:
                    item.isPro = '非专业'
            }
        })
      })
     
    },
     components:{
      Updatetextable

    },
      destoryed(){
        this.Emit.$off('closeLoading');
    }
    }

</script>
<style  lang='less'>
  .textableListWrap{
      
  }
    
</style>
