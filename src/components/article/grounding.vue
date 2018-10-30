<template>
<div class="groundingWarp">
    <heads></heads>
  <div class="main"> 
    <div>
         <Listhead :head='head'  @getparams="searchAction"></Listhead>
    </div>
    <div>
         <div>
            <el-button plain  @click="operateArticleBatch(1)">上架</el-button>
            <el-button plain  @click="operateArticleBatch(2)">下架</el-button>
            <el-button plain  @click="setArticleHot(1)">设为热门</el-button>
            <el-button plain  @click="setArticleHot(2)">设为非热门</el-button>
        </div>
        <List :isLoading="isLoading"  v-on:getids="getids" ></List>
        <Pagination></Pagination>
        </div>
     </div>   
</div>
    
</template>
<script>
import Listhead from './task/listhead.vue'
import List from './grounding/list.vue'
import Heads from '../common/head.vue'
import Pagination from '../common/Pagination.vue'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import { geturl } from '../../config/env'
import { getCheckedArticle,operateArticleBatch,setArticleHot} from '../../service/getData.js'//引入接口
import Bus from '../common/bus.js' //bus 中间组件
export default {

    data(){
        return {
            allids:[],
             isLoading:true,
            head:[ 
                {
                    id:'01',
                   name:'标题' ,
                   type:'text',
                   plaseholder:'请输入标题...',
                   keys:'articleTitle',
                   names:{value:''},
                   flag:true 
                  
                }, {
                   id:'02',
                   name:'投稿人' ,
                   type:'text',
                   plaseholder:'请输入投稿人...',
                   keys:'articleAuthorName',
                   names:{value:''},
                   flag:true
                   
                },{
                   id:'03',
                   name:'投稿账号' ,
                   type:'text',
                   plaseholder:'请输入账号/手机号...',
                   keys:'articleAuthorAccount',
                   names:{value:''},
                   flag:true
                   
                },{
                   id:'04',
                   name:'标签名称' ,
                   type:'text',
                   plaseholder:'',
                   keys:'articleTag',
                   names:{value:''},
                   flag:true
                   
                },
                 {
                    id:'05',
                   name:'开始投稿时间' ,
                   type:'hidden',
                   plaseholder:'',
                   yes:"qq",
                   keys:'startDate',
                   names:{value:''},
                   flag:true,
                   
                },
                {
                    id:'06',
                   name:'截止投稿时间' ,
                   type:'hidden',
                   plaseholder:'',
                   yes:"qq",
                   keys:'endDate',
                   names:{value:''},
                   flag:true,
                   
                } ,
                {
                    id:'07',
                   name:'状态' ,
                   type:'text',
                   plaseholder:'',
                   keys:'isPublic',
                   names:{value:''},
                   flag:false,
                   option:[
                        {
                           id:'01',
                           value:'',
                           key:"全部"
                           }, {
                           id:'02',
                           value:'0',
                           key:"未上架"
                           }, {
                           id:'03',
                           value:'1',
                           key:"已上架"
                           }, {
                           id:'04',
                           value:'2',
                           key:"已下架"
                           }
                   ]
                }, {
                    id:'08',
                   name:'排序' ,
                   type:'text',
                   plaseholder:'',
                   keys:'orderType',
                   names:{value:''},
                   flag:false,
                   option:[
                        {
                           id:'01',
                           value:'',
                           key:"不限"
                           }, {
                           id:'02',
                           value:'overlookNum',
                           key:"浏览量"
                           }, {
                           id:'03',
                           value:'supportNum',
                           key:"点赞数"
                           }, {
                           id:'04',
                           value:'commentNum:',
                           key:"评论数"
                           }
                   ]
                }
                ],
      
           data:{}
        }
    },
    components:{
        Listhead,Pagination,List,Heads

    },
     methods:{
         getids (ids) {
            // childValue就是子组件传过来的值
                this.allids = ids 
        },
         setArticleHot(x){
             var id=this.allids.join(',')
                 var params = {}
			      params.articleId=id              // 需要批量操作的文章id列表，必填，多个用逗号隔开
		          params.isHot=x             //操作类型，必填， 1:热门 2:非热门
            setArticleHot(params).then((res) => {
                this.Emit.$emit('deleteSuccess');
                var res = JSON.parse(res);
                console.log(res)
                if(res.respCode==="0"){ 
                       this.$message({
                        message: '设置成功',
                        type: 'success'
                        }); 
           
                  }else{
                    this.$message('请选择一条数据');
                  }
                console.log(res)
            }).catch(err => {

                alert('error' + err);
            }) 
         },
         operateArticleBatch(x){
             var id=this.allids.join(',')
              let user=JSON.parse(localStorage['users'])
                 var params = {}
                  params.operateAccountCode = user.admin.id     // 操作人账号，必填
		          params.operateAccountName =user.admin.adminName  // 操作人姓名，必填
			      params.articleIds=id              // 需要批量操作的文章id列表，必填，多个用逗号隔开
		          params.operateType=x             //操作类型，必填， 1:上架 2:下架
            operateArticleBatch(params).then((res) => {
                this.Emit.$emit('deleteSuccess');
                var res = JSON.parse(res);
                if(res.respCode==="0"){ 
                         this.$message({
                        message: '设置成功',
                        type: 'success'
                        }); 
           
                  }else{
                    this.$message('请选择一条数据');
                  }
                console.log(res)
            }).catch(err => {

                alert('error' + err);
            }) 
         },
         searchAction(str){//查询
               getCheckedArticle(str).then((res) => {
                this.listdata=res
                 Bus.$emit("getpage",res);
                    //关闭查询按钮loading
                    this.Emit.$emit('closeLoading');
                    //关闭表格loading
                    this.isLoading = false;
                Bus.$emit("getGround",res)
				}).catch(err => {
				 	alert('error'+err);
                })
        }
    }
}
</script>
<style lang="less">
.groundingWarp{
     margin-left:-1px;
    padding-bottom:30px;
.main{
    margin: 25px;
    margin-left: 35px
    
}
  
}

</style>