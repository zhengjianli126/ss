<template>
<div class="meeting">
    <heads></heads>
    <div style="width:100%;height:35px;background:#ccc;font-size:16px;line-height:35px;color:#000;padding-left:10px;">详情</div>
    <div class="meetbase" style="">
      <div style="height:40px;background:#fff;font-size:16px;line-height:40px;color:#000;padding-left:10px;border-bottom:1px solid #eee;">会议基础信息</div>
      <div class="meetbaseOne">
        <div class="meetbaseLeft">
          <span style="font-size:14px;color:#606266;">会议名称：</span>
          <div style="width:200px;display:inline-block;margin-bottom:20px;height:30px;padding:5px 0;">
            <el-input
              placeholder=""
              v-model="arr.meetTitle"
              :readonly="true">
            </el-input>
          </div>  
          <span style="font-size:14px;">开始时间：</span>
          <div style="width:200px;display:inline-block;margin-bottom:20px;height:35px;">  
            <el-input
              placeholder=""
              v-model="arr.beginTimeString"
              :readonly="true">
            </el-input>
          </div>  
          <span style="font-size:14px;">结束时间：</span>
          <div style="width:200px;display:inline-block;margin-bottom:20px;height:35px;">  
            <el-input
              placeholder=""
              v-model="arr.endTimeString"
              :readonly="true">
            </el-input>
          </div>  
          <span style="font-size:14px;">会议城市：</span>
          <div style="width:200px;display:inline-block;margin-bottom:20px;height:30px;">
            <el-input
              placeholder=""
              v-model="arr.city"
              :readonly="true">
            </el-input>
          </div>  
          <span style="font-size:14px;">详细地址：</span>
          <div style="width:200px;display:inline-block;margin-bottom:20px;">
            <el-input
              placeholder=""
              v-model="arr.meetAddress"
              :readonly="true">
            </el-input>
          </div>  
        </div>
        <div class="meetbaseRight">
          <div class="rightmain" style="margin-bottom:20px;">
            <p style="width:60px;margin-left:40px;">封面图:</p>
            <!-- <div>
              <div style="width:100px;height:30px;">
                <input type="file" accept="image/jpeg,image/x-png,image/gif" id="" value="事实上"  @change="fileImage"/>
              </div>
              <span>图片上传大小限制100kb,格式:jpg/jpeg/png</span>
            </div> -->
            <img :src="arr.meetingImage" alt="">
          </div>
          <div class="rightcount">
            <p>会议内容:</p>
            <!-- <textarea name="" id="" cols="60" rows="10" style="border-color:#eee;"></textarea> -->
            <el-input
              style="width:410px;"
              type="textarea"
              :readonly="true"
              :rows="6"
              placeholder="请输入内容"
              v-model="arr.meetContent">
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="meetbase1">
      <div style="height:40px;background:#fff;font-size:16px;line-height:40px;color:#000;padding-left:10px;border-bottom:1px solid #eee;">会议日程</div>
      <div class="basedata" v-for='(list1,index) in arr.meetDates' v-bind:key='list1.id' style="">
          <div style="font-size:14px;" >
            <div style="background:#fff;">
              <span style="font-size:14px;margin-left:10px;">日期：</span>
              <div style="width:200px;display:inline-block;margin-bottom:6px;margin-top:6px;">  
                <el-date-picker
                  style="width:200px;"
                  v-model="list1.meetDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>  
              <div v-on:click='arr.meetDates.splice(index, 1)' style="float:right;margin-top:10px;margin-right:5px;"><i class="el-icon-delete"></i></div>
            </div>
            <!-- <ul>		
              <li  v-for='(list,index) in lists' v-bind:key='list.id'>			
               {{list.inputName}} 在  {{list.valueDateTime}}中演讲内容{{list.textareaCount}}
               <button v-on:click='lists.splice(index, 1)'>x</button>		
              </li>	
            </ul> -->
          <el-collapse v-model="activeNames" @change="handleChange">
            <div v-for='(list2,index) in list1.meetClasses' v-bind:key='list2.id' style="background:#fff;border-top:1px solid #eee;border-bottom:1px solid #eee;margin:0 5px;">
              <span style="font-size:14px;display:inline-block;padding-bottom:10px;margin-left:5px;margin-top:10px;">课程1：</span><div v-on:click='list1.meetClasses.splice(index, 1)' style="float:right;margin-top:10px;"><i class="el-icon-delete"></i></div>
              <el-collapse-item title="" name="1">
              <div style="background:#FFF;padding-top:10px;">
                <span style="margin-left:80px;">时间：</span>
                <el-time-picker
                  is-range
                  v-model="valueDateTime"
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
                      placeholder=""
                      v-model="list2.mainTalk"
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
                      v-model="list2.mainContent">
                    </el-input>
                  </div>
                </div>  
              </div>
              </el-collapse-item>
            </div>
          </el-collapse>   
          </div>
          <div class="addmeeting" style="width:99%;height:40px;border:1px dashed #eee;color: #8492a6;line-height:40px;
          margin:10px auto;text-align:center;border-radius:4px;font-size:14px;" @click='addNewList'><i class="el-icon-plus"></i> 添加课程</div>

      </div>
        <div class="addmeetingdata" style="width:99%;height:40px;border:1px dashed #eee;color: #8492a6;line-height:40px;
          margin:10px auto;text-align:center;border-radius:4px;font-size:14px;" @click='addNewListDate'>添加日期</div>
    </div>
    <div class="meetbase1">
      <div style="height:40px;background:#fff;font-size:16px;line-height:40px;color:#000;padding-left:10px;border-bottom:1px solid #eee;">嘉宾介绍</div>
      <div class="basedata" v-for='(list3,index) in arr.meetTalks' v-bind:key='list3.id' :ref="index"  @click="clickItem(index)">
        <div style="font-size:14px;padding-left:5px;padding-bottom:10px;">
          <el-collapse v-model="activeNames" @change="handleChange">
            <span style="font-size:16px;display:inline-block;padding-bottom:10px;margin-left:5px;margin-top:10px;font-size:14px;">嘉宾1：</span>
            <div v-on:click='arr.meetTalks.splice(index, 1)' style="float:right;margin-top:10px;margin-right:10px;"><i class="el-icon-delete"></i></div>
            <!-- <button @click="showAll1(index)">v</button> -->
            <el-collapse-item title="" name="1">
            <div style="background:#FFF;padding-top:10px;display:block;" v-if="showAll">
              <div style="margin-top:10px;">
                <span style="display:inline-block;font-size:14px;margin-left:5px;font-size:14px;">嘉宾姓名：</span>
                <div style="display:inline-block;">
                  <el-input
                    placeholder=""
                    v-model="list3.meetTalkName"
                    clearable>
                  </el-input>
                </div>
              </div>  
              <div style="margin-top:10px;padding-bottom:10px;">
                <span style="display:inline-block;font-size:14px;margin-left:5px;font-size:14px;">嘉宾介绍：</span>
                <div style="display:inline-block;">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="list3.meetTalkContent">
                  </el-input>
                </div>
              </div> 
              <div class="rightmain" style="margin-top:10px;margin-left:5px;font-size:14px;">
                <p>嘉宾图片:</p>
                <!-- <div>
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"

                    :limit=1
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">图片上传大小限制100kb，格式:jpeg/jpg/png</div>
                  </el-upload>
                </div> -->
                <img :src="list3.specialistImage" alt="">
              </div> 
            </div>
           </el-collapse-item> 
          </el-collapse>  
          </div>
      </div>
        <div class="addmeetingjiabin" style="width:99%;height:40px;border:1px dashed #eee;color: #8492a6;line-height:40px;
          margin:10px auto;text-align:center;border-radius:4px;font-size:14px;" @click='addNewListPerson'>添加嘉宾</div>
    </div>
