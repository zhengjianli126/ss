<template>
    <div class="checkWarp">
        <h4>
            文章详情
        </h4>
        <div>
            <Detail :data="data" :info="info"></Detail>
        </div>
   <div class="btn">
        <el-button @click="close">关闭</el-button>
   </div>
    </div>
</template>
<script>
import { getArticleInfo } from '../../../service/getData.js'//引入接口
import Detail from './detail.vue'//引入组件
export default {

    data(){
        return{
          data:{},
          activeName2: '0',
          uploadUrl:'',
         index:0,
          tags:[],
         info:{}
        }
    },
    components:{
        Detail
    },
    methods:{
        getInfo(str){
            getArticleInfo(str).then((res) => { 
                    var res = JSON.parse(res); 
                    this.data=res.data
                    this.info=this.data.articleInfos[0]
                    
            }).catch(err => {
                        alert('error'+err);
            })
        },
        close(){
            this.$router.go(-1)
        }       
    },
   created(){
         this.getInfo(this.$route.query)
    },
    computed:{
    }
}
</script>
<style lang="less" scoped>
.checkWarp{
   
    margin-bottom: 120px;
    h4{
     height: 40px;
     background: #666;
     color:#fff;
     line-height: 40px;
     padding-left: 30px;
 }
  .btn{
      padding:40px 0 0 600px ;
    border: #dcdfe6 solid 1px;
    position: fixed;
    bottom: 0px;
    width: 877px;
    height: 100px;
    background: #ffffff;
    
  } 
}
</style>

