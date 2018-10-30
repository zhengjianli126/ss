<template>
<div class="taskListWarp">
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" border stripe :header-cell-style="{background:'#f4f4f4',color:'#666'}" style="width:1156px">
        <el-table-column label="标题" width="165">
            <template slot-scope="scope">{{ scope.row.articleTitle}}
</template>
        </el-table-column>
        <el-table-column
            label="标签"
            width="165">
<template slot-scope="scope">
<div class="tags">
    <el-tag v-for="(item, index) in scope.row.articleTags" :key="index">{{item}}</el-tag>
</div>
</template>
        </el-table-column>
       
        <el-table-column
            prop="articleAuthorName"
            label="投稿人"
            width="165">
        </el-table-column>
        <el-table-column
            prop="articleAuthorAccount"
            label="投稿账号"
            width="165">
        </el-table-column>
        <el-table-column
            prop="ctime"
            label="投稿时间"
            width="165">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态	"
            width="165">
        </el-table-column>
        <el-table-column
        label="操作"
        width="165">
<template slot-scope="scope">
<el-button v-if="scope.row.status==='审核中'||scope.row.status==='被退稿'" @click="update(scope.row.articleId,scope.row.nowlevel)" type="text" size="small">
    审核</el-button>
<el-button v-else @click="ischeck(scope.row.articleId,scope.row.nowlevel)" type="text" size="small">详情</el-button>
<el-button v-if="scope.row.status==='已退稿'" @click="back(scope.row.articleId)" type="text" size="small">撤回</el-button>
<el-button @click="GetArticleOperate(scope.row.articleId,scope.row.articleTitle)" type="text" size="small">操作轨迹</el-button>
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
import {
    getArticleInfo,
    getArticleOperate,
    revokeCheckBackArticle
} from '../../../service/getData.js' //引入接口
export default {
    props: ['isLoading'],
    data() {
        return {
            datas: {},
            list: [],
            value: {},
            title: "",
            dialogFormVisible: false,
            detaildata: {},
            updatedata: [],
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
        }
    },
    methods: {
        back(x) {
            let user = JSON.parse(localStorage['users'])
            var params = {};
            params.articleId = x //文章id，必填
            params.operateAccountName = user.admin.adminName
            params.operateAccountCode = user.admin.id //审核人账号，必填	
            params.operateAccountRole = user.admin.adminEditIdentity //审核人角色，必填 1:专家 2:编辑 3:主编
            revokeCheckBackArticle(params).then((res) => {
                console.log(res)
                var res = JSON.parse(res);
                if (res.respCode === "0") { //跳转主页面
                    this.$message({
                        showClose: true,
                        message: '撤回成功',
                        type: 'success'
                    });

                } else {
                       this.$message({
                        showClose: true,
                        message: res.respMsg,
                        type: 'success'
                    });
                }
            }).catch(err => {
                alert('error' + err);
            })
        },
        ischeck(a, b) {
            if (b !== 6) {
                b = 0
            } else {
                b = 1
            }
            console.log(a)
            var params = {};
            params.articleId = a
            params.checkStatus = b
            this.$router.push({
                name: "Taskischeck",
                query: { ...params
                }
            })
        },
        update(a, b) {
            if (b !== 6) {
                b = 0
            } else {
                b = 1
            }
            console.log(a)
            var params = {};
            params.articleId = a
            params.checkStatus = b
            this.$router.push({
                name: "mytasktasktotal",
                query: { ...params
                }
            })
        },
        GetArticleOperate(a, b) { //获取轨迹详情数据 articleOperate
            console.log(a)
            this.dialogFormVisible = true
            var params = {};
            params.articleId = a
            getArticleOperate(params).then((res) => {
                this.title = b //获取轨迹的标题
                var res = JSON.parse(res);
                console.log(res.data)
                this.updatedata = res.data
            }).catch(err => {
                alert('error' + err);
            })
        }
    },
    computed: {


    },
    mounted() {
        Bus.$on('getmytask', (data) => {
            var data = JSON.parse(data);
            this.datas = data
            this.list = data.data.list
            console.log(this.list)
            this.list.forEach(item => {
                switch (parseInt(item.status)) {
                    case 0:
                        item.status = '审核中'
                        break;
                    case 1:
                        item.status = '被退稿'
                        break;
                    case 2:
                        item.status = '审核通过'
                        break;
                    default:
                        item.status = '已退稿'
                }
            })
        })

    },
    components: {
        ArticleOperate
    }

}
</script>
<style>

</style>
