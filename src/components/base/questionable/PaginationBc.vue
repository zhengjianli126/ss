<template>
  <div class="block pagination-bc">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageConfig.page"
      :page-sizes="pageConfig.pagesizes"
      :page-size="pageConfig.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageConfig.total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'PaginationBc',
    props: {
      pageConfig: {
        type: Object,
        default: function () {
          return {
            page: 1,
            pagesize: 1,
            total: 100,
            pagesizes: [10, 20, 30]
          }
        }
      }
    },
    methods: {
      /**
       * 分页当前页发生变化时
       * @param val {Number} 当前页变化后的页码
       */
      handleCurrentChange (val) {
        this.$emit('pageConfigChange', Object.assign({}, this.pageConfig, {page: val, pagesize: this.pageSize}))
      },
      /**
       * 分页组件每页展示条数
       * @param val {Number} 每页条数改变后的值
       */
      handleSizeChange (val) {
        this.pageSize = val;
        this.$emit('pageConfigChange', Object.assign({}, this.pageConfig, {pagesize: val}))
      }
    },
    data () {
      return {
        pageSize: this.pageConfig.pagesize
      }
    }
  }
</script>
<style lang="less" scoped>
  .pagination-bc {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 5px 15px;
  }
</style>


