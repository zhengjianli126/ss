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
      <el-form-item prop="isPublic" label="上架状态">
        <el-select v-model="form.isPublic" placeholder="请选择">
          <el-option v-for="item in examineOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="searchData" type="primary">查询</el-button>
        <el-button @click="clearSearchData" type="danger">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="content">
      <div class="content-header" v-show="islist">
        <el-button @click="onUpdateQuesHot" size="small" plain>设为热门</el-button>
        <el-button @click="onUpdateQuesNotHot" size="small" plain>设为非热门</el-button>
        <el-button @click="onUpdateQuesUp" size="small" plain>上架</el-button>
        <el-button @click="onUpdateQuesDownp" size="small" plain>下架</el-button>
        <el-button @click="onDeleteQues" size="small" plain>删除</el-button>
      </div>
      <List :isSelection="true"
            :column="column"
            :list="tableData"
            @Ids="onQuestionId">
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleModify(scope, false)">详情</el-button>
          </template>
        </el-table-column>
      </List>
       <!-- 分页 -->
      <el-pagination style="padding-left:30px; margin-top:10px;" class="pag"
       @size-change="sizeChage" 
       @current-change ="curChange"
        :total="parseInt(this.total)"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="10"
       ></el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getQuestionList,
    updateQuesHot,
    updateQuesNotHot,
    updateQuesUp,
    updateQuesDown,
    deleteQues
  } from '@/service/getData'
  import List from './tablist.vue'
  import PaginationBc from '../../base/questionable/PaginationBc'

  export default {
    components: {List, PaginationBc},
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
         islist:true,
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
            value: '0',
            label: '未上架'
          }, {
            value: '1',
            label: '已上架'
          },
          {
            value: '2',
            label: '已下架'
          }
        ],
        tableData: [],
        multipleSelection: [],
        questionId: [],
        column: [
          {
            prop: 'questionTitle',
            label: '提问标题',
            
          },
          {
            prop: 'questionTags',
            label: '标签',
            formatter:  function(row){
              if(row.ifHot){
                return `<div>${row.questionTags}<span style="color:red">hot</span></div>`
              }else{
                return row.questionTags
              }
            }
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
          }, {
            prop: 'isPublicString',
            label: '上架状态'
          },
         
        ]
      }
    },
    created () {
      let userInfo = JSON.parse(localStorage.getItem('users') || '{admin:{}}')
      this.form.userId = userInfo.admin.id || ''
      let tag = this.$route.query.labelName;
      if(tag){
      	this.islist = false;
        this.form.questionTags = tag;
      }
      this.searchData()
    },
    mounted() {
      let tag = this.$route.query.labelName;
    },
    methods: {
      clearSearchData(){
          this.$refs['form'].resetFields();
      },
      /**
       * 当多选选择项发生变化时会触发该事件
       * @param x
       */
      onQuestionId (x) {
        this.$set(this, 'questionId', x)
      },
      /**
       * 修改
       * @param scope
       * @param editable
       */
      handleModify (scope, editable) {
        let currentData = {editable: editable || false}
        if (scope) {
          currentData = {...currentData, index: scope.$index, data: scope.row}
        }
        if (currentData.data) {currentData.data.questionTags = currentData.data.questionTags.split(',')}
        this.$store.dispatch('questions/currentAction', currentData)
        this.$router.push({name: 'launchDetail'})
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
          const startTime = new Date(rangeTime[0]).getTime()
          const endTime = new Date(rangeTime[1]).getTime()
          form = {...form, ctime: startTime, ctime1: endTime}
        } else {
          form = {...form, ctime: '', ctime1: ''}
        }
        form.nowlevel =0
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
            this.total = resObj.data.total
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
      },
      /**
       * 设为热门
       */
      onUpdateQuesHot () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        updateQuesHot({questionIds: this.questionId}).then(res => {
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0' || resObj.respCode === 0) {
            this.$message.success(resObj.respMsg)
            loading.close()
            this.searchData()
          } else {
            loading.close()
            this.$message.error(resObj.respMsg)
          }
        }).catch(err => {
          loading.close()
          alert('error' + err)
        })
      },
      /**
       * 设为不热门
       */
      onUpdateQuesNotHot () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        updateQuesNotHot({questionIds: this.questionId}).then(res => {
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0' || resObj.respCode === 0) {
            this.$message.success(resObj.respMsg)
            loading.close()
            this.searchData()
          } else {
            loading.close()
            this.$message.error(resObj.respMsg)
          }
        }).catch(err => {
          loading.close()
          alert('error' + err)
        })
      },
      /**
       * 设为上架
       */
      onUpdateQuesUp () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        updateQuesUp({questionIds: this.questionId}).then(res => {
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0' || resObj.respCode === 0) {
            this.$message.success(resObj.respMsg)
            loading.close()
            this.searchData()
          } else {
            loading.close()
            this.$message.error(resObj.respMsg)
          }
        }).catch(err => {
          loading.close()
          alert('error' + err)
        })
      },
      /**
       * 设为下架
       */
      onUpdateQuesDownp () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        updateQuesDown({questionIds: this.questionId}).then(res => {
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0' || resObj.respCode === 0) {
            this.$message.success(resObj.respMsg)
            loading.close()
            this.searchData()
          } else {
            loading.close()
            this.$message.error(resObj.respMsg)
          }
        }).catch(err => {
          loading.close()
          alert('error' + err)
        })
      },
      /**
       * 删除
       */
      onDeleteQues () {
        console.log(this.questionId)
        if(this.questionId.length==0){
          this.$message({
            type: 'info',
            message: '请选择至少一项'
          });   
          return
        }
        this.$confirm('是否确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            deleteQues({questionIds: this.questionId}).then(res => {
              let resObj = JSON.parse(res)
              if (resObj.respCode === '0' || resObj.respCode === 0) {
                this.$message.success(resObj.respMsg)
                loading.close()
                this.searchData()
              } else {
                loading.close()
                this.$message.error(resObj.respMsg)
              }
            }).catch(err => {
              loading.close()
              alert('error' + err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
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
      }
    }
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