</div>
    
</template>
<script>
import Bus from '../common/bus.js'
import List from './meetlist.vue'
import Heads from '../common/head.vue'
import Listhead from '../common/listhead.vue'
import Pagination from '../common/Pagination.vue'
import { getMeetsByCondition,Meetsave,getMeetInfo } from '../../service/getData.js'
export default {
    data(){
        return {
          fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          // arr:["和","啊","嗯","哦"],
          showAll:true,
          flag:true,
          activeNames: ['1'],
          inputName:'', // 演讲人
          valueDate:'', // 日期
          valueDateTime:'', // 时间
          textareaCount:'', // 内容
          newAddText:'',
            lists:[
              {id:this.nextTodoId++,
              title:this.inputmc,
              inputName:this.inputName,
              valueDateTime:this.valueDateTime,
              textareaCount:this.textareaCount}
            ],
            listsDate:[
              {id:this.nextTodoId++,
              title:this.inputmc,
              inputName:this.inputName,
              valueDateTime:this.valueDateTime,
              textareaCount:this.textareaCount}
            ], // 添加日期
            listsPerson:[
              {id:this.nextTodoId++,
              title:this.inputmc,
              inputName:this.inputName,
              valueDateTime:this.valueDateTime,
              textareaCount:this.textareaCount}
            ], // 添加嘉宾
          nextTodoId: 4,
          value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          inputmc:'',
          input2:'',
          inputxx:'',
          textarea3:'',
          beginTimeString:'',
          valuelast:'',
          cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value6: '',
           data:{},
           arr:{
            //  beginTimeString:'',
            //  city:'',
            //  endTimeString:'',
            //  meetAddress:'',
            //  meetContent:'',
            //  meetDates:[],
            //  meetTalks:[],
            //  meetTitle:'',
            //  meetingImage:'',
            //  province:'',
            //  themeId:''
           }
        }
    },
    create(){
      this.arr=this.$route.query.data
      console.log(arr)
    },
    mounted () {
        var id = this.$route.query.detailId
        console.log(id)
        this.getdetail(id) // 接收数据
    },    
    methods : {
       getdetail(id) {
          console.log(id)
          var params = {}
          params.meetId = id
            getMeetInfo(params).then((res) => {
            console.log(res)
            var  res = JSON.parse(res);
            this.arr = res.data
            console.log(this.arr)
            }).catch(err => {
                alert('error'+err);
            })
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
        // getdata(){
        //     console.log()
        //     console.log(1)
        //     var params = {}
        //      params.city = city

        //     Meetsave(params).then((res) => {
        //         console.log(res)
              
        //     }).catch(err => {
        //         alert('error'+err);
        //     })
        // },
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
                          console.log("修改成功")
                          //alert('修改成功');
                          $(".tsk").show().delay(1500).hide(0);
                      }
                  });
              };
          }

          },
          addNewList:function(){ // 添加增加内容
            this.arr.meetDates.push({
              id:this.nextTodoId++,
              title:this.inputmc,
              inputName:this.inputName,
              valueDateTime:this.valueDateTime,
              textareaCount:this.textareaCount
            })
            this.inputName=''

          },
          addNewListDate:function(){ // 添加日期
            this.arr.meetDates[0].meetClasses.push({
              id:this.nextTodoId++,
              title:this.inputmc,
              inputName:this.inputName,
              valueDateTime:this.valueDateTime,
              textareaCount:this.textareaCount
            })
            this.inputName=''

          },
          addNewListPerson:function(){ // 添加嘉宾
            this.arr.meetTalks.push({
              id:this.nextTodoId++,
              title:this.inputmc,
              inputName:this.inputName,
              valueDateTime:this.valueDateTime,
              textareaCount:this.textareaCount
            })
            this.inputName=''

          },
          clickItem(index){
            var a=document.getElementsByClassName('cuojue')
                    if (this.$refs[index][0].style.display=="none") {
                        this.$refs[index][0].style.display="block"
                    }else if (this.$refs[index][0].style.display=="block") {
                        this.$refs[index][0].style.display="none"
                    }
                    console.log(this.$refs[index][0].childNodes[1].style.display);
                    alert(1)
                },
          showAll1:function(index){
                    this.showAll = !this.showAll
                  //  console.log(this.$refs.index)
                },      



},
    components:{
        Listhead,List,Pagination,Heads

    }
}
</script>
<style lang="less" scoped>
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
    height:430px;
    border:1px solid #eee;
   
  }
  .meetbase:hover{
    box-shadow: #eee 1px 1px 3px 1px ;
  }
  .meetbase1{
    margin:30px 50px;
    /* height:430px; */
    border:1px solid #eee;
   color:#606266;
  }
  .meetbase1:hover{
    box-shadow: #eee 1px 1px 3px 1px ;
  }
  .meetbaseOne{
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

