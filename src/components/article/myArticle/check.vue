<template>
<div class="checkWarp">
    <el-container>
       
        <el-main>
          <el-form :model="info" status-icon  ref="info" label-width="100px" class="demo-ruleForm">
                <el-form-item label="文章标题:" prop="desc">
                    <div style="width:500px;float:left; margin-right:50px "> <el-input type="text" v-model="info.articleTitle" autocomplete="off"></el-input></div>
                   
                    <el-button style="float:left" @click="stop">结束审稿</el-button>
            </el-form-item>
            <el-form-item label="作者:" prop="desc">
                    <span>{{data.articleAuthorName}}</span>
            </el-form-item>
            <el-form-item label="投稿时间:" prop="desc">
                    <span>{{data.createTime}}</span>
            </el-form-item>
            <el-form-item label="标签:" prop="articleTags" > 
                <div class="checktags">
                    <el-tag v-for="(item, index) in info.articleTags"  :key="index">{{item}}</el-tag>
                    <el-button  class="button-new-tag" size="small" @click="gettags">添加标签</el-button>
                </div>
            </el-form-item>
            <el-form-item label="文章内容:" prop="articleContent" >
                  <wangEditor v-model="info.articleContent"></wangEditor>
             </el-form-item>
             <el-form-item label="封面图:" prop="articleImgPath">
              <el-upload
                    class="avatar-uploader"
                    action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="info.articleImgPath" :src="info.articleImgPath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
             <el-form-item label="视频上传:" prop="videoPath">
                  <el-upload
                    class="avatar-uploader"
                    action="http://39.106.49.2:8078/upload/upload_img?suffix=.mp4"
                    :show-file-list="false"
                    :on-success="vhandleAvatarSuccess"
                    :before-upload="vbeforeAvatarUpload">
                    <video v-if="info.videoPath" controls="controls" :src="info.videoPath" class="avatar"></video>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>            
                <P class="text">请保证视频格式正确，且不超过200M</P>
             </el-form-item>
        </el-form>
        <el-dialog title="添加标签" :visible.sync="dialogFormVisible"> <!--弹出框-->
                <Tags   :allTags='allTags' :articleTags='info.articleTags' ref="tag"></Tags>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="getSureTags">确定</el-button>
                    <el-button @click="dialogFormVisible = false">关闭</el-button>
                </div>
           </el-dialog> 
     </el-main>
 </el-container>
</div>
    
</template>
<script>
import { getOneLabels,articleSave,getAllArticleLabel,getAllUsersInfo,quitCheckArticle,operateCheckArticle} from '../../../service/getData.js'
import Heads from '../../common/head.vue'
import Check from './check.vue'//引入组件
import VueUeditorWrap from 'vue-ueditor-wrap'
import { mapState } from 'vuex'
import wangEditor from '@/components/common/richTextEditor.vue'
import Tags from '@/components/article/tasklist/tags.vue'
import upload from '../tasklist/upload.vue';
import uploadVideo from '../tasklist/uploadVideo.vue';
export default {
    props:['data','info'],
    data(){
        return{
            dialogFormVisible:false,
           allTags:[],
        }
    },
  mounted(){

    },
 methods: {
     vhandleAvatarSuccess(res, file) {
            console.log(URL.createObjectURL(file.raw))
                    this.info.videoPath = URL.createObjectURL(file.raw);
                },
     vbeforeAvatarUpload(file) {
                    console.log(file)
                    const isJPG = file.type === 'video/mp4'|| 'video/ogg'|| 'video/flv'||'video/avi'||'video/wmv'||'video/rmvb';
                    const isLt2M = file.size / 1024 / 1024 < 200;

                    if (!isJPG) {
                    this.$message.error('上传图片只能是 MP4/AVI/WMV 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 200MB!');
                    }
                    return isJPG && isLt2M;
      },
       handleAvatarSuccess(res, file) {
            console.log(URL.createObjectURL(file.raw))
                    this.info.articleImgPath = URL.createObjectURL(file.raw);
                },
     beforeAvatarUpload(file) {
                    console.log(file)
                    const isJPG = file.type === 'image/png'||'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
      },
      
     getSureTags(){
        console.log(this.tag)
         this.info.articleTags=this.tag

                this.dialogFormVisible=false
      },
     operateCheckArticle(x,y,a,b){
         var params = {}
         let tags= this.info.articleTags.join(',')
         console.log(tags)
          let user=JSON.parse(localStorage['users'])
			params.articleId=this.data.id              //  文章id，
			params.operateAccount=user.admin.operateAccount          // 操作人账号，必填
			params.operateAccountName=user.admin.adminName     //  操作人姓名，必填
            params.articleAuthorName =this.data.articleAuthorName       // 文章作者，必填
			params.articleAuthorAccount=this.data.articleAuthorAccount     // 文章作者账号，必填
            params.articleTitle=this.info.articleTitle
			params.articleTags  = tags     // 标签，必填，集合类型，多个用逗号分隔
			params.articleContent  =this.info.articleContent        // 文章内容，必填
			params.articleImgPath =this.info.articleImgPath        // 文章封面，图片的url地址，非必填
			params.videoPath = this.info.videoPath             // 视频url，视频的url地址，非必填
            console.log(params)         
            operateCheckArticle(params).then((res) => {
                console.log(res)
                var res = JSON.parse(res);
                console.log(res)
                if(res.respCode==="0"){ //跳转主页面
                        this.$message({
                        message: '操作成功',
                        type: 'success'
                        }); 
                         this.$router.push({name:"Grounding",  query:{}})
                  }else{
                     this.$message.error('失败');
                  }
                console.log(res)
            }).catch(err => {

                alert('error' + err);
            }) 
      },
     stop(){
                var params = {};
                var user=JSON.parse(localStorage['users'])
                  
                console.log(user.admin)
                params.articleId=this.data.id               // 文章id，必填
                params.operateAccountCode=user.admin.id   // 审核人账号，必填
                params.operateAccountRole=user.admin.adminEditIdentity      // 审核人角色，必填 1:专家 2:编辑 3:主编
                params.nowlevel=this.data.nowlevel                 //当前审核进度，必填 0:待专家审核 1:专家审核中 2:待编辑审核 3:编辑审核中 
			                                            //  4:待主编审核 5:主编审核中 6:审核通过 7:已退稿
                quitCheckArticle(params).then((res) => {
                var res = JSON.parse(res); 
                console.log(res)
                this.$router.go(-1)
				}).catch(err => {
				 	alert('error'+err);
                })
              this.$router.go(-1)
     },
     getAllUsersInfo(){
          var params = {}
              getAllUsersInfo(params).then((res) => {
                  var res = JSON.parse(res);
                  console.log(res)
                  this.options=res.checkdata
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
        } ,
      
        
    },
 computed: {
       ...mapState(["tag"]),
  },
  components: {
   Heads,Tags,VueUeditorWrap,Check,upload,uploadVideo,wangEditor
  },
  created(){
      this.getAllUsersInfo()
      console.log(this.info)
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

<style lang="less">
.checkWarp{
   .container {
    margin-top: 30px;
    
    }
     .checktags{
        position: relative;
        height: 100px;
        border: 1px solid #dcdfe6

     }
    
  
}


</style>

