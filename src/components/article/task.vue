<template>
<div class="taskWarp">
<heads></heads>
    <div class="main">
        <div>
            <Listhead :head='head'  @getparams="searchAction"></Listhead>
        </div>
        <div>
            <List :data='data' ></List>
            <Pagination  class="pag"></Pagination>
        </div>
    </div>
 </div>
</template>
<script>
import Bus from '../common/bus.js'
import List from './task/list.vue'
import Listhead from './task/listhead.vue'
import Pagination from '../common/Pagination.vue'
import Heads from '../common/head.vue'
import { getCheckPendingArticle } from '../../service/getData.js'
export default {

    data(){
        return {
            head:[ {
                    id:'01',
                   name:'标题' ,
                   type:'text',
                   plaseholder:'请输入标题',
                   keys:'articleTitle',
                   names:{value:''},
                   flag:true,
                  
                }, {
                    id:'02',
                   name:'投稿人' ,
                   type:'text',
                   plaseholder:'请输入投稿人',
                   keys:'articleAuthorName',
                   names:{value:''},
                   flag:true,
                   
                },{
                    id:'03',
                   name:'投稿账号' ,
                   type:'text',
                   plaseholder:'请输入账号/手机号',
                   keys:'articleAuthorAccount',
                   names:{value:''},
                   flag:true,
                   
                },{
                    id:'04',
                   name:'标签名称' ,
                   type:'text',
                   plaseholder:'',
                   keys:'articleTag',
                   names:{value:''},
                   flag:true,
                   
                },
                {
                    id:'05',
                   name:'开始投稿时间' ,
                   type:'hidden',
                   plaseholder:'',
                   keys:'startDate',
                   names:{value:''},
                   flag:true,
                   
                }
                ,
                {
                    id:'06',
                   name:'截止投稿时间' ,
                   type:'hidden',
                   plaseholder:'',
                   keys:'endDate',
                   names:{value:''},
                   flag:true,
                   
                } ,{
                    id:'07',
                   name:'状态' ,
                   type:'text',
                   plaseholder:'',
                   keys:'nowlevel',
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
                           key:"待专家审核"
                           }, {
                           id:'03',
                           value:'2',
                           key:"待编辑审核"
                           }, {
                           id:'04',
                           value:'4',
                           key:"待主编审核"
                           }, {
                           id:'05',
                           value:'1',
                           key:"专家审核中"
                           }, {
                           id:'06',
                           value:'3',
                           key:"编辑审核中"
                           }, {
                           id:'07',
                           value:'5',
                           key:"主编审核中"
                           }
                   ]
                }
                ],
           data:{},
        isLoading:true,
        }
    },
    components:{
        Listhead,Pagination,List,Heads

    },
    methods:{
         searchAction(str){
              getCheckPendingArticle(str).then((res) => {
                this.data=res
                    Bus.$emit("getpage",res);
                    Bus.$emit("getArticle",res);
                    //关闭查询按钮loading
                    this.Emit.$emit('closeLoading');
                    //关闭表格loading
                    this.isLoading = false;
				}).catch(err => {
				 	alert('error'+err);
				})
        }
    }
}
</script>
<style lang="less">
.taskWarp{
     margin-left:-1px;
    padding-bottom:30px;
.main{
    margin: 25px;
    margin-left: 35px
    
}
  
}

</style>
