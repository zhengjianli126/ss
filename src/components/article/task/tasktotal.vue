<template>
    <div class="tasktotalWarp">
        <h4>
            文章审核
        </h4>
        <el-tabs v-model="activeName2" type="card" class="main" @tab-click="handleClick">
                <el-tab-pane  label="原稿" name="0" >
                    <Check :data="data" ref="check" :info="info"></Check>
                </el-tab-pane>
                <el-tab-pane label="专家" name="1" :disabled="zj">
                    <Check :data="data" ref="check"  :info="info" ></Check>
                </el-tab-pane>
                <el-tab-pane label="编辑" name="2" :disabled="bj">
                    <Check :data="data" ref="check"  :info="info"></Check>
                </el-tab-pane>
                <el-tab-pane label="主编" name="3" :disabled="zb">
                    <Check :data="data" ref="check"  :info="info" ></Check>
                </el-tab-pane>
        </el-tabs>
        <div class="btn">
                <el-button @click="close">关闭</el-button>
                <el-button @click="OperateCheckArticle(0)">保存</el-button>
                <el-button>预览</el-button>
                <el-button @click="dialogFormVisible = true">退稿</el-button>
                <el-button @click="OperateCheckArticle(1)">通过</el-button>
        </div>
        <el-dialog title="退稿" :visible.sync="dialogFormVisible"> <!--弹出框-->
                 <div>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="退稿至" >
                <el-select v-model="ruleForm.messageType" placeholder="请选择">
                <el-option v-if='!zb' label="主编" value="3"></el-option>
                <el-option label="投稿" value="0"></el-option>
                <el-option v-if='!bj' label="编辑" value="2"></el-option>
                <el-option v-if='!zj' label="专家" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退稿原因"  label-width="100px">
                <el-input type="textarea" v-model="ruleForm.messageInfo"></el-input>
            </el-form-item>
        </el-form>
    </div>
                <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button @click="OperateCheckArticle(2)">确定</el-button>
                </div>
        </el-dialog>
</div>
</template>
<script>
import { getArticleInfo,operateCheckArticle,beginCheckArticle } from '../../../service/getData.js' //引入接口
import Check from './check.vue'  //引入组件
export default {

    data(){
        return{
          zj:true,
          bj:true,
          zb:true,
          data:{},
          activeName2: '0',
          uploadUrl:'',
          index:0,
          tags:[],
          info:{},
          backOperateAccountRole:'',
          failreason:'',
          dialogFormVisible:false,
          ruleForm:{
            messageType:'',
            messageInfo:""
          }
        }
    },
    components:{
        Check
    },
    methods:{
        beginCheckArticle(str){
            beginCheckArticle(str).then((res) => {
                var res = JSON.parse(res); 
                console.log(res.data)
                this.data=res.data
                this.show(this.data)
				}).catch(err => {
				 	alert('error'+err);
                })
        },
        close(){
            this.$router.go(-1)
        },
        handleClick(tab) {
             this.info=this.data.articleInfos[tab.index]
            console.log(this.info)
            if(tab.index!==this.data.articleInfos.length-1){
                 this.$refs.check.chengeDisabled()
            } 
            this.$router.replace({
                	 path: '/tasktotal',
                     name: 'Tasktotal'
                })
        },
         OperateCheckArticle(x){
               if (x=='2'&&this.ruleForm.messageType == '') {
                this.$message({
                    showClose: true,
                    message: '请选择投稿人',
                    type: 'warning'
                });
                return
            }
                this.dialogFormVisible=false
             this.$refs.check.operateCheckArticle(x,this.index,this.ruleForm.messageType,this.ruleForm.messageInfo);
           this.$router.push({name:"Task",  query:{}})
      },
      show(str){
          this.index=JSON.parse(localStorage['users']).admin.adminEditIdentity
          this.info=str.articleInfos[this.index-1]
          this.activeName2=String(this.index-1)
          console.log(str)
           switch(parseInt(str.articleInfos.length)){
                        case 1:
                            break;
                        case 2:
                           this.zj= false
                            break;
                        case 3:
                            this.zj= false
                            this.bj= false
                            break;
                         default:
                            this.zj= false
                           this.bj= false
                           this.zb= false
              }
      }
        
    },
    created(){
          this.beginCheckArticle(this.$route.query)
    },
    computed:{

     }
}
</script>
<style lang="less" > 
.tasktotalWarp{
   
    margin-bottom: 120px;
    h4{
     height: 40px;
     background: #666;
     color:#fff;
     line-height: 40px;
     padding-left: 30px;
 }
  .btn{
      padding:40px 0 0 300px ;
    border: #dcdfe6 solid 1px;

    position: fixed;
    bottom: 0px;
    width: 877px;
    height: 120px;
    
    background: #ffffff;
    
  } 
}
</style>

