<template>
<div class="saveArtcleWarp">
    <Heads></Heads>
    <el-row class="container">
    <el-col :span="18">
      <el-form size="small"  :model="form.data" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="articleTitle">
          <el-input v-model="form.articleTitle"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="articleAuthorName">    <!-- 获取作者信息并展示 -->
            <el-select v-model="form.articleAuthorName" filterable placeholder="请选择">
                 <el-option
                v-for="x in options"
                :key="x.phoneNum"
                :label="x.userName"
                :value="x.userName+','+x.phoneNum">
                </el-option> 
            </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="articleTags" > 
            <div class="tags">
                <el-tag v-for="(item, index) in form.articleTags"  :key="index">{{item}}</el-tag>
                <el-button  class="button-new-tag" size="small" @click="gettags">+添加标签</el-button>
            </div>
          
        </el-form-item>
        <el-form-item label="文章内容" prop="articleContent" >
            <wangEditor  v-model="form.articleContent"></wangEditor>
           <!-- <VueUeditorWrap :config="myConfig" v-model="form.articleContent"></VueUeditorWrap> -->
        </el-form-item>
        <el-form-item label="封面图" prop="articleImgPath">
           <upload dataId="signfileOne" 
             
             :imgSrc="form.articleImgPath" 
             @uploadSuccess="bannerUpload"></upload> 
        </el-form-item>
        <el-form-item label="视频上传" prop="videoPath">
             <!-- action必选参数, 上传的地址 -->
            <uploadVideo dataId="signfileTwo"    
             :imgSrc="form.videoPath" 
             @uploadSuccess="videoUpload"></uploadVideo> 
            <P class="text">请保证视频格式正确，且不超过200M</P>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
    <div class="btn" >
          <el-button type="primary" @click="saveArticle">投稿</el-button>
    </div>

    <el-dialog ref="Dialog" title="添加标签" :visible.sync="dialogFormVisible"> <!--弹出框-->
                <Tags class="tag" v-on:getTags="getTags" :allTags='allTags' :articleTags='form.articleTags' ref="tag"></Tags>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="getSureTags">确定</el-button>
                    <el-button @click="dialogFormVisible = false">关闭</el-button>
                </div>
           </el-dialog> 
</div>
    
  
</template>

