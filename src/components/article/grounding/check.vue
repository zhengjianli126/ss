<template>
<div class="checkWarp">
    <el-container>
       
        <el-main>
          <el-form :model="info" status-icon  ref="info" label-width="100px" class="demo-ruleForm">
                <el-form-item label="文章标题:" prop="desc">
                    <div style="width:500px;float:left; margin-right:50px "> <el-input type="text" v-model="info.articleTitle" autocomplete="off"></el-input></div>
                   
            </el-form-item>
            <el-form-item label="作者:" prop="desc">
                    <span>{{data.articleAuthorName}}</span>
            </el-form-item>
            <el-form-item label="投稿时间:" prop="desc">
                    <span>{{data.createTime}}</span>
            </el-form-item>
            <el-form-item label="标签:" prop="articleTags" > 
                <div class="tags">
                    <el-tag v-for="(item, index) in info.articleTags"  :key="index">{{item}}</el-tag>
                    <el-button  class="button-new-tag" size="small" @click="gettags">添加标签</el-button>
                </div>
            </el-form-item>
            <el-form-item label="文章内容:" prop="articleContent" >
                  <wangEditor v-model="info.articleContent"></wangEditor>
                
             </el-form-item>
             <el-form-item label="封面图:" prop="articleImgPath">
                <!-- <el-upload action="info.articleImgPath" :file-list="info.headImg | imgFilter" list-type="picture-card" :on-remove="handleRemove">
                     <i class="el-icon-plus"></i>
                 </el-upload> -->
                  <el-upload
                    class="avatar-uploader"
                    action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="info.articleImgPath" :src="info.articleImgPath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
             </el-form-item>
             <el-form-item label="视频上传:" prop="videoPath">
             <!-- action必选参数, 上传的地址 -->
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
export default {
    props:['data','info'],
    data(){
        return{
         
          
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
     operateCheckArticle(x,y,a,b){
         var params = {}
         let tags= this.info.articleTags.join(',')
          let user=JSON.parse(localStorage['users'])
            params.id =y                   //  文章版本信息id，必填
			params.articleId=this.data.id              //  文章id，必填
			params.operateAccountCode=user.admin.id      // 审核人id，必填
			params.operateAccount=user.admin.adminAccount          // 审核人账号，必填
			params.operateAccountName=user.admin.adminName     //  审核人姓名，必填
			params.operateAccountRole =user.admin.adminEditIdentity     // 审核人角色，必填 1:专家 2:编辑 3:主编
			params.articleTitle  = tags     // 标签，必填，集合类型，多个用逗号分隔
			params.articleContent  =this.info.articleContent        // 文章内容，必填
			params.articleImgPath = this.info.articleImgPath         // 文章封面，图片的url地址，非必填
			params.videoPath =  this.info.videoPath              // 视频url，视频的url地址，非必填
			params.checkResult=x             // 操作结果，必填 0:保存当前审稿 1:通过当前审稿 2:退稿给对应角色
			params.nowlevel = this.data.nowlevel              // 当前审核进度，必填 0:待专家审核 1:专家审核中 2:待编辑审核 3:编辑审核中 
                                                    //    4:待主编审核 5:主编审核中 6:审核通过 7:已退稿
            params.backOperateAccountRole=a   //被退稿人角色，必填 0:投稿人 1:专家 2:编辑 3:主编
			params.failreason =b              //失败原因，必填
            operateCheckArticle(params).then((res) => {
                console.log(res)
                var res = JSON.parse(res);
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
                params.operateAccountCode=user.admin.adminAccount   // 审核人账号，必填
                params.operateAccountRole=user.admin.adminEditIdentity      // 审核人角色，必填 1:专家 2:编辑 3:主编
                params.nowlevel=this.data.nowlevel                 //当前审核进度，必填 0:待专家审核 1:专家审核中 2:待编辑审核 3:编辑审核中 
			                                            //  4:待主编审核 5:主编审核中 6:审核通过 7:已退稿
                quitCheckArticle(params).then((res) => {
                var res = JSON.parse(res); 
                console.log(res)
                this.$router.push({name:"Grounding",  query:{}})
				}).catch(err => {
				 	alert('error'+err);
                })
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
               this.allTags=res.checkdata
               console.log(this.allTags)
             
            }).catch(err => {

                alert('error' + err);
            })
        } ,
      
    },
  computed: {
    
  },
  components: {
   Heads,Tags,VueUeditorWrap,Check,wangEditor
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
     .tags{
        position: relative;
        height: 100px;
        border: 1px solid #dcdfe6

     }
    
  
}


</style>

