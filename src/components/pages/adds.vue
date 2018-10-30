<template>
<div>
    <h3>新增
         <button @click="qX">×</button>
    </h3>
    
      <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="操作员账号" prop="desc">
                <el-input type="text" v-model="ruleForm2.adminAccount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="">
                <el-input type="text" v-model="ruleForm2.adminName" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="手机号" prop="">
                <el-input type="text" v-model="ruleForm2.adminTelephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="checkPass">
                <el-upload
                    class="avatar-uploader"
                    action="http://39.106.49.2:8088/upload/upload_img?suffix=.jpg"
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
              <el-form-item label="专委会" prop="checkPass">
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
                </el-select>
            </el-form-item>
             <el-form-item label="身份" prop="checkPass">
                <el-select v-model="ruleForm2.adminIdentity" placeholder="请选择">
                    <el-option label="主任委员" value="0"></el-option>
                    <el-option label="副主任委员" value="1"></el-option>
                    <el-option label="常务副主任委员" value="2"></el-option>
                    <el-option label="秘书" value="3"></el-option>
                    <el-option label="青年委员" value="4"></el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="文章专栏" prop="">
                <el-select v-model="ruleForm2.adminEditIdentity" placeholder="请选择">
                    <el-option label="普通" value="0"></el-option>
                    <el-option label="专家" value="1"></el-option>
                    <el-option label="编辑" value="2"></el-option>
                    <el-option label="主编" value="3"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="问题专栏" prop="checkPass">
                <el-select v-model="ruleForm2.adminQuestion" placeholder="请选择">
                    <el-option label="普通" value="0"></el-option>
                    <el-option label="工厂" value="1"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="所属角色" prop="">
                <el-select v-model="ruleForm2.roleCode" placeholder="请选择">
                    <el-option label="超级管理员" value="0"></el-option>
                    <el-option label="医院专家" value="1"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="备注" prop="checkPass">
                <el-input type="textarea" v-model="ruleForm2.adminToken"></el-input>
              </el-form-item>
        <div class="btn"> <button @click="qX">取消</button><button @click="searchAction">确定</button></div>
     </el-form>
   
       
    
</div>
    
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import { Adds } from '../../service/getData.js'
export default {
    data(){
         
        return{
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

            rules: {
                pass1: [
                   { required: true, message: '该项目不能为空', trigger: 'blur' }
                ],
                desc: [
                     { required: true, message: '该项目不能为空', trigger: 'blur' }
                ]

            }  
        }
    },
    create(){
       
    },
    methods:{
       ...mapMutations(["aDd","qX"]),
			searchAction(){
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
				Adds(params).then((res) => {
                var res = JSON.parse(res)
                if(res.respMsg==="保存成功"){
                    alert("添加成功")
                    this.qX()
                }else{
                    alert("添加失败")
                }
                console.log(res)
				}).catch(err => {
				 	alert('error'+err);
				})
            },
            handleAvatarSuccess(res, file) {
                    this.ruleForm2.headImg = URL.createObjectURL(file.raw);
                },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
      }
		
    },
    computed:{
         ...mapState(["flag"])
    }
}
</script>
<style lang="less" scoped>
    h3{
        height: 35px;
        width: 100%;
        border-bottom: 1px solid #000000;
        font-size: 16px;
        font-weight: 600;
        padding-left: 15px;
        line-height: 35px;
        background: #eeeeee;
        margin-bottom: 30px;
        button{
            height: 100%;
            width:35px;
            font-size: 35px;
            float:right;
            border: none;
            background: #eeeeee
        }
    }
     
    .el-input__inner{
        height: 20px;
        width: 200px;
   }
   .btn{
       float: right;
       margin-right: 50px;
        button{
           height: 30px;
           width: 80px;
           border-radius: 10px;
           background: hsl(204, 76%, 42%);
           color: #fff;
           margin-right: 20px
       }
   }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 89px;
    height: 89px;
    line-height: 89px;
    text-align: center;
  }
  .avatar {
    width: 89px;
    height: 89px;
    display: block;
  }

</style>


