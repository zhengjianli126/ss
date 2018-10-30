<template>
	<div class="loginWrap" :style="{backgroundImage: 'url(' + bdImg + ')' }">
		<div class="loginImg">
					<img src="../assets/img/index-logo.png" alt="">
		</div>
		<div class="loginArea">
			<div class="loginTop">
				<div class="verMiddle">
					<h2>欢迎登录</h2>
				</div>
				<div class="loginForm">
					
							<el-input v-model="username" prefix-icon="el-icon-goods" placeholder="请输入用户名"></el-input>
							<el-input type="password" style="margin-top:20px;"  prefix-icon="el-icon-goods" v-model="password" placeholder="请输入密码"></el-input>
							<el-button @click="loginAction" class="loginBtn" type="success">登录</el-button>
					
				</div>
			</div>
			<div class="loginBottom">
				<div class="remUser left">
					<el-checkbox style="font-size:12px;" v-model="checked">记住密码</el-checkbox>
				</div>
				<div class="noRenPass right">
					<a href="javascript:;">忘记密码？</a>
				</div>
			</div>
		</div>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible">
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
					<el-form-item label="修改新密码" prop="pass">
						<el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码" prop="checkPass">
						<el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updatepsd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	import { Login,updateAdmin } from '../service/getData.js'
	import bdImg from '../assets/img/login-bg.jpg';

	
	export default{
		data () {
			var checkAge = (rule, value, callback) => {
				if (!value) {
				return callback(new Error('年龄不能为空'));
				}
				setTimeout(() => {
				if (!Number.isInteger(value)) {
					callback(new Error('请输入数字值'));
				} else {
					if (value < 18) {
					callback(new Error('必须年满18岁'));
					} else {
					callback();
					}
				}
				}, 1000);
			};
			var validatePass = (rule, value, callback) => {
				var reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
				if (value === '') {
				callback(new Error('请输入密码'));
				}else if(!reg.test(value)){
					callback(new Error('必须是8-16位数字和字母的组合'));
				} 
				else {
				if (this.ruleForm2.checkPass !== '') {
					this.$refs.ruleForm2.validateField('checkPass');
				}
				callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm2.pass) {
				callback(new Error('两次输入密码不一致!'));
				} else {
				callback();
				}
			};
			return {
				index:0,
				username:"",
				password:"",
				checked:false,
				bdImg:bdImg,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				 ruleForm2: {
					pass: '',
					checkPass: '',
					age: ''
					},
					rules2: {
					pass: [
						{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [
						{ validator: validatePass2, trigger: 'blur' }
					],
					age: [
						{ validator: checkAge, trigger: 'blur' }
					]
					}
				};
			
		},
		mounted (){

		},
		components : {
		
		},
		methods : {
			loginAction(){
				var params = {};
				params.adminAccount = this.username;
				params.adminPasswd = this.password;
				Login(params).then(res => {
					console.log(res)
					localStorage['users']=res
					var  res = JSON.parse(res);		
					if(res.respCode==="0"){
					this.$router.push('index'); //跳转主页面
					localStorage['name']=this.username
			    	localStorage['psd']=this.password
					}else if(res.respCode==="903"){
							this.dialogFormVisible = true
					}else if(res.respCode==="904"){
						this.$message.error('密码错误');
					}else{
						this.$message.error('账号不存在');
					}
				
				}).catch(err => {
				 	alert('error'+err);
				})
			},
			updatepsd(){
				
					if(this.ruleForm2.pass===this.ruleForm2.checkPass){
						let params = {};
						params.adminAccount = this.username;
						params.adminPasswd=this.ruleForm2.pass
						updateAdmin(params).then(res => {
							var  res = JSON.parse(res);
								if(res.respCode==='0'){
									this.$router.push('/');
									 this.$message('请使用新密码重新登录');
								}
						}).catch(err => {
				 			alert('error'+err);
						})
				}
				this.dialogFormVisible = false

			}
		}
	}
</script>
<style type="text/css" lang="less" scoped>
	/*页面中使用px2rem*/
	 @import '../styles/rem.less';
	
	 .loginWrap{
		 position: absolute;
		 left:0;
		 top:0;
		 right:0;
		 bottom:0;
		 width:100%;
		 height:635px;
		 background-size:cover;
		 .loginArea{
			 padding: 0 74px;
			width:487px;
			height:440px;
			position: absolute;
			left:45%;
			top:100px;
			margin-left:-165px;
			background:white;
			border-radius:16px;
			overflow: hidden;
		 }
		 .loginTop{
			 width:100%;
			 min-height:212px;
			.verMiddle{
				margin-top: 47px;
				h2{
					font-size: 50px;
					color: #1D9DE1
				}
			}
			
			 overflow: hidden;
		 }
		 .loginBottom{
			 width:100%;
			 height:38px;
			font-size:12px;
			box-sizing:border-box;
			padding-top:26px;
			a{
				font-size:12px;
				text-decoration:none; 
				color: #1D9DE1;
			}
		 }
		 .loginImg{
			 position: absolute;
			 left: 70px;
			 top:77px;
			 width:216px;
			 height:55px;
			 text-align:center;
			 img{
				 vertical-align:middle;
			 }
		 }
		 .loginForm{
			 width:100%;
			 margin-top:40px;

		 }
		 .loginBtn{
			 margin-top:20px;
			 width:100%;
			 height:50px;
			 font-size:18px;
			 background-color:  #1D9DE1 ;
			border-color: #1D9DE1;
			
		 }
		 .el-input__inner {
			border-top-width: 0px;
			border-left-width: 0px;
			border-right-width: 0px;
			border-bottom-width: 1px;
			/*outline: medium;*/
		}
     }
</style>