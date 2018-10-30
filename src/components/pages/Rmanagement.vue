<template>
<div class="RmanagementWrap">
     <heads></heads>
     <div class="main">
    <div>
           <Listhead :head='head' @getparams="searchAction"></Listhead> 
    </div>
    <div>
         <div class="btn">
             <el-button size="small" icon="el-icon-plus" plain @click=" dialogFormVisible = true">新增</el-button>
              <el-button size="small" icon="el-icon-circle-close-outline" plain @click="StopUser()">停用</el-button>
              <el-button size="small" icon="el-icon-circle-check-outline" plain @click="Rstart()">启用</el-button>
        </div>
        <List :isLoading="isLoading" :data='data' v-on:getroleCode="getroleCode"></List>
     </div>
     <Pagination class="pag"></Pagination>
     
     <el-dialog title="角色新增" :visible.sync="dialogFormVisible"  @close='quit' > <!--弹出框-->
                    <div class="radd">
                       
                            <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-ruleForm">
                                <el-form-item
                                    label="角色名称："
                                    prop="roleName"
                                >
                                    <el-input type="text" v-model="form.roleName" autocomplete="off"></el-input>
                                </el-form-item>
                                
                                <el-form-item
                                    label="权限配置："
                                >
                                    <el-tree
                                        :data="changedata"
                                        show-checkbox
                                        node-key="menuId"
                                        ref="tree"
                                        highlight-current
                                        default-expand-all
                                        :props="defaultProps">
                                    </el-tree>
                                </el-form-item> 
                                </el-form>
                     </div>
                     <div slot="footer" class="dialog-footer">
                        <el-button @click="quit">取 消</el-button>
                        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
                    </div>
            </el-dialog>
    </div>
</div>
    
</template>
<script>
import Listhead from '../common/listhead.vue'
import List from '../common/Rlist.vue'
import Pagination from '../common/Pagination.vue'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import Heads from '../common/head.vue'
import Bus from '../common/bus.js'
import { Rstop,GetRolesByCondition ,Rstart,Forsave,Save} from '../../service/getData.js'
export default {
    data(){
         var checkName = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('名称不能为空'));
            }
        };
        return{ 
             rules: {
                roleName: [
                    { validator: checkName, trigger: 'blur' }
                ],
            },
             changedata:[],
             defaultProps: {
                        children: 'children',
                        label: 'menuName',
                        
                    },
            data:{},
            form:{
               roleName:'', 
            },
            
            menuId:[],
            arr:[],
             isLoading:true,
            dialogFormVisible: false,
             head:[ {
                   id:'01',
                   name:'角色名称' ,
                   type:'text',
                   plaseholder:'',
                    keys:'roleName',
                   names:{value:''}, 
                   flag:true,
                } ],
           data:{},
           code:''
        }
    },
    components:{
         Listhead,Pagination,List,Heads
    },
     methods:{
        
          quit(){
             this.dialogFormVisible = false
            this.$refs.form.resetFields()        
         },
        StopUser(){
            
             var  params = {};
              params.roleCode=this.code
            Rstop(params).then((res) => {
                this.Emit.$emit('deleteSuccess');
                var res = JSON.parse(res);
                if(res.respCode==='0'){
                    this.$message({
                        message: '停用成功',
                        type: 'success'
                        }); 
                }else{
                    console.log(res)
                   this.$message('请选择一条数据');
                }
                console.log(res)
               
				}).catch(err => {
				 	this.$message('请选择一条数据');
				})
       
        }
        ,
        
        forSeave(){ //获取权限数据
            var params = {}
            Forsave(params).then((res) => {
                var res = JSON.parse(res);

                this.changedata = res.data
            }).catch(err => {
                alert('error' + err);
            })
        },
          getCheckedKeys(){
               this.menuId=this.$refs.tree.getCheckedKeys()
                    var menuIds=this.menuId.join(',')
              if(this.$refs['form'].model.roleName===''){
                   this.$message('请输入角色名称');
              }else if(menuIds===''){
                  this.$message('请输入角色权限');
              }else{
              
                        var  params={}
                        params.roleName=this.form.roleName
                        params.creator=localStorage.getItem("name") 
                            params.menuIds=menuIds
                            console.log(params)
                            Save(params).then((res) => {
                                 this.form.roleName='' 
                                 this.$refs.tree.setCheckedKeys([]);
                                this.Emit.$emit('deleteSuccess');
                                var res = JSON.parse(res)
                                this.$message({
                                    message: res.respMsg,
                                    type: 'success'
                                    }); 
                                this.dialogFormVisible = false
                            }).catch(err => {
                                alert('error' + err);
                            })
              }
              
           
       }, 
         Rstart(){
             var  params = {};
              params.roleCode=this.code
              console.log(params)
            Rstart(params).then((res) => {
               console.log(res)
               this.Emit.$emit('deleteSuccess');
               var res = JSON.parse(res)
                if(res.respCode==='0'){
                    this.$message({
                        message: '启用成功',
                        type: 'success'
                        }); 
                }else{
                   this.$message('请选择一条数据');
                }
				}).catch(err => {
				 this.$message('请选择一条数据');
				})
       
        },
        getroleCode (code) {
        // childValue就是子组件传过来的值
        this.code = code  
       },
        searchAction(str){
              this.isLoading = true;
               GetRolesByCondition(str).then((res) => {
                this.listdata=res
                 Bus.$emit("getpage",res)
                Bus.$emit("getdatas",res)
                 //关闭查询按钮loading
                    this.Emit.$emit('closeLoading');
                    //关闭表格loading
                    this.isLoading = false;
				}).catch(err => {
				 	alert('error'+err);
                })
        }
    },
    computed:{
         ...mapState(["flag"])
    },
    created(){
        this.forSeave()
    }
}
</script>
<style  lang="less">
.RmanagementWrap{
    margin-left:-1px;
    padding-bottom:30px;
  .add{
    position: absolute;
    top: 50px ;
    left:500px;
    background: #ffffff;
    height: 565px;
    width: 533px;
    overflow: auto;
    border: #000 solid 1px;
}
.main{
    margin: 25px;
    margin-left: 35px
    
}
.btn{
    margin: 15px;
    margin-left: 0;
    
}
.el-pagination{
    margin:20px 0;
    
}  
}

</style>