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
                <el-button @click="OperateCheckArticle">再次提交</el-button>
        </div>
</div>
</template>
<script>
import { getArticleInfo,saveAgain,getArticleInfo } from '../../../service/getData.js' //引入接口
import Check from './check.vue'  //引入组件
export default {

    data(){
        return{
          data:{},
          activeName2: '0',
          uploadUrl:'',
          index:0,
          tags:[],
          info:{},
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
        getArticleInfo(str){
             getArticleInfo(str).then((res) => {
                console.log(res)
                var res = JSON.parse(res);                 
                   this.data=res.data
                   this.info=this.data.articleInfos[0]
				}).catch(err => {
				 	alert('error'+err);
                })
        },
         
         OperateCheckArticle(x){
             this.$refs.check.operateCheckArticle();
           this.$router.push({name:"MyArticle",  query:{}})
      },
        
    },
    created(){
          this.getArticleInfo(this.$route.query)
         
         
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

