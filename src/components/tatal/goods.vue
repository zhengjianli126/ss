<template>
<div>
    <div>
         <Listhead :head='head'></Listhead>
   
     <el-button type="primary">查询</el-button>
   
    </div>
    <div>
        <div>
            <input type="checkbox" name="" id="">全选
            <el-button plain>新增</el-button>
            <el-button plain>上架</el-button>
            <el-button plain>下架</el-button>
            <el-button plain>删除</el-button>
        </div>
        <List :th='th' :data='data'></List>

    </div>
</div>
    
</template>
<script>
import Listhead from '../common/listhead.vue'
import List from '../common/list.vue'
import Pagination from '../common/Pagination.vue'
export default {

    data(){
        return {
            head:[ {
                    id:'01',
                   name:'商品类型' ,
                   type:'text',
                   plaseholder:'',
                   flag:true,
                  
                }, {
                    id:'02',
                   name:'商品编号' ,
                   type:'text',
                   plaseholder:'',
                   flag:true,
                }
                ],
           th:[
               {id:'01',
               key:'选择'
               },
                {id:'02',
               key:'商品名称'
               }, 
               {id:'03',
               key:'商品标号'
               },
                {id:'04',
               key:'库存数量'
               },
                {id:'05',
               key:'兑换金额'
               },
                {id:'06',
               key:'商品描述'
               },
                {id:'07',
               key:'状态'
               },
                {id:'08',
               key:'操作'
               }
           ],
           data:{}
        }
    },
    components:{
        Listhead,Pagination,List

    }
}
</script>
