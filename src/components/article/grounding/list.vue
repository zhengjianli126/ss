<template>
<div class="groundListWarp">
         <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        border
        stripe
        :header-cell-style="{background:'#f4f4f4',color:'#666'}"
        style="width:1156px"
         @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="40">
        </el-table-column>
        <el-table-column
            label="标题"
            width="120">
            <template slot-scope="scope">
                <el-badge v-if="scope.row.isHot===1" value="hot" class="item">
                     {{ scope.row.articleInfos[scope.row.isCheck-1].articleTitle}}
                </el-badge>
               <div v-if="scope.row.isHot===2" >
                     {{ scope.row.articleInfos[scope.row.isCheck-1].articleTitle}}
                </div>
            </template>
        </el-table-column>
        <el-table-column
            label="标签"
            width="120">
            <template slot-scope="scope">
                <div class="tags">
                    <el-tag v-for="(item, index) in scope.row.articleInfos[scope.row.isCheck-1].articleTags"  :key="index">{{item}}</el-tag>
                </div>
            </template>           
        </el-table-column>
        <el-table-column
            prop="articleAuthorName"
            label="投稿人"
            width="140">
        </el-table-column>
        <el-table-column
            prop="articleAuthorAccount"
            label="投稿账号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="overlookNum"
            label="浏览量"
            width="80">
        </el-table-column>
        <el-table-column
            prop="commentNum"
            label="评论数	"
            width="80">
        </el-table-column>
         <el-table-column
            prop="supportNum"
            label="获赞数	"
            width="80">
        </el-table-column>
         <el-table-column
            prop="createTime"
            label="投稿时间	"
            width="100">
        </el-table-column>
        <el-table-column
            prop="isPublic"
            label="状态	"
            width="100">
        </el-table-column>
        <el-table-column
        label="操作"
        width="148">
        <template slot-scope="scope">
            <el-button v-if="scope.row.isPublic!=='已上架'" @click="update(scope.row.id,scope.row.nowlevel)" type="text" size="small">修改</el-button>
            <el-button @click="ischeck(scope.row.id,scope.row.nowlevel)" type="text" size="small">详情</el-button>
            <el-button @click="GetArticleOperate(scope.row.id)" type="text" size="small">操作轨迹</el-button>
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
             this.$router.push({name:"groundTaskischeck",  query:{...params}})
           
     },
       update(a,b ){
             if(b!==6){
                b=0
            }else{
                b=1
            }
            console.log(a)
             var params = {};
            params.articleId=a
            params.checkStatus=b
            this.$router.push({name:"groundTasktotal",  query:{...params}})
           
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
     },
      handleSelectionChange(val) {
           var ids=[]
           for(let  x in val){
              ids=[...ids,val[x].id]
           }
           console.log(ids)
           // phones=Array.from(new Set(phones))
           // console.log(phones)
           this.$emit("getids",ids)
      }
    },
    computed:{
         level(){
             
         } 

    },
    mounted () {
      Bus.$on('getGround', (data) => {
          console.log(data)
        var data = JSON.parse(data);
      this.datas=data
      this.list=data.data.list
      console.log(this.list)
      this.list.forEach(item => {
            switch(parseInt(item.isPublic)){
                case 0:
                    item.isPublic = '未上架'
                    break;
                case 1:
                    item.isPublic = '已上架'
                    break;            
                default:
                    item.isPublic = '已下架'
            }
        })
      })
     
    },
     components:{
      ArticleOperate
    }
     
    }

</script>
<style lang='less' >
.groundListWarp{
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }  
    .el-tag{
        margin:0 5px 5px 0;
    }
}

   

</style>
