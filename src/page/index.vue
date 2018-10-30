<template>
	<div class="indexWrap">
		 <heads></heads>
		<h1>
			欢迎您：{{name}}
		</h1>

	</div>
</template>
<script type="text/javascript">
	import heads from '../components/common/head.vue';
	import myHeader from '../components/header.vue';
	export default{
		data () {
			return {
				index:0,
				name:''

			}
		},
		mounted (){
			this.name=localStorage.getItem("name") 
		},
		components : {
			myHeader,heads
		},
		methods: {

		}
	}
</script>
<style type="text/css" lang="less">
	/*页面中使用px2rem*/
	 @import '../styles/rem.less';
	 .indexWrap{
		height: 100%;
		background-color: #eeeeee;
		h1{
			position: absolute;
			left:45%;
			top: 200px;
			font-size: 50px;
			color: #1D9DE1 ;
			
		}
	 }
</style>