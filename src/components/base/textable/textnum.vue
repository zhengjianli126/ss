<template>
 <div class="textnumWrap">
     <heads></heads>      
    <div class="main">
         <Listhead  :head='head' @getparams="searchAction"></Listhead>
    
        <List  :data='data'></List>
  <Pagination></Pagination>
    </div>
</div>
    
</template>
<script>
import List from './textnum/list.vue'
import heads from '../../common/head.vue'
import Listhead from '../../article/task/listhead.vue'
import Pagination from '../../common/Pagination.vue'
import { getCheckedArticle } from '../../../service/getData.js'//引入接口
import Bus from '../../common/bus.js' //bus 中间组件
export default {

    data(){
        return {
            articleTag:{},
            head:[ {
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
                   
                },
                 {
                    id:'04',
                   name:'投稿开始时间' ,
                   type:'hidden',
                   plaseholder:'',
                   yes:"qq",
                   keys:'startDate',
                   names:{value:''},
                   flag:true,
                   
                },
                {
                    id:'05',
                   name:'投稿截止时间' ,
                   type:'hidden',
                   plaseholder:'',
                   yes:"qq",
                   keys:'endDate',
                   names:{value:''},
                   flag:true,
                   
                } ,
                {
                    id:'06',
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
                    id:'07',
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
           
           data:{},
            isLoading:true,
        }
    },
    components:{
        Listhead,Pagination,List,heads

    }
    ,
    methods:{
         searchAction(str){//查询
         let obj={...str,...this.articleTag}
               getCheckedArticle(obj).then((res) => {
                   console.log(res)
                this.listdata=res
                Bus.$emit("gettextnum",res)
                 Bus.$emit("getpage",res);
                 //关闭查询按钮loading
                    this.Emit.$emit('closeLoading');
                    //关闭表格loading
                    this.isLoading = false;
				}).catch(err => {
				 	alert('error'+err);
                })
        }
    },
    created(){
        this.articleTag=this.$route.query
        console.log(this.$route.query)
    }
}
</script>
<style lang="less" >
.textnumWrap{
     margin-left:-1px;
    padding-bottom:30px;
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