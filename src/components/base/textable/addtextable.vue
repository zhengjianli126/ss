<template>
 <div class="addtextableWrap">
        <div class="add">
            <el-form :model="ruleForm2" status-icon  :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                         <el-form-item label="标签类别：" prop="level">
                            <el-select @change="bqChange" v-model="ruleForm2.level" placeholder="请选择">
                                <el-option label="一级标签" value="1"></el-option>
                                <el-option label="二级标签" value="2"></el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item label="标签名称：" prop="labelName">
                            <el-input type="text" v-model="ruleForm2.labelName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item  v-if="ruleForm2.level==='2'" label="上级标签编号：" prop="pid">
                            <el-select @change="NumChange" v-model="ruleForm2.pid" placeholder="请选择">
                                <el-option :label="x.labelId" :value="x.labelId" v-for="(x, index) in oneLabels" :key="index"></el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item v-if="ruleForm2.level==='2'" label="上级标签名称：">
                            <el-input  :disabled="isBQdisabled" type="text" :value="lastName"  placeholder="上级标签名称..." autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="标签类别：" prop="isPro">
                            <el-select :disabled="isBQdisabled" v-model="ruleForm2.isPro" placeholder="请选择">
                                <el-option label="专业" value="0"></el-option>
                                <el-option label="非专业" value="1"></el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input type="hidden" v-model="ruleForm2.labelType" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
        </div>
 </div>

</template>
<script>
import Addtextable from './addtextable.vue'
import { save,getOneLabels } from '../../../service/getData.js'//引入接口
export default {
     data() {
      return {
         
         isBQdisabled:false,
         lastName:'',
        ruleForm2:{ 
            labelName:'',
            level:'1',
            isPro:'',
            pid:'',
            labelType:'1'
            }  ,
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
         // 标签类别
         bqChange(a){
           this.isBQdisabled =  a==2? true :false;
           if(a==2){
               this.ruleForm2.isPro = '';
               this.ruleForm2.pid = '';
               this.lastName = '';
           }
         },
         // 上级标签编码联动
         NumChange(a){
            this.oneLabels.forEach((t,i)=>{
                if(t.labelId==a){
                    this.lastName = t.labelName;
                    this.ruleForm2.isPro =  t.isPro.toString();
                }
            })
         },
         //添加，或取消重置
        clearData(){
           this.$refs['ruleForm2'].resetFields();
            this.isBQdisabled = false;
        },
       save(){
                var params = {};
                if(this.ruleForm2.pid===''){
                    this.ruleForm2.pid='0000'
                }
                    params.labelName=this.ruleForm2.labelName
                    params.level=this.ruleForm2.level
                    params.isPro=this.ruleForm2.isPro
                    params.pid=this.ruleForm2.pid
                    params.labelType=this.ruleForm2.labelType
                 save(params).then((res) => {
                console.log(res)
                var res = JSON.parse(res);                 
                    
                       this.$message(res.respMsg)
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
                this.oneLabels = res.data
             
            }).catch(err => {

                alert('error' + err);
            })
        } 
  },
   computed:{
        

    },
    created(){
        this.textableadd()
    },
     components:{
       Addtextable

    }
}
</script>
<style lang="less" >
 .addtextableWrap{
     
     width: 460px;
 }

</style>

