<template>
  <el-row class="container my-question_det">
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
                  :disUpload = currentData.editable
                  @uploadSuccess="guestUpload"></upload>
        </el-form-item>
        <el-form-item label="回答" prop="quesAnswer">
          <el-input :autosize="{minRows: 3}" type="textarea" v-model="form.quesAnswer"></el-input>
        </el-form-item>
        <el-form-item v-if="form.nowlevel" label="审核结果" prop="nowlevel">
          {{form.nowlevel | approveStatusFilter}}
        </el-form-item>
        <el-form-item v-if="form.failreason" label="审核意见" prop="failreason">
          {{form.failreason}}
        </el-form-item>
      </el-form>
       <div v-if="currentData.editable" :style="{textAlign: 'right'}">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="ok">确定</el-button>
        </div>
       <div v-else :style="{textAlign: 'right'}">
          <el-button  :disabled="false" @click="cancel">关闭</el-button>
        </div>
    </el-col>
  </el-row>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import { mapState } from 'vuex'
  import wangEditor from '@/components/common/richTextEditor.vue'
  import { getAllLabelsName, uploadAttach, saveQuestionInfo ,eDitQuestionInfo} from '@/service/getData'
  import upload from '../../common/upload.vue'
  import TagShow from '../TagShow'

  export default {
    data () {
      return {
        form: {
          adminQuestionIdentity: '',
          questionTitle: '',
          questionContent: '',
          questionTags: [],
          qusConImg: '',
          quesAnswer: ''
        },
        isEdit:"",
        questionId:"",
        allTags: [],
        editorOption: {},
        editorInit: {
          menubar: false,
          plugins: 'textcolor colorpicker link paste code upload',
          language: 'zh_CN',
          toolbar: 'undo redo | fontsizeselect bold italic | removeformat | alignleft aligncenter | forecolor | link | code table | upload',
          statusbar: true,
          height: 300,
          readonly: 1
        },
        inputVisible: false,
        isdisabled: false
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
      if(this.currentData.isEdit){
       this.isEdit = true
       this.questionId = this.currentData.data.questionId
      }
      let user=JSON.parse(localStorage['users'])
      this.form.adminQuestionIdentity = user.admin.adminQuestion;
    },
    methods: {
      /**
       * 当点击删除标签
       * @param tag
       */
      handleDeleteTag (tags) {
        this.$set(this.form, 'questionTags', tags || [])
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
       * 保存问题
       */
      ok () {
        this.form.userId = this.userInfo.id
        let param =  this.form
         if (param.questionTags.length==0) {
          this.$message.warning('请选择提问标签后再次尝试')
          return
        }
        param.questionTags =param.questionTags.join(',')
        if (!param.questionTitle) {
          this.$message.warning('请填写标题后再次尝试')
          return
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
       
        if(this.isEdit){//如果是编辑，调用编辑接口 增加问题id 字段
         param.questionId = this.questionId
          eDitQuestionInfo(param).then(res => {
            let resObj = JSON.parse(res)
            if (resObj.respCode === '0' || resObj.respCode === 0) {
              this.$message.success(resObj.respMsg)
              this.$router.push({path: '/questionManage/list'})
            } else {
              this.$message.error(resObj.respMsg)
            }
            loading.close()
          }).catch(err => {
            loading.close()
            this.$message.error(err)
          })
        
          
        }else{
          saveQuestionInfo(param).then(res => {
          let resObj = JSON.parse(res)
          if (resObj.respCode === '0' || resObj.respCode === 0) {
            this.$message.success(resObj.respMsg)
            this.$router.push({path: '/questionManage/list'})
          } else {
            this.$message.error(resObj.respMsg)
          }
          loading.close()
        }).catch(err => {
          loading.close()
          this.$message.error(err)
        })
        }
      },
      /**
       * 取消
       */
      cancel () {
        this.$router.push({path: '/questionManage/list'})
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
      },
      approveStatusFilter (value) {
        switch (value) {
          case '01':
            return '全部'
          case '02':
            return '待审核'
          case '03':
            return '已通过'
          case '04':
            return '未通过'
          default:
            return '--'
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
  .my-question_det {
    padding: 20px 0;
    .disabled {
      .el-form-item__content {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
</style>


