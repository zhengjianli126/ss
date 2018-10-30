<template>
    <div class="applicants">
        <heads></heads>
        <div style="margin-top:20px;">
            <Listhead :head='head' @getparams="searchAction"></Listhead>
        </div>
        <div>
            <div class="btn">
                <el-button plain @click="openSendMessage">发送消息</el-button>
                <el-button plain>导出Excel</el-button>
            </div>

            <List style="padding-left:30px;" :isLoading="isLoading" :head="head" @getparmas="getparmas"></List>

            <Pagination style="padding-left:30px; margin-top:10px"  class="pag" @getparams="searchAction"></Pagination>   
        </div>

        <!-- 发送消息 -->
        <el-dialog title="发送消息" :visible.sync="dialogFormVisible" @close="closeDialog">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="消息类型" prop="messageType" :label-width="formLabelWidth">
                    <el-select v-model="form.messageType" placeholder="请选择">
                        <el-option label="短信" value="0"></el-option>
                        <el-option label="站内信" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消息内容" prop="messageInfo" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.messageInfo" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button @click="sendMessage('form')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Heads from "../common/head.vue";
import Bus from "../common/bus.js";
import List from "./applicantsList.vue";
import Listhead from "./listhead.vue";
import Pagination from "../common/Pagination.vue";
import { getAttendmeetByCondition,sendMeetMessage } from "../../service/getData.js"
export default {
    data() {
        return {
            head:[
                {
                    id: "01",
                    name: "真实姓名",
                    type: "text",
                    plaseholder: "",
                    keys: "userName",
                    names: { value: "" },
                    flag: true
                },
                {
                    id: "02",
                    name: "审核状态",
                    type: "select",
                    keys: "isCheck",
                    names: { value: "" },
                    option: [
                    {
                        id: "01",
                        value: "",
                        key: "全部"
                    },
                    {
                        id: "02",
                        value: "0",
                        key: "待审核"
                    },
                    {
                        id: "03",
                        value: "1",
                        key: "通过"
                    },
                    {
                        id: "04",
                        value: "2",
                        key: "未通过"
                    }
                    ]
                },
                {
                    id: "03",
                    name: "签到状态",
                    type: "select",
                    keys: "isSign",
                    names: { value: "" },
                    option: [
                    {
                        id: "01",
                        value: "",
                        key: "全部"
                    },
                    {
                        id: "02",
                        value: "0",
                        key: "已签到"
                    },
                    {
                        id: "03",
                        value: "1",
                        key: "未签到"
                    }
                    ]
                },
            ],
            data:{},
            list: [],
            isLoading: true,
            popUpShow: false,
            form: {
                userIds:'',
                phoneNums:'',
                messageType:'',
                messageInfo:''
            },
            rules: {
                messageInfo: [
                    { required: true, message: '请输入要发送的内容', trigger: 'blur' }
                ],
                messageType: [
                    { required: true, message: '请选择消息类型', trigger: 'change' }
                ]
            },
            dialogFormVisible: false,
            formLabelWidth: '100px'
        };
    },
    methods: {
        searchAction(str){
            // 参数
            // meetId                   会议id，必填
            // userName                 用户真实姓名，非必填
            // isCheck                  审核状态，非必填 0:待审核 1:通过 2:未通过
            // isSign                   签到状态，非必填 0:未签到 1:已签到
            // specialCommittee         专委会名称，非必填，传对应数字
            // page                     当前页数，必填
            // pageSize                 每页显示条数，必填

            console.log(str)

            // 开启loading状态
            this.isLoading = true;
            str.meetId = this.$route.query.meetId
            getAttendmeetByCondition(str).then(res => {
                this.listdata = res;
                //console.log(res)
                Bus.$emit("getpage", res);
                Bus.$emit("getdata", res);

                //关闭查询按钮loading
                this.Emit.$emit('closeLoading');
                
                // 关闭loading状态
                this.isLoading = false;
            }).catch(err => {
                console.log("error:" + err)
            })
        },
        getparmas(str){
            var idArr = []
            var phoneArr = []
            str.forEach(item => {
                idArr.push(item.userId)
                phoneArr.push(item.phoneNum)
            })

            this.form.userIds = idArr.join(',')
            this.form.phoneNums = phoneArr.join(',')
        },
        openSendMessage(){
            this.dialogFormVisible = true
        },
        sendMessage(formName){
            // 发送消息
            var parmas = {}
            parmas.phoneNums = this.form.phoneNums
            parmas.messageType = this.form.messageType
            parmas.messageInfo = this.form.messageInfo
            parmas.userIds = this.form.userIds
            
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    sendMeetMessage(parmas).then(res => {
                        console.log(res);
                        this.$notify({
                            title: '成功',
                            message: '消息发送成功',
                            type: 'success'
                        });
                        this.$refs[formName].resetFields();
                        this.dialogFormVisible = false
                    })
                    .catch(err => {
                        this.$notify.error({
                            title: '错误',
                            message: '消息发送失败'
                        });
                        console.log("error" + err);
                    });
                    //alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        closeDialog(){
            this.dialogFormVisible = false
        }
    },
    computed: {},
    mounted() {},
    components: {
        Heads,
        Bus,
        Listhead,
        List,
        Pagination
    },
    create(){}
};
</script>
<style lang="less">
.applicants{
    margin-left:5px;
    padding-bottom:30px;
    .btn{
        margin: 15px;
        margin-left: 0;
        padding-left:30px;
    }
}
</style>
