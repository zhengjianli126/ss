<template>
  <div>
    <el-tag v-for="(item, index) in tags" :key="index">{{item}}
    </el-tag>
    <el-button size="small" @click="showInput">+ New Tag</el-button>
    <el-dialog title="添加标签" :visible.sync="show">
      <div>
        <div class="tipTags">
          <el-tag v-for="(item, index) in tipTags"
                  closable
                  @close="deleteTipTag(item)" :key="index">{{item}}
          </el-tag>
        </div>
        <div style="padding-top: 20px;">
          <el-tag v-for="(item, index) in allTags"
                  @click.native="addTag(item)" :key="index">{{item?item:'-'}}
          </el-tag>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">关闭</el-button>
        <el-button type="primary" @click="handleDeleteTag">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'TagShow',
    props: {
      tags: {
        type: Array,
        default: function () {
          return []
        }
      },
      allTags: {
        type: Array,
        default: function () {
          return []
        }
      },
      closable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        tipTags: [],
        show: false
      }
    },
    methods: {
      /**
       * 当点击删除标签
       * @param tag
       */
      handleDeleteTag () {
        this.$emit('tagsChange', [...this.tipTags])
        this.show = false
      },
      /**
       * 添加tag
       * @param tag
       */
      addTag (tag) {
        // TODO 去重
        this.tipTags.push(tag)
      },
      /**
       * 删除临时的tag
       * @param tab
       */
      deleteTipTag (tag) {
        this.$set(this, 'tipTags', [...this.tipTags.filter(i => i !== tag)])
      },
      showInput () {
        this.show = true
      }
    },
    watch: {
      show: function (val, oldval) {
        if (val) {
          this.$set(this, 'tipTags', [...this.tags])
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tipTags {
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    &:not(:last-child) {
      margin-left: 10px;
    }
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
