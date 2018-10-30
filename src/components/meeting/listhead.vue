<template>
    <div class="listHeadWrap">
        <ul class="lhUl">  
            <li class="lhList" v-for="item in list" :key="item.id">
                <span class="lhName">{{item.name}}：</span>
                <span class="block" v-if="item.type == 'daterange'">
                    <el-date-picker
                        v-model="item.names.value"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </span>
                <span class="block" v-if="item.type == 'datetime'">
                    <el-date-picker
                        v-model="item.names.value"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </span>
                <el-select class="comSelect"  v-if="item.type == 'select'" v-model='item.names.value'>
                    <el-option style="display:block;" v-for="x in item.option" :label="x.key"  :value="x.value" :key="x.id" ></el-option>
                </el-select>
                <input class="comInput" type="text" :placeholder="item.plaseholder" v-model='item.names.value'  v-if="item.type == 'text'"/>
            </li>
            <li  class="lhList" style="padding-left:15px;"><el-button icon="el-icon-search" :loading="isLoading" type="primary" size="small" @click="searchAction(1)">查询</el-button></li>
        </ul>
    </div>
</template>
<script>
import Bus from '../common/bus.js'
export default {
    props:['head'],
    data(){
        return{
            list:this.head,
            data:[],
            isLoading:false,
            pageSize:10,
            page:1,
        }
    },
        created(){
            this.searchAction()
        },
        mounted(){
            //关闭按钮的loading
            this.Emit.$on('closeLoading',this.closeLoading);
            //页面显示数目变化
            this.Emit.$on('handleSizeChange',this.setSelectionParams);
            //页数变化
            this.Emit.$on('handleCurrentChange',this.setSelectionParams);
            //监听再次查询
            this.Emit.$on('deleteSuccess',this.searchAction);
        },
        destoryed(){
            this.Emit.$off('closeLoading');
            this.Emit.$off('deleteSuccess');
            this.Emit.$off('handleSizeChange');
            this.Emit.$off('handleCurrentChange');
        },
        methods : {
			searchAction(){
                this.isLoading = true;
                var params = {};
                var arr = this.list;
                var value = '';
                var pkey = '';
				for(var  x in arr){
                    value=  arr[x].names.value;
                    pkey=arr[x].keys;
                    params[pkey]=value;
                }
                params.pageSize=this.pageSize;
                params.page=this.page;
                this.$emit('getparams',params);
                //Bus.$emit("params",params);
            },
            setSelectionParams(params){
                if(params.form == 'curChange'){
                    this.page = params.val;
                }else if(params.form == 'sizeChange'){
                    this.page = 1;
                    this.pageSize = params.val;
                }
                this.searchAction();
            },
        closeLoading(){
            this.isLoading = false;
        }
    }
}
</script>
 <style lang="less" scoped>
 .listHeadWrap{
     border-bottom:1px solid #efefef;
     .lhList{
        font-size: 14px;
        display: inline-block;
        padding-right: 30px;
        overflow: hidden;
        padding-bottom:15px;
        .lhName{
            width: 100px;
            display: inline-block;
            text-align: right;
        }
     }
     .lhName{
         font-size:14px;
     }
     .comInput{
         height:30px;
         border-radius:5px;
         border:1px solid #ccc;
         outline:none;
         padding:5px;
         box-sizing:border-box;
         font-size:14px;
         width:240px;
     }
    .el-input__inner{
          width:240px;
     }
     .el-input.el-input--suffix .el-input__inner{
         height:30px !important;
     }
     .el-range-separator{
         width:18px !important;
     }
 }
</style>




