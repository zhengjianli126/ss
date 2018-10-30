<template>
	<div class="meetquesnaireWrap">
         <heads></heads>
         <div class="mainWrap">
             <h1 class="header">满意度调用</h1>
             <div class="perArea">
                 <span>提交人：</span><span style="padding:0 10px;">{{user}}</span><span style="color:#0099ff;">得分：</span><span style="color:#0099ff;">{{totalScore}}</span>
             </div>
             <div class="answerArea" v-for="(item,index) in anList" :key="index">
                 <div class="anTit">
                     <span>{{index + 1}}、{{item.questionTitle}}</span>
                     <span v-if="item.questionType == 0">（ 单选 ）</span>
                     <span v-if="item.questionType == 1">（ 多选 ）</span>
                     <span v-if="item.questionType == 2">（ 问答 ）</span>
                     <span style="color:#0099ff;">（ 得分：{{item.questionScore}} ）</span>
                 </div>
                 <div class="anRes">
                     <span>回答：</span><span>{{item.questionAnswer}}</span>
                 </div>
             </div>
         </div>
	</div>
</template>
<script type="text/javascript">
    import Heads from '../common/head.vue'
    import { meetQuesNaireApi } from '../../service/getData.js';
	export default{
		data () {
			return {
                index:0,
                anList:[],
                totalScore:"",
                user:""
			}
		},
		mounted (){
            this.getData();
            this.totalScore = this.$route.query.totalScore;
            this.user = this.$route.query.user;
		},
		components : {
			Heads
		},
		methods : {
			getData(){
                var params = {};
                params.userId = this.$route.query.userId;
                params.ballotId = this.$route.query.ballotId;
                meetQuesNaireApi(params).then(res => {
                    //alert(res)
                    res = JSON.parse(res);
                    this.anList = res.data;
                }).catch(error => {
                    //alert(error);
                })
            },
		}
	}
</script>
<style type="text/css" lang="less">
/*页面中使用px2rem*/
    @import '../../styles/rem.less';
        .meetquesnaireWrap{
            .mainWrap{
            padding:15px;
        }
        .header{
            text-align:center;
            font-size:24px;
            color:#03a5d9;
        }
        .perArea{
            text-align:right;
            padding-right:40px;
        }
        .answerArea{
            margin-top:20px;
            padding:0 20px;
            padding-bottom:20px;  
            //border-bottom:1px solid #efefef;
        }
        .anRes{
            margin-top:20px;
            padding-left:28px;
        }
    }
</style>