<template>
    <div class="listHeadWrap">
        <ul class="lhUl">
            <li class="lhList" v-for="item in list" :key="item.id">
                <span class="lhName">{{item.name}} </span>：
                <div class="block" style="display: inline-block;" v-if="!item.type">
                    <el-date-picker
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :value-format="'yyyy-MM-dd hh:mm:ss'"
                    v-model='item.names.value'>
                    </el-date-picker>
                </div>
                <el-select class="comSelect" v-if="!item.flag" v-model='item.names.value'>
                    <el-option style="display:block;" v-for="x in item.option" :label="x.key"  :value="x.value" :key="x.id" ></el-option>
                </el-select>
                <input class="comInput" :type="item.type" :placeholder="item.plaseholder" v-model='item.names.value' v-if="item.flag && item.type"/>
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
            page:1
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
        },
        destoryed(){
            this.Emit.$off('closeLoading');
        },
        methods : {
			searchAction(){
                this.isLoading = true;
                var params = {};
                var arr=this.list
                var value=''
                var pkey=''
                for (var x in arr) {
                    let cur = arr[x];
                    if(!cur.type){
                        var value1 = cur.names.value[0] || '';
                        var value2 = cur.names.value[1] || '';
                        var pkey1 = cur.keys[0];
                        var pkey2 = cur.keys[1];
                        params[pkey1] = value1;
                        params[pkey2] = value2;
                        continue;
                    }
                    value = cur.names.value;
                    pkey = cur.keys;
                    params[pkey] = value
                }
                params.pageSize=this.pageSize;
                params.page=this.page
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
 <style lang="less">
 .listHeadWrap{
     border-bottom:1px solid #efefef;
     .lhList{
        font-size: 14px;
        display: inline-block;
        padding-right: 50px;
        overflow: hidden;
        padding-bottom:15px;
        .lhName{
            width: 80px;
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
         width:200px;
     }
     .comSelect{
          width:200px;
     }
     .el-input.el-input--suffix .el-input__inner{
         height:30px !important;
     }
 }
</style>

