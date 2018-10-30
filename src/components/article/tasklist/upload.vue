<template>
	<div class="uploadWrap">
         <a href="javascript:;" class="fileBtn">
            <input class="fileInput" :disabled="disabled" @change="posterImg($event)" :id="dataId" type="file" :data-id="dataId" name="signFile" /> 
            <span>上传图片</span>  
        </a>
        <div v-if="fileShow" class="previewImgStyle"><img style="height:100%;" :src='imgUseSrc' alt=""></div>
	</div>
</template>
<script type="text/javascript">
import { uploadAttach } from '../../../service/getData.js';
import { strToObj } from '../../../util/string.js';
	export default{
        props:['dataId','imgSrc','disabled'],
		data () {
			return {
                index:0,
                fileShow:false,
                fileValue:{
                    name:""
                },
                imgUseSrc:""
			}
		},
		mounted (){
            this.imgUseSrc = this.imgSrc;
            console.log( this.imgUseSrc)
            // alert(this.imgSrc);
            // if(this.imgSrc != ""){
            //     this.fileShow = true;
            // }
		},
		components : {
			
		},
		methods : {
            //上传图片
            posterImg(event){
                var nowId = event.target.dataset.id;
                var files = document.getElementById(nowId).files;
                if(files.length == 0) return;
                var form = new window.FormData();
                form.append("file",files[0]);
                uploadAttach(form).then(res => {
                    this.fileShow = true;
                    this.fileValue.name = files[0].name;
                    this.previewImg(nowId);
                    res = strToObj(res);
                    res.dataId = this.dataId;
                    this.$emit('uploadSuccess',res);
                }).catch(err => {
                    console.log('err')
                })
            },
            //预览图片
            previewImg(nowId){
                var file = document.getElementById(nowId).files[0];
                var url = window.URL.createObjectURL(file);
                this.imgUseSrc = url;
            },
        },
        watch:{
            imgSrc : function(){
                if(this.imgSrc != "" && (typeof this.imgSrc != "undefined")){
                    this.imgUseSrc = this.imgSrc;
                    this.fileShow = true;
                }
            }
        }
	}
</script>
<style type="text/css" lang="less">
	/*页面中使用px2rem*/
	 @import '../../../styles/rem.less';
	 .uploadWrap{
         .previewImgStyle{
            display:block;
            cursor:pointer;
            width:100px;
            height:100px;
        }
     }
</style>