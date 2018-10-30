<template>
<div >
    <h3>角色新增
        <button  @click="qX">×</button>
    </h3>
        <div class="radd">
            <div>
                <span>角色名称：</span> <input type="text" v-model="roleName">
            </div>
            <div class="two">
                <span>权限配置：</span>
                <el-tree
                    :data="forsave.data"
                    show-checkbox
                    node-key="menuId"
                     ref="tree"
                     highlight-current
                     default-expand-all
                    :props="defaultProps">
                </el-tree>

            </div>
        </div>
        <div class="btn">
            <button @click="qX">取消</button>  <button @click="getCheckedKeys">确定</button> 
        </div>
    
</div>
</template>
<script>
import { Save } from '../../service/getData.js'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            defaultProps: {
                children: 'children',
                label: 'menuName',
                
            },
            data:{},
            roleName:'',
            menuId:[]
        }
    },
    create(){
       
    },
    methods:{
       ...mapMutations(["qX"]),
        getCheckedKeys(){
            this.menuId=this.$refs.tree.getCheckedKeys()
           var  params={}
           params.roleName=this.roleName
           params.creator=localStorage.getItem("name") 
            params.roleCode='7'
            params.menuIds=this.menuId[0]
            Save(params).then((res) => {
                alert(res)
                this.qX()
            }).catch(err => {
                alert('error' + err);
            })
       }
    },
   
    computed:{
         ...mapState(["flag","forsave"])
    }
}
</script>
<style lang="less" scoped>
  
     h3{
        height: 35px;
        width: 100%;
        border-bottom: 1px solid #000000;
        font-size: 16px;
        font-weight: 600;
        padding-left: 15px;
        line-height: 35px;
        background: #eeeeee;
        button{
            height: 100%;
            width:35px;
            font-size: 35px;
            float:right;
            border: none;
            background: #eeeeee
        }
    }
     .radd{
         
         margin: 30px 0 0 100px ;
        overflow: auto;
        width: 350px;
        span{
                width: 80px;
                display:inline-block;
                text-align: right
                
            }
       .el-tree{
            font-size: 14px;
             padding-bottom: 20px;
             overflow: auto;
            height: 400px;
            margin-left: 50px;
             
        } 

       
        input{
               height: 20px;
               width: 200px;
              
           }   
       }
       
 
   .btn{
       float: right;
       margin-right: 50px;
       margin-top: 20px;
        button{
           height: 30px;
           width: 80px;
           border-radius: 10px;
           background: hsl(204, 76%, 42%);
           color: #fff;
           margin-right: 20px
       }
   }
</style>
