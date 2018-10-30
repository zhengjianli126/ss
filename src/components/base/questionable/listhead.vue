<template>
  <div class="list-head-wrap">
    <ul class="lhUl">
      <li class="lhList" v-for="(item,index) in list" :key="index">
        <span class="lhName">{{item.name}}</span>
        <el-date-picker
          v-model='item.value'
          v-if="item.itemType==='dateTimePicker'"
          type="datetime"
          value-format='yyyy-MM-dd HH:mm:ss'
          placeholder="选择日期时间">
        </el-date-picker>
        <el-select class="comSelect" v-if="item.itemType==='selectList'" v-model='item.value'>
          <el-option style="display:block;"
                     v-for="(x,index) in item.option" :label="x.key" :value="x.value" :key="index"></el-option>
        </el-select>
        <input v-if="item.itemType==='text'" class="comInput" :type="item.type" :placeholder="item.plaseholder" v-model='item.value'/>
      </li>
      <li class="lhList" style="padding-left:15px;">
        <el-button icon="el-icon-search" type="primary" size="small" @click="searchAction">查询</el-button>
        <el-button icon="el-icon-delete" type="primary" size="small" @click="emptyAction">清空</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
  import Utils from '../questionable/utils'

  export default {
    props: ['head'],
    data () {
      return {
        list: Utils.clone(this.head)
      }
    },
    created () {
      this.searchAction()
    },
    mounted () {},
    destoryed () {
      this.Emit.$off('closeLoading')
    },
    methods: {
      /**
       * 点击查询后，整合填写的查询条件
       */
      searchAction () {
        let params = {}
        this.list.map(item => {params[item.keys] = item.value})
        this.$emit('getparams', params)
      },
      /**
       * 清空条件,标签类型除外，因为接口要求必须传。
       */
      emptyAction () {
        this.list.map(item => {if (item.keys !== 'labelType') item.value = ''})
      }
    }
  }
</script>
<style lang="less" scoped>
  .list-head-wrap {
    padding-top: 15px;
    .lhList {
      font-size: 14px;
      display: inline-block;
      padding-right: 50px;
      overflow: hidden;
      padding-bottom: 15px;
      .lhName {
        width: 100px;
        display: inline-block;
        text-align: right;
        font-size: 14px;
      }
      .comInput {
        height: 30px;
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
        padding: 5px;
        box-sizing: border-box;
        font-size: 14px;
        width: 200px;
      }
      .comSelect {
        width: 200px;
      }
      .el-input__inner {
        width: 200px;
      }
      .el-input.el-input--suffix .el-input__inner {
        height: 30px !important;
      }
    }
  }
</style>
