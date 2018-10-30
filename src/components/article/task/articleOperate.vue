<template>
    <div class="articleOperate">
        <el-table
            ref="multipleTable"
            :data="updatedata"
            tooltip-effect="dark"
            border
            stripe
            :header-cell-style="{background:'#f4f4f4',color:'#666'}"
            style="width:602px">
            <el-table-column
            
            label="操作时间"
            width="100">
             <template slot-scope="scope">{{ scope.row.createTimeString }}</template>
            </el-table-column>
            <el-table-column
            prop="adminAccount"
            label="操作账号"
            width="120">
            </el-table-column>
            <el-table-column
            prop="operateAccountName"
            label="操作员姓名"
             width="120">
            </el-table-column>
            <el-table-column
            prop="articleOperate"
            label="操作类型"
             width="120">
            </el-table-column>
            <el-table-column
            prop="articleDesc"
            label="备注"
             width="120">
            </el-table-column>
        </el-table>
       
    </div>
</template>
<script>
export default {
    props:['updatedata'],
  data() {
      return {
          

      }
  },
 
}
</script>
<style lang="less" >
   

</style>

