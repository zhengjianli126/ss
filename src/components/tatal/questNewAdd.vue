<template>
    <div id="TAdministration">
        <Heads></Heads>
        <div class="content">
            <div class="title"></div>
            <div class="tipsItem">基础信息</div>
            <div class="from">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="问卷名称：" prop="name">
                        <el-input placeholder="请输入问卷名称" :disabled="disabled" v-model.trim="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="模板选择：" prop="telSelect">
                        <el-select :disabled="disabled" v-model="ruleForm.telSelect" placeholder="请选择模板" width="400px">
                            <el-option v-for="(item,index) of telList" :label="item" :value="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="问卷类型：" prop="qType">
                        <el-select :disabled="disabled || mSelectdisabled" v-model="ruleForm.qType" placeholder="请选择" @change="qTypeFuc">
                            <el-option label="问卷" :value="0"></el-option>
                            <el-option label="投票" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="月亮币发放：" prop="resource">
                        <el-radio-group :disabled="disabled" v-model="ruleForm.resource" @change="switch1">
                            <el-radio :label="0">否</el-radio>
                            <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="switch1Flag" label="发放规则：" prop="rule">
                        <el-select :disabled="disabled" v-model="ruleForm.rule" placeholder="请选择" @change="fixedValue">
                            <el-option label="等分值发放" value="1"></el-option>
                            <el-option label="固定值" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="fixedValueFlag && switch1Flag" label="" prop="moons" class="moonItem">
                        <el-input :disabled="disabled" style="width:120px"  v-model.number.trim="ruleForm.moons" placeholder="请输入个数"></el-input>&nbsp;&nbsp;月亮币
                    </el-form-item>
                </el-form>
            </div>
            <div class="tipsItem">问题列表</div>
            <div class="tipsTitle">上传图片尺寸要求：100kb以内，格式：jpg/jpeg/png</div>
            <div class="from2">
                <!-- 遍历所有问题 -->
                <div v-for="(item,index) of allQuest" :key="index">
                    <div class="q-item">
                        <div class="title">{{ `问题${index-0+1}` }}
                            <div class="operation">
                                <i class="el-icon-caret-bottom" v-trigger = "disabled" @click="questClick(index)"></i>
                                <i v-if="!disabled && index != 0" class="el-icon-close" @click = "delOuterCar(index)"></i>
                            </div>
                        </div>
                        <el-form v-if="qTypeFucFlag" :model="allQuest[index].ruleFormOuter" :rules="rules2" ref="ruleForm2" label-width="120px" >
                            <!-- 题干 -->
                            <el-form-item label="题干：" prop="name" class="firstList">
                                <div @mouseover="mouseover(index)" @mouseout="mouseout(index)" @click="delImg(index)" v-if="allQuest[index].ruleFormOuter.questionImage" class="uploadImg" >
                                  <img :src="allQuest[index].ruleFormOuter.questionImage">
                                  <div v-show="allQuest[index].ruleFormOuter.mouseoverFlag" class="backg"></div>
                                  <i v-show="allQuest[index].ruleFormOuter.mouseoverFlag" class="el-icon-delete"></i>
                                </div>
                                <el-input
                                  placeholder="请输入题干内容"
                                  resize="none"
                                  :type="allQuest[index].ruleFormOuter.questionImage?'textarea':''"
                                  :rows="allQuest[index].ruleFormOuter.questionImage?7:''"
                                 :disabled="disabled" v-model.trim="allQuest[index].ruleFormOuter.name" :style="allQuest[index].ruleFormOuter.questionImageFlag?'width:100%;padding-right: 56px;':'width:100%;padding-right: 0px;'"
                                 ></el-input>
                                <el-upload
                                  :disabled="disabled"
                                  v-if="allQuest[index].ruleFormOuter.questionImageFlag"
                                  class="uploadJpg"
                                  action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
                                  :before-upload="beforeAvatarUpload"
                                  :limit="1"
                                  :show-file-list="false"
                                  :on-success= "upLoad1Suc"
                                  :on-error= "upLoad1Err"
                                >
                                  <el-button :disabled="disabled" icon="el-icon-picture" circle @click="upLoad1(index)"></el-button>
                                </el-upload>
                            </el-form-item>
                            <!-- todo -->
                            <!-- 选项类型 -->
                            <el-form-item label="选项类型：" prop="resource">
                                <el-radio-group :disabled="disabled" v-model="allQuest[index].ruleFormOuter.radio">
                                    <el-radio :label="0">单选</el-radio>
                                    <el-radio :label="1">多选</el-radio>
                                    <el-radio :label="2">问答</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 回答 -->
                            <el-form-item label="选项/回答：" prop="textarea2" v-if="allQuest[index].ruleFormOuter.radio != 2">
                                <!-- 选择题题目 -->
                                <!-- 遍历里层得回答选项得表单 -->
                                <div v-if="allQuest[index].ruleFormOuter.radio != 2" v-for="(list,i) in allQuest[index].ruleFormInner" :key="i">
                                    <div class="ruleForm2-item-container">
                                        <div class="title">{{`选项${letter[i]}`}}
                                            <div class="operation">
                                                <i class="el-icon-caret-bottom" v-trigger = "disabled" @click= "questInnerClick"></i>
                                                <i v-if="!disabled && i > 1" class="el-icon-close" @click= "delQuestInnerClick(index,i)"></i>
                                            </div>
                                        </div>
                                        <!-- 内层form表单 -->
                                        <el-form :model="allQuest[index].ruleFormInner[i]" :rules="rules3" ref="ruleForm3" label-width="140px" >
                                            <el-form-item label="回答：" prop="answer" class="firstList">
                                                <div @mouseover="mouseoverItem(index,i)" @mouseout="mouseoutItem(index,i)" @click="delImg2(index,i)" v-if="allQuest[index].ruleFormInner[i].questionImage" class="uploadImg" >
                                                  <img :src="allQuest[index].ruleFormInner[i].questionImage">
                                                  <div v-show="allQuest[index].ruleFormInner[i].mouseoverFlag" class="backg"></div>
                                                  <i v-show="allQuest[index].ruleFormInner[i].mouseoverFlag" class="el-icon-delete"></i>
                                                </div>
                                                <el-input 
                                                placeholder="请输入答案内容"
                                                resize="none"
                                                :type="allQuest[index].ruleFormInner[i].questionImage?'textarea':''"
                                                :rows="allQuest[index].ruleFormInner[i].questionImage?7:''"
                                                :disabled="disabled" v-model.trim="allQuest[index].ruleFormInner[i].answer" :style="allQuest[index].ruleFormInner[i].questionImageFlag?'width:100%;padding-right: 56px;':'width:100%;padding-right: 0px;'"
                                                ></el-input>
                                                <!-- 回答选项的图片上传 -->
                                                <el-upload
                                                  :disabled="disabled"
                                                  v-if="allQuest[index].ruleFormInner[i].questionImageFlag"
                                                  class="uploadJpg"
                                                  action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
                                                  :before-upload="beforeAvatarUpload"
                                                  :limit="1"
                                                  :show-file-list="false"
                                                  :on-success= "upLoad1Suc2"
                                                  :on-error= "upLoad1Err2"
                                                >
                                                  <el-button :disabled="disabled" icon="el-icon-picture" circle @click="upLoad2(index,i)"></el-button>
                                                </el-upload>
                                            </el-form-item>
                                            <el-form-item label="是否为正确答案：" prop="judge" style="margin:10px 0">
                                                <el-radio-group :disabled="disabled" v-model="allQuest[index].ruleFormInner[i].judge">
                                                    <el-radio :label="2">否</el-radio>
                                                    <el-radio :label="1">是</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="分数：" prop="fraction">
                                                <el-input :disabled="disabled" style="width:120px;" v-model.number.trim="allQuest[index].ruleFormInner[i].fraction" placeholder="请输入分数"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                                <!-- 点击问答时显示的内容 -->
                                <el-input v-if="allQuest[index].ruleFormOuter.radio == 2"
                                    resize="none"
                                    :disabled="disabled"
                                    type="textarea"
                                    rows="10"
                                    placeholder="请输入内容"
                                    v-model.trim="allQuest[index].ruleFormOuter.textarea2">
                                </el-input>
                                <!-- 添加选项 -->
                                <div v-if="addButton && allQuest[index].ruleFormOuter.radio != 2 && allQuest[index].ruleFormInner.length != 26" class="addOption" @click="addOption(index)">
                                    +&nbsp;添加选项
                                </div>
                            </el-form-item>
                        </el-form>
                        <!-- 切换到投票 -->
                        <el-form v-if="!qTypeFucFlag" :model="allQuest[index].ruleFormOuter" :rules="rules4" ref="ruleForm4" label-width="120px" >
                            <!-- 标题： -->
                            <el-form-item label="标题：" prop="name" class="firstList">
                              <div @mouseover="mouseover(index)" @mouseout="mouseout(index)" @click="delImg(index)" v-if="allQuest[index].ruleFormOuter.questionImage" class="uploadImg" >
                                <img :src="allQuest[index].ruleFormOuter.questionImage">
                                <div v-show="allQuest[index].ruleFormOuter.mouseoverFlag" class="backg"></div>
                                <i v-show="allQuest[index].ruleFormOuter.mouseoverFlag" class="el-icon-delete"></i>
                              </div>
                              <el-input
                                resize="none"
                                placeholder="请输入标题内容"
                                :type="allQuest[index].ruleFormOuter.questionImage?'textarea':''"
                                :rows="allQuest[index].ruleFormOuter.questionImage?7:''"
                                :disabled="disabled" v-model.trim="allQuest[index].ruleFormOuter.name" :style="allQuest[index].ruleFormOuter.questionImageFlag?'width:100%;padding-right: 56px;':'width:100%;padding-right: 0px;'"
                                ></el-input>
                              <el-upload
                                :disabled="disabled"
                                v-if="allQuest[index].ruleFormOuter.questionImageFlag"
                                class="uploadJpg"
                                action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
                                :before-upload="beforeAvatarUpload"
                                :limit="1"
                                :show-file-list="false"
                                :on-success= "upLoad1Suc"
                                :on-error= "upLoad1Err"
                              >
                                <el-button :disabled="disabled" icon="el-icon-picture" circle @click="upLoad1(index)"></el-button>
                              </el-upload>
                            </el-form-item>
                            <!-- 选项类型 -->
                            <el-form-item label="选项类型：" prop="resource">
                                <el-radio-group :disabled="disabled" v-model="allQuest[index].ruleFormOuter.radio" @change="voteChange(index)">
                                    <el-radio :label="0">单选</el-radio>
                                    <el-radio :label="1">多选</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 选项 -->
                            <el-form v-if="allQuest[index].ruleFormOuter.radio == 1" :model="allQuest[index]" :rules="rules5" ref="ruleForm5" label-width="120px" style="padding-top:0px">
                              <el-form-item label="投票上限：" prop="maxLength" class="firstList">
                                <el-input placeholder="请输入最大投票数" :disabled="disabled" v-model.trim.number="allQuest[index].maxLength" style="padding-right:56px"></el-input>
                                <div class="uploadJpg">&nbsp;/&nbsp;&nbsp;人&nbsp;&nbsp;&nbsp;</div>
                              </el-form-item>
                            </el-form>
                            <div v-if="!ballotLayout" v-for="(option, ls) in allQuest[index].ruleFormOuter2">
                              <el-form :model="allQuest[index].ruleFormOuter2[ls]" :rules="rules6" ref="ruleForm6" label-width="120px" style="padding-top:0px" >
                                <el-form-item :label="`选项${ls -0 +1}：`" prop="option" class="firstList">
                                    <div @mouseover="mouseoverItem2(index,ls)" @mouseout="mouseoutItem2(index,ls)" @click="delImg3(index,ls)" v-if="allQuest[index].ruleFormOuter2[ls].questionImage" class="uploadImg" >
                                      <img :src="allQuest[index].ruleFormOuter2[ls].questionImage">
                                      <div v-show="allQuest[index].ruleFormOuter2[ls].mouseoverFlag" class="backg"></div>
                                      <i v-show="allQuest[index].ruleFormOuter2[ls].mouseoverFlag" class="el-icon-delete"></i>
                                    </div>
                                    <el-input 
                                      placeholder="请输入选项内容"
                                      resize="none"
                                      :type="allQuest[index].ruleFormOuter2[ls].questionImage?'textarea':''"
                                      :rows="allQuest[index].ruleFormOuter2[ls].questionImage?7:''"
                                      :disabled="disabled" v-model.trim="allQuest[index].ruleFormOuter2[ls].option"
                                      :style="allQuest[index].ruleFormOuter2.questionImageFlag?'width:670px;position:static;padding-left:0px;':'width:567px;position:static;padding-left:0px;margin-right:10px'"
                                    ></el-input>
                                    <!-- 投票 选项的图片上传 -->
                                      <el-upload
                                      :disabled="disabled"
                                      v-if="allQuest[index].ruleFormOuter2[ls].questionImageFlag"
                                      class=""
                                      style="display:inline-block;margin-right:10px;margin-left:10px"
                                      action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
                                      :before-upload="beforeAvatarUpload"
                                      :limit="1"
                                      :show-file-list="false"
                                      :on-success= "upLoad1Suc3"
                                      :on-error= "upLoad1Err3"
                                    >
                                      <el-button :disabled="disabled" icon="el-icon-picture" circle @click="upLoad3(index,ls)"></el-button>
                                    </el-upload>
                                      <el-button  icon="el-icon-plus" circle v-if="ls == allQuest[index].ruleFormOuter2.length-1 && detailFlag" @click = "addQuestInner(index,ls)"></el-button>
                                      <el-button  icon="el-icon-minus" circle v-if="ls >= 2 && detailFlag" @click = "delQuestInner(index,ls)"></el-button>
                                </el-form-item>
                              </el-form>
                            </div>
                            <!-- 刷票逻辑 -->
                            <div v-if="ballotLayout" v-for="(option, ls) in allQuest[index].ruleFormOuter2">
                              <el-form-item :label="`选项${ls -0 +1}：`" prop="name" class="firstList">
                                  <el-input 
                                    :disabled="disabled" v-model.trim="allQuest[index].ruleFormOuter2[ls].option"
                                  ></el-input>
                                  <div class="BrushTicket" >
                                    <div class="picker">
                                      <img v-if="allQuest[index].ruleFormOuter2[ls].questionImage != ''" :src="allQuest[index].ruleFormOuter2[ls].questionImage">
                                      <img v-else src="../../assets/img/sp.png">
                                    </div>
                                    <div class="BrushTicketBtn">
                                      <div>票数（总）：{{allQuest[index].ruleFormOuter2[ls].optionNumSum}}</div>
                                      <div>
                                        <div style="margin-right:30px;display:inline-block">票数（刷）：{{allQuest[index].ruleFormOuter2[ls].optionAddNum}}</div>
                                        <el-button type="primary" size="mini" @click="BrushTicketFuc(allQuest[index].ruleFormOuter2[ls].ballotOptionId)">刷票</el-button>
                                      </div>
                                    </div>
                                  </div>
                              </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <!-- 添加问题按钮 -->
                <div v-if="addButton" class="addQuest" @click="addQuest">
                    +&nbsp;添加问题
                </div>
            </div>
            
            <!-- 确定 取消 -->
            <div v-if="!buttonFooterFlag" class="footer">
                <el-button @click="cancelModify">取 消</el-button>
                <el-button type="primary" @click="submitData('ruleForm','ruleForm2','ruleForm3','ruleForm4','ruleForm5','ruleForm6')">确 定</el-button>
            </div>
            <!-- 详情底部按钮 -->
            <div v-if="buttonFooterFlag" class="footer">
                <el-button type="primary" @click="detailClose">关 闭</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
  getVotethemeNamesList,
  saveTelHtf,
  getBallotInfoReq,
  updateBallotInfoReq,
  addOptionSupportReq
} from "../../service/getData.js";
import Heads from "../common/head.vue";
export default {
  data() {
    return {
      validHtf: false,
      validHtf2: false,
      validHtf3: false,
      validHtf4: false,
      validHtf5: false,
      validHtf6: false,
      mSelectdisabled: false,
      ballotLayout: false,
      detailFlag: true,
      buttonFooterFlag: false,
      i: "",
      pageIndex: "",
      telList: [], // 模板列表
      addButton: true, // 添加按钮得开关
      disabled: false, // 只读开关
      letter: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      qTypeFucFlag: true,
      fixedValueFlag: false, // 是否固定值发币
      switch1Flag: false, // 是否发币
      //  所有问题得集合
      allQuest: [
        //   问题名字
        {
          // 外层form表单
          ruleFormOuter: {
            mouseoverFlag: false,
            questionImageFlag: true,
            questionImage: "",
            name: "",
            radio: 0,
            textarea2: ""
          },
          // 内层form表单
          ruleFormInner: [
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              // 回答
              answer: "",
              judge: "",
              fraction: 0
            },
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              // 回答
              answer: "",
              judge: "",
              fraction: 0
            }
          ],
          // 投票上限制
          maxLength: "",
          // 投票的数据集合
          ruleFormOuter2: [
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              option: ""
            },
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              option: ""
            },
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              option: ""
            }
          ]
        }
      ],
      // 折叠面板
      ruleForm: {
        telSelect: "",
        qType: 0,
        name: "",
        rule: "",
        moons: "",
        delivery: false,
        resource: 0
      },
      ruleForm2: {},
      rules: {
        name: [{ required: true, message: "请输入问卷名称", trigger: "blur" }],
        telSelect: [
          { required: true, message: "请选择模板", trigger: "change" }
        ],
        qType: [
          { required: true, message: "请选择问卷类型", trigger: "change" }
        ],
        rule: [
          { required: true, message: "请选择发放规则", trigger: "change" }
        ],
        moons: [
          { required: true, message: "请输入月亮币个数", trigger: "blur" },
          { type: "number", message: "只能输入数字", trigger: "blur" }
        ],
        resource: [
          { required: true, message: "请选择是否发放月亮币", trigger: "change" }
        ]
      },
      rules2: {
        name: [{ required: true, message: "请输入题干内容", trigger: "blur" }]
        // textarea2: [{ required: true, message: "请输入答案内容", trigger: "blur" }],
      },
      rules3: {
        answer: [
          // { required: true, message: "请输入答案内容", trigger: "blur" }
        ],
        judge: [
          // { required: true, message: "请输入答案内容", trigger: "change" }
        ],
        fraction: [
          { required: true, message: "请输入分数", trigger: "blur" },
          { type: "number", message: "只能输入数字", trigger: "blur" }
        ]
      },
      rules4: {
        name: [{ required: true, message: "请输入标题内容", trigger: "blur" }]
      },
      rules5: {
        maxLength: [
          { required: true, message: "请输入最大投票数", trigger: "blur" },
          { type: "number", message: "只能输入数字", trigger: "blur" }
        ]
      },
      rules6: {
        option: [{ required: true, message: "请输入选项内容", trigger: "blur" }]
      }
    };
  },
  components: {
    Heads
  },
  // 组件加载前判断是从哪个入口来得
  created() {
    let params = this.$router.currentRoute.query.type;
    // 获取所有模板列表
    getVotethemeNamesList({}).then(res => {
      let data = JSON.parse(res);
      if (data.respCode == 0) {
        this.telList = data.data;
      } else {
        this.$message({
          message: data.respMsg,
          type: "error"
        });
      }
    });
    // 来源自编辑,请求数据捡来内容回显
    if (params == "modify") {
      // 编辑的时候模板选择下拉框禁用
      this.mSelectdisabled = true;
      let ballotId = this.$router.currentRoute.query.ballotId;
      this.detailFlag = true;
      // 将列表全部收缩
      this.disabled = false;
      // 显示添加按钮
      this.addButton = true;
      // 底部按钮变化
      this.buttonFooterFlag = false;
      this.getBallotInfoFuc(ballotId);
    } else if (params == "details") {
      let ballotId = this.$router.currentRoute.query.ballotId;
      this.detailFlag = false;
      // 来源自详情,部分为只读模式，如果投票详情，增加刷票功能
      // 将列表全部收缩
      this.disabled = true;
      // 隐藏添加按钮
      this.addButton = false;
      // 底部按钮变化
      this.buttonFooterFlag = true;
      // 根据ballotId获取详情的数据
      this.getBallotInfoFuc(ballotId);
    }
  },
  methods: {
    /**
     * 入口详情，的回显数据
     * params: ballotId
     */
    getBallotInfoFuc(ballotId) {
      getBallotInfoReq({ ballotId: ballotId }).then(res => {
        let data = JSON.parse(res);
        if (data.respCode == 0) {
          let listReq = data.data;
          if (listReq.isgive == 1) {
            this.switch1Flag = true;
          }
          if (listReq.giveRole == 2) {
            this.fixedValueFlag = true;
          }
          // 投票问卷 公用的回显数据
          this.ruleForm.qType = listReq.ballotType; // 问卷类型
          this.ruleForm.name = listReq.ballotTitle; // 问卷名称
          this.ruleForm.telSelect = listReq.themeName; // 模板名称
          this.ruleForm.resource = listReq.isgive; // 是否发放月亮币
          this.ruleForm.rule = listReq.giveRole; // 月亮币发放规则
          this.ruleForm.moons = listReq.giveMoonCash; // 月亮币发放数量
          // 先判断问卷类型 0问卷  1 投票
          if (listReq.ballotType == 0) {
            this.qTypeFucFlag = true;
            // 遍历所有的问题
            this.allQuest = [];
            listReq.ballotQues.some((item, index) => {
              let ballotQuesItem = [];
              // 判断是不是问答   2
              if (item.questionType == 2) {
                // 为问答的时候 数组中只有一项不需要遍历
                let ruleFormOuter = {
                  mouseoverFlag: false,
                  questionImageFlag: false,
                  questionImage: item.questionImage,
                  name: item.questionTitle,
                  radio: item.questionType,
                  textarea2: item.ballotOptions[0].optionContent
                };
                let ruleFormInner = [
                  {
                    mouseoverFlag: false,
                    questionImageFlag: true,
                    questionImage: "",
                    // 回答
                    answer: "",
                    judge: "",
                    fraction: 0
                  },
                  {
                    mouseoverFlag: false,
                    questionImageFlag: true,
                    questionImage: "",
                    // 回答
                    answer: "",
                    judge: "",
                    fraction: 0
                  }
                ];
                // 投票的数据集合
                let ruleFormOuter2 = [
                  {
                    mouseoverFlag: false,
                    questionImageFlag: true,
                    questionImage: "",
                    option: ""
                  },
                  {
                    mouseoverFlag: false,
                    questionImageFlag: true,
                    questionImage: "",
                    option: ""
                  },
                  {
                    mouseoverFlag: false,
                    questionImageFlag: true,
                    questionImage: "",
                    option: ""
                  }
                ];
                let dataObj = {};
                dataObj.maxLength = "";
                dataObj.ruleFormOuter2 = ruleFormOuter2;
                dataObj.ruleFormInner = ruleFormInner;
                dataObj.ruleFormOuter = ruleFormOuter;
                this.allQuest.push(dataObj);
              } else {
                // 为单选多选的情况// 遍历选项
                let ruleFormOuter = {
                  mouseoverFlag: false,
                  questionImageFlag: false,
                  questionImage: item.questionImage,
                  name: item.questionTitle,
                  radio: item.questionType,
                  textarea2: ""
                };
                let ruleFormInner = [];
                item.ballotOptions.some((ls, i) => {
                  ruleFormInner.push({
                    mouseoverFlag: false,
                    questionImageFlag: false,
                    questionImage: ls.optionImage,
                    // 回答
                    answer: ls.optionTitle,
                    judge: ls.optionRight,
                    fraction: ls.optionCount
                  });
                });
                let dataObj = {};
                dataObj.ruleFormOuter = ruleFormOuter;
                dataObj.ruleFormInner = ruleFormInner;
                this.allQuest.push(dataObj);
              }
            });
          } else if (listReq.ballotType == 1) {
            if (this.$router.currentRoute.query.type == "details") {
              // 投票显示另一种布局
              this.ballotLayout = true;
            }
            // 投票的对应回显
            this.qTypeFucFlag = false;
            // 遍历所有的问题
            this.allQuest = [];
            listReq.ballotQues.some((item, index) => {
              let ruleFormOuter = {
                mouseoverFlag: false,
                questionImageFlag: false,
                questionImage: item.questionImage,
                name: item.questionTitle,
                radio: item.questionType
              };
              let ruleFormOuter2 = [];
              item.ballotOptions.some((ls, i) => {
                ruleFormOuter2.push({
                  mouseoverFlag: false,
                  questionImageFlag: false,
                  questionImage: ls.optionImage,
                  option: ls.optionTitle,
                  optionAddNum: ls.optionAddNum,
                  optionNumSum: ls.optionNumSum,
                  ballotOptionId: ls.ballotOptionId
                });
              });
              let dataObj = {};
              dataObj.ruleFormOuter = ruleFormOuter;
              dataObj.ruleFormOuter2 = ruleFormOuter2;
              dataObj.maxLength = item.questionNum;
              this.allQuest.push(dataObj);
            });
          }
        } else {
          this.$message({
            message: data.respMsg,
            type: "error"
          });
        }
      });
    },
    // 设置图片路径
    upLoad1Suc(response, file, fileList) {
      this.allQuest[this.pageIndex].ruleFormOuter.questionImage =
        response.respMsg;
      this.allQuest[this.pageIndex].ruleFormOuter.questionImageFlag = false;
      this.$message({
        message: "图片上传成功",
        type: "success"
      });
    },
    upLoad1Suc2(response, file, fileList) {
      this.allQuest[this.pageIndex].ruleFormInner[this.i].questionImage =
        response.respMsg;
      this.allQuest[this.pageIndex].ruleFormInner[
        this.i
      ].questionImageFlag = false;
      this.$message({
        message: "图片上传成功",
        type: "success"
      });
    },
    // 投票选项上传
    upLoad1Suc3(response, file, fileList) {
      this.allQuest[this.pageIndex].ruleFormOuter2[this.i].questionImage =
        response.respMsg;
      this.allQuest[this.pageIndex].ruleFormOuter2[
        this.i
      ].questionImageFlag = false;
      this.$message({
        message: "图片上传成功",
        type: "success"
      });
    },
    // 上传失败回掉
    upLoad1Err(err, file, fileList) {
      this.$message({
        message: "图片上传失败",
        type: "error"
      });
    },
    upLoad1Err2(err, file, fileList) {
      this.$message({
        message: "图片上传失败",
        type: "error"
      });
    },
    // 投票选项上传失败
    upLoad1Err3(err, file, fileList) {
      this.$message({
        message: "图片上传失败",
        type: "error"
      });
    },
    //   校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 投票单选多选切换时的重置
    voteChange(index) {
      this.allQuest[index].maxLength = "";
    },
    // 点击添加问题
    addQuest() {
      this.allQuest.push({
        // 外层form表单
        ruleFormOuter: {
          mouseoverFlag: false,
          questionImageFlag: true,
          questionImage: "",
          name: "",
          radio: 0,
          textarea2: ""
        },
        // 内层form表单
        ruleFormInner: [
          {
            mouseoverFlag: false,
            questionImageFlag: true,
            questionImage: "",
            // 回答
            answer: "",
            judge: "",
            fraction: 0
          },
          {
            mouseoverFlag: false,
            questionImageFlag: true,
            questionImage: "",
            // 回答
            answer: "",
            judge: "",
            fraction: 0
          }
        ],
        // 投票上限制
        maxLength: "",
        // 投票的数据集合
        ruleFormOuter2: [
          {
            mouseoverFlag: false,
            questionImageFlag: true,
            questionImage: "",
            option: ""
          },
          {
            mouseoverFlag: false,
            questionImageFlag: true,
            questionImage: "",
            option: ""
          },
          {
            mouseoverFlag: false,
            questionImageFlag: true,
            questionImage: "",
            option: ""
          }
        ]
      });
    },
    // 点击添加选项
    addOption(index) {
      this.allQuest[index].ruleFormInner.push({
        mouseoverFlag: false,
        questionImageFlag: true,
        questionImage: "",
        // 回答
        answer: "",
        judge: "",
        fraction: 0
      });
    },
    switch1(e) {
      this.ruleForm.moons = "";
      this.ruleForm.rule = "";
      this.switch1Flag = false;
      this.fixedValueFlag = false;
      if (e == 0) {
        this.switch1Flag = false;
      } else if (e == 1) {
        this.switch1Flag = true;
      }
    },
    // 是否固定值发币
    fixedValue(e) {
      if (e == "1") {
        this.fixedValueFlag = false;
      } else {
        this.fixedValueFlag = true;
      }
    },
    // 问卷类型切换
    qTypeFuc(e) {
      // 切换得时候初始化数据
      this.allQuest = [
        //   问题名字
        {
          // 外层form表单
          ruleFormOuter: {
            mouseoverFlag: false,
            questionImageFlag: true,
            questionImage: "",
            name: "",
            radio: 0,
            textarea2: ""
          },
          // 内层form表单
          ruleFormInner: [
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              // 回答
              answer: "",
              judge: "",
              fraction: 0
            },
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              // 回答
              answer: "",
              judge: "",
              fraction: 0
            }
          ],
          // 投票上限制
          maxLength: "",
          // 投票的数据集合
          ruleFormOuter2: [
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              option: ""
            },
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              option: ""
            },
            {
              mouseoverFlag: false,
              questionImageFlag: true,
              questionImage: "",
              option: ""
            }
          ]
        }
      ];
      if (e == 1) {
        this.qTypeFucFlag = false;
      } else {
        this.qTypeFucFlag = true;
      }
    },
    // 问题点击切换隐藏
    questClick() {
      let ele = event.currentTarget.parentNode.parentNode;
      if (ele.className.indexOf("eleNone") < 0) {
        ele.firstElementChild.firstElementChild.className =
          "el-icon-caret-right";
        ele.nextElementSibling.className = "none";
        ele.className = "title eleNone";
        ele.parentNode.style =
          "margin-bottom: 0px;border-bottom:1px solid rgba(201, 201, 201, 1);";
      } else {
        ele.firstElementChild.firstElementChild.className =
          "el-icon-caret-bottom";
        ele.nextElementSibling.className = "";
        ele.className = "title";
        ele.parentNode.style = "";
      }
    },
    // 里面选项得切换
    questInnerClick() {
      let ele = event.currentTarget.parentNode.parentNode;
      if (ele.className.indexOf("eleNone") < 0) {
        ele.firstElementChild.firstElementChild.className =
          "el-icon-caret-right";
        ele.nextElementSibling.className = "none";
        ele.className = "title eleNone";
        ele.parentNode.style = "padding-bottom: 0px;";
      } else {
        ele.firstElementChild.firstElementChild.className =
          "el-icon-caret-bottom";
        ele.nextElementSibling.className = "";
        ele.className = "title";
        ele.parentNode.style = "";
      }
    },
    // 里面得选项添加
    addQuestInner(index, ls) {
      this.allQuest[index].ruleFormOuter2.push({
        mouseoverFlag: false,
        questionImageFlag: true,
        questionImage: "",
        option: ""
      });
    },
    // 里面得选项删除
    delQuestInner(index, ls) {
      this.allQuest[index].ruleFormOuter2.splice(ls, 1);
    },
    // 删除里面得选项卡
    delQuestInnerClick(index, i) {
      this.allQuest[index].ruleFormInner.splice(i, 1);
    },
    // 删除外层得选项卡
    delOuterCar(index) {
      this.allQuest.splice(index, 1);
    },
    // 点击取消得时候
    cancelModify() {
      this.$router.push({
        path: "/questionnaire",
        name: "Questionnaire",
        params: {
          name: "type",
          dataObj: "cancel"
        }
      });
    },
    // 点击关闭
    detailClose() {
      this.$router.push({
        path: "/questionnaire",
        name: "Questionnaire",
        params: {
          name: "type",
          dataObj: "close"
        }
      });
    },
    // 点击确定得时候
    submitData(ruleForm, ruleForm2) {
      // 首先进行公共部分的校验   基础信息
      this.$refs[ruleForm].validate(valid => {
        this.validHtf = valid;
      });
      var validHtfFlagHtf = true;
      // 校验逻辑：点击确定的时候判断是问卷还是投票然后分别进行校验
      if (this.ruleForm.qType == 0) {
        // 当前页面为问卷 对题干进行校验
        this.allQuest.some((item, i) => {
          if (
            String(item.ruleFormOuter.name) == "" ||
            String(item.ruleFormOuter.name).length > 50
          ) {
            validHtfFlagHtf = false;
            this.$message({
              message: `问题${i - 0 + 1}的题干不能为空且不能大于50个字符`,
              type: "error"
            });
            return false;
          }
          // 判断是单选多选还是问答
          if (item.ruleFormOuter.radio == 2) {
            // 为问答情况
          } else {
            // 为单选 多选的情况 需要遍历所有的问题
            item.ruleFormInner.some((ls, index) => {
              if (ls.questionImage == "" && ls.answer == "") {
                validHtfFlagHtf = false;
                this.$message({
                  message: `问题${i - 0 + 1}的选项${
                    this.letter[index]
                  }的答案内容不能为空或者上传一张图片`,
                  type: "error"
                });
                return false;
              }
              if ( String(ls.fraction).length == 0 || isNaN(ls.fraction)) {
                validHtfFlagHtf = false;
                this.$message({
                  message: `问题${i - 0 + 1}的选项${
                    this.letter[index]
                  }的分数必须为数字`,
                  type: "error"
                });
                return false;
              }
            });
          }
        });
      } else if (this.ruleForm.qType == 1) {
        // 当前页面为投票
        this.allQuest.some((item, i) => {
          if (
            String(item.ruleFormOuter.name) == "" ||
            String(item.ruleFormOuter.name).length > 50
          ) {
            validHtfFlagHtf = false;
            this.$message({
              message: `问题${i - 0 + 1}的标题不能为空且不能大于50个字符`,
              type: "error"
            });
            return false;
          }
          // 判断是单选多选
          if (item.ruleFormOuter.radio == 1) {
            // 为多选情况
            if ( String(item.maxLength).length == 0 || !(item.maxLength-0 <= item.ruleFormOuter2.length)) {
              validHtfFlagHtf = false;
              this.$message({
                message: `问题${i - 0 + 1}的投票上限数必须为数字且不大于选项数`,
                type: "error"
              });
              return false;
            }
            item.ruleFormOuter2.some((ls, index) => {
              if (ls.questionImage == "" && ls.option == "") {
                validHtfFlagHtf = false;
                this.$message({
                  message: `问题${i - 0 + 1}的选项${index -
                    0 +
                    1}的答案内容不能为空或者上传一张图片`,
                  type: "error"
                });
                return false;
              }
            });
          } else {
            // 为单选 多选的情况 需要遍历所有的问题
            item.ruleFormOuter2.some((ls, index) => {
              if (ls.questionImage == "" && ls.option == "") {
                validHtfFlagHtf = false;
                this.$message({
                  message: `问题${i - 0 + 1}的选项${index -
                    0 +
                    1}的答案内容不能为空或者上传一张图片`,
                  type: "error"
                });
                return false;
              }
            });
          }
        });
      }
      if (validHtfFlagHtf && this.validHtf) {
        this.submitDataFuc();
      }
    },
    submitDataFuc() {
      let ballotQues = [];
      // 1. 判断问卷类型 0：问卷， 1：投票
      if (this.ruleForm.qType == 1) {
        // 1为投票情况
        this.allQuest.some((item, index) => {
          let ballotQuesItem = [];
          // 为单选多选的情况// 遍历选项
          item.ruleFormOuter2.some((ls, i) => {
            ballotQuesItem.push({
              optionTitle: ls.option, // 选项的标题
              optionImage: ls.questionImage // 问题选项图片
            });
          });
          ballotQues.push({
            ballotOptions: ballotQuesItem,
            questionTitle: item.ruleFormOuter.name, // 题干
            questionType: item.ruleFormOuter.radio, // 问题类型
            questionImage: item.questionImage, // 问题图片
            questionNum: item.maxLength // 投票多选上限
          });
        });
      } else {
        // 遍历所有的问题
        this.allQuest.some((item, index) => {
          let ballotQuesItem = [];
          // 判断是不是问答   2
          if (item.ruleFormOuter.radio == 2) {
            // 为问答的时候 数组中只有一项不需要遍历
            ballotQuesItem.push({
              optionContent: item.ruleFormOuter.textarea2 // 问答题答案
            });
          } else {
            // 为单选多选的情况// 遍历选项
            item.ruleFormInner.some((ls, i) => {
              ballotQuesItem.push({
                optionCount: ls.fraction, // 答案的分值
                optionRight: ls.judge, // 是否为正确答案
                optionTitle: ls.answer, // 选项的标题
                optionImage: ls.questionImage // 问题选项图片
              });
            });
          }
          ballotQues.push({
            ballotOptions: ballotQuesItem,
            questionTitle: item.ruleFormOuter.name, // 题干
            questionType: item.ruleFormOuter.radio, // 问题类型
            questionImage: item.ruleFormOuter.questionImage // 问题图片
          });
        });
      }
      let userId = JSON.parse(localStorage["users"]).admin.userId;
      let params = {
        userId: userId,
        ballotTitle: this.ruleForm.name, // 问卷名称
        themeName: this.ruleForm.telSelect, // 模板选择
        ballotType: this.ruleForm.qType, // 问卷类型
        isgive: this.ruleForm.resource, // 月亮币发放
        giveRole: this.ruleForm.rule, // 发放规则
        giveMoonCash: this.ruleForm.moons, // 月亮币发放数量
        // 问题列表
        ballotQues: ballotQues
      };
      // 判断是新增还是修改
      if (this.$router.currentRoute.query.type == "modify") {
        let ballotId = this.$router.currentRoute.query.ballotId;
        params.ballotId = ballotId;
        updateBallotInfoReq(JSON.stringify(params)).then(res => {
          let data = JSON.parse(res);
          if (data.respCode == 0) {
            this.$message({
              message: data.respMsg,
              type: "success"
            });
            this.$router.push({
              path: "/questionnaire",
              name: "Questionnaire",
              params: {
                name: "type",
                dataObj: "save"
              }
            });
          } else {
            this.$message({
              message: data.respMsg,
              type: "error"
            });
          }
        });
      } else {
        saveTelHtf(JSON.stringify(params)).then(res => {
          let data = JSON.parse(res);
          if (data.respCode == 0) {
            this.$message({
              message: data.respMsg,
              type: "success"
            });
            this.$router.push({
              path: "/questionnaire",
              name: "Questionnaire",
              params: {
                name: "type",
                dataObj: "save"
              }
            });
          } else {
            this.$message({
              message: data.respMsg,
              type: "error"
            });
          }
        });
      }
    },
    // 题干的图片上传
    upLoad1(index) {
      this.pageIndex = index;
    },
    upLoad2(index, i) {
      this.pageIndex = index;
      this.i = i;
    },
    upLoad3(index, ls) {
      this.pageIndex = index;
      this.i = ls;
    },
    // 图片的鼠标进入事件  回显则禁止
    mouseover(index) {
      if (!this.addButton) return false;
      this.allQuest[index].ruleFormOuter.mouseoverFlag = true;
    },
    mouseout(index) {
      this.allQuest[index].ruleFormOuter.mouseoverFlag = false;
    },
    mouseoverItem(index, i) {
      if (!this.addButton) return false;
      this.allQuest[index].ruleFormInner[i].mouseoverFlag = true;
    },
    mouseoutItem(index, i) {
      this.allQuest[index].ruleFormInner[i].mouseoverFlag = false;
    },
    mouseoverItem2(index, ls) {
      if (!this.addButton) return false;
      this.allQuest[index].ruleFormOuter2[ls].mouseoverFlag = true;
    },
    mouseoutItem2(index, ls) {
      this.allQuest[index].ruleFormOuter2[ls].mouseoverFlag = false;
    },
    // 删除照片
    delImg(index) {
      if (!this.addButton) return false;
      this.$confirm("您确定要删除上传的图片嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.allQuest[index].ruleFormOuter.questionImage = "";
        this.allQuest[index].ruleFormOuter.questionImageFlag = true;
        this.allQuest[index].ruleFormOuter.mouseoverFlag = false;
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    delImg2(index, i) {
      if (!this.addButton) return false;
      this.$confirm("您确定要删除上传的图片嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.allQuest[index].ruleFormInner[i].questionImage = "";
        this.allQuest[index].ruleFormInner[i].questionImageFlag = true;
        this.allQuest[index].ruleFormInner[i].mouseoverFlag = false;
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    delImg3(index, ls) {
      if (!this.addButton) return false;
      this.$confirm("您确定要删除上传的图片嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.allQuest[index].ruleFormOuter2[ls].questionImage = "";
        this.allQuest[index].ruleFormOuter2[ls].questionImageFlag = true;
        this.allQuest[index].ruleFormOuter2[ls].mouseoverFlag = false;
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    // 图片上传限制
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 /1024 <= 1;
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 1M!");
        return isLt2M;
      } else if (file.type === "image/jpeg" && isLt2M) {
        return file.type && isLt2M;
      } else if (file.type === "image/png" && isLt2M) {
        return file.type && isLt2M;
      } else {
        this.$message.error("上传的图片只能是 JPG/PNG/JPEG 格式!");
      }
    },
    // 刷票按钮
    BrushTicketFuc(ballotOptionId) {
      this.$prompt("请输入刷票数量：", "刷票", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: "内容必须为数字"
      }).then(({ value }) => {
        let params = {
          ballotOptionId,
          optionCount: value
        };
        // 获取刷票的数据
        addOptionSupportReq(params)
          .then(res => {
            let data = JSON.parse(res);
            if (data.respCode == 0) {
              this.$message({
                message: "刷票成功",
                type: "success"
              });
              this.getBallotInfoFuc(this.$router.currentRoute.query.ballotId);
            } else {
              let data = JSON.parse(res);
              this.$message({
                message: data.respMsg,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              message: err,
              type: "error"
            });
          });
      });
    }
  }
};
</script>
<style lang="less">
#TAdministration {
  // 刷票
  .BrushTicket {
    margin-top: 24px;
    display: flex;
    height: 140px;
    // justify-content: space-between;
    .picker {
      width: 50%;
      height: 140px;
      padding-right: 30px;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    .BrushTicketBtn {
      width: 50%;
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .firstList {
    .el-form-item__content {
      .el-textarea {
        padding-left: 170px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .uploadImg {
        display: inline-block;
        z-index: 333;
        position: relative;
        width: 159px;
        height: 159px;
        border-radius: 6px;
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
        .backg {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.6;
          width: 100%;
          height: 100%;
          background-color: #303133;
          border-radius: 6px;
        }
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -14px;
          margin-top: -14px;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
        }
      }
      .awserItemPng {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -20px;
      }
    }
  }

  // 上传图片
  .uploadJpg {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
  .el-upload--picture-card {
    background-color: #fff;
    border: 1px dashed #fff;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 40px !important;
    height: 40px !important;
    line-height: 40px !important;
    vertical-align: top;
    i {
      font-size: 14px !important;
    }
  }
  // 隐藏
  .none {
    display: none !important;
  }
  .eleNone {
    // margin-bottom: 0px;
  }
  .operation {
    i {
      cursor: pointer;
    }
  }
  .el-collapse-item__arrow {
    margin: 20px;
  }
  .content {
    padding: 24px;
    .title {
      font-size: 14px;
      line-height: 18px;
      color: #303133;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 2em;
    }
    .tipsItem {
      width: 100%;
      height: 36px;
      font-size: 13px;
      line-height: 36px;
      text-indent: 2em;
      font-weight: 700;
      border: 1px solid rgba(201, 201, 201, 1);
      background-color: rgba(242, 242, 242, 1);
      margin-bottom: 24px;
    }
    .from {
      position: relative;
      .moonItem {
        position: absolute;
        bottom: -22px;
        left: 240px;
      }
    }
    .tipsTitle {
      font-size: 12px;
      line-height: 12px;
      margin-bottom: 24px;
      color: #a1a1a1;
      padding-left: 30px;
    }
    .from2 {
      margin: 0 30px;
      .q-item {
        margin-bottom: 24px;
        border: 1px solid rgba(201, 201, 201, 1);
        margin-top: -1px;
        form {
          padding-right: 40px;
          padding-top: 20px;
          // 选择题选项容器
          .ruleForm2-item-container {
            border: 1px solid rgba(201, 201, 201, 1);
            padding-bottom: 20px;
            margin-top: -1px;
          }
          // 添加选项
          .addOption {
            width: 100%;
            height: 60px;
            margin-top: 20px;
            border: 1px dashed rgba(201, 201, 201, 1);
            cursor: pointer;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .title {
          height: 36px;
          line-height: 36px;
          text-indent: 2em;
          background-color: rgba(242, 242, 242, 1);
        }
      }
    }
    // 添加问题按钮
    .addQuest {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed rgba(201, 201, 201, 1);
      border-radius: 5px;
      margin-top: 20px;
      box-sizing: border-box;
      font-size: 14px;
      cursor: pointer;
    }
    // 取消确定
    .footer {
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border: 1px solid rgba(201, 201, 201, 1);
      padding-right: 30px;
      margin-top: 20px;
    }
  }
}
</style>

