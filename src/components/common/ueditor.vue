　<template>

　　　　<div>

　　　　<!--editor的div为富文本的承载容器-->

　　　　<div id="editor"></div>


　　　　</div>

　　　　</template>

　　　　<script>

　　　　export default {

       　　　　 data() {

　　　　　　　　return {

                　　　　editor: '111',

           　　 　}

        　　},

       　　 mounted() {

　　　　　　// 实例化editor编辑器

　　　　　　this.editor = UE.getEditor('editor');

　　　　　　

       　　 },

       　　 methods: {

          　　  gettext() {

　　　　　　// 获取editor中的文本

                　　console.log(this.editor.getContent())

           　　 }

       　　 },

        destroyed() {

　　// 将editor进行销毁

　　this.editor.destroy();

      　　  }

  　　  }

　</script>