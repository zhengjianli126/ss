<template>
<div class="tasklistWarp">
    <heads></heads>
    <div class="main">
        <div>
         <Listhead :head='head'  @getparams="searchAction"></Listhead>
        </div>
        <div>
            <div>
                <el-button plain @click="saveArticle" >投稿</el-button>
            </div>
            <List ></List>
            
            <Pagination></Pagination>
        </div>
    </div>
</div>
    
</template>
<script>
import Listhead from './task/listhead.vue'
import List from './tasklist/list.vue'
import Heads from '../common/head.vue'
import Pagination from '../common/Pagination.vue'
import { geturl } from '../../config/env'
import { getCheckedArticle} from '../../service/getData.js'//引入接口
import Bus from '../common/bus.js' //bus 中间组件
export default {

    data(){
        return {
             isLoading:true,
            head:[  {
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
         searchAction(str){//查询
               getCheckedArticle(str).then((res) => {
                   console.log(res)
                this.listdata=res
                 Bus.$emit("getpage",res);
                 Bus.$emit("getTasklist",res)
                    //关闭查询按钮loading
                    this.Emit.$emit('closeLoading');
                    //关闭表格loading
                    this.isLoading = false;
				}).catch(err => {
				 	alert('error'+err);
                })
        },
        saveArticle(){
            this.$router.push({name:"saveArticle",  query:{}})
        }

    }
}
</script>
<style lang="less">
.tasklistWarp{
     margin-left:-1px;
    padding-bottom:30px;
    .main{
        margin: 25px;
        margin-left: 35px
        
    }
  
}

</style>