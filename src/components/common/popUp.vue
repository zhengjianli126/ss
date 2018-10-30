<template>
	<div class="popUpWrap">
        <div class="enter">
        <slot name="center"></slot>
        </div>
	</div>
</template>
<script type="text/javascript">
	
	export default{
		data () {
			return {
				index:0
			}
		},
		mounted (){
            this.stop();
		},
		components : {
			
		},
		methods : {
            //禁止滚动
			stop(){
                var mo=function(e){e.preventDefault();};
                document.body.style.overflow='hidden';
                document.addEventListener("touchmove",mo,false);//禁止页面滑动
            },
            /***取消滑动限制***/
            move(){
                var mo=function(e){e.preventDefault();};
                document.body.style.overflow='';//出现滚动条
                document.removeEventListener("touchmove",mo,false);
            }
		}
	}
</script>
<style type="text/css" lang="less">
	/*页面中使用px2rem*/
	 @import '../../styles/rem.less';
	 .popUpWrap{
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        background:rgba(0, 0, 0, 0.3);
        z-index:100;
        overflow: hidden;
        .enter{
            width:600px;
            position: fixed;
            left:50%;
            margin-left:-300px;
            height:400px;
            top:120px;
            background:white;
            overflow:scroll;
        }
     }
</style>