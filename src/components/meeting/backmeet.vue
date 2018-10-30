<template>
<div class="Backmeet">
    <div>
         <Listhead :head='head' @getparams="searchAction"></Listhead>
    </div>
    <div>
         <div class="btn">
            
            <el-button plain  @click="getbackMeetadd()">新增</el-button>
            <el-button plain>上架</el-button>
            <el-button plain>下架</el-button>
            <el-button plain>删除</el-button>
        </div>
        <List :th='th' :data='data'></List>
        <Pagination class="pag" @getparams="searchAction"></Pagination>
    </div>
</div>
</template>
<script>
import Bus from '../common/bus.js'
import List from './backlist.vue'
import Listhead from '../common/listhead.vue'
import Pagination from '../common/Pagination.vue'
import { getReplaysByCondition } from '../../service/getData.js'
export default {
    data(){
        return {
            head:[ {
                    id:'01',
                   name:'会议名称：' ,
                   type:'text',
                   plaseholder:'',
                   keys:'replayTitle',
                   names:{value:''},
                   flag:true,
                  
                },
                {
                    id:'02',
                   name:'会议名称：' ,
                   type:'text',
                   plaseholder:'',
                   keys:'endTime',
                   names:{value:''},
                   flag:true,
                  
                },
                {
                    id:'03',
                   name:'会议名称：' ,
                   type:'text',
                   plaseholder:'',
                   keys:'startTime',
                   names:{value:''},
                   flag:true,
                  
                 },
                // {
                //     id:'02',
                //     name:'结束时间' ,
                //    type:'datePicker',
                //    keys:'beginTime',
                //    names:{value1:''},
                  
                // },{
                //     id:'03',
                //     name:'结束时间' ,
                //    type:'datePicker',
                //    keys:'endTIme',
                //    names:{value1:''},
                  
                // }, 
                {
                    id:'04',
                   name:'状态' ,
                   type:'text',
                   plaseholder:'',
                   keys:'ispublic',
                   names:{value:''},
                   flag:false,
                   option:[
                        {
                           id:'01',
                           value:'',
                           key:"全部"
                           }, {
                           id:'02',
                           value:'1',
                           key:"未上架"
                           }, {
                           id:'03',
                           value:'2',
                           key:"已上架"
                           }, {
                           id:'04',
                           value:'3',
                           key:"已下架"
                           }
                   ]
                }
                ],
            th:[
               {id:'01',
               key:'选择'
               },
                {id:'02',
               key:'会议名称'
               }, 
               {id:'03',
               key:'结束时间'
               },
                {id:'04',
               key:'视频数'
               },
                {id:'05',
               key:'播放数'
               },
                {id:'06',
               key:'获赞数'
               },
                {id:'07',
               key:'状态'
               },
                {id:'08',
               key:'操作'
               }],
           data:{}
        }
    },
    create(){
        },
    methods : {
        searchAction(str){
            console.log(str)
               this.isLoading = true;
               getReplaysByCondition(str).then((res) => {
                   console.log(res)
                    this.listdata=res;
                    Bus.$emit("getpage",res);
                    Bus.$emit("getdata",res);
                    //关闭查询按钮loading
                    this.Emit.$emit('closeLoading');
                    //关闭表格loading
                    this.isLoading = false;
				}).catch(err => {

                    alert('error'+err);
                     
				})
        },
        getbackMeetadd: function () { // 跳转至新增
          this.$router.push({name: 'backadd'})
        },
    }, 
    components:{
        Listhead,List,Pagination

    }
}
</script>
<style lang="less">
    .Backmeet{
        margin-left:35px;
        padding-top:30px;
        padding-bottom:30px;
        .btn{
        margin: 15px;
        margin-left: 0;
        
    }
}
</style>

