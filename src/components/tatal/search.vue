<template>
    <div class="wish">
        <heads></heads>
        <div class="main">
            <el-form :inline="true" :model="headData" label-position="right" label-width="80px">
                <el-form-item label-width="100px" label="搜索关键字" size="small" style="width: 400px;">
                    <el-input v-model="headData.keyword" style="width: 250px;"></el-input>
                </el-form-item>

                <el-form-item label-width="100px" label="状态" size="small" style="width: 400px;">
                    <el-select v-model="headData.status.value" placeholder="请选择" style="width: 250px;">
                        <el-option style="display:block;" v-for="(item, index) in headData.status.option" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label-width="100px" label="排序" size="small" style="width: 400px;">
                    <el-select v-model="headData.sort.value" placeholder="请选择" style="width: 250px;">
                        <el-option style="display:block;" v-for="(item, index) in headData.sort.option" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label-width="100px" label="搜索时间" size="small" style="width: 400px;">
                    <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="headData.time" style="width: 250px;"></el-date-picker>
                </el-form-item>

                <el-form-item size="small">
                    <el-button icon="el-icon-search" :loading="isLoading" type="primary" size="small" @click="searchAction()">查询</el-button>
                </el-form-item>
            </el-form>

            <div class="table">
                <div class="btn_box">
                    <el-button plain @click="setHotHandle()">设为热门</el-button>
                    <el-button plain @click="cancelHotHandle()">取消热门</el-button>
                </div>

                <div class="tableListWrap" v-loading="isLoading">
                    <el-table ref="multipleTable" :data="data" tooltip-effect="dark" border stripe :header-cell-style="{background:'#f4f4f4',color:'#666'}" style="width: 1156px" @selection-change="selectionChange">
                        <el-table-column width="48" align="center" type="selection"></el-table-column>
                        <el-table-column prop="searchContent" label="搜索关键字" width="138" align="center"></el-table-column>
                        <el-table-column prop="searchCount" label="搜索次数" width="138" align="center"></el-table-column>
                        <el-table-column prop="ctimeMax" label="最近搜索时间" width="180" align="center"></el-table-column>
                        <el-table-column prop="isHotString" label="状态" width="138" align="center"></el-table-column>
                        <el-table-column label="操作" width="155" align="center">
                            <template slot-scope="scope">
                                
                                <el-button v-if="scope.row.isHot==0" @click="setHotHandle(scope.row)" type="text" size="small">设为热门</el-button>
                                <el-button v-if="scope.row.isHot==1" @click="cancelHotHandle(scope.row)" type="text" size="small">取消热门</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 30]"
                        :page-size.sync="pageSize"
                        :pager-count='5'
                        layout="total, sizes, prev, pager, next"
                        :total="total"
                        style="margin: 20px 0;">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import Heads from '../common/head.vue';
import { queryKeyword, setHot, cancelHot } from '@/service/getData';
export default {
    created(){
        this.searchAction();
    },
    data() {
        return {
            isLoading: false,
            headData: {
                keyword: '',
                time: '',
                status: {
                    value: '',
                    option: [
                        {
                            label: '全部',
                            value: ''
                        },
                        {
                            label: '热门',
                            value: 1
                        },
                        {
                            label: '非热门',
                            value: 0
                        }
                    ]
                },
                sort: {
                    value: '',
                    option: [
                        {
                            label: '时间',
                            value: 1
                        },
                        {
                            label: '搜索量',
                            value: 0
                        }
                    ]
                }
            },
            data: [],
            selectedData: [],
            //  分页相关
            page: 1,
            pageSize: 10,
            total: 0
        }
    },
    components: { Heads },
    methods: {
        //  查询关键词列表
        searchAction() {
            this.isLoading = true;
            let data = {
                searchContent: this.headData.keyword,
                isHot: this.headData.status.value,
                ctime: this.headData.time[0] || '',
                ctime1: this.headData.time[1] || '',
                sortWay: this.headData.sort.value,
                page: this.page,
                pageSize: this.pageSize
            }
            queryKeyword(data).then(res => {
                res = JSON.parse(res);
                this.isLoading = false;
                if (res.respCode === '0') {
                    this.total = res.data.total;
                    this.data = res.data.list;
                } else {
                    this.$message.error('服务器错误');
                }
            });
        },

        //  选择发生变化触发的事件
        selectionChange(val) {
            if (val.length > 10) {
                this.$message.error('热门关键字最大为10个！');
                return false;
            }
            this.selectedData = [];
            val.forEach(item => {
                this.selectedData.push(item.searchContent);
            });
        },

        //  分页相关
        handleCurrentChange(val) {
            this.page = val;
            this.searchAction();
        },

        handleSizeChange(val) {
            this.pageSize = val;
            this.searchAction();
        },

        //  设为热门
        setHotHandle(params) {
            if(!params){
                if (!this.selectedData.length) {
                     this.$message.error('请先选中一条数据！')
                    return false;
                }
            }
            console.log(params)
            this.isLoading = true;
            let data = {
                searchContents: this.selectedData.join(',')||params.searchContent
            };
            
            setHot(data).then( res => {
                this.isLoading = false;
                console.log(res);
                res = JSON.parse(res);
                if (res.respCode === '0') {
                    this.searchAction();
                }
            });
        },

        //  设为非热门
        cancelHotHandle(params) {
           if(!params){
                if (!this.selectedData.length) {
                     this.$message.error('请先选中一条数据！')
                    return false;
                }
            }
            console.log(params)
            this.isLoading = true;
            let data = {
                searchContents: this.selectedData.join(',')||params.searchContent
            };
            cancelHot(data).then( res => {
                console.log(res);
                res = JSON.parse(res);
                if (res.respCode === '0') {
                    this.searchAction();
                }
            });
        }
    }
}
</script>
<style lang="less">
.wish {
    .main {
        margin: 25px;
        margin-left: 35px;
        .el-range-separator {
            width: 28px;
            height: 32px;
            line-height: 34px;
        }
        .table {
            .btn_box {
                margin: 15px;
                margin-left: 0;
            }
        }
        .blue {
            color: #409eff;
        }
        .red {
            color: #f78989;
        }
    }
}
</style>