<script>
import { getOneLabels,articleSave,getAllArticleLabel,getAllUsersInfo,uploadAttach } from '../../../service/getData.js'
import Heads from '../../common/head.vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import { mapState } from 'vuex'
import Editor from '@tinymce/tinymce-vue';
import Tags from '@/components/article/tasklist/tags.vue'
import upload from './upload.vue';
import wangEditor from '@/components/common/richTextEditor.vue'
import uploadVideo from './uploadVideo.vue';
export default {
  data() {
    return {
        options:[],
        dialogFormVisible:false,
        form: {
            operateAccountCode:'',
            operateAccountName:'',
            articleAuthorName:'',
            articleAuthorAccount:'',
            articleTags:[],
            articleContent:'',
            articleImgPath:'',
            videoPath:''
          },
        allTags:[],
        myConfig: {
            // 如果需要上传功能,找后端小伙伴要服务器接口地址
            serverUrl: 'upload/upload_img?suffix=.jpg',
            // 你的UEditor资源存放的路径,相对于打包后的index.html
            UEDITOR_HOME_URL: './static/UEditor/',
            // 编辑器不自动被内容撑高
            autoHeightEnabled: false,
            // 初始容器高度
            initialFrameHeight: 240,
            // 初始容器宽度
            initialFrameWidth: '100%',
            // 关闭自动保存
            enableAutoSave: false
        }     
    }
  },
  props: {
    index: {
      type: Number
    }
  },
  mounted() {
    // if (this.currentData.index >= 0) {
    //   this.form = this.currentData.data
    // }
  },
  methods: {
    videoUpload(res){
        this.form.videoPath = res.respMsg;
      
      },
     bannerUpload(res){
        this.form.articleImgPath = res.respMsg;

      },
       fileImage:function(e){
          var that=this;
          var file = e.target.files[0];
          var imgSize=file.size/1024;
          if(imgSize>200){
              alert('请上传大小不要超过200KB的图片')
          }else{
              var reader = new FileReader();
              reader.readAsDataURL(file); // 读出 base64
              reader.onloadend = function () {
                  // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
                  var dataURL = reader.result;
                  // 下面逻辑处理
                  $.ajax({
                      type:"post",
                      url:"39.106.49.2:8078/upload/upload_img?suffix=.jpg", // 上传图片接口
                      async:true,
                      data:{
                          avatar:dataURL,
                          avatar_wx:1,
                          token:token,
                          uid:uid,
                      },
                      success:function(e){
                          that.avatar=dataURL;
                          alert('修改成功');
                          $(".tsk").show().delay(1500).hide(0);
                      }
                  });
              };
          }

          },
     handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
      getSureTags(){
        console.log(this.tag)
         this.form.articleTags=this.tag

                this.dialogFormVisible=false
      },
     getTags (addArticleTags) {
            // childValue就是子组件传过来的值
                this.form.articleTags = addArticleTags 
                this.dialogFormVisible=true
        },
        getAllUsersInfo(){
          var params = {}
              getAllUsersInfo(params).then((res) => {
                  var res = JSON.parse(res);
                  console.log(res)
                  this.options=res.data
              }).catch(err => {

                  alert('error' + err);
              })
        },
      saveArticle(){
         var params = {}
         var user=JSON.parse(localStorage['users'])
         let tags= this.form.articleTags.join(',')
         console.log(this.form.articleAuthorName)
         let anthors=this.form.articleAuthorName.split(",")
         
         console.log(this.form.articleContent)
            params.operateAccountCode=user.admin.id   //   操作人账号，必填
            params.operateAccountName=user.admin.adminName   // 操作人姓名，必填
            params.articleTitle=this.form.articleTitle               // 标题，必填
            params.articleAuthorName=anthors[0]     // 文章作者，必填
            params.articleAuthorAccount= anthors[1]    // 文章作者账号，必填
            params.articleTags= tags             // 标签，必填，集合类型，多个用逗号分隔
            params.articleContent= this.form.articleContent           // 文章内容，必填
            params.articleImgPath= this.form.articleImgPath         //  文章封面，图片的url地址，非必填
            params.videoPath=  this.form.videoPath
            console.log(params)
            articleSave(params).then((res) => {
                var res = JSON.parse(res);
                console.log(res)
                if(res.respCode==="0"){ //跳转主页面
                this.$message({
                        message: '投稿成功',
                        type: 'success'
                        });
                        
           //       }else if(res.respCode==="903"){
             //         this.dialogFormVisible = true
          //        }else if(res.respCode==="904"){
           //         alert("密码输入错误")
                  }else{
                    this.$message({
                            message: '投稿失败',
                            type: 'warning'
                            })
      
                  }
                console.log(res)
              this.$router.go(-1)
            }).catch(err => {

                alert('error' + err);
            }) 
      },
       gettags() {     
            var params = {}
            params.labelType = 1
            getOneLabels(params).then((res) => {
                var res = JSON.parse(res);
                console.log(res)
                this.dialogFormVisible=true
               this.allTags=res.data
               console.log(this.allTags)
             
            }).catch(err => {

                alert('error' + err);
            })
        } 
  },
  computed: {
       ...mapState(["tag"]),
  },
  components: {
    Heads,Tags,VueUeditorWrap,Editor,upload,uploadVideo, wangEditor
  },
  created(){
      this.getAllUsersInfo()
  },

}
</script>

<style lang="scss">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
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

<style lang="less" scoped>
.saveArtcleWarp{
  .dialog-footer{
      position: relative;
      z-index: 100000
  }
  .dia {
    z-index:100000
  }
  .fileBtn{
			position:relative;
			left:0;
			top:0;
			background:#409eff;
			overflow:hidden;
			display:block;
			width:80px;
			height:30px;
			border-radius:2px;
			text-decoration:none;
      
      text-align:center;
			span{
        color: #ffffff;
        font-size:12px;
        line-height:30px;
			}.fileInput{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
      opacity:0;
      cursor: pointer;
		}
.el-input__inner{
  height:30px;
  padding:5px;
}
    }
    
  margin-bottom: 120px;
  .container {
    margin-top: 30px;
    .tags{
      position: relative;
        height: 100px;
        border: 1px solid #dcdfe6

    }
  }
  .btn{
    border: #dcdfe6 solid 1px;
    position: fixed;
    bottom: 0px;
    width: 877px;
    height: 100px;
    background: #ffffff;
    .el-button{
      position: absolute;
      bottom: 30px;
      right: 100px;
    }
  }
}


</style>

