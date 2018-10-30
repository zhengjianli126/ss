<template>
  <div id="app">
   <myHeader></myHeader>
   <div class="app clearfix" v-if="isRouterAlive" :class="{'marginLeft':isHidden,'hidMarLeft':!isHidden}">
      <router-view></router-view>
   </div>
  </div>
</template>

<script>
 import myHeader from './components/header.vue';
 import Editor from '@tinymce/tinymce-vue';

export default {
  name: 'app',
  provide(){
      return{
          reload:this.reload
      }
  },
  components : {
    myHeader, 'editor': Editor
  },
  data () {
			return {
                index:0,
                isCollapse:false,
                isHidden:true,
                isRouterAlive:true
			}
  },
  mounted (){
      this.Emit.$on('closeCollsap',this.closeCollsap);
  },
  destoryed(){
      this.Emit.$off('closeCollsap');
  },
  methods : {
      reload(){
          this.isRouterAlive=false;
          this.$nextTick(function(){
              this.isRouterAlive=true
          })
      },
      closeCollsap(){
          this.isHidden = !this.isHidden;
      }
	}
}
</script>

<style lang="less">
html, body {
//   height: 100%
}
#app {
  // height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  left:0;
  top:0;
  color: #2c3e50;
    .app{
        min-width:1150px;
        overflow: hidden;
    }
    .app.marginLeft{
      margin-left:180px;
      overflow: hidden;
      // height: 100%;
    }
    .app.hidMarLeft{
      margin-left:65px;
    }
    button,input,textarea,select,a:focus {
        outline: none;
    }
}
</style>
