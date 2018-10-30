<template>
<div class="backtextListWrap">
     <el-table
            ref="multipleTable"
            :data="list"
            tooltip-effect="dark"
            border
            stripe
            :header-cell-style="{background:'#f4f4f4',color:'#666'}"
            style="width:1156px"  
            >
            <el-table-column
            type="selection"
            width="40">
            </el-table-column>
            <el-table-column
            label="标题"
            width="158">
            <template slot-scope="scope">{{ scope.row.articleTitle }}</template>
            </el-table-column>
            <el-table-column
            label="标签"
            width="158">
            <template slot-scope="scope">
                <div class="tags">
                    <el-tag v-for="(item, index) in scope.row.articleTags"  :key="index">{{item}}</el-tag>
                </div>
            </template> 
            </el-table-column>
            <el-table-column
            prop="articleAuthorName"
            label="投稿人"
            width="158"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="articleAuthorAccount"
            label="投稿账号"
            width="158"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="ctime"
            label="投稿时间"
            width="158"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="articleStatus"
            label="状态"
            width="158"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="操作"
                width="158">
                <template slot-scope="scope">
                    <el-button @click="ischeck(scope.row.articleId,scope.row.nowlevel)" type="text" size="small">详情</el-button>
                    <el-button @click="GetArticleOperate(scope.row.articleId)" type="text" size="small">操作轨迹</el-button>
                </template>
             </el-table-column>
        </el-table>
            <el-dialog title="操作轨迹" :visible.sync="dialogFormVisible"> <!--弹出框-->
                <ArticleOperate :updatedata="updatedata" ></ArticleOperate>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">关闭</el-button>
                </div>
           </el-dialog> 
      
</div>
  
</template>

<script>

import ArticleOperate from '@/components/article/task/articleOperate.vue'
import Bus from '../../common/bus.js'
import { getArticleInfo,getArticleOperate } from '../../../service/getData.js'//引入接口
  export default {
      props:['isLoading'],
    data() {
      return {
       datas:{},
       list:[],
       value:{},
       title:"",
        dialogFormVisible :false,
       detaildata:{},
       updatedata:[],
       tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    },
   methods:{
      
      ischeck(a,b ){
              if(b!==6){
                b=0
            }else{
                b=1
            }
            console.log(a)
             var params = {};
            params.articleId=a
            params.checkStatus=b
            console.log(params)
             this.$router.push({name:"backtextTaskischeck",  query:{...params}})
     },
        GetArticleOperate(a){//获取轨迹详情数据 articleOperate
            console.log(a)
            this.dialogFormVisible =true
             var params = {};
            params.articleId=a
            getArticleOperate(params).then((res) => {            
                var res = JSON.parse(res); 
                console.log(res.data)
                this.updatedata=res.data              
				}).catch(err => {
				 	alert('error'+err);
                })
     }
    },
    computed:{

    },
    mounted () {
      Bus.$on('getBackText', (data) => {
        var data = JSON.parse(data);
        console.log(data)
      this.datas=data
      this.list=data.data.list
      this.list.forEach(item => {
            switch(parseInt(item.articleStatus)){
                case 0:
                    item.articleStatus = '退稿至投稿人'
                    break;
                case 1:
                    item.articleStatus = '退稿至专家'
                    break;            
                default:
                    item.articleStatus = '退稿至编辑'
            }
        })
      })
     
    },
     components:{
      ArticleOperate
    }
     
    }

</script>
<style  lang="less">

.backtextListWrap{
    .el-tag{
        margin:0 5px 5px 0;
    }
}   
</style>
