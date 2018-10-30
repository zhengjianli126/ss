<template>
	<div class="wangEditorWrap"> 
        <el-button size="small" style="position:absolute;left:600px;top:10px;" v-on:click="setTextIndent">首行缩进</el-button>
        <el-button size="small" style="position:absolute;left:680px;top:10px;"  v-on:click="backTextIndent">首行回退</el-button>
        <el-button size="small" style="position:absolute;left:780px;top:10px;"  v-on:click="previewBtn(true)">预览</el-button>
        <div ref="editor" class="editorArea" style="text-align:left;"></div>
        <!--<div style="border:1px solid #ccc;height:667px;width:375px;z-index:10000;margin-top:30px;" class="w-e-text-container">
            <div contenteditable="false" style="width:100%; height:100%;" class="w-e-text" id="text-elem9115387878892687">
            <div v-html="editorContent"></div>
            </div>
        </div>-->
        <div class="previewArea" v-if="previewShow">
            <div class="previewBg w-e-text-container"  :style="{ backgroundImage:'url(' + require('../../assets/yulan.png') + ')'}">
                <div class="previewCon w-e-text"  contenteditable="false" id="text-elem9115387878892687">
                    <div v-html="editorContent"></div>
                </div>
            </div>
            <img class="previewClose" @click="previewBtn(false)" src="../../assets/close.png" />
        </div>
	</div>
</template>
<script type="text/javascript">
    import E from 'wangeditor'
    import { uploadAttach } from '../../service/getData.js'
	export default{
		data () {
			return {
                index:0,
                editorContent: '',
                editor:{},
                previewShow:false
			}
		},
		mounted (){
            this.editor = new E(this.$refs.editor);
            //this.editor.customConfig.uploadImgServer = 'http://39.106.49.2:8078/upload/upload_img?suffix=.jpg'  // 上传图片到服务器
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html;
            }
            // 自定义菜单配置
            this.editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'image',  // 插入图片
                'table',  // 表格
                'undo',  // 撤销
                'redo'  // 重复
            ]
            this.editor.customConfig.customUploadImg = function (files, insert) {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法
                var form = new window.FormData();
                form.append("file",files[0]);
                uploadAttach(form).then(res => {
                    res = JSON.parse(res);
                    if(res.respCode == 0){
                         //上传代码返回结果之后，将图片插入到编辑器中
                        insert(res.respMsg);
                    }
                }).catch(error => {
                    alert(error);
                })
            };
            // 隐藏“网络图片”tab
            this.editor.customConfig.showLinkImg = false
            this.editor.create();
		},
		components : {
			
		},
		methods : {
            getContent(){
                alert(this.editor.txt.html())
            },
			setTextIndent: function () {
                this.editor.selection.getSelectionContainerElem()[0].parentNode.style.textIndent='2em';
                this.editor.selection.getSelectionContainerElem()[0].style.textIndent='2em';
            },
            backTextIndent(){
                this.editor.selection.getSelectionContainerElem()[0].parentNode.style.textIndent='0em';
                this.editor.selection.getSelectionContainerElem()[0].style.textIndent='0em';
            },
            previewBtn(value){
                this.previewShow = value;
            }
		}
	}
</script>
<style type="text/css" lang="less">
	/*页面中使用px2rem*/
	 @import '../../styles/rem.less';
	 .wangEditorWrap{
        width:1000px;
        height:auto;
        //margin:0 auto;
        position: relative;
        left:0;
        top:0;
        .editorArea{
            .w-e-text-container{
                height:500px !important;
            }
        }
        .showBox{
            width:375px;
            height:667px;
            border:1px solid red;
        }
        .w-e-text{
            overflow-y:none;
            p{
                word-break:break-all;
            }
            table th{
                width:10%;
            }
        }
        .self{
            text-indent:2em;
        }
        h1{
            font-size:68px;
        }
        h2{
            font-size:56px;
        }
        h3{
            font-size:48px;
        }
        h4{
            font-size:36px;
        }
        h5{
            font-size:24px;
        }
        h6{
            font-size:12px;
        } 
        .previewArea{
            position:fixed;
            left:0;
            top:0;
            width:100%;
            height:100%;
            z-index:1002;
            background:rgba(0,0,0,0.3);
            .previewClose{
                position: absolute;
                left:65%;
                top:20px;
                width:30px;
                height:30px;
            }
            .previewBg{
                width:320px;
                height:663px;
                background:white;
                border-radius:35px;
                position:absolute;
                left:50%;
                top:50%;
                margin-top:-332px;
                margin-left:-160px;
            }
            .previewCon{
                 border:2px solid #eee;
                 width:288px;
                 height:514px;
                 position:absolute;
                 left:50%;
                 top:60px;
                 margin-left:-144px;
                 padding:10px;
            }
        }
     }
</style>