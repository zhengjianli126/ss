<template>
<div class="newdiscuss">
    <Heads></Heads>
    <el-row class="container">
        <el-col :span="18">
            <el-form size="small" :rules="rules" :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="类型" prop="discussType">
                    <el-radio v-model="form.discussType" @change="onRadioChange" :label="item.value" :key="item.value" v-for="item in disType">{{item.label}}</el-radio>
                </el-form-item>

                <el-form-item label="题目" prop="discussTitle">
                    <el-input v-model="form.discussTitle"></el-input>
                </el-form-item>
                
                <el-form-item label="详情" prop="discussContent">
                    <vue-ueditor-wrap v-model="form.discussContent"></vue-ueditor-wrap>
                </el-form-item>

                <!-- <el-form-item label="封面图" prop="discussImgPath">
                    <el-upload class="avatar-uploader" action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.discussImgPath" :src="form.discussImgPath" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                
           <!--     <el-form-item label="封面图" prop="discussImgPath">
                    <el-upload class="avatar-uploader" action="http://39.106.49.2:8078/upload/upload_img" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.discussImgPath" :src="form.discussImgPath" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
             -->
            </el-form>
        </el-col>
    </el-row>
        
    <el-col :span="18" :style="{textAlign: 'right'}">
        <el-button type="default" @click="cancelAdd">取消</el-button>
        <el-button type="primary" @click="addDiscuss('form')">确定</el-button>
    </el-col>
</div>
</template>

<script>
import { saveDiscuss } from '../../../service/getData.js'
import Heads from '../../common/head.vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
//import { mapState } from 'vuex'
export default {
    data() {
        // 检查讨论详情的内容
        var checkContent = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('内容不能为空'));
            }
        };
        // 检查讨论标题
        var checkTitle = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('标题不能为空'));
            }
        };
        return {
            options:[],
            disType:[
                {
                    value: '0',
                    label: '正在讨论'
                },
                {
                    value: '1',
                    label: '问题征集'
                }
            ],
            form: {
                discussType:'0',
                discussTitle:'',
                discussContent:'',
                discussImgPath:''
            },
            rules: {
                discussTitle: [
                    { required: true, message: '请输入讨论标题', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                discussContent: [
                    { required: true, message: '请输入讨论内容', trigger: 'blur' }
                ],
            },
            rules2: {
                content: [
                    { validator: checkContent, trigger: 'change' }
                ],
                title: [
                    { validator: checkTitle, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
    },
    methods: {
        submitForm(formName) {
            var pass = false;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    pass = true
                } else {
                    console.log('error submit!!')
                    pass = false
                }
            })
            return pass
        },
        handleAvatarSuccess(res, file) {
            this.form.discussImgPath = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpg/jpeg/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            console.log(this)
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        onRadioChange(item){
            this.form.discussType = item;
        },
        cancelAdd(){
            this.$router.go(-1)
        },
        addDiscuss(formName){
            // 检查标题和内容是否为空
            var pass = this.submitForm(formName)
            if(pass){
                var params = {}
                var user=JSON.parse(localStorage['users'])

                params.userId=user.admin.id           // 操作人账号，必填
                params.userName=user.admin.adminName            // 操作人姓名，必填
                params.type=this.form.discussType               // 类型，必填
                params.keyDisTitle=this.form.discussTitle       // 标题，必填
                params.keyDisContent= this.form.discussContent  // 详情，必填
                params.disImg= this.form.discussImgPath         // 封面，图片的url地址，非必填
                
                saveDiscuss(params).then((res) => {
                    var res = JSON.parse(res);
                    console.log(res)

                    if(res.respCode==="0"){ //跳转主页面
                        //alert("新增讨论成功")
                        this.$router.go(-1)
                    }else{
                        alert("新增讨论失败")
                    }
                    //this.$router.go(-1)
                }).catch(err => {
                    alert('error' + err);
                })
            }else{
                //alert('不通过')
            }
        }
    },
    // beforeRouteLeave(to, from, next) { // ------- questions/currentAction 需要修改
    //     this.$store.dispatch('questions/currentAction', { ...this.currentData, ...{ index: undefined, editable: false } })
    //     next()
    // },
    // computed: {
    //     ...mapState(["tag"]),
    // },
    components: {
        Heads,VueUeditorWrap
    },
    created(){
    }
}
</script>

<style lang="scss">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
  &:not(:last-child) {
    margin-left: 10px;
  }
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<style lang="less">
.saveArtcleWarp{
  margin-bottom: 120px;
  .container {
    margin-top: 30px;
    .tags{
      position: relative;
        height: 100px;
        border: 1px solid #dcdfe6
    }
  }
}
</style>

