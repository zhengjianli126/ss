<template>
	<div class="answerPerlWrap">
        <heads></heads>
		<div class="mainWrap">
			<h1>回答人数列表</h1>
			<div class="listWrap">
				<el-table
				ref="multipleTable"
				:data="list"
				tooltip-effect="dark"
				border
				stripe
				:header-cell-style="{background:'#f4f4f4',color:'#666'}"
				style="width:1156px">
				<el-table-column
					label="姓名"
					width="295">
					<template slot-scope="scope">{{ scope.row.userRealName  }}</template>
				</el-table-column>
				<el-table-column
					prop="totalScore"
					label="得分"
					width="295">
				</el-table-column>
				<el-table-column
					prop="ctimeString"
					label="回答时间	"
					width="295">
				</el-table-column>
				<el-table-column
				label="操作"
				width="294">
				<template slot-scope="scope">
					<el-button type="text" @click="userDetail(scope.row)" size="small">详情</el-button>
				</template>
				</el-table-column>
    			</el-table>
			</div>
            <div style="margin-top:10px;">
				<el-button  @click="toBack" plain>返回</el-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Heads from '../common/head.vue'
	import { PushAnswerPerListApi } from '../../service/getData.js';
 	export default{
		data () {
			return {
				index:0,
				list:[]
			}
		},
		mounted (){
			this.getDataList();
		},
		components : {
			Heads
		},
		methods : {
			getDataList(){
                var params = {};
                params.ballotId = this.$route.query.ballotId;
                params.page = 1;
                params.pageSize = 10;
				PushAnswerPerListApi(params).then(res => {
                    res = JSON.parse(res);
                    console.log(res.data.data.list);
					this.list = res.data.data.list;
				}).catch(error => {
					alert(error);
				})
			},
			userDetail(params){
                this.$router.push({name:"meetquestionnaire",query:{userId:params.userId,ballotId:params.ballotId,user:params.userRealName,totalScore:params.totalScore}});
			},
            toBack(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style type="text/css" lang="less">
	/*页面中使用px2rem*/
	 @import '../../styles/rem.less';
	 .answerPerlWrap{
		.mainWrap{
			padding:15px;
		}
		.listWrap{
			margin-top:20px;
		}
     }
</style>