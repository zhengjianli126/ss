<template>
    <div class="wish">
        <heads></heads>
        <div class="main">
            <el-form :inline="true" :model="headData" :rules="rules" label-position="right" label-width="80px">
                <el-form-item label-width="100px" label="许愿人" size="small" style="width: 400px;">
                    <el-input v-model="headData.userRealName" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="手机号" size="small" style="width: 400px;" prop="phoneNum">
                    <el-input v-model="headData.phoneNum" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="许愿时间" size="small" style="width: 400px;">
                    <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="headData.time" style="width: 250px;"></el-date-picker>
                </el-form-item>
                <el-form-item label-width="100px" label="状态" size="small" style="width: 400px;">
                    <el-select v-model="headData.status" placeholder="请选择" style="width: 250px;">
                        <el-option style="display:block;" v-for="(item, index) in headData.option" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="small">
                    <el-button icon="el-icon-search" :loading="isLoading" type="primary" size="small" @click="searchAction()">查询</el-button>
                </el-form-item>
            </el-form>

            <div class="table">
                <div class="btn_box">
                    <el-button plain @click="deal()">处理</el-button>
                </div>

                <div class="tableListWrap" v-loading="isLoading">
                    <el-table ref="multipleTable" :data="data" tooltip-effect="dark" border stripe :header-cell-style="{background:'#f4f4f4',color:'#666'}" style="width: 1156px" @selection-change="selectionChange">
                        <el-table-column width="48" label="选择" align="center" type="selection" :selectable="canSelect"></el-table-column>
                        <el-table-column prop="userRealName" label="许愿人" width="138" align="center"></el-table-column>
                        <el-table-column prop="userName" label="昵称" width="138" align="center"></el-table-column>
                        <el-table-column prop="phoneNum" label="手机号" width="138" align="center"></el-table-column>
                        <el-table-column prop="moonCash" label="月亮币" width="100" align="center"></el-table-column>
                        <el-table-column prop="ctimeString" label="许愿时间" width="180" align="center"></el-table-column>
                        <el-table-column prop="statusString" label="状态" width="138" align="center">
                            <template slot-scope="scope">
                                <span :class="{'blue': scope.row.status === 1, 'red': scope.row.status === 0}">{{ scope.row.statusString }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="155" align="center">
                            <template slot-scope="scope">
                                <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
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

                    <el-dialog title="详情" :visible.sync="showDetail">
                        <!--弹出框-->
                        <el-form :inline="true" :model="detailData" label-position="right" label-width="80px">
                            <el-form-item label="许愿人" size="small">
                                <el-input v-model="detailData.userName" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="昵称" size="small">
                                <el-input v-model="detailData.userName" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" size="small">
                                <el-input v-model="detailData.phoneNum" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="月亮币" size="small">
                                <el-input v-model="detailData.moonCash" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="许愿时间" size="small">
                                <el-input v-model="detailData.ctimeString" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="愿望" size="small">
                                <el-input type="textarea" v-model="detailData.wishContent" style="width: 500px;" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="状态" size="small">
                                <el-input v-model="detailData.statusString" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="处理时间" size="small">
                                <el-input v-model="detailData.lastUpdateTimeString" readonly></el-input>
                            </el-form-item>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                            <el-button @click="showDetail = false">关闭</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import Heads from '../common/head.vue';
import { queryWishes, dealWishes } from '@/service/getData';
export default {
    created(){
        this.searchAction()
    },
    data() {
        var checkPhoneNum = (rule, value, callback) => {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!value) {
                return '';
            }
            setTimeout(() => {
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号码'));
                }
            }, 1000);
        };
        return {
            isLoading: false,
            showDetail: false,
            headData: {
                userRealName: '',
                phoneNum: '',
                time: '',
                status: '',
                option: [
                    {
                        label: '全部',
                        value: ''
                    },
                    {
                        label: '未处理',
                        value: 0
                    },
                    {
                        label: '已处理',
                        value: 1
                    }
                ]
            },
            detailData: {},
            data: [],
            rules: {
                phoneNum: [
                    { validator: checkPhoneNum, trigger: 'blur' }
                ]
            },
            selectedData: [],
            page: 1,
            pageSize: 10,
            total: 0
        }
    },
    components: { Heads },
    methods: {
        //  查询愿望列表
        searchAction() {
            this.isLoading = true;
            let data = {
                userRealName: this.headData.userRealName,
                phoneNum: this.headData.phoneNum,
                ctime: this.headData.time[0] || '',
                ctime1: this.headData.time[1] || '',
                status: this.headData.status,
                page: this.page,
                pagesize: this.pageSize
            }
            queryWishes(data).then(res => {
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
        
        //  点击详情出模态窗
        detail(params) {
            this.showDetail = true;
            this.detailData = params;
        },

        //  批量处理愿望
        deal() {
            if (!this.selectedData.length) {
                return false;
            }
            this.isLoading = true;
            let data = {
                wishIds: this.selectedData.join(',')
            };
            dealWishes(data).then( res => {
                this.isLoading = false;
                console.log(res);
                res = JSON.parse(res);
                if (res.respCode === '0') {
                    this.selectedData = [];
                    this.searchAction();
                } else {
                    this.$message.error('服务器错误');
                }
            });
        },

        //  选择发生变化触发的事件
        selectionChange(val) {
            this.selectedData = [];
            val.forEach(item => {
                this.selectedData.push(item.wishId);
            });
        },

        //  该条愿望是否能被选中
        canSelect(row, index) {
            if (row.status) {
                return false;
            } else {
                return true;
            }
        },

        //  分页相关
        handleCurrentChange(val) {
            this.page = val;
            this.searchAction();
        },

        handleSizeChange(val) {
            this.pageSize = val;
            this.searchAction();
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
            color: #409EFF;
        }
        .red {
            color: #F78989;
        }
    }
}
</style>

