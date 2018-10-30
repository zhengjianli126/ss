<template>
<div class="tableListWrap" v-loading="isLoading">
    <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        border
        stripe
        :header-cell-style="{background:'#f4f4f4',color:'#666'}"
        style="width:1156px">
        <el-table-column
            label="选中"
            width="55">
            <template slot-scope="scope">
                <el-radio @click.native="changeRadio(scope,$event)" v-model="rowChecked" :label="scope.$index"></el-radio>
            </template>
        </el-table-column>
        <el-table-column
            label="操作员账号"
            width="100">
            <template slot-scope="scope">{{ scope.row.adminAccount }}</template>
        </el-table-column>
        <el-table-column
            label="操作员姓名"
            width="120">
            <template slot-scope="scope">{{ scope.row.adminName }}</template>
        </el-table-column>

        <el-table-column
            prop="adminTelephone"
            label="手机号"
            width="140">
        </el-table-column>
        <el-table-column
            prop="adminEditIdentityString"
            label="文章专栏"
            width="100">
        </el-table-column>
        <el-table-column
            prop="selfAdminQuestion"
            label="问题专栏"
            width="100">
        </el-table-column>
        <el-table-column
            prop="roleCodeString"
            label="所属角色	"
            width="100">
        </el-table-column>
        <el-table-column
            prop="creatTimeString"
            label="创建时间	"
            width="170">
        </el-table-column>
        <el-table-column
            prop="lastLoginTimeString"
            label="最近登录时间	"
            width="170">
        </el-table-column>
        <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="update(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-dialog title="修改" :visible.sync="dialogFormVisible"> <!--弹出框-->
            <Oupdate :updatedata="updatedata" @getchange='getchange' ref="Oupdate"></Oupdate>
            <!-- <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button @click="getchange('updatedata')">确定</el-button>
            </div> -->
           </el-dialog>
           <el-dialog title="详情" :visible.sync="dialogFormVisible1"> <!--弹出框-->
                  <Odetails :detaildata='detaildata'></Odetails>
                   <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible1 = false">关闭</el-button>
                    </div>
           </el-dialog>

</div>
</template>

<script>
import Bus from './bus.js'
import Oupdate from '../pages/Oupdate.vue'
import Odetails from '../pages/Odetails.vue'
import {formatDate} from './formatDate.js'
import { Change} from '../../service/getData.js'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    props:['isLoading'],
    data() {
      return {
       rowChecked:'',
       isChecked:false,
       datas:{},
        radio: true,
       list:[],
       value:{},
       dialogFormVisible1 :false,
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
        detail(x){
            this.detaildata=x
            console.log(this.detaildata)
            this.dialogFormVisible1=true
        },
        update(x){
            this.updatedata=x
            this.dialogFormVisible=true
        },
        getchange(){
            console.log(111)
         this.Emit.$emit('deleteSuccess');
              this.dialogFormVisible=false
             
        },
       changeRadio(row,event){
           if(event.target.type == 'radio'){
                if(this.rowChecked === row.$index){
                    this.rowChecked = '';

                }
                this.$nextTick(function(){
                    if(event.target.checked){
                       console.log(row.row.adminTelephone,row.row.adminAccount)
                       var phone=[row.row.adminTelephone,row.row.adminAccount]
                       this.$emit("getphone",phone)
                    }
                })
           }
       }
    },
    computed:{


    },
    mounted () {
      Bus.$on('getdata', (data) => {
        var data = JSON.parse(data);
        this.datas=data
        this.list=data.data.list;
        //处理格式
        this.list.forEach(item => {
            switch(parseInt(item.adminEditIdentity)){
                case 0:
                    item.selfAdminEditIdentity = '主编'
                    break;
                case 1:
                    item.selfAdminEditIdentity = '专家'
                    break;
                case 2:
                    item.selfAdminEditIdentity = '编辑'
                    break;
                default:
                    item.selfAdminEditIdentity = '普通'
            }
            switch(parseInt(item.adminQuestion)){
                case 0:
                    item.selfAdminQuestion = '普通'
                    break;
                default:
                    item.selfAdminQuestion = '工厂'
            }
        })
      });
    },
    destoryed(){
        this.Emit.$off('closeLoading');
    },
     components:{
        Oupdate,Odetails
    }
}
</script>
<style scoped>
.el-radio__label{
    display:none;
}
</style>

<style  lang="less">


</style>
