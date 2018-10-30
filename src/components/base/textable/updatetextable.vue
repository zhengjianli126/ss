<template>
 <div class="updatetextableWrap">
        <div class="add">
            <el-form :model="UpdatetextableList" status-icon  :rules="rules" ref="UpdatetextableList" label-width="100px" class="demo-ruleForm">
                         <el-form-item label="标签类别：" prop="level">
                            <el-select disabled v-model="UpdatetextableList.level" placeholder="请选择">
                                <el-option label="一级标签" value="1"></el-option>
                                <el-option label="二级标签" value="2"></el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item label="标签名称：" prop="labelName">
                            <el-input type="text" v-model="UpdatetextableList.labelName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item  v-if="UpdatetextableList.level==='二级标签'" label="上级标签编号：" prop="pid">
                            <el-select @change="Bhchange" v-model="UpdatetextableList.labelId" placeholder="请选择">
                                <el-option :label="x.labelId" :value="x.labelId" v-for="(x, index) in oneLabels" :key="index"></el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item v-if="UpdatetextableList.level==='二级标签'" label="上级标签名称：">
                            <el-input disabled type="text" v-model="UpdatetextableList.pName" placeholder="上级标签名称..." autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="标签类别：" prop="isPro">
                            <el-select disabled v-model="UpdatetextableList.isPro" placeholder="请选择">
                                <el-option label="非专业" value="0"></el-option>
                                <el-option label="专业" value="1"></el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input type="hidden" v-model="UpdatetextableList.labelType" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
        </div>
 </div>

</template>
<script>
import Updatetextable from './updatetextable.vue'
import { update,getOneLabels } from '../../../service/getData.js'//引入接口
export default {
    props:['UpdatetextableList'],
     data() {
      return {
        ruleForm2:this.UpdatetextableList,
      oneLabels:'',
         rules: {
                isPro: [
                     { required: true, message: '该项目不能为空', trigger: 'change' },
                ],
                pid: [
                     { required: true, message: '该项目不能为空', trigger: 'change' },
                ],
                labelName: [
                     { required: true, message: '该项目不能为空', trigger: 'blur' },
                ],
                level: [
                     { required: true, message: '该项目不能为空', trigger: 'change' },
                ]
            }
      }
     },
     methods:{
         clearData(){
             this.$refs['UpdatetextableList'].resetFields();
         },
         Bhchange(a){
            this.oneLabels.forEach((t,i)=>{
                if(a==t.labelId){
                   this.UpdatetextableList.pName = t.labelName;
                }
            })
         },
       save(){
                let pro=''
                if(this.UpdatetextableList.isPro==='专业'){
                     pro='0'
                }else{
                     pro='1'
                }
                let fatherId=''
                if(this.UpdatetextableList.pid==='0'){
                    fatherId='0000'
                }else{
                    fatherId=this.UpdatetextableList.pid
                }
                let Level=''
                if(this.UpdatetextableList.level==='一级标签'){
                    Level='1'
                }else{
                      Level='2'
                }
                var params = {};
                    params.labelName=this.UpdatetextableList.labelName
                    params.level=Level
                    params.isPro=pro
                    params.pid=fatherId
                    params.labelType=this.UpdatetextableList.labelType
                     params.labelId=this.UpdatetextableList.labelId
                    console.log(params)
                 update(params).then((res) => {
              
                var res = JSON.parse(res);
                 this.$message(res.respMsg);                 
				}).catch(err => {
				 	alert('error'+err);
                })
       },
        textableadd() {     
            var params = {}
            params.labelType = 1
            getOneLabels(params).then((res) => {
                var res = JSON.parse(res);
                console.log(res)
                this.oneLabels = res.data;
              this.Bhchange(this.UpdatetextableList.labelId)
             
            }).catch(err => {

                alert('error' + err);
            })
        } 
  },
   computed:{
        
    },
    created(){
        this.textableadd();
    },
   
     components:{
       Updatetextable
     
    }
}
</script>
<style lang="less" >
 .addtextableWrap{
     .add{
           width: 320px;
     }
     width: 460px;
 }

</style>
