<template>
<div class="wish">
    <heads></heads>
    <div class="main">
        <el-form :inline="true" :model="headData" :rules="rules" label-position="right" label-width="80px">
            <el-form-item label-width="100px" label="被举报目标" size="small" style="width: 400px;">
                <el-input v-model="headData.reportTitle" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label-width="100px" label="被举报内容" size="small" style="width: 400px;">
                <el-input v-model="headData.content" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label-width="100px" label="举报时间" size="small" style="width: 400px;">
                <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="headData.time" style="width: 250px;"></el-date-picker>
            </el-form-item>

            <el-form-item label-width="100px" label="联系电话" size="small" style="width: 400px;" prop="phoneNum">
                <el-input v-model="headData.phoneNum" style="width: 250px;"></el-input>
            </el-form-item>

            <el-form-item label-width="100px" label="状态" size="small" style="width: 400px;">
                <el-select v-model="headData.status.value" placeholder="请选择" style="width: 250px;">
                    <el-option style="display:block;" v-for="(item, index) in headData.status.option" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="small">
                <el-button icon="el-icon-search" :loading="isLoading" type="primary" size="small" @click="searchAction()">查询</el-button>
            </el-form-item>
        </el-form>

        <div class="table">
            <div class="btn_box">
                <el-button plain @click="deleteReportHandle()">删除</el-button>
                <el-button plain @click="setReportSafeHandle()">未违规</el-button>
            </div>

            <div class="tableListWrap" v-loading="isLoading">
                <el-table ref="multipleTable" :data="data" tooltip-effect="dark" border stripe :header-cell-style="{background:'#f4f4f4',color:'#666'}" style="width: 1156px" @selection-change="selectionChange">
                    <el-table-column width="48" align="center" type="selection" :selectable="canSelect"></el-table-column>
                    <el-table-column prop="reportTitle" label="被举报目标" width="138" align="center"></el-table-column>
                    <el-table-column prop="content" label="被举报内容" width="138" align="center"></el-table-column>
                    <el-table-column label="举报人" width="138" align="center">
                        <template slot-scope="scope">
                                <span>{{scope.row.userRealName || scope.row.userName}}</span>
</template>
                        </el-table-column>
                        <el-table-column prop="phoneNum" label="联系电话" width="180" align="center"></el-table-column>
                        <el-table-column prop="ctime" label="举报时间" width="180" align="center"></el-table-column>
                        <el-table-column label="状态" width="138" align="center">
<template slot-scope="scope">
<span :class="{'green': scope.row.status === 1 || scope.row.status === 2, 'red': scope.row.status === 0}">{{ scope.row.statusString }}</span>
</template>
                        </el-table-column>
                        <el-table-column label="操作" width="165" align="center">
<template slot-scope="scope">
<el-button @click="detail(scope.row)" type="text" size="small">
    详情</el-button>
</template>
                        </el-table-column>
                    </el-table>

                    <el-dialog title="详情" :visible.sync="showDetail">
                        <!--弹出框-->
                        <el-form label-width="120px" :model="detailData" size="small">
                            <el-form-item label="被举报目标" style="width: 420px;">
                                <el-input v-model="detailData.reportTitle" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="被举报人" style="width: 420px;">
                                <el-input :value="detailData.userRealNameTo || detailData.userNameTo" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" style="width: 420px;">
                                <el-input v-model="detailData.phoneNumTo" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="被举报内容" style="width: 600px;">
                                <el-input type="textarea" v-model="detailData.content" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="举报人" style="width: 420px;">
                                <el-input :value="detailData.userRealName || detailData.userName" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" style="width: 420px;">
                                <el-input v-model="detailData.phoneNum" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="举报时间" style="width: 420px;">
                                <el-input v-model="detailData.ctime" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="状态" style="width: 420px;">
                                <el-input v-model="detailData.statusString" readonly></el-input>
                            </el-form-item>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                            <el-button @click="showDetail = false">关闭</el-button>
                        </div>
                    </el-dialog>

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
import {
    queryReport,
    deleteReport,
    setReportSafe
} from '@/service/getData';
export default {
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
            headData: {
                reportTitle: '',
                content: '',
                phoneNum: '',
                time: '',
                status: {
                    value: '',
                    option: [{
                            label: '全部',
                            value: ''
                        },
                        {
                            label: '待处理',
                            value: 0
                        },
                        {
                            label: '已删除',
                            value: 1
                        },
                        {
                            label: '未违规',
                            value: 2
                        }
                    ]
                }
            },
            rules: {
                phoneNum: [{
                    validator: checkPhoneNum,
                    trigger: 'blur'
                }]
            },
            data: [],
            selectedData: [],
            //  分页相关
            page: 1,
            pageSize: 10,
            total: 0,
            showDetail: false,
            detailData: {}
        }
    },
    components: {
        Heads
    },
    methods: {
        //  查询举报列表
        searchAction() {
            this.isLoading = true;
            let data = {
                reportTitle: this.headData.reportTitle,
                content: this.headData.content,
                phoneNum: this.headData.phoneNum,
                ctime: this.headData.time[0] || '',
                ctime1: this.headData.time[1] || '',
                status: this.headData.status.value,
                page: this.page,
                pageSize: this.pageSize
            }
            queryReport(data).then(res => {
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
                this.selectedData.push(item.reportId);
            });
        },

        //  该条报告是否能被选中
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
        },

        //  删除
        deleteReportHandle(params) {
            if (!this.selectedData.length) {
                   this.$message({
                            type: 'warning',
                            message: '请选择数据!'
                        });
                return false;
            }
            this.isLoading = true;
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    reportIds: this.selectedData.join(',')
                };
                deleteReport(data).then(res => {
                    this.isLoading = false;
                    res = JSON.parse(res);
                    if (res.respCode === '0') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.searchAction();
                    }else{
                         this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },

        //  设为未违规
        setReportSafeHandle(params) {
            if (!this.selectedData.length) {
                return false;
            }
            this.isLoading = true;
            let data = {
                reportIds: this.selectedData.join(',')
            };
            setReportSafe(data).then(res => {
                console.log(res);
                res = JSON.parse(res);
                if (res.respCode === '0') {
                    this.searchAction();
                }
            });
        },

        //  显示详情
        detail(params) {
            this.showDetail = true;
            this.detailData = params;
        }
    },
    mounted() {
        this.searchAction()
    },
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
        .green {
            color: rgba(19, 206, 102, 1);
        }
        .red {
            color: #f78989;
        }
    }
}
</style>
