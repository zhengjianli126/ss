<template>
  <div class="container">
    <el-form ref="form" size="small" inline :model="form" label-width="80px">
      <el-form-item prop="questionTitle" label="提问标题">
        <el-input v-model="form.questionTitle"></el-input>
      </el-form-item>
      <el-form-item prop="questionTags" label="标签名称">
        <el-input v-model="form.questionTags"></el-input>
      </el-form-item>
      <el-form-item prop="ctime" label="提问日期">
        <el-date-picker v-model="form.ctime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="phoneNum" label="手机号">
        <el-input v-model="form.phoneNum"></el-input>
      </el-form-item>
      <el-form-item prop="isSolve" label="状态">
        <el-select v-model="form.isSolve" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="nowlevel" label="审核状态">
        <el-select v-model="form.nowlevel" placeholder="请选择">
          <el-option v-for="item in examineOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="searchData" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="content">
      <List
        :column="column"
        :list="tableData">
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.nowlevel!==0" @click="handleModify(scope, false)" type="text" size="small">审核
            </el-button>
            <el-button type="text" size="small" @click="handleModify(scope, false,true)">详情</el-button>
          </template>
        </el-table-column>
      </List>
       <!-- 分页 -->
      <el-pagination style="padding-left:30px; margin-top:10px;" class="pag"
       @size-change="sizeChage" 
       @current-change ="curChange"
         :total="parseInt(this.total)"
        :current-page="1"
         layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
       ></el-pagination>
    </div>
  </div>
</template>

<script>
  import List from '../../base/questionable/list'
  import PaginationBc from '../../base/questionable/PaginationBc'
  import { getQuestionList } from '@/service/getData'
  import {formatData} from '../../../util/date'
  export default {
    data () {
      return {
        form: {
          questionTitle: '',
          questionTags: '',
          ctime: '',
          ctime1: '',
          nowlevel: '',
          isSolve: '',
          userId: '',
          pageSize:10,
          page:1, 
        },
         total:"",
        options: [
          {
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '未解决'
          }, {
            value: '1',
            label: '已解决'
          }
        ],
        examineOptions: [
          {
            value: '',
            label: '全部'
          }, {
            value: '1',
            label: '待审核'
          }, {
            value: '0',
            label: '已通过'
          },
          {
            value: '2',
            label: '未通过'
          }
        ],
        tableData: [],
        column: [
          {
            prop: 'questionTitle',
            label: '提问标题'
          },
          {
            prop: 'questionTags',
            label: '标签'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'phoneNum',
            label: '手机号'
          },
          {
            prop: 'quesAnsNum',
            label: '已获回答'
          },
          {
            prop: 'overlookNum',
            label: '浏览量'
          },
          {
            prop: 'ctimeString',
            label: '提问时间'
          },
          {
            prop: 'isSolveString',
            label: '状态'
          },
          // FIXME:
          {
            prop: 'checkAdmin',
            label: '审核人'
          },
          // FIXME:
          {
            prop: 'checkCtime',
            label: '审核时间'
          },
          {
            prop: 'nowlevelString',
            label: '审核状态'
          }
        ]
      }
    },
    created () {
      let userInfo = JSON.parse(localStorage.getItem('users') || '{admin:{}}')
      this.form.userId = userInfo.admin.id || ''
      this.searchData()
    },
    methods: {
      /**
       * 新增或修改
       * @param scope
       * @param editable
       */
      handleModify (scope, editable,isDetails) {
        let currentData = {editable: editable || false}
        if (scope) {
          currentData = {...currentData, index: scope.$index, data: scope.row}
        }
        if(isDetails){
           currentData = {...currentData, isDetails}
        }
        if (currentData.data) {currentData.data.questionTags = currentData.data.questionTags.split(',')}
        this.$store.dispatch('questions/currentAction', currentData)
        this.$router.push({name: 'approveDetail'})
      },
      sizeChage(val){
        this.form.pageSize = val;
        this.searchData();
      },
      curChange(val){
        this.form.page=val;
        this.searchData();
      },
      /**
       * 查询
       */
      searchData () {
        let {form} = this
        const rangeTime = form.ctime 
        if (rangeTime) {
          const startTime =  formatData(new Date(rangeTime[0]).getTime())
          const endTime = formatData(new Date(rangeTime[1]).getTime())
          form = {...form, ctime: startTime, ctime1: endTime}
        } else {
          form = {...form, ctime: '', ctime1: ''}
        }
        form.questionTypeId = '1'
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        getQuestionList(form).then(res => {
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0' || resObj.respCode === 0) {
            this.tableData = resObj.data.list
            this.total =resObj.data.total
            this.$store.dispatch('questions/questionsAction', resObj.data)
            loading.close()
          } else {
            loading.close()
            this.$message.error(resObj.respMsg)
          }
        }).catch(err => {
          loading.close()
          alert('error' + err)
        })
      }
    },
    filters: {
      timeTempFilter (value) {
        if (value) {
          const date = new Date(value)
          const year = date.getFullYear()
          let month = date.getMonth() + 1
          let day = date.getDate()
          if (month < 10) {
            month = `0${month}`
          }
          if (day < 10) {
            day = `0${day}`
          }
          return `${year}-${month}-${day}`
        }
      },
      // FIXME:
      approveStatusFilter (value) {
        switch (value) {
          case '01':
          case 1:
            return '全部'
          case '02':
          case 2:
            return '待审核'
          case '03':
          case 3:
            return '已通过'
          case '04':
          case 4:
            return '未通过'
          default:
            return '--'
        }
      }
    },
    components: {List, PaginationBc}
  }
</script>

<style lang="scss">
  .container {
    padding: 10px;
    .el-form-item__content {
      min-width: 198px;
    }
  }

  .content {
    &-header {
      margin-bottom: 10px;
    }
  }
</style>

