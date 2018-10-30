<template>
<div >
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
            width="100">
            <template slot-scope="scope">{{ scope.row.articleTitle}}</template>
        </el-table-column>
        <el-table-column
            label="标签"
            width="120">
            <template slot-scope="scope">
                <el-tag v-for="(item, index) in scope.row.articleTags"  :key="index">{{item}}</el-tag></template>
        </el-table-column>
        <el-table-column
            prop="articleAuthorName"
            label="投稿人"
            width="140">
        </el-table-column>
        <el-table-column
            prop="articleAuthorAccount"
            label="投稿账号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="overlookNum"
            label="浏览量"
            width="100">
        </el-table-column>
        <el-table-column
            prop="commentNum"
            label="评论数	"
            width="100">
        </el-table-column>
         <el-table-column
            prop="supportNum"
            label="获赞数	"
            width="100">
        </el-table-column>
         <el-table-column
            prop="createTime"
            label="投稿时间	"
            width="100">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态	"
            width="100">
        </el-table-column>
        <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="ischeck(scope.row.id,scope.row.nowlevel)" type="text" size="small">修改</el-button>
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


import Bus from '../../../common/bus.js'
import ArticleOperate from '../../../article/task/articleOperate.vue'
import { getArticleInfo,getArticleOperate } from '@/service/getData.js'//引入接口
  export default {
   props:['isLoading'],
    data() {
      return {
       ths:this.th,
       datas:{},
       list:[],
       value:{},
       title:"",
       dialogFormVisible :false,
       detaildata:{},
       updatedata:{},
       tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    },
   methods:{
     ischeck(a,b ){
            if(b===0&b===7){
                b=0
            }else{
                b=1
            }
            console.log(a)
             var params = {};
            params.articleId=a
            params.checkStatus=b
            getArticleInfo(params).then((res) => {
                console.log(res)
                var res = JSON.parse(res);                 
                   this.$router.push({name:"Taskischeck",  query:{...res}})
				}).catch(err => {
				 	alert('error'+err);
                })
     },
        GetArticleOperate(a,b){//获取轨迹详情数据 articleOperate
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
      handleSelectionChange(val) {
           var ids=[]
           for(let  x in val){
              ids=[...phones,val[x].id]
           }
           console.log(ids)
           // phones=Array.from(new Set(phones))
           // console.log(phones)
           this.$emit("getids",ids)
      }
    },
    computed:{
          

    },
    mounted () {
      Bus.$on('getArticle', (data) => {
        var data = JSON.parse(data);
      this.datas=data
      this.list=data.data.list
      this.list.forEach(item => {
            switch(parseInt(item.status)){
                case 0:
                    item.status = '审核中'
                    break;
                case 1:
                    item.status = '审核通过'
                    break;
                case 2:
                    item.status = '已退稿'
                    break;
                default:
                    item.status = '被退稿'
            }
        })
      })
     
    },
     components:{
      
    }
     
    }

</script>
<style scoped >
   table
        {
            border-collapse: collapse;
            
            text-align: center;
        }
        table td, table th
        {
            border: 1px solid #cad9ea;
            color: #666;
            height: 30px;
             text-align: center;
        }
        table thead th
        {
            background-color: #CCE8EB;
            width: 100px;
             text-align: center;
        }
        table tr:nth-child(odd)
        {
            background: #fff;
             text-align: center;
        }
        table tr:nth-child(even)
        {
            background: #F5FAFA;
             text-align: center;
        }
        *{margin: 0; padding: 0}
  .add{
    position: absolute;
    top: 50px ;
    left:300px;
    background: #ffffff;
    height: 472px;
    width: 886px;
    z-index: 99999
}

</style>
