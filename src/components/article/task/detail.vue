<template>
<div class="detailWarp">
    <el-container>

        <el-main>
            <el-form label-width="150px" class="demo-ruleForm">
                <el-form-item label="文章标题：" style="overflow:hidden">
                    <div style="width:500px;float:left;height:40px;"> {{info.articleTitle}}</div>
                    <el-button v-if="nowlevel===level" @click="begin" style="float:left">开始审稿</el-button>
                </el-form-item>
                <el-form-item label="作者:" prop="desc">
                    <span>{{data.articleAuthorName}}</span>
                </el-form-item>
                <el-form-item label="投稿时间:" prop="desc">
                    <span>{{data.createTime}}</span>
                </el-form-item>
                <el-form-item label="标签:" prop="articleTags">

                    <el-tag v-for="(item, index) in info.articleTags" :key="index">{{item}}</el-tag>

                </el-form-item>
                <el-form-item label="文章内容:" prop="articleContent">
                    <span v-html="info.articleContent"></span>
                </el-form-item>
                <el-form-item label="封面图:" prop="articleImgPath">
                    <div v-if="info.articleImgPath" class="img"  @click="modal=true"><img :src="info.articleImgPath" alt=""></div>
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
    <el-dialog
  :visible.sync="modal"
  center>
  <span style="display:flex;justify-content:center;">
      <img  style='min-width:200px; min-height:200px;' :src="info.articleImgPath"  />
  </span>
 
</el-dialog>

</div>
</template>
<script>
import {
    beginCheckArticle
} from '../../../service/getData.js' //引入接口
export default {
    props: ['data', 'info'],
    data() {
        return {
            detailData: {},
            detailInfo: {},
            modal:false
        }
    },
    methods: {
        begin() {
            var params = {};
            var user = JSON.parse(localStorage['users'])
            params.articleId = this.data.id // 文章id，必填
            params.operateAccountCode = user.admin.id // 审核人id，必填
            params.articleOperateAccount = user.admin.adminAccount // 审核人账号，必填
            params.operateAccountRole = user.admin.adminEditIdentity // 审核人角色，必填 1:专家 2:编辑 3:主编
            params.nowlevel = this.data.nowlevel //当前审核进度，必填 0:待专家审核 1:专家审核中 2:待编辑审核 3:编辑审核中 
            console.log(params)
            this.$router.push({
                name: "Tasktotal",
                query: { ...params
                }
            }) //  4:待主编审核 5:主编审核中 6:审核通过 7:已退稿
        },
    },

    computed: {
        level() {
            let user = JSON.parse(localStorage['users'])
            console.log(user.admin.adminEditIdentity)
            switch (parseInt(user.admin.adminEditIdentity)) {
                case 1:
                    return '待专家审核'
                    break;
                case 2:
                    return '待编辑审核'
                    break;
                default:
                    return '待主编审核'
            }
        },
        account() {
            let user = JSON.parse(localStorage['users'])
            return user.admin.adminAccount
        },
        nowlevel() {
            switch (parseInt(this.data.nowlevel)) {
                case 0:
                    return '待专家审核'
                    break;
                case 1:
                    return '专家审核中'
                    break;
                case 2:
                    return '待编辑审核'
                    break;
                case 3:
                    return '编辑审核中'
                    break;
                case 4:
                    return '待主编审核'
                    break;
                case 5:
                    return '主编审核中'
                    break;
                case 6:
                    return '审核通过'
                    break;
                default:
                    return '已退稿'
            }
        }

    }


}
</script>
<style lang='less'>
.detailWarp {
    .img {
        height: 150px;
        width: 300px;
        img,
        video {
            height: 100%;
            width: 100%;
        }
    }
    main {
        overflow: hidden;
    }
}
</style>
