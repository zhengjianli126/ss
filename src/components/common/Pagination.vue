<template>
   <div class="block paginationWrap">
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
       :current-page.sync="page"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      :pager-count='5'
      layout="total, sizes, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import Bus from './bus.js'
import { Listheads } from '../../service/getData.js'
export default {
     methods: {
      handleCurrentChange(val) {
          this.Emit.$emit('handleCurrentChange',{'val':val,'form':'curChange'});
          this.page=val;
          Bus.$on('params', (data) => {
          var params=data;
          params.page=val;
          this.$emit('getparams',params);

      })
        console.log(val)
      },
      handleSizeChange(val){
        this.Emit.$emit('handleSizeChange',{'val':val,'form':'sizeChange'});
      }
    },
    data() {
      return {
        page:1,
        pagesize:1,
        total:1,
        pagesizes:[10,20,30]
      };
    },  
    created () {
      Bus.$on('getpage', (data) => {
        var data = JSON.parse(data);
        this.pagesize=Number(data.data.pageSize),
        this.total=Number(data.data.total),
        this.page=Number(data.data.pageNum)
      })
     
    }
}
</script>
<style lang="less">
.paginationWrap{

}
</style>


