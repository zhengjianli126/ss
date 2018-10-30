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
            label="选择"
            width="55">
            <template slot-scope="scope">
                <el-radio @click.native="changeRadio(scope,$event)" v-model="rowChecked" :label="scope.$index"></el-radio>
            </template>
        </el-table-column>
        <el-table-column
            prop="roleName"
            label="角色名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="roleStatusString"
            label="角色状态"
            width="140">
        </el-table-column>
        <el-table-column
            prop="updateTimeString"
            label="更新时间	"
            width="170">
        </el-table-column>
        <el-table-column
            prop="creator"
            label="操作员	"
            width="170">
        </el-table-column>
        <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="updatego(scope.row.roleCode,scope.row.roleName)" type="text" size="small">修改</el-button>
            <el-button @click="del(scope.row.roleCode)" type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
          <el-dialog title="角色修改" :visible.sync="dialogFormVisible"> <!--弹出框-->
                    <div class="radd">
                        <div>
                            <span>角色名称：</span> <input type="text" v-model="changeRoleName">
                        </div>
                        <div class="two">
                            <span>权限配置：</span>
                            <el-tree
                                :data="changedata"
                                show-checkbox
                                node-key="menuId"
                                ref="tree"
                                highlight-current
                                default-expand-all
                                :default-checked-keys="arr"
                                :props="defaultProps">
                            </el-tree>

                        </div>
                     </div>
                     <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
                    </div>
            </el-dialog>
</div>
  
</template>

<script>
import Bus from './bus.js'
import {formatDate} from './formatDate.js'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import { Del,Forupdate,Forsave ,Rupdate} from '../../service/getData.js'
  export default {
    props:['isLoading'],
    data() {
      return {
       datas:{},
       list:[],
       changeRoleName:'',
       changedata:[],
       defaultProps: {
                children: 'children',
                label: 'menuName',
                
            },
        data:{},
        roleName:'',
        menuId:[],
        arr:[],
        dialogFormVisible: false,
        isChecked:false,
       rowChecked:'',
        radio: true,
         tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
   methods:{
       ...mapMutations(["Radd","detail"]),  
       del(x) {
                var params ={}
               params.roleCode=x
                
               Del(params).then((res) => {
                this.Emit.$emit('deleteSuccess');
                var res = JSON.parse(res);
                console.log(res)
                if(res.respCode==='0'){
                    this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
                }else{
                    this.$message(res.respMsg);
                }
                
				}).catch(err => {
                    
				 	this.$message.error(err);
				})
       },
        changeRadio(row,event){
           if(event.target.type == 'radio'){
                if(this.rowChecked === row.$index){
                    this.rowChecked = '';
                }
                this.$nextTick(function(){
                    if(event.target.checked){
                        console.log(row.row.roleCode)
                        let code=row.row.roleCode
                        this.$emit('getroleCode', code)

                    }
                })
           }
       },
      Rundate(k) {
            var params = {}
            params.roleCode=k
            Forupdate(params).then((res) => {
                var res = JSON.parse(res);              
                this.changedata=res.data
                console.log( res)
                this.checkedkeys()
            }).catch(err => {
                alert('error' + err);
            })
          },
     getCheckedKeys(){
            this.menuId=this.$refs.tree.getCheckedKeys()
           var  params={}
           console.log(this.menuId)
            let user=JSON.parse(localStorage['users'])
            var menuIds=this.menuId.join(',')
            console.log(menuIds)
            params.roleName=this.changeRoleName
            params.creator=user.admin.adminAccount
            params.roleCode=user.admin.roleCode
            params.menuIds=menuIds
            console.log(params)
            Rupdate(params).then((res) => {
                 this.Emit.$emit('deleteSuccess');
                this.dialogFormVisible = false
                 var res = JSON.parse(res);
                console.log(res)
        
            }).catch(err => {
                alert('error' + err);
            })
       },
       checkedkeys(){
             for(let x in this.changedata){
               

                    if(!this.changedata[x].children){
                         if(this.changedata[x].isSelected==='true'){
                                this.arr.push(this.changedata[i].menuId) 
                         }
                        }
                    
                     else if(this.changedata[x].children){
                        for(let k in this.changedata[x].children){
                            if(this.changedata[x].children[k].isSelected==='true') {
                                this.arr.push(this.changedata[x].children[k].menuId) 
                            }
                       }
                    }    
                
            } 
          
       
        },
        updatego(x,y){ //点击出现弹窗
             this.Rundate(x) 
             this.changeRoleName=y
             this.dialogFormVisible= true
        }
         
    },
    computed:{
         ...mapState(["Rflags","flag1"]),
           

    },
    mounted () {
      Bus.$on('getdatas', (data) => {
        var data = JSON.parse(data);
      this.datas=data
      this.list=data.data.list
       //处理格式
        this.list.forEach(item => {
            switch(parseInt(item.roleStatus)){
                case 0:
                    item.roleStatus = '启用'
              
                default:
                    item.selfAdminEditIdentity = '停用'
            }
            
        })
      })
     
    },
     destoryed(){
        this.Emit.$off('closeLoading');
    },
     components:{
       

    },
    created(){
        
        
    }
     
    }

</script>
 <style lang="less">
 
    
</style>
