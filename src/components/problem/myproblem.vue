<template>
<div>
    <div>
         <Listhead :head='head'></Listhead>
     <el-button type="primary">查询</el-button>
    </div>
    <div>
         <div>
            <el-button plain>新增</el-button>
        </div>
        <List :th='th' :data='data'></List>
    </div>
</div>
    
</template>
<script>
import List from '../common/list.vue'
import Listhead from '../common/listhead.vue'
import Pagination from '../common/Pagination.vue'
export default {

    data(){
        return {
            head:[ {
                    id:'01',
                   name:'提问标题' ,
                   type:'text',
                   plaseholder:'',
                   flag:true,
                  
                }, {
                    id:'02',
                   name:'标签名称' ,
                   type:'text',
                   plaseholder:'',
                   flag:true,
                   
                },{
                    id:'03',
                   name:'提问日期' ,
                   type:'',
                   plaseholder:'',
                   flag:true,
                   
                },{
                    id:'04',
                   name:'状态' ,
                   type:'text',
                   plaseholder:'',
                   flag:false,
                   option:[
                        {
                           id:'01',
                           key:"全部"
                           }, {
                           id:'02',
                           key:"未解决"
                           }, {
                           id:'03',
                           key:"已解决"
                           }
                   ]
                },{
                    id:'05',
                   name:'审核状态' ,
                   type:'text',
                   plaseholder:'',
                   flag:false,
                   option:[
                        {
                           id:'01',
                           key:"全部"
                           }, {
                           id:'02',
                           key:"待审核"
                           }, {
                           id:'03',
                           key:"已通过"
                           }, {
                           id:'04',
                           key:"未通过"
                           }
                   ]
                }
                ],
            th:[
               {id:'01',
               key:'提问标题'
               },
                {id:'02',
               key:'标签'
               }, 
               {id:'03',
               key:'已获回答'
               },
                {id:'04',
               key:'浏览量'
               },
                {id:'05',
               key:'提问时间'
               },
                {id:'06',
               key:'状态'
               },
                {id:'07',
               key:'审核状态'
               },
                {id:'08',
               key:'操作'
               }],
           data:{}
        }
    },
    components:{
        Listhead,List

    }
}
</script>
