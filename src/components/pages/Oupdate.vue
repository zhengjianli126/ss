<template>
<div class='OupdateWrap'>
      <el-form :model="updatedata" status-icon  :rules="rules"   ref="updatedata" label-width="100px" class="demo-ruleForm">
            <el-form-item label="操作员账号" prop="adminAccount">
                <el-input type="text" v-model="updatedata.adminAccount" autocomplete="off" readonly></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="adminName">
                <el-input type="text" v-model="updatedata.adminName" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="手机号" prop="adminTelephone">
                <el-input type="text" v-model="updatedata.adminTelephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="headImg">
               <el-upload
                    class="avatar-uploader"
                    action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="updatedata.headImg" :src="updatedata.headImg" class="avatar">
                    <img v-else src="../../assets/img/tx.jpg" class="avatar">
                   
                </el-upload>
            </el-form-item>
             <el-form-item label="医院" prop="adminHospital">
                <el-input type="text" v-model="updatedata.adminHospital" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="科室" prop="adminOffices">
                <el-input type="text" v-model="updatedata.adminOffices" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="职务" prop="adminJob">
                <el-input type="text" v-model="updatedata.adminJob" autocomplete="off"></el-input>
            </el-form-item>
              <el-form-item label="专委会" prop="adminCommitteeString">
                <el-select v-model="updatedata.adminCommitteeString" placeholder="请选择">
                    <el-option label="手术装备与材料专业委员会" :value="0"></el-option>
                    <el-option label="内镜装备与材料专业委员会" :value="1"></el-option>
                    <el-option label="护理装备专业委员会" :value="2"></el-option>
                    <el-option label="耗材管理专业委员会" :value="3"></el-option>
                    <el-option label="血液净化装备与材料专业委员会" :value="4"></el-option>
                    <el-option label="区域器材灭菌管理专业委员会" :value="5"></el-option>
                    <el-option label="安全防护专业委员会" :value="6"></el-option>
                    <el-option label="康复与老年护理专业委员会" :value="7"></el-option>
                    <el-option label="介入装备与材料专业委员会" :value="8"></el-option>
                    <el-option label="重症医学装备与材料专业委员会" :value="9"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="身份" prop="adminIdentity">
                <el-select v-model="updatedata.adminIdentityString" placeholder="请选择">
                    <el-option label="主任委员" :value="0"></el-option>
                    <el-option label="副主任委员" :value="1"></el-option>
                    <el-option label="常务副主任委员" :value="2"></el-option>
                    <el-option label="秘书" :value="3"></el-option>
                    <el-option label="青年委员" :value="4"></el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="文章专栏" prop="adminEditIdentity">
                <el-select v-model="updatedata.adminEditIdentity" placeholder="请选择">
                    <el-option label="普通" :value="0"></el-option>
                    <el-option label="专家" :value="1"></el-option>
                    <el-option label="编辑" :value="2"></el-option>
                    <el-option label="主编" :value="3"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="问题专栏" prop="adminQuestion">
                <el-select v-model="updatedata.adminQuestionString" placeholder="请选择">
                    <el-option label="普通" :value="0"></el-option>
                    <el-option label="工厂" :value="1"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="所属角色" prop="roleCode">
                <el-select v-model="updatedata.roleCode" placeholder="请选择">
                    <el-option style="display:block;" v-for="x in arr" :label="x.key"  :value="x.value" :key="x.id" ></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="备注" prop="checkPass">
                <el-input type="textarea" v-model="updatedata.adminToken"></el-input>
              </el-form-item>
      
     </el-form>
             <div slot="footer" class="dialog-footer foot">
                        <el-button @click="quit">取消</el-button>
                        <el-button @click="change()">确定</el-button>
            </div>
    
</div>
    
</template>
<script>
import { Change,getAllRoles } from '../../service/getData.js'
import Bus from '../common/bus.js'
export default {
    props:['updatedata'],
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
        return{
            data:this.updatedata,
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
              },
            arr:[]
        }
        

    },
   components:{
       
   },
    methods:{
        quit(){
            console.log(this)
            console.log(this.$emit)
                this.$emit('getchange','');
        },
        aa(){
            console.log(this.updatedata)
        },
        handleAvatarSuccess(res, file) {
            console.log(URL.createObjectURL(file.raw))
                    this.updatedata.headImg = URL.createObjectURL(file.raw);
                },
     beforeAvatarUpload(file) {
                    console.log(file)
                    const isJPG = file.type === 'image/png'||'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
      },
			change(){
                
            this.$refs['updatedata'].validate((valid) => {
                console.log(valid)
             if (valid) {
				var params = {};
				params.adminAccount = this.updatedata.adminAccount;
                params.adminName = this.updatedata.adminName;
                params.adminTelephone = this.updatedata.adminTelephone;
                params.adminHospital = this.updatedata.adminHospital;
                params.adminJob = this.updatedata.adminJob;
                params.adminIdentity = this.updatedata.adminIdentity;
                params.adminOffices = this.updatedata.adminOffices;
                params.adminCommittee = this.updatedata.adminCommittee;
                params.adminEditIdentity = this.updatedata.adminEditIdentity;
                params.adminQuestion = this.updatedata.adminQuestion;
                params.roleCode = this.updatedata.roleCode;
                params.adminToken = this.updatedata.adminToken;
                params.imageUrl = this.updatedata.imageUrl;
                  Change(params).then((res) => {
                     var res = JSON.parse(res);
                    this.$message(res.respMsg);
                      this.$emit('getchange','');

				}).catch(err => {
				 	alert('error'+err);
                })
              
				
            } else {
               
          }
            
          }); 
    },
             getAllRoles(){  //获取角色信息
                var params = {};
               getAllRoles(params).then((res) => {
                   var res = JSON.parse(res)
                   console.log(res)
                   for(let i in res.data){
                       this.arr=[...this.arr,{id:i,value:res.data[i].roleCode,key: res.data[i].roleName}]
                      
                   }

                    console.log(this.arr)
				}).catch(err => {
				 	alert('error'+err);
                })
                
        },
		
    },
    computed:{
        
    },
     created(){
         this.getAllRoles()
         
    }
}
</script>

<style lang="less" >
    .OupdateWrap{
        .foot{
            margin-left: 400px;
        }
    }
</style>


