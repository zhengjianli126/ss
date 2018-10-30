<template>
    <div class="tasktotalWarp">
        <h4>
            文章修改
        </h4>
         <div>
             <Check :data="data" ref="check" :info="info"></Check>
         </div>
            
        <div class="btn">
                <el-button @click="close">关闭</el-button>
                <el-button @click="OperateCheckArticle(0)">保存</el-button>
                <el-button>预览</el-button>
        </div>
</div>
</template>
<script>
import { getArticleInfo,operateCheckArticle } from '../../../service/getData.js' //引入接口
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
        close(){
            this.$router.go(-1)
        },
         OperateCheckArticle(x){
                this.dialogFormVisible=false
             this.$refs.check.operateCheckArticle(x,this.index,this.ruleForm.messageType,this.ruleForm.messageInfo);
          
      },
       getInfo(str){
            getArticleInfo(str).then((res) => {
                    var res = JSON.parse(res); 
                    console.log(res)
                    this.data=res.data
                    this.info=this.data.articleInfos[0]
            }).catch(err => {
                        alert('error'+err);
            })
        }
        
    },
    created(){
        this.getInfo(this.$route.query)
         
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
    //   padding:40px 0 0 500px ;
    // border: #dcdfe6 solid 1px;

    position: fixed;
    bottom: 0px;
    // width: 877px;
    // height: 120px;
    
    background: #ffffff;
    
  } 
}
</style>

