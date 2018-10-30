<template>
<div  class="userWrap">
    <heads></heads>
<div class="main">
    <div>
         <Listhead :head='head' @getparams="searchAction"></Listhead>
    </div>
    <div>
        <div class='btn'>
            <el-button icon="el-icon-edit" plain @click="postMessage">发消息</el-button>
        </div>
        <List :isLoading="isLoading"  v-on:getphonenum="getphonenum"></List>
  <Pagination></Pagination>   <!--分页-->
    </div>
</div>
    <el-dialog title="新增" :visible.sync="dialogFormVisible"> <!--弹出框-->
                <Message  :phonenum='phonenum'  ref="userMessage"></Message>
                <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button @click="userSendMessage">确定</el-button>
                </div>
            </el-dialog>

 </div>
</template>
<script>
import Listhead from './listhead.vue'
import List from './list.vue'
import Pagination from '../common/Pagination.vue'
import Heads from '../common/head.vue'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import { sendMessage,Getusers } from '../../service/getData.js'
import Message from './message.vue'
import Bus from '../common/bus.js'
export default {

    data(){
        return {
        head:[ {
                    id:'01',
                name:'真实姓名' ,
                type:'text',
                    keys:'userRealName',
                names:{value:''},
                plaseholder:'',
                flag:true,

                }, {
                    id:'02',
                name:'手机号' ,
                type:'text',
                    keys:'phoneNum',
                names:{value:''},
                plaseholder:'',
                flag:true,

                },
                {
                    id:'03',
                name:'医院' ,
                type:'text',
                    keys:'userHospital',
                names:{value:''},
                plaseholder:'',
                flag:true,

                } ,{
                    id:'04',
                name:'科室' ,
                type:'text',
                    names:{value:''},
                    keys:'userOffice',
                plaseholder:'',
                flag:true,

                } ,{
                    id:'05',
                name:'职务' ,
                type:'text',
                    names:{value:''},
                    keys:'userPost',
                plaseholder:'',
                flag:true,

                } ,{
                    id:'06',
                name:'专委会' ,
                type:'text',
                names:{value:''},
                    keys:'specialCommittee',
                plaseholder:'',
                flag:false,
                option:[
                    {
                        id:'01',
                            value:'',
                        key:"全部"
                        },
                            {
                        id:'02',
                        value:'1',
                        key:"手术装备与材料专业委员会"
                        },{
                        id:'03',
                        value:'2',
                        key:"内镜装备与材料专业委员会"
                        },{
                        id:'04',
                        value:'3',
                        key:"护理装备专业委员会"
                        },{
                        id:'05',
                        value:'4',
                        key:"耗材管理专业委员会"
                        },{
                        id:'06',
                        value:'5',
                        key:"血液净化装备与材料专业委员会"
                        },{
                        id:'07',
                        value:'6',
                        key:"区域器材灭菌管理专业委员会"
                        },{
                        id:'08',
                        value:'7',
                        key:"安全防护专业委员会"
                        },{
                        id:'09',
                        value:'8',
                        key:"康复与老年护理专业委员会"
                        },{
                        id:'10',
                        value:'9',
                        key:"介入装备与材料专业委员会"
                        },{
                        id:'11',
                        value:'10',
                        key:"无"
                        }

                ]
                }, {
                    id:'07',
                name:'身份' ,
                type:'text',
                    names:{value:''},
                    keys:'userIdentity',
                plaseholder:'',
                flag:false,
                option:[
                    {
                        id:'01',
                        value:'',
                        key:"全部"
                        },{
                        id:'02',
                        value:'1',
                        key:"主任委员"
                        },{
                        id:'03',
                        value:'2',
                        key:"副主任委员"
                        },{
                        id:'04',
                        value:'3',
                        key:"常务副主任委员"
                        },{
                        id:'05',
                        value:'4',
                        key:"秘书"
                        },{
                        id:'06',
                        value:'5',
                        key:"青年委员"
                        },{
                        id:'06',
                        value:'6',
                        key:"委员"
                        },{
                        id:'06',
                        value:'7',
                        key:"普通"
                        },{
                        id:'06',
                        value:'8',
                        key:"行业专家"
                        }
                ]
                }, {
                    id:'08',
                name:'审核状态' ,
                type:'text',
                names:{value:''},
                keys:'ischeck',
                plaseholder:'',
                flag:false,
                option:[
                        {
                        id:'01',
                        value:'',
                        key:"全部"
                        }, {
                        id:'02',
                        value:'3',
                        key:"待审核"
                        }, {
                        id:'03',
                        value:'1',
                        key:"通过"
                        },{
                        id:'04',
                        value:'2',
                        key:"未通过"
                        },{
                        id:'05',
                        value:'0',
                        key:"未提交审核"
                        }
                ]
                },
          {
            id:'09',
            name:'注册时间' ,
            type:'',
            keys:['ctime','ctime1'],
            names:{value:''},
            plaseholder:'',
            flag:true,
          }
                ],

        data:{},
        isLoading:true,
        phonenum:[],
        checked:false,
        dialogFormVisible :false,
        }
    },
    components:{
        Listhead,Pagination,List,Heads,Message

    },
    created(){

    },
   methods:{
        getphonenum (phones) {
            // childValue就是子组件传过来的值
                this.phonenum = phones
        },
        postMessage(){
        console.log(this.phonenum)
            if(this.phonenum.length===0){
                 this.$message('请选择用户');
            }else{
                this.dialogFormVisible=true
            }
        },
        userSendMessage(){
            var phonenums=this.phonenum.join(',')
            console.log(phonenums)
            this.$refs.userMessage.SendMessage(phonenums)
                this.dialogFormVisible=false
        },
         searchAction(str){
               this.isLoading = true;
               Getusers(str).then((res) => {
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
    computed:{


    }
}
}
</script>
<style lang="less" >
.userWrap{
    margin-left:-1px;
    padding-bottom:30px;
   .main{
    margin: 25px;
    margin-left: 35px

}
.btn{
    margin: 15px;
    margin-left: 0;

}
.el-pagination{
    margin-left: 600px;
}
}


</style>
