<template>
<div class="meeting meetnewaddWrap">
    <heads></heads>
    <div class="meetNewHead">新增</div>
    <div class="meetbase">
      <div class="meetBaseInfo">会议基础信息</div>
      <div class="meetbaseOne">
        <div class="meetbaseLeft">
          <span style="font-size:14px;color:#606266;">会议名称：</span>
          <div class="meetNameInput">
            <el-input
              placeholder="请输入会议名称"
              v-model="meetingName"
              :disabled="disabledStatus"
              clearable>
            </el-input>
          </div>
          <div>
            <span style="font-size:14px;">开始时间：</span>
            <div style="width:200px;display:inline-block;margin-bottom:20px;height:35px;">  
              <el-date-picker
                style="width:200px;"
                v-model="valuestart"
                :disabled="disabledStatus"
                type="datetime"
                placeholder="开始时间">
              </el-date-picker>
            </div>  
          </div>
          <span style="font-size:14px;">结束时间：</span>
          <div style="width:200px;display:inline-block;margin-bottom:20px;height:35px;">  
            <el-date-picker
              style="width:200px;"
              v-model="valuelast"
              :disabled="disabledStatus"
              type="datetime"
              placeholder="结束时间">
            </el-date-picker>
          </div>  
          <span style="font-size:14px;">会议城市：</span>
          <div style="width:200px;display:inline-block;margin-bottom:20px;height:30px;">
             <el-cascader
              size="large"
              style="width:100%;"
              :options="options"
              :disabled="disabledStatus"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </div>  
          <span style="font-size:14px;">详细地址：</span>
          <div style="width:200px;display:inline-block;margin-bottom:20px;">
            <el-input
              placeholder="请输入详细地址"
              v-model="detailAddress"
              :disabled="disabledStatus"
              clearable>
            </el-input>
          </div>
        </div>
        <div class="meetbaseRight">
          <div class="rightmain" style="margin-bottom:20px;">
            <p style="width:60px;margin-left:40px;">封面图:</p>
             <upload dataId="signfileOne" :disabled="disabledStatus" :imgSrc="meetingDetail.meetingImage" @uploadSuccess="bannerUpload"></upload> 
          </div>
          <div class="rightcount">
            <p>会议内容:</p>
            <textarea :disabled="disabledStatus" v-model="meetCon" placeholder="请输入会议内容" name="" id="" cols="60" rows="10" style="border-color:#eee;resize:none;font-size:14px;padding:10px;"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="meetbase1">
      <div class="meetDate">会议日程</div>
      <!-- 会议日程面板开始 -->
      <div class="basedata" v-for='(item,dataIndex) in listsDate' :key='dataIndex'>
          <div style="font-size:14px;" >
            <div style="background:#fff;">
              <span style="font-size:14px;margin-left:10px;">日期：</span>
              <div style="width:200px;display:inline-block;margin-bottom:6px;margin-top:6px;">  
                <el-date-picker
                 :disabled="disabledStatus"
                  style="width:200px;"
                  v-model="item.valueDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <!-- 删除 -->
              <div v-on:click='listsDate.splice(index, 1)' style="float:right;margin-top:10px;margin-right:5px;"><i class="el-icon-delete"></i></div>
            </div>
          <el-collapse v-model="courseActiveNames[dataIndex]" @change="handleChange">
            <div v-for='(list,index) in item.course' :key='index' class="cursorStyle">
              <!-- 删除 -->
              <span class="cursorName">课程{{index+1}}：</span><div v-on:click='item.course.splice(index, 1)' style="float:right;margin-top:10px;"><i class="el-icon-delete"></i></div>
              <el-collapse-item title="" :name="index">
              <div style="background:#FFF;padding-top:10px;">
                <span style="margin-left:80px;">时间：</span>
                <el-time-picker
                 :disabled="disabledStatus"
                  is-range
                  v-model="list.speechDateTime"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker>
                <div style="margin-top:10px;">
                  <span style="display:inline-block;margin-left:67px;">演讲人：</span>
                  <div style="display:inline-block;">
                    <el-input
                      style="width:730px;"
                      type="text"
                      placeholder="请输入演讲人姓名"
                      v-model="list.speechPer"
                      :disabled="disabledStatus"
                      clearable>
                    </el-input>
                  </div>
                </div>  
                <div style="margin-top:10px;padding-bottom:10px;display:flex;">
                  <span style="display:inline-block; margin-left:54px;">演讲内容：</span>
                  <div style="display:inline-block;flex:1;margin-left:4px;">
                    <el-input
                    style="width:730px;"
                      type="textarea"
                      :autosize="{minRows: 5}"
                      placeholder="请输入内容"
                      :disabled="disabledStatus"
                      v-model="list.speechCon">
                    </el-input>
                  </div>
                </div>  
              </div>
              </el-collapse-item>
            </div>
          </el-collapse>
          </div>
          <div class="addmeeting" @click='addNewList(dataIndex)'><i class="el-icon-plus"></i> 添加课程</div>
      </div>
      <div class="addmeetingdata" @click='addNewListDate'><i class="el-icon-plus"></i> 添加日期</div>
      <!-- 会议日程面板结束 -->
    </div>
    <!-- 嘉宾部分开始 -->
    <div class="meetbase1 personWrap">
      <div class="personBrief">嘉宾介绍</div>
      <div class="basedata" v-for='(list,index) in listsPerson' :key='index'>
        <div class="personColl">
          <el-collapse v-model="activeNames" @change="handleChange">
            <span class="personName">嘉宾{{index+1}}：</span>
            <div v-on:click='listsPerson.splice(index,1)' style="float:right;margin-top:10px;margin-right:10px;"><i class="el-icon-delete"></i></div>
            <!-- <button @click="showAll1(index)">v</button> -->
            <el-collapse-item title="" :name="index">
            <div style="background:#FFF;padding-top:10px;display:block;" v-if="showAll">
              <div style="margin-top:10px;">
                <span style="display:inline-block;font-size:14px;margin-left:5px;font-size:14px;">嘉宾姓名：</span>
                <div style="display:inline-block;">
                  <el-input
                  :disabled="disabledStatus"
                    placeholder="请输入嘉宾姓名"
                    v-model="list.guestName"
                    clearable>
                  </el-input>
                </div>
              </div>
              <div style="margin-top:10px;padding-bottom:10px;">
                <span style="display:inline-block;font-size:14px;margin-left:5px;font-size:14px;vertical-align:middle;">嘉宾介绍：</span>
                <div style="display:inline-block;vertical-align:top;">
                  <el-input
                   :disabled="disabledStatus"
                    style="width:730px;"
                      type="textarea"
                      :autosize="{minRows: 5}"
                      placeholder="嘉宾介绍"
                      v-model="list.guestIntro">
                    </el-input>
                </div>
              </div>
              <div class="rightmain" style="margin-top:10px;margin-left:5px;font-size:14px;position:relative;left:0;top:0;">
                <p>嘉宾图片:</p>
                <div>
                  <upload :dataId="index" :disabled="disabledStatus" :imgSrc="list.specialistImage" @uploadSuccess="guestUpload"></upload> 
                </div>
              </div>
            </div>
           </el-collapse-item>
          </el-collapse>
          </div>
      </div>
      <div class="addmeetingjiabin" @click='addNewListPerson'><i class="el-icon-plus"></i> 添加嘉宾</div>
    </div>
     <!-- 嘉宾部分结束 -->
     <div class="btnArea">
        <el-button type="primary"  @click="newMeetingAction" v-if="!this.$route.query.isEdit && !this.$route.query.isDetail">新增会议</el-button>
        <el-button type="primary"  @click="newMeetingAction"  v-if="this.$route.query.isEdit">修改会议</el-button>
     </div>
