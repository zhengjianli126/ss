<template>
  <div class="question-table">
    <!--height="100%"-->
    <el-table
      ref="multipleTable" border stripe
      v-loading="isLoading"
      :header-cell-style="{background:'#f4f4f4',color:'#666'}"
      :data="list"
      @selection-change="handleSelectionChange">
      <el-table-column v-if="isSelection" align="center" type="selection"></el-table-column>
      <el-table-column v-for="(item,index) in column" :key="index" align="center" prop="articleCount"
                       :label="item.label">
        <template slot-scope="scope">
          <el-button v-if="item.$emitName" @click="customEvents(scope,item.$emitName)" type="text" size="small">
            {{scope.row[item.prop]}}
          </el-button>
          <div v-else type="text" size="small">{{scope.row[item.prop]}}</div>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
  </div>

</template>

<script>
  import Updatetextable from './updateQuestionAble.vue'

  export default {
    props: {
      isSelection: {
        type: Boolean,
        default: false
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      column: {
        type: Array,
        default: function () {
          return []
        }
      },
      list: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        dialogFormVisible: false
      }
    },
    methods: {
      /**
       * 确定
       */
      getsave () {
        this.$refs.Updatetextable.save()
      },
      /**
       * 修改操作
       */
      updatetextable () {
        this.dialogFormVisible = true
      },
      /**
       * 当多选选择项发生变化时会触发该事件
       * @param val
       */
      handleSelectionChange (val) {
        if (!this.isSelection) return
        let onelabelIds = []
        let twoLableIds = []
        val.map(item => {
          if (item.level === '1' || item.level === 1) {
            onelabelIds.push(item.labelId)
          } else if (item.level === '2' || item.level === 2) {
            twoLableIds.push(item.labelId)
          }
        })
        this.$emit('getlabelId', {onelabelIds: onelabelIds.join(','), twoLableIds: twoLableIds.join(',')})
      },
      /**
       * 当前行数据
       * @param row
       */
      customEvents (scope, $emitName) {
        this.$emit($emitName, scope.row)
      }
    },
    mounted () {},
    components: {Updatetextable}
  }
</script>
<style lang='less'>
  .question-table {
    height: 100%;
  }
</style>
