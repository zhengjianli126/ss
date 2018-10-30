<template>
    <div>
        <heads></heads>
        <!-- 会议详情 -->
        <div class="box">
            <h5>会议基础信息</h5>
            <div class="leftBox">
                <el-form :model="meetInfo" label-width="100px" size="small">
                    <el-form-item label="会议名称：">
                        <el-input v-model="meetInfo.meetTitle" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间：">
                        <el-input v-model="meetInfo.beginTimeString" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="结束时间：">
                        <el-input v-model="meetInfo.endTimeString" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="会议城市：">
                        <el-input v-model="meetInfo.city" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址：">
                        <el-input v-model="meetInfo.meetAddress" readonly="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="rightBox">
                <el-form :model="meetInfo" label-width="100px" size="small">
                    <el-form-item label="会议内容">
                        <el-input type="textarea" rows="6" v-model="meetInfo.meetContent" readonly="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="box">
            <div class="leftBox">
                <h5>报名人基本信息</h5>
                <el-form :model="applicantInfo" label-width="100px" size="small">
                    <el-form-item label="姓名：">
                        <el-input v-model="applicantInfo.userName" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <el-input v-model="applicantInfo.phoneNum" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                        <el-input v-model="applicantInfo.userIdcard" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-input v-model="applicantInfo.userSex" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="医院：">
                        <el-input v-model="applicantInfo.userHospital" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="职务：">
                        <el-input v-model="applicantInfo.userPost" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="专委会：">
                        <el-input v-model="applicantInfo.specialCommittee" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="科室：">
                        <el-input v-model="applicantInfo.userOffice" readonly="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="rightBox">
                <h5>乘车住宿信息</h5>
                <el-form :model="attendmeet" label-width="100px" size="small">
                    <el-form-item label="类型：">
                        <el-input v-model="attendmeet.takeType" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="车次：">
                        <el-input v-model="attendmeet.carNum1" readonly="true"></el-input>
                        <el-input v-model="attendmeet.special1" readonly="true"></el-input>
                        <el-input v-model="attendmeet.carNum2" readonly="true"></el-input>
                        <el-input v-model="attendmeet.special2" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="住宿日期：">
                        <el-input v-model="attendmeet.takeType" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="房型：">
                        <el-input v-model="attendmeet.roomType" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="拼住人：">
                        <el-input v-model="attendmeet.togetherPeople" readonly="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="closebtn">
            <el-button plain @click="cancel">取消</el-button>
            <el-button plain>通过</el-button>
        </div>
    </div>
    
</template>
<script>
import Bus from '../common/bus.js'
import List from './meetlist.vue'
import Heads from '../common/head.vue'
import { getAttendmeetByMeetIdAndUserId } from '../../service/getData.js'
export default {
    data() {
        return {
            meetInfo: {},
            applicantInfo: {},
            attendmeet: {}
        }
    },
    create(){},
    mounted () {
        var params = {
            meetId: this.$route.query.meetId,
            userId: this.$route.query.userId
        }
        this.getdetail(params) // 接收数据
    },    
    methods : {
        cancel(){
            this.$router.go(-1);
        },
        getdetail(params) {
            //console.log(params)
            getAttendmeetByMeetIdAndUserId(params).then((res) => {
                console.log(JSON.parse(res))

                var info = JSON.parse(res).data
                var attendmeet = info.attendmeet

                this.meetInfo = info.meet;
                this.applicantInfo = {}
                this.applicantInfo.userName = info.userName
                this.applicantInfo.userRealName = info.userRealName
                this.applicantInfo.userSex = info.userSex
                this.applicantInfo.phoneNum = info.phoneNum
                this.applicantInfo.userHospital = info.userHospital
                this.applicantInfo.userOffice = info.userOffice
                this.applicantInfo.specialCommittee = info.specialCommittee
                this.applicantInfo.userPost = info.userPost
                this.applicantInfo.userIdcard = info.userIdcard

                this.attendmeet.takeType = attendmeet.takeType
                this.attendmeet.carNum1 = attendmeet.carNum1
                this.attendmeet.carNum1b = attendmeet.carNum1b
                this.attendmeet.carNum2 = attendmeet.carNum2
                this.attendmeet.carNum2b = attendmeet.carNum2b
                this.attendmeet.special1 = attendmeet.special1
                this.attendmeet.special2 = attendmeet.special2
                this.attendmeet.from1 = attendmeet.from1
                this.attendmeet.to1 = attendmeet.to1
                this.attendmeet.roomType = attendmeet.roomType
                this.attendmeet.togetherPeople = attendmeet.togetherPeople
            }).catch(err => {
                alert('error'+err);
            })
        },
    },
    components:{
        Heads
    }
}
</script>
<style lang="less" scoped>
.box {
    width: 1024px;
    margin: 30px;
    padding: 20px;
    border: 1px solid #eee;
}
.box:hover {
    box-shadow: #eee 1px 1px 3px 1px ;
}
.box::after {
    display: table;
    clear: both;
    content: '';
}
.box h5 {
    margin-bottom: 15px;
    padding-bottom: 10px; 
    border-bottom: 1px solid #ccc;
    font-size: 14px;
}
.leftBox,
.rightBox {
    float: left;
    width: 45%;
    margin: 0 15px;
}
.closebtn{
    padding: 40px 0 0 600px;
    bottom: 0px;
    width: 100%;
    height: 120px;
    background: #ffffff;
} 
</style>
