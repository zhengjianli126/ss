<template>
<div class="detailWarp">
     <el-container>
        
        <el-main>
            <el-form label-width="150px" class="demo-ruleForm">
                <el-form-item label="文章标题：" style="overflow:hidden">
                        <div style="width:500px;float:left;height:40px;"> {{info.articleTitle}}</div>
                        <el-button  v-if="nowlevel===level"  @click="begin" style="float:left">开始审稿</el-button>
                </el-form-item>
                <el-form-item label="作者:" prop="desc">
                        <span>{{data.articleAuthorName}}</span>
                </el-form-item>
                <el-form-item label="投稿时间:" prop="desc">
                        <span>{{data.createTime}}</span>
                </el-form-item>
                <el-form-item label="标签:" prop="articleTags" > 
                    
                        <el-tag v-for="(item, index) in info.articleTags"  :key="index">{{item}}</el-tag>
                    
                </el-form-item>
                <el-form-item label="文章内容:" prop="articleContent" >
                    <div v-html="info.articleContent"></div>
                </el-form-item>
                <el-form-item label="封面图:" prop="articleImgPath">
                            <div v-if="info.articleImgPath" class="img"><img :src="info.articleImgPath" alt=""></div> 
                             <div v-else class="img"><img src="../../../assets/img/tp.png" alt=""></div> 
                </el-form-item>
                <el-form-item label="视频上传:" prop="videoPath">
                          <div v-if="info.videoPath" class="img"><video :src="info.videoPath" controls="controls"></video></div>
                             <div v-else class="img"><img src="../../../assets/img/sp.png" alt=""></div> 
                </el-form-item>
                <el-form-item label="移动端投稿图片:" prop="videoPath">
                            <div  class="img"><img src="" alt=""></div> 
                </el-form-item>
                 <el-form-item >
                    <span class="support">获赞数(总)：{{data.supportNum}}</span> 
                    <span class="support">获赞数(刷)：{{data.brushSupportNum}} <el-button @click="showBrush(1)">刷赞</el-button> </span>
                    <span class="support">浏览量(总)：{{data.overlookNum}}</span>
                    <span class="support">浏览量(刷)：{{data.brushOverlookNum}} <el-button  @click="showBrush(2)">刷浏览量</el-button></span>  
                </el-form-item>
                <el-form-item label="状态:" prop="videoPath">
                        {{nowlevel}}
                </el-form-item>
            </el-form>    
        </el-main>
        <el-dialog title="刷赞" :visible.sync="dialogFormVisible"> <!--弹出框-->
                    <el-form :model="form">
                         <el-form-item label="数量">
                            <el-input type="text" v-model="form.brushSupportNum"></el-input>
                         </el-form-item>             
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateArticleByArticleId(data.id)">确 定</el-button>
                    </div>
            </el-dialog>
            <el-dialog title="刷浏览量" :visible.sync="dialogFormVisible1"> <!--弹出框-->
                    <el-form :model="form">
                         <el-form-item label="数量">
                            <el-input type="text" v-model="form.brushOverlookNum"></el-input>
                         </el-form-item>             
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateArticleByArticleId(data.id)">确 定</el-button>
                    </div>
            </el-dialog>
    </el-container>
</div>
   
</template>
<script>
import { beginCheckArticle ,updateArticleByArticleId} from '../../../service/getData.js'//引入接口
export default { 
    props:['data','info'],
    data(){
        return{
            dialogFormVisible1:false,
            dialogFormVisible:false,
            form:{
                brushSupportNum:'',
                brushOverlookNum:''
            },
            
         
        }
    },
     mounted(){
    },
    methods:{
        showBrush(y){
            if(y===1){
                this.dialogFormVisible=true
            }else{
                this.dialogFormVisible1=true
            }
        },
        updateArticleByArticleId(x){
            var params = {};
                var user=JSON.parse(localStorage['users'])
                  
                console.log(user.admin)
                params.articleId=x                 //文章id，必填
                params.adminId = user.admin.id	                 //当前操作员id，必填
                params.brushSupportNum=this.form.brushSupportNum          // 刷赞数，非必填
                params.brushOverlookNum=this.form.brushOverlookNum       //  刷浏览量，非必填
                updateArticleByArticleId(params).then((res) => {
                var res = JSON.parse(res); 
                   
				}).catch(err => {
				 	alert('error'+err);
                })
        },
        show(){
            console.log('3')
                console.log(this.data)
                console.log(this.info)
        },
         begin(){
                var params = {};
                var user=JSON.parse(localStorage['users'])
                  
                console.log(user.admin)
                params.articleId=this.data.id               // 文章id，必填
                params.operateAccountCode=user.admin.id	    // 审核人id，必填
                params.articleOperateAccount=user.admin.adminAccount   // 审核人账号，必填
                params.operateAccountRole=user.admin.adminEditIdentity      // 审核人角色，必填 1:专家 2:编辑 3:主编
                params.nowlevel=this.data.nowlevel                 //当前审核进度，必填 0:待专家审核 1:专家审核中 2:待编辑审核 3:编辑审核中 
			                                            //  4:待主编审核 5:主编审核中 6:审核通过 7:已退稿
                beginCheckArticle(params).then((res) => {
                var res = JSON.parse(res); 
                console.log(res.data)
                this.$router.push({name:"Tasktotal",  query:{...res.data}})
                console.log(this.data)
				}).catch(err => {
				 	alert('error'+err);
                })
            
        },
    },
    computed:{
         level(){
              let user=JSON.parse(localStorage['users'])
              console.log(user.admin.adminEditIdentity)
                    switch(parseInt(user.admin.adminEditIdentity)){
                        case 1:
                          return   '待专家审核'
                            break;
                        case 2:
                           return '待编辑审核'
                            break;
                         default:
                           return '待主编审核'
              }
        },
        account(){
              let user=JSON.parse(localStorage['users'])
             return user.admin.adminAccount
        },
        nowlevel(){
           switch(parseInt(this.data.nowlevel)){
                case 0:
                   return  '待专家审核'
                    break;
                case 1:
                      return  '专家审核中'
                    break;
                case 2:
                      return '待编辑审核'
                    break;
                case 3:
                     return  '编辑审核中'
                    break;
                case 4:
                   return  '待主编审核'
                    break;
                case 5:
                     return  '主编审核中'
                    break;
                case 6:
                    return  '审核通过'
                    break;
                default:
                    return  '已退稿'
            } 
        }

    }
    

}
</script>
<style lang='less'>
.detailWarp{
     .img{
        height: 150px;
        width: 300px;
        img,video{
            height: 100%;
            width:100%;
        }
    }
    .support{
        display: inline-block;
        width: 300px;
        position: relative;
        margin-bottom: 10px;
        margin-right: 20px;
        button{
            position: absolute;
            right: 0
        }
    }
}
</style>
