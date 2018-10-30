<template>
    <div class="checkWarp">
        <h4>文章详情</h4>
        <el-tabs v-model="activeName2" type="card" class="main"  @tab-click="handleClick">
             <el-tab-pane label="原稿" name='0'>
                  <Detail :data="data" :info="info"></Detail>
             </el-tab-pane>
             <el-tab-pane label="专家" name="1" :disabled='zj'>
                  <Detail :data="data"  :info="info" ></Detail>
             </el-tab-pane>
             <el-tab-pane label="编辑" name="2" :disabled='bj'>
                  <Detail :data="data"  :info="info"></Detail>
             </el-tab-pane>
             <el-tab-pane label="主编" name="3" disabled></el-tab-pane>
        </el-tabs>
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
           
          zj:true,
         bj:true,
          data:{},
          activeName2: '0',
         index:1,
          tags:[],
        info:{}
         
        }
    },
    components:{
        Detail
    },
    methods:{
        close(){
            this.$router.go(-1)
        },
        handleClick(tab) {
            console.log(tab.index)

            console.log(this.data)
            this.info=this.data.articleInfos[tab.index]
            console.log(this.info)
            this.$router.replace({
                	path: '/taskischeck',
                    name: 'Taskischeck',
                })

        },
        getInfo(str){
            getArticleInfo(str).then((res) => {
                    //alert(res);
                    var res = JSON.parse(res); 
                    this.data=res.data
                    this.chose( this.data)
                    console.log(this.data)
            }).catch(err => {
                        alert('error'+err);
            })
        },
        aa(){
             this.index=JSON.parse(localStorage['users']).admin.adminEditIdentity
              console.log(this.index)
        },
        chose(str){
            this.info=str.articleInfos[0]
            console.log(str.nowlevel)
            console.log( this.zj)
                 switch(parseInt(str.nowlevel)){
                        case 0:                        
                            break;
                        case 1:
                            break;
                        case 2:
                           this.zj= false
                            break;
                        case 3:
                            this.zj= false
                            break;
                         default:
                            this.zj= false
                           this.bj= false
              }
        
        }
        
    },
    created(){
        this.index=JSON.parse(localStorage['users']).admin.adminEditIdentity
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
    z-index: 8889999;
    position: fixed;
    bottom: 0px;
    width: 877px;
    height: 120px;
    background: #ffffff;
    
  } 
}
</style>

