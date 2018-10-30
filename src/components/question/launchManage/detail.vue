<template>
  <el-row class="container">
    <el-col :span="18">
      <el-form size="small" :disabled="!currentData.editable" :model="form.data" ref="form" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="问题标题" prop="questionTitle">
          <el-input v-model="form.questionTitle"></el-input>
        </el-form-item>
        <el-form-item label="问题内容" prop="questionContent" :class="{'disabled': !currentData.editable}">
          <wangEditor :init='editorInit' v-model="form.questionContent"></wangEditor>
     
        </el-form-item>
        <el-form-item label="提问标签">
          <TagShow closable
                   :tags="form.questionTags"
                   :allTags="allTags"
                   @tagsChange="handleDeleteTag"></TagShow>
        </el-form-item>
        <el-form-item label="封面图" prop="qusConImg">
          <upload dataId="1" :disabled="isdisabled"
                  :imgSrc="form.qusConImg"
                  :IsCover = "11"
                  @uploadSuccess="guestUpload"></upload>
        </el-form-item>
        <el-form-item label="回答" prop="answers">
          <el-input :autosize="{minRows: 3}" type="textarea" v-model="form.quesAnswer"></el-input>
        </el-form-item>
        <!--<el-form-item v-if="form.nowlevel" label="审核结果" prop="nowlevel">-->
        <!--{{form.nowlevel}}-->
        <!--</el-form-item>-->
        <!--<el-form-item v-if="form.failreason" label="审核意见" prop="failreason">-->
        <!--{{form.failreason}}-->
        <!--</el-form-item>-->
      </el-form>
       <div :style="{textAlign: 'right'}">
          <el-button @click="cancel">关闭</el-button>
        </div>

      <div>回答列表</div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="100"
         >
      
        </el-table-column>
         <el-table-column
          prop="headImg"
          label="头像"
          >
          <template slot-scope="scope">
              <img  style="height:40px" :src="scope.row.headImg" alt="">
          </template>
        </el-table-column>
         <el-table-column
          prop="name"
          label="昵称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="answerContent"
          label="回答内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="supportNum"
          label="获赞">
        </el-table-column>
         <el-table-column
          prop="address"
          label="回答时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </el-col>



  </el-row>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import { mapState } from 'vuex'
  import { getAllLabelsName, uploadAttach, saveQuestionInfo, updateQuesCheck,getAllAnswer } from '@/service/getData'
  import upload from '../../common/upload.vue'
  import TagShow from '../TagShow'
  import wangEditor from '@/components/common/richTextEditor.vue'
  export default {
    data () {
      return {
        form: {
          questionTitle: '',
          questionContent: '',
          questionTags: [],
          qusConImg: '',
          quesAnswer: '',
          nowlevelString: '',
          failreason: ''
        },
          pageSize:10,
          page:1, 
          total:"",
        allTags: [],
        editorOption: {},
        editorInit: {
          menubar: false,
          plugins: 'textcolor colorpicker link paste code upload',
          language: 'zh_CN',
          toolbar:
            'undo redo | fontsizeselect bold italic | removeformat | alignleft aligncenter | forecolor | link | code table | upload',
          statusbar: true,
          height: 300,
          readonly: 1
        },
        inputVisible: false,
        isdisabled: false,
        tableData: []
      }
    },
    props: {
      index: {
        type: Number
      }
    },
    created () {
      this.queryAllQuestionLabelName()
    },
    mounted () {
      if (this.currentData.index >= 0) {
        this.$set(this, 'form', this.currentData.data)
      }
    
      let questionId = this.currentData.data.questionId;
      let obj ={
        page:1,
        pageSize:10,
        questionId:questionId
      }
      getAllAnswer(obj).then(res => {
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0') {
            this.$set(this, 'tableData', resObj.data.list)
            this.total =  resObj.data.total
          } else {
            this.$message.error(resObj.respMsg)
          }
          loading.close()
        }).catch(err => {
          loading.close()
          alert('error' + err)
        })
    },
    methods: {
      /**
       * 当点击删除标签
       * @param tag
       */
      handleDeleteTag (tags) {
        this.$set(this.form, 'questionTags', tags || [])
      },
      sizeChage(val){
        this.pageSize = val;
        this.searchData();
      },
      formatter(row, column) {
        return  row.headImg
      },
      curChange(val){
        this.page=val;
        this.searchData();
      },

      /**
       * 获取所有问题标签
       */
      queryAllQuestionLabelName () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        getAllLabelsName().then(res => {
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0') {
            this.$set(this, 'allTags', resObj.data)
          } else {
            this.$message.error(resObj.respMsg)
          }
          loading.close()
        }).catch(err => {
          loading.close()
          alert('error' + err)
        })
      },
      /**
       * 通过问题
       * questionId               当前问题的questionId，必传参数
       * questionTagsString       问题标签，必传参数
       * adminId                  操作员id;登录的时候已传送，必传参数
       */
      ok () {
        let param = Object.assign({}, this.form, {userId: this.userInfo.id})
        param.questionTags = param.questionTags.join(',')
        if (!param.questionTitle) {
          this.$message.warning('请填写标题后在次尝试')
          return
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        updateQuesCheck({
          questionId: param.questionId,
          questionTagsString: param.questionTags,
          adminId: this.userInfo.id
        }).then(res => {
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0' || resObj.respCode === 0) {
            this.$router.push({name: 'approveList'})
            loading.close()
            this.$message.success(resObj.respMsg || '问题审核通过成功')
          } else {
            loading.close()
            this.$message.error(resObj.respMsg)
          }
        }).catch(err => {
          loading.close()
          this.$message.error(err)
        })
      },
      /**
       * 取消
       */
      cancel () {
        this.$router.push({path: '/launchManage/list'})
      },
      /**
       * 附件上传
       */
      guestUpload (res) {
        if (res.respCode === '0' || res.respCode === 0) {
          this.$set(this.form, 'qusConImg', res.respMsg)
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('questions/currentAction', {...this.currentData, ...{index: undefined, editable: false}})
      next()
    },
    computed: {
      ...mapState({
        currentData: state => {
          return state.questions.current
        }
      }),
      userInfo () {
        return (JSON.parse(localStorage.getItem('users')) || {}).admin || {}
      }
    },
    components: {
      upload,
      TagShow,
      editor: Editor,
      wangEditor
    },
    filters: {
      imgFilter (url) {
        if (!url) {
          return
        }
        if (typeof url === 'string') {
          return [
            {
              name: 'headImg',
              url
            }]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
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

<style lang="scss">
  .container {
    .disabled {
      .el-form-item__content {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
</style>


