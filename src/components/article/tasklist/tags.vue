<template>
<div class="tagsWarp">
    <el-form size="small"  :model="form" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="已选标签" prop="addArticleTags" > 
                <div class="topTags">
                    <el-tag v-for="(item, index) in form.addArticleTags" closable
                   :disable-transitions="false"  @close="handleClose(item)"  :key="index">{{item}}</el-tag>
                </div>
            </el-form-item> 
            <el-form-item label="全部标签" prop="allArticleTags" > 
                 <el-select
                    v-model="form.value"
                    multiple
                    filterable
                    remote
                    @change='chose'
                    @remove-tag='remove'
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    :loading="form.loading">
                    <el-option
                    v-for="item in form.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class="tags">
                    <el-button v-for=" index in form.allTags" @click="add(index.labelName)"  :key="index.ctime">{{index.labelName}}</el-button>
                </div>
            </el-form-item> 
     </el-form>      
</div>

</template>

<script>
import { getOneLabels } from '@/service/getData.js'
import Tags from './tags.vue'
import { mapState,mapMutations,mapActions,mapGetters} from 'vuex' //引入vuex
export default {
    props:['allTags','articleTags'],
     data() {
        return {
            form: {
                value:[],
                options: [],
                list: [],
                loading: false,
                input:'',
                allTags:this.allTags,
                addArticleTags:this.articleTags,
                states:[]
            },
       
        }
  },
   created() {
      this.form.list = this.form.allTags.map(item => {
        return { value: item.labelName, label: item.labelName };
      });
      this.form.states= this.form.allTags.map(item => {
        return item.labelName ;
      });
    },
   methods:{
        ...mapMutations(["saveArticle"]), 
       remove(x){    
        Array.prototype.indexOf = function (val) {
        for(var i = 0; i < this.length; i++){
            if(this[i] == val){return i;}
        }
        return -1;
        }
        Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if(index > -1){this.splice(index,1);}
        }
        this.form.addArticleTags.remove(x)
         console.log(x)
       },
       chose(event){
            this.form.addArticleTags=Array.from(new Set([...this.form.addArticleTags,...event]))
             this.saveArticle(this.form.addArticleTags)
           
           console.log(event)
       },
       remoteMethod(query) {
        if (query !== '') {
          this.form.loading = true;
          setTimeout(() => {
            this.form.loading = false;
            this.form.options = this.form.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.form.options = [];
        }
      
    },
      add(str){ //添加标签
          this.form.addArticleTags=Array.from(new Set([...this.form.addArticleTags,str]))
           this.saveArticle(this.form.addArticleTags)
      },
       handleClose(tag) { //删除标签
        this.form.addArticleTags.splice(this.form.addArticleTags.indexOf(tag), 1);
      },
      gofather(){
          console.log('ss')
           this.$emit("getTags",this.addArticleTags)
      }

  },
mounted(){
          
        },
components:{
        Tags
    },
}
</script>
<style lang="less">
.tagsWarp{
    position: relative;
    z-index: 99999999;
    .topTags{
        
       
         span{
             margin-top: 5px;
         }
    }
    .tags{
         position: relative;
    z-index: 99999999;
       height: 265px;
        overflow: hidden;
        padding-top: 10px;
        button{
            margin-top: 10px;
        }
    }
}
</style>

