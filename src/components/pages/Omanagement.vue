<template>
<div class="omanagementWrap">
    <heads></heads>
    <div class="main">
        <div>
            <Listhead :head='head' @getparams="searchAction"></Listhead> 
        </div>
        <div>
            <div class="btn">
                <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
                <el-button plain icon="el-icon-edit-outline" @click="ResetAdminPwd">重置密码</el-button>
            </div>
    <List  :isLoading="isLoading"  v-on:getphone="getphone" ></List>

    <Pagination class="pag" @getparams="searchAction"></Pagination>
        </div>
        <el-dialog title="新增" :visible.sync="dialogFormVisible" @close='quit'> <!--弹出框-->
                   <el-form :model="ruleForm2" status-icon  :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="操作员账号" prop="adminAccount">
                            <el-input type="text" v-model="ruleForm2.adminAccount" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="adminName">
                            <el-input type="text" v-model="ruleForm2.adminName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="adminTelephone">
                            <el-input type="text" v-model="ruleForm2.adminTelephone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="头像" prop="checkPass">
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="ruleForm2.headImg" :src="ruleForm2.headImg" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="医院" prop="checkPass">
                            <el-input type="text" v-model="ruleForm2.adminHospital" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="科室" prop="checkPass">
                            <el-input type="text" v-model="ruleForm2.adminOffices" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="职务" prop="checkPass">
                            <el-input type="text" v-model="ruleForm2.adminJob" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="专委会" prop="adminCommittee">
                            <el-select v-model="ruleForm2.adminCommittee" placeholder="请选择">
                                <el-option label="手术装备与材料专业委员会" value="0"></el-option>
                                <el-option label="内镜装备与材料专业委员会" value="1"></el-option>
                                <el-option label="护理装备专业委员会" value="2"></el-option>
                                <el-option label="耗材管理专业委员会" value="3"></el-option>
                                <el-option label="血液净化装备与材料专业委员会" value="4"></el-option>
                                <el-option label="区域器材灭菌管理专业委员会" value="5"></el-option>
                                <el-option label="安全防护专业委员会" value="6"></el-option>
                                <el-option label="康复与老年护理专业委员会" value="7"></el-option>
                                <el-option label="介入装备与材料专业委员会" value="8"></el-option>
                                <el-option label="重症医学装备与材料专业委员会" value="9"></el-option>
                                <el-option label="无" value="10"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="身份" prop="adminIdentity">
                            <el-select v-model="ruleForm2.adminIdentity" placeholder="请选择">
                                <el-option label="主任委员" value="1"></el-option>
                                <el-option label="副主任委员" value="2"></el-option>
                                <el-option label="常务副主任委员" value="3"></el-option>
                                <el-option label="秘书" value="4"></el-option>
                                <el-option label="青年委员" value="5"></el-option>
                                <el-option label="委员" value="6"></el-option>
                                <el-option label="普通" value="7"></el-option>
                                <el-option label="行业专家" value="8"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="文章专栏" prop="adminEditIdentity">
                            <el-select v-model="ruleForm2.adminEditIdentity" placeholder="请选择">
                                <el-option label="普通" value="0"></el-option>
                                <el-option label="专家" value="1"></el-option>
                                <el-option label="编辑" value="2"></el-option>
                                <el-option label="主编" value="3"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="问题专栏" prop="adminQuestion">
                            <el-select v-model="ruleForm2.adminQuestion" placeholder="请选择">
                                <el-option label="普通" value="0"></el-option>
                                <el-option label="工厂" value="1"></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="所属角色" prop="roleCode">
                            <el-select v-model="ruleForm2.roleCode" placeholder="请选择">
                                
                                 <el-option style="display:block;" v-for="x in head[2].option" :label="x.key"  :value="x.value" :key="x.id" ></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="备注" prop="">
                            <el-input type="textarea" v-model="ruleForm2.adminToken"></el-input>
                        </el-form-item>
                    </el-form>
                     <div slot="footer" class="dialog-footer">
                        <el-button @click="quit">取 消</el-button>
                        <el-button type="primary" @click="adds('ruleForm2')">确 定</el-button>
                    </div>
            </el-dialog>
        
    </div>
</div>
    
