<template>
<div>
    <h3>新增
         <button @click="qX">×</button>
    </h3>
      
    <form action="">
        <ul>
            <li>
                <span>操作员账号:</span> <input type="text" v-model="adminAccount"/><span>必填</span>
            </li>
             <li>
                <span>姓名 : </span><input type="text" v-model="adminName"/><span>必填</span>
            </li>
             <li>
                 <span>手机号:</span> <input type="text" v-model="adminTelephone"/><span>必填</span>
            </li>
             <li>
                <span>医院:</span> <input type="text" v-model="adminHospital"/><span></span>
            </li>
             <li>
                <span>科室:</span> <input type="text" v-model="adminOffices"/><span></span>
            </li>
             <li>
               <span>职务:</span>  <input type="text" v-model="adminJob"/><span></span>
            </li>
             <li>
                <span>专委会:</span> <select name="" id="" v-model="adminCommittee">
                     <option value="">请选择</option>
                     <option value="0">手术装备与材料专业委员会</option>
                     <option value="1">内镜装备与材料专业委员会</option>
                     <option value="2">护理装备专业委员会</option>
                     <option value="3">耗材管理专业委员会</option>
                     <option value="4">血液净化装备与材料专业委员会</option>
                     <option value="5">区域器材灭菌管理专业委员会</option>
                     <option value="6">安全防护专业委员会</option>
                     <option value="7">康复与老年护理专业委员会</option>
                     <option value="8">介入装备与材料专业委员会</option>
                     <option value="9">重症医学装备与材料专业委员会</option>
                 </select>
                 <span></span>
            </li>
            <li>
              <span>身份:</span>   <select name="" id="" v-model="adminIdentity">
                     <option value="">请选择</option>
                     <option value="0">主任委员</option>
                     <option value="1">副主任委员</option>
                     <option value="2">常务副主任委员</option>
                     <option value="3">秘书</option>
                     <option value="4">青年委员</option>
                 </select>
                 <span></span>
            </li>
            <li>
               <span>文章专栏:</span>  <select name="" id="" v-model="adminEditIdentity">
                     <option value="">请选择</option>
                     <option value="0">主编</option>
                     <option value="2">编辑</option>
                     <option value="1">专家</option>
                     <option value="3">普通</option>
                 </select>
                 <span>必填</span>
            </li>
             <li>
              <span>问题专栏：</span>   <select name="" id="" v-model="adminQuestion">
                     <option value="">请选择</option>
                     <option value="0">普通</option>
                     <option value="1">工厂</option>
                 </select>
                 <span>必填</span>
            </li>
            <li>
             <span>所属角色：</span>    <select name="" id=""  v-model="roleCode">
                     <option value="">请选择</option>
                     <option value="0">超级管理员</option>
                     <option value="1">医院专家</option>
                 </select>
                 <span>必填</span>
                
            </li>
            <li style="height:60px">
              <span>备注：</span>  <textarea name="" id="" cols="30" rows="3" ></textarea>
            </li>
        </ul>
       
    <div class="btn"> <button @click="qX">取消</button><button @click="searchAction">确定</button></div>
    </form>
</div>
    
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import { Adds } from '../../service/getData.js'
export default {
    data(){
        return{
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
           adminToken:''

        }
    },
    create(){
       
    },
    methods:{
       ...mapMutations(["aDd","qX"]),
			searchAction(){
				var params = {};
				params.adminAccount = this.adminAccount;
                params.adminName = this.adminName;
                params.adminTelephone = this.adminTelephone;
                params.adminHospital = this.adminHospital;
                params.adminJob = this.adminJob;
                params.adminIdentity = this.adminIdentity;
                params.adminOffices = this.adminOffices;
                params.adminCommittee = this.adminCommittee;
                params.adminEditIdentity = this.adminEditIdentity;
                params.adminQuestion = this.adminQuestion;
                params.roleCode = this.roleCode;
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
       width: 420px;
       li{
           font-size: 14px;
            padding-right: 50px;
            height: 30px;
            padding-bottom: 20px;
            overflow: hidden;
            
            span{
                width: 80px;
                display:inline-block;
                text-align: right
                
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
               width: 200px
           }
       }
       
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

  

</style>


