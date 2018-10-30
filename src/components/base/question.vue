<template>
  <div class="questionAbleWrap">
    <heads></heads>
    <Listhead :head='head' @getparams="headParamChange"></Listhead>
    <div class="btn">
      <el-button size="small" plain @click="updatetextable('')">新增</el-button>
      <el-button size="small" plain @click="DeleteLabel">删除</el-button>
    </div>
    <div class="main">
      <List :isSelection="true"
            :column="column"
            :list="listData"
            @getlabelId="getlabelId"
            @dylevent="GetCheckedArticle">
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="updatetextable(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </List>
      <PaginationBc :pageConfig="pageConfig" @pageConfigChange="pageConfigChange"></PaginationBc>
    </div>
    <!--新增和修改标签-->
    <Addtextable :addTextAble="addTextAble"
                 :currentRow="currentRow"
                 @onCancel="addTextAble.dialogFormVisible=false"
                 @onConfirm="saveAdd"></Addtextable>
  </div>
</template>
<script>
  import Heads from '../common/head.vue'
  import Listhead from './questionable/listhead.vue'
  import List from './questionable/list.vue'
  import PaginationBc from './questionable/PaginationBc'
  import Addtextable from './questionable/addquestionable.vue'
  import { getLabelsByCondition, deleteLabel, save, update, getCheckedArticle } from '../../service/getData.js'//引入接口
  export default {
    data () {
      return {
        head: [
          {
            name: '标签编号',
            type: 'text',
            plaseholder: '',
            keys: 'labelId',
            value: '',
            itemType: 'text'
          },
          {
            name: '标签名称',
            type: 'text',
            plaseholder: '',
            keys: 'labelName',
            value: '',
            itemType: 'text'
          },
          {
            name: '标签级别',
            type: 'text',
            keys: 'level',
            value: '',
            plaseholder: '',
            itemType: 'selectList',
            option: [
              {
                value: '',
                key: '全部'
              },
              {
                value: '1',
                key: '一级标签'
              }, {
                value: '2',
                key: '二级标签'
              }
            ]
          },
          {
            name: '上级标签编号',
            type: 'text',
            plaseholder: '',
            keys: 'pid',
            value: '',
            itemType: 'text'
          },
          {
            name: '上级标签名称',
            type: 'text',
            plaseholder: '',
            keys: 'pLabelName',
            value: '',
            itemType: 'text'
          }
        ],
        // $emitName 当前列单元格自定义点击事件触发的Key
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
        onelabelIds: [],
        twoLableIds: [],
        current: {
          labelId: '',
          labelName: '',
          level: '',
          isPro: '',
          pid: '',
          pLabelName: '',
          labelType: '',
          page: '1',
          pageSize: '10'
        },
        // 弹框添加标签
        currentRow: {
          labelId: '',
          labelName: '',
          level: '1',
          pid: ''
        },
        addTextAble: {
          title: '新增',
          isAdd: false,
          dialogFormVisible: false
        }
      }
    },
    components: {Listhead, PaginationBc, List, Heads, Addtextable},
    methods: {
      /**
       * 分页信息发生变化时触发，重新查询数据
       * @param pageConfig {Object} {page: 1, pagesize: 1, total: 100, pagesizes: [10, 20, 30]}
       */
      pageConfigChange (pageConfig) {
        this.searchAction(Object.assign(this.current, {page: pageConfig.page, pageSize: pageConfig.pagesize}))
      },
      /**
       * 标签类型、标签编号等查询条件改变时
       * @param str {Object}
       */
      headParamChange (str) {
        str.labelType = '2'; // 问题标签管理只需要查询问题标签，type写死为2
        str.page = 1;
        this.searchAction(Object.assign(this.current, str))
      },
      /**
       * 当多选选择项发生变化时会触发该事件
       * @param x
       */
      getlabelId (x) {
        this.$set(this, 'onelabelIds', x.onelabelIds)
        this.$set(this, 'twoLableIds', x.twoLableIds)
      },
      /**
       * 查询数据
       * @param str
       */
      searchAction (str) {//查询
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        getLabelsByCondition(str).then((res) => {
          let resData = JSON.parse(res)
          if (resData.respCode === '0') {
            this.$set(this, 'listData', resData.data.list || [])
            this.$set(this, 'pageConfig', Object.assign({}, {
              page: resData.data.pageNum || 1,
              pagesize: resData.data.pageSize || 1,
              total: resData.data.total || 100,
              pagesizes: [10, 20, 30]
            }))
          } else {
            this.$message.error(resData.respMsg)
          }
          //loading
          loading.close()
        }).catch(err => {
          loading.close()
          alert('error' + err)
        })
      },
      /**
       * 删除标签
       * @constructor
       */
      DeleteLabel () {
        this.$confirm('<div>您确定要删除吗？</div>', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          deleteLabel({
            onelabelIds: this.onelabelIds,
            twoLableIds: this.twoLableIds
          }).then((res) => {
            let resObj = JSON.parse(res)
            if (resObj.respCode === '0') {
              this.$message.success(resObj.respMsg || '删除成功')
              // 重新拉去列表数据
              this.searchAction(Object.assign({}, this.current))
            } else {
              this.$message.error(resObj.respMsg || '删除失败')
            }
          }).catch(err => {
            alert('error' + err)
          })
        })
      },
      /**
       * 保存新郑标签
       */
      saveAdd (param) {
        let labelId = this.currentRow.labelId;
        if(this.currentRow.labelId){
          param.labelId = labelId;
          update(param).then((res) => {
            let resObj = JSON.parse(res)
            if (resObj.respCode = '0') {
              this.$message.success(resObj.respMsg || '修改成功');
              // 重新拉去列表数据
              this.searchAction(Object.assign({}, this.current))
            } else {
              this.$message.error(resObj.respMsg || '修改失败')
            }
          }).catch(err => {
            alert('error' + err)
          })
        }
        else{
          save(param).then((res) => {
            let resObj = JSON.parse(res)
            if (resObj.respCode = '0') {
              this.$message.success(resObj.respMsg || '新增成功');
              // 重新拉去列表数据
              this.searchAction(Object.assign({}, this.current))
            } else {
              this.$message.error(resObj.respMsg || '新增失败')
            }
          }).catch(err => {
            alert('error' + err)
          })
        }
        this.addTextAble.dialogFormVisible = false
      },
      /**
       * 点击问题数量，跳转到问题数量详情页
       * @param x
       * @constructor
       */
      GetCheckedArticle (row) {
        this.$router.push({name: 'launchList', query: {labelName: row.labelName}})
      },
      /**
       * 新增或修改操作
       */
      updatetextable (row) {
        if (row) {
          this.addTextAble.title = '修改'
          this.addTextAble.isAdd = false
          this.$set(this, 'currentRow', row)
        } else {
          this.addTextAble.title = '新增'
          this.addTextAble.isAdd = true
          this.$set(this, 'currentRow', {})
        }
        this.addTextAble.dialogFormVisible = true
      }
    }
  }
</script>
<style lang="less" scoped>
  .questionAbleWrap {
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
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
    .btn {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px 20px;
      label:nth-child(1) {
        padding-right: 10px;
      }
    }
  }
</style>
