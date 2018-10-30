<template>
<div>
    <div>
        <div>
            <div  >
                <h3>评论列表</h3>
                <el-input
                    placeholder="请输入内容"
                    suffix-icon="el-icon-search"
                    v-model="input21">
                </el-input>
                <el-button icon="el-icon-search"  type="primary" size="small" >搜索</el-button>
            </div>
            <div>
                <el-button type="primary">搜索全部<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div> 
        </div>
        <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            style="width: 100%">
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
            property="date"
            label="头像"
            width="120">
            </el-table-column>
            <el-table-column
            property="name"
            label="昵称"
            width="120">
            </el-table-column>
            <el-table-column
            property="address"
            label="评论的内容">
            </el-table-column>
            <el-table-column
            property="address"
            label="被回复数">
            </el-table-column>
            <el-table-column
            property="address"
            label="评论时间">
            </el-table-column>
             <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button  type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
     
</div>
   
</template>
<script>
export default {

    data(){
        return{
         

        }
    },
    methods:{
        
    },
    created(){
       
    }
}
</script>
<style lang="less" >

</style>

