<template>
<div class="detailWarp">
     <el-container>
        
        <el-main>
            <el-form label-width="150px" class="demo-ruleForm">
                <el-form-item label="文章标题：" style="overflow:hidden">
                        <div style="width:500px;float:left;height:40px;"> {{info.articleTitle}}</div>
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
                    <span> {{info.articleContent}}</span> 
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
                    <span class="support">获赞数(刷)：{{data.brushSupportNum}}  </span>
                    <span class="support">浏览量(总)：{{data.overlookNum}}</span>
                    <span class="support">浏览量(刷)：{{data.brushOverlookNum}} </span>  
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
    methods:{
       
    },
    mounted(){
        
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