</div>
    
</template>
<script>
import Bus from '../common/bus.js'
import List from './meetlist.vue'
import Heads from '../common/head.vue'
import Listhead from '../common/listhead.vue'
import Pagination from '../common/Pagination.vue'
import { uploadAttach,NewMeetingSave, Rstop,GetMeetingDetail,ChangeMeetingApi } from '../../service/getData.js'
import { regionData,CodeToText,TextToCode } from 'element-china-area-data'
import{ getFullTime,getToday,getEndPartTime } from '../../util/date.js';
import{ strToObj } from '../../util/string.js';
//上传附件组件
import upload from '../common/upload.vue';
export default {
    data(){
        return {
          fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          arr:["和","啊","嗯","哦"],
          showAll:true,
          flag:true,
          courseActiveNames: [[0]],
          activeNames:[0],
          inputName:'', // 演讲人
          valueDate:'', // 日期
          valueDateTime:'', // 时间
          textareaCount:'', // 内容
          newAddText:'',
          listsDate:[{
            course:[{}]
          }], // 添加日期
           // 添加嘉宾
          listsPerson:[{}],
          nextTodoId: 4,
          value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          inputmc:'',
          input2:'',
          inputxx:'',
          textarea3:'',
          valuestart:'',
          valuelast:'',
          //地区级联选择器开始
          options: regionData,
          selectedOptions: [],
          //地区级联选择器结束
          value6: '',
          data:{},
          fileValue:{
            name:""
          },
          fileShow:false,
          imgSrc:"",
          meetingName:"",
          detailAddress:"",
          meetCon:"",
          guestUploadImg:[],
          meetingDetail:{},
          disabledStatus:false,
          bannerImgUrl:""
          }
    },
    create(){
    },
    mounted () {
        //判断是否修改
        var isEdit = this.$route.query.isEdit;
        var isDetail =  this.$route.query.isDetail;
        if(isEdit){
            //如果是修改，获取会议信息
            this.getMeetingInfo();
        }
        if(isDetail){
          this.disabledStatus = true;
          //如果是详情，获取会议信息
          this.getMeetingInfo();
        }
    },    
    methods : {
      //新增会议
      newMeetingAction(){
        //测试新增代码
        /*var meetinginfo={"meetTitle": "测试新建会议",  "meetingImage": "",  "province": "北京市",  "city": "市辖区",  "country": "东城区",  "meetAddress": "秀水街1号院",  "meetContent": "测试新建会议",  "beginTime": "2018-10-23 00:00:00",  "endTime": "2018-10-26 00:00:00",  "meetDates": [{   "meetDate": "2018-10-23",   "meetClasses": [{    "mainTalk": "韩旭明",    "mainContent": "韩旭明",    "meetClassBegin": "2018-10-21 13:26:40",    "meetClassEnd": "2018-10-21 14:26:40"   }]  }],  "meetTalks": [{   "meetTalkContent": "韩旭明",   "meetTalkName": "韩旭明","specialistImage":""}]};
        meetinginfo = JSON.stringify(meetinginfo);
        alert(meetinginfo);
        NewMeetingSave(meetinginfo).then(res => {
          alert(res);
        }).catch(error => {
          alert('error,',error);
        });
        return;
        */
        //**************************规范参数开始**************************
        //设置嘉宾参数
        var meetTalksParams = [];
        this.listsPerson.forEach(item => {
          var listPerItem = {};
          listPerItem.meetTalkContent = item.guestIntro;
          listPerItem.meetTalkName = item.guestName;
          listPerItem.specialistImage = "";
          meetTalksParams.push(listPerItem);
        });
        for(let i = 0;i<meetTalksParams.length;i++){
          for(let j = 0;j<this.guestUploadImg.length;j++){
            if(i == this.guestUploadImg[j].dataId){
              meetTalksParams[i].specialistImage = this.guestUploadImg[j].respMsg;
            }
          }
        }
        //设置课程参数开始
        var meetDates = [];
        var meetClasses = [];
        this.listsDate.forEach(item => {
            var listItem = {};
            listItem.meetDate = getToday(item.valueDate);
            item.course.forEach(secItem => {
              var secListItem = {};
              secListItem.mainTalk = secItem.speechPer;
              secListItem.mainContent = secItem.speechCon;
              secListItem.meetClassBegin = getEndPartTime(secItem.speechDateTime[0]);
              secListItem.meetClassEnd = getEndPartTime(secItem.speechDateTime[1]);
              meetClasses.push(secListItem);
            })
            listItem.meetClasses = meetClasses;
            meetDates.push(listItem);
        });
        //**************************规范参数结束**************************
        //设置新建课程参数结束
        //设置参数
          var params = {};
          //会议名称
          params.meetTitle = this.meetingName;
          //会议封面图
          params.meetingImage = this.bannerImgUrl;
          //会议省份
          params.province=CodeToText[this.selectedOptions[0]];
          //会议城市
          params.city = CodeToText[this.selectedOptions[1]];
          //会议市区
          params.country = CodeToText[this.selectedOptions[2]];
          //会议详细地址
          params.meetAddress = this.detailAddress;
          //会议内容
          params.meetContent = this.meetCon;
          //会议开始时间
          params.beginTime = getFullTime(this.valuestart);
          //会议结束好司机
          params.endTime = getFullTime(this.valuelast);
          //会议日程
          params.meetDates = meetDates;
          //会议嘉宾
          params.meetTalks = meetTalksParams;
        //调用接口
        this.createMeeting(params);
      },
      //调用接口
      createMeeting(params){
        if(this.$route.query.isEdit){
          params.meetId = this.$route.query.meetId;
          params = JSON.stringify(params);
          ChangeMeetingApi(params).then(res => {
            alert(res);
          }).catch(error => {

          })
        }else{
          params = JSON.stringify(params);
          alert(params);
          NewMeetingSave(params).then(res => {
            alert(res);
          }).catch(error => {
            alert(error);
          })
        }
      },
      //嘉宾图片
      guestUpload(res){
        var nowDataId = res.dataId;
        var isHas = -1;
        for(var i = 0;i<this.guestUploadImg.length;i++){
          if(this.guestUploadImg[i].dataId == nowDataId){
            isHas = i
          }
        }
        if(isHas != -1){
          this.guestUploadImg.splice(isHas,1,res);
        }else{
          this.guestUploadImg.push(res);
        }
        // alert(JSON.stringify(this.guestUploadImg));
      },
      //获取会议信息
      getMeetingInfo(){
        var params = {};
        params.meetId = this.$route.query.meetId;
        GetMeetingDetail(params).then(res => {
          //将字符串转化为会议信息
          res = strToObj(res);
          this.meetingDetail = res.data;
          this.setMeetingDetail(res.data);
        }).catch(error => {
          alert(error);
        })
      },
      //同步会议信息格式
      setMeetingDetail(res){
        console.log(res);
        this.meetingName = res.meetTitle;
        this.valuestart = res.beginTimeString;
        this.valuelast = res.endTimeString;
        /*****设置会议地点开始*****/
        //参考链接：https://www.cnblogs.com/eva3288/p/8203028.html
        //仍然有问题未修改
        var addressCode = [];
        addressCode.push(TextToCode[res.province].code);
        addressCode.push(TextToCode[res.province][res.city].code);
        addressCode.push(TextToCode[res.province][res.city][res.country].code);
        this.selectedOptions = addressCode;
        /*****设置会议地点结束*****/
        this.detailAddress = res.meetAddress;
        this.meetCon = res.meetContent;
        //同步会议日程开始
        this.listsDate = [];
        res.meetDates.forEach(item => {
          var meetDatesItem = {};
          meetDatesItem.valueDate = item.meetDateString;
          meetDatesItem.course = [];
          item.meetClasses.forEach(secItem => {
            var secItemParams = {};
            secItemParams.speechPer = secItem.mainTalk;
            secItemParams.speechCon = secItem.mainContent;
            //var courseBegin = meetDatesItem.valueDate+ ' ' + secItem.meetClassBegin;
            //var courseEnd = meetDatesItem.valueDate+ ' ' + secItem.meetClassEnd;
            secItemParams.speechDateTime = [new Date(meetDatesItem.valueDate+ ' ' + secItem.meetClassBegin), new Date(meetDatesItem.valueDate+ ' ' + secItem.meetClassEnd)];
            meetDatesItem.course.push(secItemParams);
          })
          this.listsDate.push(meetDatesItem);
        });
        alert(JSON.stringify(this.listsDate));
        //同步会议日程结束
        //同步嘉宾开始
        this.listsPerson = [];
        res.meetTalks.forEach(item => {
          var meetTalksItem = {};
          meetTalksItem.guestIntro = item.meetTalkContent;
          meetTalksItem.guestName = item.meetTalkName;
          meetTalksItem.specialistImage = item.specialistImage;
          this.listsPerson.push(meetTalksItem);
        });
        //同步嘉宾结束
      },
      bannerUpload(res){
        this.bannerImgUrl = res.respMsg;
        alert(JSON.stringify(res));
      },
      handleChange(val) {
        console.log(val);
      },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        fileImage:function(e){
          var that=this;
          var file = e.target.files[0];
          var imgSize=file.size/1024;
          if(imgSize>200){
              alert('请上传大小不要超过200KB的图片')
          }else{
              var reader = new FileReader();
              reader.readAsDataURL(file); // 读出 base64
              reader.onloadend = function () {
                  // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
                  var dataURL = reader.result;
                  // 下面逻辑处理
                  $.ajax({
                      type:"post",
                      url:"39.106.49.2:8088/upload/upload_img?suffix=.jpg", // 上传图片接口
                      async:true,
                      data:{
                          avatar:dataURL,
                          avatar_wx:1,
                          token:token,
                          uid:uid,
                      },
                      success:function(e){
                          that.avatar=dataURL;
                          alert('修改成功');
                          $(".tsk").show().delay(1500).hide(0);
                      }
                  });
              };
          }

          },
        //添加课程
         addNewList(dataIndex){
           this.listsDate[dataIndex].course.push({});
           this.setCollArray('course',dataIndex,this.listsDate[dataIndex].course.length-1);
         },
        // 添加日期
          addNewListDate:function(){
            this.setCollArray('date',this.listsDate.length-1);
            this.listsDate.push({course:[{}]});
          },
        // 添加嘉宾
          addNewListPerson:function(){
            this.listsPerson.push({})
            //设置添加嘉宾面板
            this.setPersonArray(this.listsPerson.length-1);
          },
          //设置会议折叠面板数组
          setCollArray(type,dataIndex,index){
            if(type == 'date'){
              this.courseActiveNames.push([0]);
            }else if(type == 'course'){
              this.courseActiveNames[dataIndex].push(index);
            }
          }, 
          //设置添加嘉宾面板数组
          setPersonArray(index){
            this.activeNames.push(index);
          },
          showAll1:function(index){
              this.showAll = !this.showAll
            //  console.log(this.$refs.index)
          },      



},
    components:{
        Listhead,
        List,
        Pagination,
        Heads,
        upload

    }
}
</script>
<style type="text/css"  lang="less" scoped>
.meetnewaddWrap{
  .btnArea{
    width:100%;
    margin:50px;
    margin-top:-20px;
  }
  .meetNewHead{
    width:100%;
    height:35px;
    background:#ccc;
    font-size:16px;
    line-height:35px;
    color:#000;
    padding-left:10px;
    cursor: pointer;
  }
  .meetBaseInfo{
    height:40px;
    background:#fff;
    font-size:16px;
    line-height:40px;
    color:#000;
    padding-left:10px;
    border-bottom:1px solid #eee;
  }
  .meetNameInput{
    width:200px;
    display:inline-block;
    margin-bottom:20px;
    height:30px;
    padding:5px 0;
  }
  .meetDate{
     height:40px;
     background:#fff;
     font-size:16px;
     line-height:40px;
     color:#000;
     padding-left:10px;
     border-bottom:1px solid #eee;
  }
  .cursorStyle{
    background:#fff;
    border-top:1px solid #eee;
    //border-bottom:1px solid #eee;
    margin:0 5px;
    position: relative;
    left:0;
    top:0;
  } 
  .el-collapse-item__header.is-active,.el-collapse-item__header{
    position: absolute;
    right:33px;
    top:13px;
    width:43px;
    height:13px;
    margin-top:0;
    border-bottom:none;
  }
  .el-textarea__inner{
    resize:none;
  }
  .el-collapse{
    border:none;
  }
  .cursorName{
    font-size:14px;
    display:inline-block;
    padding-bottom:10px;
    margin-left:5px;
    margin-top:10px;
  }
  .addmeeting{
    width:99%;
    height:40px;
    border:1px dashed #eee;
    color: #8492a6;
    line-height:40px;
    margin:10px auto;
    text-align:center;
    border-radius:4px;
    font-size:14px;
  }
  .addmeetingdata{
    width:99%;
    height:40px;
    border:1px dashed #eee;
    color: #8492a6;
    line-height:40px;
    margin:10px auto;
    text-align:center;
    border-radius:4px;
    font-size:14px;
  } 
  .personBrief{
    height:40px;
    background:#fff;
    font-size:16px;
    line-height:40px;
    color:#000;
    padding-left:10px;
    border-bottom:1px solid #eee;
  }
  .addmeetingjiabin{
    width:99%;
    height:40px;
    border:1px dashed #eee;
    color: #8492a6;
    line-height:40px;
    margin:10px auto;
    text-align:center;
    border-radius:4px;
    font-size:14px;
  }
  //附件
  .fileBtn{
			position:relative;
			left:0;
			top:0;
			background:#409eff;
			overflow:hidden;
			display:block;
			width:80px;
			height:30px;
			border-radius:2px;
			text-decoration:none;
      color:white;
      text-align:center;
			span{
        font-size:12px;
        line-height:30px;
			}
    }
    .fileInput{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
      opacity:0;
      cursor: pointer;
		}
}
.el-input__inner{
  height:30px;
  padding:5px;
}
.el-date-editor .el-range-separator{
  line-height:22px;
}
.el-date-editor .el-range__icon{
  line-height:22px;
}
.el-collapse-item__header.is-active{
  margin-top:-26px;
}
.meeting{
  .meetbase{
    margin:30px 50px;
    overflow: hidden;
    border:1px solid #eee;
   
  }
  .meetbase:hover{
    box-shadow: #eee 1px 1px 3px 1px ;
  }
  .meetbase1{
    margin:50px;
    /* height:430px; */
    border:1px solid #eee;
   color:#606266;
  }
  .meetbase1:hover{
    box-shadow: #eee 1px 1px 3px 1px ;
  }
  //嘉宾介绍下样式
  .personWrap{
    .personColl{
      font-size:14px;
      padding-left:5px;
      padding-bottom:10px;
      position:relative;
      left:0;
      top:0;
    }
    .personName{
      font-size:16px;
      display:inline-block;
      padding-bottom:10px;
      margin-left:5px;
      margin-top:10px;
      font-size:14px;
    }
  }
  .meetbaseOne{
    overflow: hidden;
    padding:20px;
  }
  .meetbaseLeft{
    float: left;
    width:320px;
    // border-right:1px solid #eee;
    color:#606266;
    padding-right:30px;
  }
  .meetbaseRight{
    float:left;
    margin-left:20px;
    font-size:14px;
  }
  .rightmain{
    display: flex;
  }
  .rightmain p{
    width:100px;
    color:#606266;
  }
  .rightmain div{
    flex:1;
  }
  // .rightmain span{
  //   font-size: 14px;
  //   margin-top:20px;
  //   display: inline-block;
  // }
  .rightcount{
    display: flex;
    margin-top:20px;
  }
  .addmeeting:hover{
    background:#353535;
    opacity: .2;
    color:#000!important;
  }
  .addmeetingdata:hover{
    background:#353535;
    opacity: .2;
  }
  .addmeetingjiabin:hover{
    background:#353535;
    opacity: .2;
  }
  // .addmeeting:hover div{
  //   background:#606266;
  //   color:#fff;
  // }
  .rightcount p{
    width:76px;
    margin-left:26px;
  }
  .rightcount textarea{
    flex:1;
  }
  .basedata{
    /* height:300px; */
    width:95%;
    margin:20px auto;
    border:1px solid #eee;
  }
}
</style>

