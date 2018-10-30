<template>
	<div class="quesDetailWrap">
        <heads></heads>
		<div class="mainWrap">
			<h1>问卷统计列表</h1>
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
					label="问卷名称"
					width="236">
					<template slot-scope="scope">{{ scope.row.ballotTitle }}</template>
				</el-table-column>
				<el-table-column
					prop="pushTime"
					label="推送时间"
					width="236">
				</el-table-column>
				<el-table-column
					label="推送人数	"
					width="236">
					<template slot-scope="scope">
						<el-button type="text" @click="pushNumAction(scope.row)" size="small">{{scope.row.pushNum}}</el-button>
					</template>
				</el-table-column>
				<el-table-column
					prop="answerNum"
					label="回答人数	"
					width="236">
				</el-table-column>
				<el-table-column
				label="操作"
				width="236">
				<template slot-scope="scope">
					<el-button type="text" :disabled="true" @click="countQues(scope.row)" size="small">统计</el-button>
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
	import { PushBalloListApi } from '../../service/getData.js';
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
				params.meetId = this.$route.query.meetId;
				PushBalloListApi(params).then(res => {
					console.log(res);
					res = JSON.parse(res);
					this.list = res.data;
				}).catch(error => {
					alert(error);
				})
			},
			countQues(params){
				alert(JSON.stringify(params));
			},
			pushNumAction(params){
				this.$router.push({name:'answerPer',query:{ballotId:params.ballotId}});
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
	 .quesDetailWrap{
		.mainWrap{
			padding:15px;
		}
		.listWrap{
			margin-top:20px;
		}
     }
</style>