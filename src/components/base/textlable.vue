<template>
    <div class="textableWrap">
        <heads></heads>      
        <div class="main">
            <div>
                  <Listhead :head='head' @getparams="searchAction"></Listhead>     
            </div>
            <div>
                <div >
                    <el-button plain @click="dialogFormVisible = true">新增</el-button>
                    <el-button plain @click="DeleteLabel">删除</el-button>
                    <el-button plain @click="UpdatePro(0)">设为专业</el-button>
                    <el-button plain @click="UpdatePro(1)">取消专业</el-button>
                </div>
          <List :isLoading="isLoading"  v-on:getlabelId="getlabelId"></List>
             <Pagination></Pagination>   <!--分页-->
        </div>
        </div>
         <el-dialog title="新增" :visible.sync="dialogFormVisible"> <!--弹出框-->
            <Addtextable ref="Addtextable"></Addtextable>
            <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button @click="getsave">确定</el-button>
            </div>
        </el-dialog>
        
    </div>  
</template>
<script>
import Listhead from '../common/listhead.vue'
import Addtextable from './textable/addtextable.vue'
import List from './textable/list.vue'
import Heads from '../common/head.vue'
import Pagination from '../common/Pagination.vue'
import { geturl } from '../../config/env'
import { getLabelsByCondition,deleteLabel,updatePro} from '../../service/getData.js'//引入接口
import Bus from '../common/bus.js' //bus 中间组件
export default {

    data(){
        return {
            dialogFormVisible :false,
            addtextable:'',
            head:[ {
                   id:'01',
                   name:'标签编号' ,
                   type:'text',
                   plaseholder:'',
                   keys:'labelId',
                   names:{value:''},
                   flag:true              
                }, {
                    id:'02',
                   name:'标签名称' ,
                   type:'text',
                   plaseholder:'',
                   keys:'labelName',
                   names:{value:''},
                   flag:true
                },{
                    id:'03',
                   name:'标签类别' ,
                   type:'text',
                    keys:'level',
                   names:{value:''}, 
                   plaseholder:'',
                   flag:false,
                   option:[
                       {
                           id:'1',
                           value:'',
                           key:"全部"
                           },
                            {
                           id:'2',
                           value:'1',
                           key:"一级标签"
                           }, {
                           id:'3',
                           value:'2',
                           key:"二级标签"
                           }
                   ]
                },
                {
                    id:'04',
                   name:'上级标签编号' ,
                   type:'text',
                   plaseholder:'',
                   keys:'pid',
                   names:{value:''},
                   flag:true
                } ,{
                    id:'05',
                   name:'上级标签名称' ,
                   type:'text',
                   plaseholder:'',
                   keys:'pLabelName',
                   names:{value:''},
                   flag:true
                } , {
                    id:'06',
                   name:'标签类型' ,
                   type:'text',
                    keys:'isPro',
                   names:{value:''}, 
                   plaseholder:'',
                   flag:false,
                   option:[
                       {
                           id:'1',
                           value:'',
                           key:"全部"
                           },
                            {
                           id:'2',
                           value:'0',
                           key:"专业"
                           }, {
                           id:'3',
                           value:'1',
                           key:"非专业"
                           }
                   ]
                },
                {
                    id:'07',
                   name:'' ,
                   type:'hidden',
                   plaseholder:'',
                   keys:'labelType',
                   names:{value:'1'},
                   flag:true
                }
                ],
           
           data:{},
           checked:false,
           labelIds:{
               onelabelIds:[],
               twoLableIds:[]
           },
           isLoading:true,
        }
    },
    components:{
        Listhead,Pagination,List,Heads,Addtextable

    },
    watch:{
        dialogFormVisible(val){
            if(!val){
                this.$refs.Addtextable.clearData()
            }
        }
    },
    methods:{

          getlabelId (x) {
                this.labelIds = x
                console.log(x) 
        },
         searchAction(str){//查询
          this.isLoading = true;
               getLabelsByCondition(str).then((res) => {
                  this.listdata=res;
                  console.log(res)
                    Bus.$emit("getpage",res);
                    Bus.$emit("gettextable",res);
                    //关闭查询按钮loading
                    this.Emit.$emit('closeLoading');
                    //关闭表格loading
                    this.isLoading = false;
				}).catch(err => {
				 	alert('error'+err);
                })
        },
        DeleteLabel(){
            
             var params = {};
                    let onelabelIds=this.labelIds.onelabelIds.join(',')
                    let twoLableIds=this.labelIds.twoLableIds.join(',')
                    params.onelabelIds= onelabelIds              //一级标签id，非必填，多个用逗号隔开
                    params.twoLableIds=twoLableIds  
                    if(onelabelIds!==''||twoLableIds!==''){
              this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                                // 二级标签id，非必填，多个用逗号隔开，两个不能同时为空
                    deleteLabel(params).then((res) => {
                        var res = JSON.parse(res);
                        this.Emit.$emit('deleteSuccess');
                        console.log(res)
                        if(res.respMsg==='删除成功'){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                }else{
                    this.$message(res.respMsg);
                }
                   
                          
				}).catch(err => {
				 	this.$message('请选择一条数据');
                })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
                    }else{
                        this.$message('请选择一条数据');
                    }
          
        },
         getsave(){
            console.log(this)
            this.$refs.Addtextable.save()
            this.dialogFormVisible=false
        },
        UpdatePro(x){
            var params = {};
            let onelabelIds=this.labelIds.onelabelIds.join(',')
            let twoLableIds=this.labelIds.twoLableIds.join(',')
            params.onelabelIds= onelabelIds              //一级标签id，非必填，多个用逗号隔开
            params.twoLableIds=twoLableIds             // 二级标签id，非必填，多个用逗号隔开，两个不能同时为空
            params.isPro=x     
            console.log(params)              // 是否专业，必填 0:专业 1:非专业
            updatePro(params).then((res) => {
                this.Emit.$emit('deleteSuccess');
                console.log(res)
                  var res = JSON.parse(res);
                   this.$message(res.respMsg);

				}).catch(err => {
				 	this.$message('请选择一条数据');
                })
        }
    },
     computed:{
          

    },
    destoryed(){
        this.Emit.$off('closeLoading');
    },
}
</script>
<style lang="less" >
.textableWrap{
    .main{
        margin-top: 30px;
        margin-left: 20px;
    }
    h3{
        height: 60px;
        line-height: 60px;
        margin-left:20px;
    }
    
}

</style>
