<template>
    <div>
        <h4>审核</h4>
        <div class="main">
            <div class="left">
                 <h5>基本资料</h5>
                  <ul>
                   <li> <span>头像：</span><img :src="arr.headimg"  class='head' alt=""/></li>
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
                    <div>

                    </div>

                </div>
                <div class="middle">
                    <h5>个人权益</h5>
                    <ul>
                        <li><span>月亮币（总）：</span>{{arr.moonCash}}</li>
                        <li><span>月亮币（刷）：</span>{{arr.addMoonCash}}   <el-button class="moon"  @click="dialogFormVisible = true">刷币</el-button></li>
                         <li><span>粉丝数：</span>{{arr.follow}}</li>
                        <li><span>获赞数（总）：</span>{{arr.favor}}</li>
                        <li><span>获赞数（刷）：</span>{{arr.addFavor}}</li>
                    </ul>
                </div>
                <div class="bottom">
                    <h5>用户状态</h5>
                   <li><span>审核状态：</span>{{arr.ischeckLevel}}</li>
                </div>
            </div>
             <el-dialog title="刷币" :visible.sync="dialogFormVisible"> <!--弹出框-->
                    <el-form :model="form">
                         <el-form-item label="数量">
                            <el-input type="text" v-model="form.desc"></el-input>
                         </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="UpdateUser(arr.userId)">确 定</el-button>
                    </div>
            </el-dialog>
        </div>
        <div class="btn"> <el-button @click="close">关闭</el-button></div>
    </div>
</template>
<script>
import { updateUser,GetDetails } from '../../service/getData.js'
import Bus from '../common/bus.js'
export default {
    inject:['reload'],
     data() {
      return {
       arr:{},
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
         dialogFormVisible: false,
        formLabelWidth: '20px'
      }

    },
    methods:{
        close(){
             this.$router.go(-1)
        },
        updateDetails() {
            let params = {userId: this.userId};
            GetDetails(params).then((res) => {
                this.arr = JSON.parse(res).data;
            }).catch(err => {
                alert('error' + err);
            })
        },
         UpdateUser(x){
             let user=JSON.parse(localStorage['users'])
             var  params = {};
              params.userId=x
              params.moonCash=this.form.desc
              params.adminId=user.admin.id
              console.log(params)
            updateUser(params).then((res) => {
                var  res = JSON.parse(res);
               console.log(typeof(res.respCode))
               console.log(res.respCode)
               if(res.respCode=="0"){
                  alert('刷币成功')
                  this.updateDetails()
               }
                 this.dialogFormVisible = false
				}).catch(err => {
				 	alert(err);
				})
       }
    },
    created() {
        this.userId = this.$route.query.userId;
        this.updateDetails();
    }
}
</script>
<style lang="less" scoped>
  h4{
        height: 40px;
        padding-left: 20px;
        background: rgb(31, 27, 27);
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
    .moon{
        margin-left: 40px;

    }
</style>


