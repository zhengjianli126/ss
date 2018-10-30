<template>
  <div class="textnumWrap">
    <heads></heads>
    <div class="main">
      <Listhead :head='head' @getparams="searchAction"></Listhead>
    </div>
    <div class="main">
      <List :isSelection="false"
            :column="column"
            :list="listData">
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="updatetextable(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </List>
      <PaginationBc :pageConfig="pageConfig" @pageConfigChange="pageConfigChange"></PaginationBc>
    </div>
  </div>
</template>
<script>
  import List from './list.vue'
  import PaginationBc from './PaginationBc'
  import heads from '../../common/head.vue'
  import Listhead from './listhead.vue'
  import { getCheckedArticle } from '../../../service/getData.js'//引入接口
  import Bus from '../../common/bus.js' //bus 中间组件
  export default {
    data () {
      return {
        head: [
          {
            name: '提问标题',
            type: 'text',
            plaseholder: '',
            keys: 'articleTitle',
            value: '',
            itemType: 'text'
          }, {
            name: '标签名称',
            type: 'text',
            plaseholder: '',
            keys: 'articleAuthorName',
            value: '',
            itemType: 'text'
          }, {
            name: '手机号',
            type: 'text',
            plaseholder: '',
            keys: 'articleAuthorAccount',
            value: '',
            itemType: 'text'
          },
          {
            name: '提问开始时间',
            type: 'text',
            plaseholder: '',
            keys: 'startDate',
            value: '',
            itemType: 'dateTimePicker'
          },
          {
            name: '提问截止时间',
            type: 'text',
            plaseholder: '',
            keys: 'endDate',
            value: '',
            itemType: 'dateTimePicker'
          },
          {
            name: '状态',
            type: 'text',
            plaseholder: '',
            keys: 'isPublic',
            value: '',
            itemType: 'selectList',
            option: [
              {
                value: '',
                key: '全部'
              }, {
                value: '0',
                key: '未解决'
              }, {
                value: '1',
                key: '已解决'
              }
            ]
          }, {
            name: '上架状态',
            type: 'text',
            plaseholder: '',
            keys: 'orderType',
            value: '',
            itemType: 'selectList',
            option: [
              {
                value: '',
                key: '全部'
              }, {
                value: '0',
                key: '未上架'
              }, {
                value: '1',
                key: '已上架'
              }, {
                value: '2:',
                key: '已下架'
              }
            ]
          }
        ],
        column: [
          {label: '标签编号', prop: 'labelId'},
          {label: '标签名称', prop: 'labelName'},
          {label: '标签类别', prop: 'level'},
          {label: '上级标签编码', prop: 'pid'},
          {label: '上级标签名称', prop: 'pname'},
          {label: '问题数量', prop: 'articleCount', $emitName: 'dylevent'}
        ],
        listData: [],
        pageConfig: {
          page: 1,
          pagesize: 10,
          total: 1,
          pagesizes: [10, 20, 30]
        },
        isLoading: true
      }
    },
    components: {
      Listhead, List, heads,PaginationBc
    },
    methods: {
      searchAction (str) {//查询
        console.log(str)
        getCheckedArticle(str).then((res) => {
          console.log(res)
          this.listdata = res
          Bus.$emit('gettextnum', res)
          Bus.$emit('getpage', res)
          //关闭查询按钮loading
          this.Emit.$emit('closeLoading')
          //关闭表格loading
          this.isLoading = false
        }).catch(err => {
          alert('error' + err)
        })
      },
      pageConfigChange(pageConfig){
      }
    }
  }
</script>
<style lang="less">
  .textnumWrap {
    margin-left: -1px;
    padding-bottom: 30px;
    h3 {
      height: 60px;
      line-height: 60px;
      margin-left: 20px;
    }
    .main {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 20px 0px 20px;
      flex: 1;
      -ms-flex: 1; /* IE 10 */
      -webkit-flex: 1;
      overflow: hidden;
    }
  }

</style>
