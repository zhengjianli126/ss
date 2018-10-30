<template>
    <div>
        <h4>审核</h4>
        <div class="main">
            <div class="left">
                 <h5>基本资料</h5>
                 <ul>
                   <li> <span>头像：</span><img :src=arr.headimg alt="" class="head"/></li>
                    <li><span>昵称：</span>{{arr.userName}}</li>
                    <li><span>姓名：</span>{{arr.userRealName}}</li>
                   <li> <span>手机号：</span>{{arr.phoneNum}}</li>
                   <li> <span>身份证号：</span>{{arr.userIdcard}}</li>
                   <li> <span>性别：</span>{{arr.userSex}}</li>
                    <li><span>城市：</span>{{arr.userCity}}</li>
                   <li> <span>医院：</span>{{arr.userHospital}}</li>
                    <li><span>科室：</span>{{arr.userOffice}}</li>
                    <li><span>职务：</span>{{arr.userPost}}</li>
                   <li> <span>专委会：</span>{{arr.specialCommittee}}</li>
                    <li><span>身份：</span>{{arr.userIdentity}}</li>
                 </ul>
            </div>
            <div class="right">
            
                <div class="top">
                    <h5>认证资料</h5>
                    <div v-for="(str,idx) in imgpath" :key="idx">
                        <img :src="str" alt="">
                    </div>
                    
                </div>
                <div class="middle">
                    <h5>个人权益</h5>
                    <ul>
                        <li><span>月亮币（总）：</span>{{arr.moonCash}}</li>
                        <li><span>月亮币（刷）：</span>{{arr.addMoonCash}}</li>
                        <li><span>粉丝数：</span>{{arr.follow}}</li>
                        <li><span>获赞数（总）：</span>{{arr.favor}}</li>
                        <li><span>获赞数（刷）：</span>{{arr.addFavor}}</li>
                    </ul>
                </div>
                <div class="bottom">
                    <h5>用户状态</h5>
                    <ul>
                         <li><span>审核状态：</span>{{arr.ischeckLevel}}</li>
                    </ul>
                   
                </div>
            </div>
            <el-dialog title="拒绝" :visible.sync="dialogFormVisible"> <!--弹出框-->
                    <el-form :model="form" :rules="rules">
                         <el-form-item label="审核意见" prop="desc" >
                            <el-input type="textarea" v-model="form.desc"></el-input>
                         </el-form-item>             
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="StopUser(arr.userId)">确 定</el-button>
                    </div>
            </el-dialog>
        </div>
        <div class="btn"> <el-button @click="dialogFormVisible = true">拒绝</el-button><el-button @click="StartUser(arr.userId)" style="background:blue;color:#fff;">接受</el-button></div>
    </div>
</template>
<script>
import { stopUser,startUser } from '../../service/getData.js'
import Bus from '../common/bus.js'
export default {
    data() {
      return {
       arr:{},
       dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
         rules: {
          desc: [
            { required: true, message: '请输入原因', trigger: 'blur' }
          ]
         }
      }
    },
    methods:{
        StopUser(x){
             var  params = {};
              params.userId=x
              params.failreason=this.form.desc
              if(this.form.desc===''){
                    this.$message('请选择输入审核意见');
              }else{
                  stopUser(params).then((res) => {
                    console.log(res)
                  this.$router.go(-1)
				}).catch(err => {
				 	alert('error'+err);
				})
                 }       
              }
            ,
        StartUser(x){
             var  params = {};
              params.userId=x
            startUser(params).then((res) => {
               console.log(res)
                  this.$router.go(-1)
				}).catch(err => {
				 	alert('error'+err);
				})
       },
        },
        created(){
            console.log(this.$route.query)
             this.arr=this.$route.query.data
        },
        computed:{
            imgpath(){
                var str=this.arr.imgPath
                console.log(str)
                return (str||"").split(",")
            }
        }
        
     
   

    }

</script>
<style lang="less" scoped>
    h4{
        height: 40px;
        padding-left: 20px;
        background: #eee;
        font-size: 16px;
        font-weight: 600;
        line-height: 40px;
        font-weight:bolder;
    }
    .main{
        margin-top: 20px;
        margin-left: 40px;
        overflow: hidden;
        h5{
             font-weight:bold;
        }
        ul{
            margin-top: 30px;
        }
        li{
            height: 50px;
            list-style: none;
            span{
            width: 120px;
            text-align: right;
            display: inline-block;
            margin-right: 30px;
            height: 50px;
            line-height: 50px;
             }    
        }
        .left{
            border-right: 1px solid #000;
            width: 420px;
            float: left;
        }
        .right{
            float: left;
            width: auto;
            margin-left: 30px;
            h5{
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .top{
                height:160px;
            }
        }
    }
    .btn{
        float: right;
        margin-right: 200px;
        margin-top: 30px;
        margin-bottom: 30px
    }
    .head{
        height: 50px;
        width: 50px;
         display: inline-block;
    }
</style>
