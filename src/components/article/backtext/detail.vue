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
                    <span v-html="info.articleContent"></span> 
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
                            <div class="img"><img src="" alt=""></div> 
                </el-form-item>
                <el-form-item label="状态:" prop="videoPath">
                        {{nowlevel}}
                </el-form-item>
            </el-form>    
        </el-main>
    </el-container>
</div>
   
</template>
<script>
import { beginCheckArticle } from '../../../service/getData.js'//引入接口
export default { 
    props:['data','info'],
    data(){
        return{
          detailData:{},
          detailInfo:{}
        }
    },
    methods:{
       
       
    },
    mounted(){
            this.detailInfo=this.info
              this.detailData=this.data
    },
    computed:{
         
        nowlevel(){
           switch(parseInt(this.data.nowlevel)){
               case 0:
                    return '退稿至投稿人'
                    break;
                case 1:
                    return '退稿至专家'
                    break;            
                default:
                    return '退稿至编辑'
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
    main{
        overflow: hidden;
    }
}
</style>
