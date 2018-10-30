<template>
  <el-row class="container">
    <el-col :span="18">
      <el-form size="small" :model="form.data"  :disabled="!currentData.editable" ref="form" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="问题标题" prop="questionTitle">
          <el-input v-model="form.questionTitle"></el-input>
        </el-form-item>
        <el-form-item label="问题内容" prop="questionContent" :class="{'disabled': !currentData.editable}">
          <wangEditor :init="editorInit" v-model="form.questionContent"></wangEditor>
        
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
        <el-form-item v-if="form.nowlevel" label="审核结果" prop="nowlevel">
          {{form.nowlevelString}}
        </el-form-item>
        <el-form-item v-if="form.nowlevel!==0" label="审核意见" prop="failreason">
          <el-input v-model="form.failreason"></el-input>
        </el-form-item>
      </el-form>
      <div :style="{textAlign: 'right'}" >
          <el-button v-if="hideClose" @click="cancel">取消</el-button>
          <el-button v-if="form.nowlevel!=0&&!hideClose" @click="dialogVisible = true">拒绝</el-button>
          <el-button v-if="form.nowlevel!=0&&!hideClose" type="primary" @click="ok">通过</el-button>
        </div>
    </el-col>
    <el-dialog
      title="拒绝"
      :visible.sync="dialogVisible"
      width="40%"
      >

        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content bg-purple">  <span>审核意见：</span></div></el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
            </div>
          </el-col>
        </el-row>
      
        
 
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="refuse">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import wangEditor from '@/components/common/richTextEditor.vue'
  import { mapState } from 'vuex'
  import { getAllLabelsName, uploadAttach, saveQuestionInfo, updateQuesCheck, updateQuesFail } from '@/service/getData'
  import upload from '../../common/upload.vue'
  import TagShow from '../TagShow'
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
        dialogVisible: false,
        textarea: '',
        hideClose:""
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
      if(this.currentData.isDetails){
        this.hideClose = true;
      }
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
       * 拒绝
       */
      refuse () {
        let param = Object.assign({}, this.form, {userId: this.userInfo.id})
        if(this.textarea.length==0){
          this.$message.warning('请填写拒绝理由再次尝试')
          return
        }
        let obj = {
          questionId: param.questionId,
          failreason: this.textarea,
          adminId: this.userInfo.id      
        }
   
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
         updateQuesFail(obj).then(res=>{
           let resObj = JSON.parse(res)
            if (resObj.respCode === '0' || resObj.respCode === 0) {
              this.$message.success(resObj.respMsg)
              this.$router.push({path: '/approveManage/list'})
            } else {
              this.$message.error(resObj.respMsg)
            }
            loading.close()
         }).catch(err => {
            loading.close()
            this.$message.error(err)
          })
      },
      /**
       * 取消
       */
      cancel () {
        this.$router.push({path: '/approveManage/list'})
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


