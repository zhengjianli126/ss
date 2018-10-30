<template>
<div class="newdiscuss">
    <Heads></Heads>
    <div style="margin-top:20px;">
        <Listhead :head='head' @getparams="searchAction"></Listhead>
    </div>

    <div>
        <div class="btn">
            <el-button plain @click="addNewDiscuss">新增</el-button>
            <el-button plain @click="deleteDiscuss">删除</el-button>
        </div>
        
        <List style="padding-left:30px;" :isLoading="isLoading" :data='data' :headData='headData' @getDisUp="searchAction" @getkeydisId="getkeydisId"></List>

        <Pagination style="padding-left:30px; margin-top:10px;" class="pag" @getparams="searchAction"></Pagination>
    </div>
</div>
    
</template>
<script>
import Heads from '../../common/head.vue'
import Bus from '../../common/bus.js'
import Listhead from '../../common/listhead.vue'
import List from './discussList.vue'
import Pagination from '../../common/Pagination.vue'

import { getKeydisByCondition,deleteDisById } from '../../../service/getData.js'

export default {
    data() {
        return {
            head:[
                {
                    id:'01',
                    name:'题目',
                    type:'text',
                    plaseholder:'',
                    keys:'keyDisTitle',
                    names:{value:''},
                    flag:true
                },
                {
                    id:'02',
                    name:'类型' ,
                    type:'select',
                    keys:'type',
                    names:{value:''},
                    option:[
                        {
                            id:'01',
                            value:'',
                            key:"全部"
                        }, {
                            id:'02',
                            value:'0',
                            key:"正在讨论"
                        }, {
                            id:'03',
                            value:'1',
                            key:"问题征集"
                        }
                    ]
                }, 
                {
                    id:'03',
                    name:'上架状态',
                    type:'select',
                    plaseholder:'',
                    keys:'isPublic',
                    names:{value:''},
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
                }
            ],
           data:'',
           isLoading:false,
           keydisId:[],
           headData:{}
        }
    },
    created() {
    },
    methods: {
        searchAction(str){
            // 保存搜索条件，删除后拉新数据，仍然保持当前搜索条件
            this.headData = str;

            this.isLoading = true;
            getKeydisByCondition(str).then((res) => {
                // 从接口获取到列表的数据
                // this.listdata=res;
                //console.log(JSON.parse(res));

                // 向翻页组件发送数据
                Bus.$emit("getpage",res);

                // 向 List 组件发送数据
                Bus.$emit("getdata",res);

                //关闭查询按钮loading
                this.Emit.$emit('closeLoading');
                
                //关闭表格loading
                this.isLoading = false;
            }).catch(err => {
                console.log('error'+err);
            })
        },
        getkeydisId(str){
            // 获取keydisId
            str.forEach(item => {
                this.keydisId.push(item.keyDisId);
            });
        },
        addNewDiscuss(){
            //新增讨论
            this.$router.push({name:"addDiscuss", query:{}})
        },
        deleteDiscuss(){
            // 删除讨论
            var params = {};
            params.keydisId=this.keydisId;
            
            if(params.keydisId.length == 0){
                this.$alert('请选择要删除的讨论', '提示', {
                    confirmButtonText: '确定'
                });
                return false
            }else if(params.keydisId.length > 1){
                this.$alert('暂不支持批量删除', '提示', {
                    confirmButtonText: '确定'
                });
                return false
            }
            // 删除前进行提示
            this.$confirm('是否确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 确定删除
                deleteDisById(params).then((res) => {
                    var res = JSON.parse(res);

                    if(res.respCode==="0"){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.searchAction(this.headData);
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }         
                }).catch(err => {
                    alert('error'+err);
                })
            }).catch(() => {
                // 取消删除
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    components:{
        Heads,
        Listhead,
        List,
        Pagination
    }
}
</script>
<style lang="less">
    .newdiscuss{
        margin-left:5px;
        padding-bottom:30px;
        .btn{
            margin: 15px;
            margin-left: 0;
            padding-left:30px;
        }
    }
</style>