</template>
<script>
import Listhead from '../common/listhead.vue'
import List from '../common/list.vue'
import Heads from '../common/head.vue'
import Pagination from '../common/Pagination.vue'
import { geturl } from '../../config/env'
import { resetAdminPwd, Listheads, Adds,getAllRoles } from '../../service/getData.js'
import Bus from '../common/bus.js'
export default {

    data(){
        let testPhone = (rule, value, callback) => {
            let reg= /^1[3|4|5|8][0-9]\d{8}$/
            if (value === '') {
            callback(new Error('请输入手机号'));
            } else if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号!'));
            } else {
            callback();
            }
        }
         let testAdminAccount = (rule, value, callback) => {
            let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/
            if (value === '') {
            callback(new Error('请输入账号'));
            } else if (!reg.test(value)) {
            callback(new Error('内管操作员账号必须为数字+字母，6-14位'));
            } else {
            callback();
            }
        }
        let testAdminName = (rule, value, callback) => {
            let reg= /(^\s*)|(\s*$)/g
            let rag =/\s/;
            let testValue=value.replace(reg,'')
            if (testValue === '') {
            callback(new Error('该项目不能全部空白字符'));
            } else if (rag.test(value)) {
            callback(new Error('不允许有空白字符'));
            }
            else {
            callback();
            }
        }
        return {           
            key:[],
            head:[ {
                    id:'01',
                   name:'操作员账号' ,
                   type:'text',
                   plaseholder:'',
                   keys:'adminAccount',
                   names:{value:''},
                   flag:true,
                  
                }, {
                    id:'02',
                   name:'操作员姓名' ,
                   type:'text',
                   plaseholder:'',
                    keys:'adminName',
                   names:{value:''}, 
                   flag:true,
                   
                }, {
                    id:'03',
                   name:'所属角色' ,
                   type:'text',
                    keys:'roleCode',
                   names:{value:''}, 
                   plaseholder:'',
                   flag:false,
                   option:[
                      
                   ]
                }, {
                    id:'04',
                   name:'文章专栏' ,
                   type:'text',
                   plaseholder:'',
                    keys:'adminEditIdentity',
                   names:{value:''},
                   flag:false,
                   option:[
                       {
                           id:'1',
                           value:'',
                           key:"全部"
                           },{
                           id:'2',
                           value:'3',
                           key:"主编"
                           },{
                           id:'3',
                           value:'1',
                           key:"专家"
                           },{
                           id:'4',
                           value:'2',
                           key:"编辑"
                           },{
                           id:'5',
                           value:'0',
                           key:"普通"
                           }
                   ]
                }, {
                    id:'05',
                   name:'问题专栏' ,
                   type:'text',
                    keys:'adminQuestion',
                   names:{value:''},
                   plaseholder:'',
                   flag:false,
                   option:[
                        {
                           id:'1',
                           value:'',
                           key:"全部"
                           }, {
                           id:'2',
                           value:'0',
                           key:"普通"
                           }, {
                           id:'3',
                           value:'1',
                           key:"工厂"
                           }
                   ]
                }
                ],
         
           phone:[],
           isLoading:true,
           listdata:{},
           ruleForm2:{
                adminAccount:'',
                adminName:'',
                adminTelephone:'',
                adminHospital:'',
                adminToken:'',
                adminJob:'',
                userId:'',
                adminIdentity:'',
                adminCommittee:'',
                roleCode:'',
                adminEditIdentity:'',
                adminQuestion:'',
                adminOffices:'',
                headImg:'',
                adminToken:'',
                imageUrl: '',
                checkPass:'',
                 

            },
            dialogFormVisible:false,
            rules: {
                adminAccount: [
                     { required: true, message: '该项目不能为空', trigger: 'blur' },
                     {validator: testAdminAccount, trigger: 'blur' },
                ],
                adminName: [
                     { required: true, message: '该项目不能为空', trigger: 'blur' },
                      {validator: testAdminName, trigger: 'blur' },
                ],
                adminTelephone: [
                    { required: true, message: '该项目不能为空', trigger: 'blur' },
                     {validator: testPhone, trigger: 'blur' },
                ],
                adminEditIdentity: [
                     { required: true, message: '该项目不能为空', trigger: 'change' },
                ],
                roleCode: [
                     { required: true, message: '该项目不能为空', trigger: 'change' },
                ],
                adminCommittee: [
                     { required: true, message: '该项目不能为空', trigger: 'change' },
                ],
                adminIdentity: [
                     { required: true, message: '该项目不能为空', trigger: 'change' },
                ],
                adminQuestion: [
                     { required: true, message: '该项目不能为空', trigger: 'change' },
                ]

            }  
        
        }
    },
    components:{
        Listhead,Pagination,List,Heads

    },
    created(){
         this.getAllRoles()
    },
     methods:{
         quit(){
             this.dialogFormVisible = false
            this.$refs.ruleForm2.resetFields()        
         },
       getphone (phone) {
        // childValue就是子组件传过来的值
        this.phone = phone  
       },
        handleAvatarSuccess(res, file) {
            console.log(URL.createObjectURL(file.raw))
                    this.ruleForm2.headImg = URL.createObjectURL(file.raw);
                },
     beforeAvatarUpload(file) {
                    console.log(file)
                    const isJPG = file.type === 'image/png'||'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 1;

                    if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                    }
                    return isJPG && isLt2M;
      },
       ResetAdminPwd(){  //重置密码
                var params = {};
                params.adminTelephone=this.phone[0]
                params.adminAccount= this.phone[1]
               resetAdminPwd(params).then((res) => {
                   var res = JSON.parse(res)
                   console.log(res)
                if(res.respCode==='0'){
                    this.$message({
                        message: '重置成功',
                        type: 'success'
                        });
                }else{
                     this.$message('请选择一条数据');
                }
				}).catch(err => {
				 	alert('error'+err);
				})
        },
         getAllRoles(){  //获取角色信息
                var params = {};
               getAllRoles(params).then((res) => {
                   var res = JSON.parse(res)
                   console.log(res)
                   for(let i in res.data){
                       this.head[2].option=[...this.head[2].option,{id:i,value:res.data[i].roleCode,key: res.data[i].roleName}]
                      
                   }

                    console.log(this.head[2].option)
				}).catch(err => {
				 	alert('error'+err);
				})
        },
        searchAction(str){
               this.isLoading = true;
               Listheads(str).then((res) => {
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
        adds(x){
            this.$refs[x].validate((valid) => {
                 console.log(valid)
          if (valid) {
             
            var params = {};
                    params.adminAccount = this.ruleForm2.adminAccount;
                    params.adminName = this.ruleForm2.adminName;
                    params.adminTelephone = this.ruleForm2.adminTelephone;
                    params.adminHospital = this.ruleForm2.adminHospital;
                    params.adminJob = this.ruleForm2.adminJob;
                    params.adminIdentity = this.ruleForm2.adminIdentity;
                    params.adminOffices = this.ruleForm2.adminOffices;
                    params.adminCommittee = this.ruleForm2.adminCommittee;
                    params.adminEditIdentity = this.ruleForm2.adminEditIdentity;
                    params.adminQuestion = this.ruleForm2.adminQuestion;
                    params.roleCode = this.ruleForm2.roleCode;
                    params.headImg = this.ruleForm2.headImg;
                    params.adminToken = this.ruleForm2.adminToken;
                    console.log(params)
                    Adds(params).then((res) => {
                        console.log(res)
                    var res = JSON.parse(res)
                    if(res.respCode==='0'){
                         this.Emit.$emit('deleteSuccess');
                          this.$message({
                        message: '添加成功',
                        type: 'success'
                        });
                        this.dialogFormVisible = false
                    }else if(res.respCode==='901'){
                          this.$message(res);
                    }else if(res.respCode==='902'){
                        this.$message('用户重复');
                    }else if(res.respCode==='903'){
                        this.$message(res.respMsg);
                    }
                    else{
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                            })
                    }
                    console.log(res)
                    }).catch(err => {
                        alert('error'+err);
                    })
          } else {
            console.log('error submit!!');
            return false;
          }
          }); 
        }
     },
    computed:{
       

    }
}

</script>
<style lang="less">
.omanagementWrap{
    margin-left:-1px;
    padding-bottom:30px;
    .add{
    position: fixed;
    top: 50px ;
    left:500px;
    background: #ffffff;
    height: 565px;
    width: 533px;
    overflow: auto;
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
    //margin-left: 600px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .add{
    position: fixed;
    top: 50px ;
    left:500px;
    background: #ffffff;
    height: 565px;
    width: 533px;
    overflow: auto;
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
    //margin-left: 600px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
}

</style>
