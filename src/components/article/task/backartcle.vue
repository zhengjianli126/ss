<template>
    <div>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="消息类型：" >
                <el-select v-model="ruleForm.messageType" placeholder="请选择">
                <el-option label="主编" value="3"></el-option>
                <el-option label="投稿" value="0"></el-option>
                <el-option label="编辑" value="2"></el-option>
                <el-option label="专家" value="1" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="消息内容："  label-width="100px">
                <el-input type="textarea" v-model="ruleForm.messageInfo"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { sendMessage } from '../../service/getData.js'
import Backartcle from './backartcle.vue'
export default {
    data() {
      return {
          ruleForm:{
            messageType:'',
            messageInfo:""
          }
        
      }
    },
    components:{
        Message
    },
methods:{
       SendMessage(x){
             var  params = {};
              params.phoneNum=x
              params.messageType=this.ruleForm.messageType
              params.messageInfo=this.ruleForm.messageInfo
            sendMessage(params).then((res) => {
                var  res = JSON.parse(res);
               if(res.respCode=="0"){
                  alert('发送成功')

               }else if(res.respCode=="912"){
                   alert(res.respMsg)
               }
				}).catch(err => {
				 	alert('error'+err);
                })
                
       } 
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
        button{
            height: 100%;
            width:35px;
            font-size: 35px;
            float:right;
            border: none;
            background: #eeeeee
        }
    }
     ul{
         
         margin: 30px 0 0 100px ;
       overflow: hidden;
       width: 350px;
       li{
           font-size: 14px;
            padding-right: 50px;
            height: 30px;
            padding-bottom: 20px;
            overflow: hidden;
            
            span{
                width: 80px;
                display:inline-block;
                text-align: right;
                
            }
           input{
               height: 20px;
               width: 200px;
              
           }
           select{
               height: 20px;
               width: 200px;
               text-align: center;
               
              
           }
           textarea{
               width: 200px;
              
           }
       }
       
   }
   .btn{
       float: right;
       margin-right: 50px;
       margin-top: 80px;
        button{
           height: 30px;
           width: 80px;
           border-radius: 10px;
           background: hsl(204, 76%, 42%);
           color: #fff;
           margin-right: 20px
       }
   }

  

</style>
