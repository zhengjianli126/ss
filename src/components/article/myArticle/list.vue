<template>
<div class="myArticleListWarp" > 
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        border
        stripe
        :header-cell-style="{background:'#f4f4f4',color:'#666'}"
        style="width:1156px">
        <el-table-column
            label="标题"
            width="231">
            <template slot-scope="scope">{{ scope.row.articleInfos[0].articleTitle }}</template>
        </el-table-column>
        <el-table-column
            label="标签"
            width="231">
              <template slot-scope="scope">
                <div class="tags">
                    <el-tag v-for="(item, index) in scope.row.articleInfos[0].articleTags"  :key="index">{{item}}</el-tag>
                </div>
            </template> 
           
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="投稿时间"
            width="231">
        </el-table-column>
        <el-table-column
            prop="nowlevel"
            label="状态	"
            width="231">
        </el-table-column>
        <el-table-column
        label="操作"
        width="231">
        <template slot-scope="scope">
            <el-button v-if="scope.row.nowlevel==='被退稿'" @click="ischeck(scope.row.id,scope.row.nowlevel)" type="text" size="small">重新投稿</el-button>
            <el-button @click="ischeck(scope.row.id,scope.row.nowlevel)" type="text" size="small">详情</el-button>
            <el-button @click="GetArticleOperate(scope.row.id,scope.row.articleInfos[0].articleTitle)" type="text" size="small">操作轨迹</el-button>
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
       levels:'',
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
              this.$router.push({name:"Taskischeck",  query:{...params}})
           
     },
     detail(a,b ){
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
             this.$router.push({name:"Taskischeck",  query:{...params}})
         
     },
     GetArticleOperate(a,b){//获取轨迹详情数据 articleOperate
     console.log(this.level)
            console.log(a)
            this.dialogFormVisible =true
             var params = {};
            params.articleId=a
            getArticleOperate(params).then((res) => {
                this.title=b //获取轨迹的标题
                var res = JSON.parse(res); 
                console.log(res.data)
                this.updatedata=res.data              
				}).catch(err => {
				 	alert('error'+err);
                })
     },
      level(){
              let user=JSON.parse(localStorage['users'])
              console.log(user.admin.adminEditIdentity)
                    switch(parseInt(user.admin.adminEditIdentity)){
                        case 1:
                          this.levels=  '待专家审核'
                            break;
                        case 2:
                           this.levels= '待编辑审核'
                            break;
                        case 3:
                           this.levels=  '待主编审核'
                            break;
                         default:
                            this.levels=  ''
              }
              console.log(this.levels)
        },
    },
    computed:{
        
        account(){
              let user=JSON.parse(localStorage['users'])
             return user.admin.adminAccount
        }


    },
    mounted () {
        this.level()
      Bus.$on('getMyArticle1', (data) => {
        var data = JSON.parse(data);
        console.log(data)
      this.datas=data
      this.list=data.data.list
      
        this.list.forEach(item => {
            switch(parseInt(item.nowlevel)){
                case 0:
                    item.nowlevel = '待专家审核'
                    break;
                case 1:
                    item.nowlevel = '专家审核中'
                    break;
                case 2:
                    item.nowlevel = '待编辑审核'
                    break;
                case 3:
                    item.nowlevel = '编辑审核中'
                    break;
                case 4:
                    item.nowlevel = '待主编审核'
                    break;
                case 5:
                    item.nowlevel = '主编审核中'
                    break;
                case 6:
                    item.nowlevel = '审核通过'
                    break;
                default:
                    item.nowlevel = '被退稿'
            }
        })
      })
     
    },
     components:{
       ArticleOperate
    }
     
    }

</script>

<style type="text/css" lang="less">
.myArticleListWarp{
    .el-tag{
        margin:0 5px 5px 0;
    }
}
</style>