<template>
<div class='OdetailsWrap'>
      <el-form :model="datas" status-icon  ref="datas" label-width="100px" class="demo-ruleForm">
            <el-form-item label="操作员账号" prop="desc">
                <el-input type="text" v-model="datas.adminAccount" autocomplete="off" readonly></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="">
                <el-input type="text" v-model="datas.adminName" autocomplete="off" readonly></el-input>
            </el-form-item>
             <el-form-item label="手机号" prop="">
                <el-input type="text" v-model="datas.adminTelephone" autocomplete="off" readonly></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="checkPass">
              <img v-if="datas.headImg" :src="datas.headImg" alt="">
              <img v-else src="../../assets/img/tx.jpg" alt="">
            </el-form-item>
             <el-form-item label="医院" prop="checkPass">
                <el-input type="text" v-model="datas.adminHospital" autocomplete="off" readonly></el-input>
            </el-form-item>
             <el-form-item label="科室" prop="checkPass">
                <el-input type="text" v-model="datas.adminOffices" autocomplete="off" readonly></el-input>
            </el-form-item>
             <el-form-item label="职务" prop="checkPass">
                <el-input type="text" v-model="datas.adminJob" autocomplete="off" readonly></el-input>
            </el-form-item>
              <el-form-item label="专委会" prop="adminCommitteeString">
                <el-select v-model="datas.adminCommitteeString" placeholder="请选择" disabled>
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
                <el-select v-model="datas.adminIdentityString" placeholder="请选择" disabled>
                    <el-option label="主任委员" :value="0"></el-option>
                    <el-option label="副主任委员" :value="1"></el-option>
                    <el-option label="常务副主任委员" :value="2"></el-option>
                    <el-option label="秘书" :value="3"></el-option>
                    <el-option label="青年委员" :value="4"></el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="文章专栏" prop="">
                <el-select v-model="datas.adminEditIdentityString" placeholder="请选择" disabled>
                    <el-option label="普通" value="0"></el-option>
                    <el-option label="专家" value="1"></el-option>
                    <el-option label="编辑" value="2"></el-option>
                    <el-option label="主编" value="3"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="问题专栏" prop="checkPass">
                <el-select v-model="datas.adminQuestionString" placeholder="请选择" disabled>
                    <el-option label="普通" value="0"></el-option>
                    <el-option label="工厂" value="1"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="所属角色" prop="">
                <el-select v-model="datas.roleCodeString" placeholder="请选择" disabled>
                    <el-option label="超级管理员" value="0"></el-option>
                    <el-option label="医院专家" value="1"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="备注" prop="checkPass">
                <el-input type="textarea" v-model="datas.adminToken" readonly></el-input>
              </el-form-item>
        
     </el-form>
   
       
    

</div>
    
</template>
<script>
export default {
    props:['detaildata'],
    data(){
        return{
            datas:this.detaildata
        }
    }
    
}
</script>
<style lang="less">
.OdetailsWrap{
    img{
        width: 70px;
        height: 70px;
    }
}
   
</style>


