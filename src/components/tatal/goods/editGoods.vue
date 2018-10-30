<template>
    <div>
        <h4>
            商品信息
        </h4>
        <div class="detailWarp">
          <el-row class="container">
            <el-col :span="18">
              <el-form size="small" :rules="rules" :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                  
                  <el-form-item label="商品名称" prop="goodsName">
                      <el-input v-model="form.goodsName"></el-input>
                  </el-form-item>

                  <el-form-item label="商品描述" prop="goodsDesc">
                      <el-input v-model="form.goodsDesc"></el-input>
                  </el-form-item>

                  <el-form-item label="商品图片：" prop="goodsImg">
                      <el-upload class="upload-demo"
                      :before-upload="beforeAvatarUpload"
                     :on-success="handleAvatarSuccess"
                     :show-file-list="true"
                       action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg" :file-list="fileList" list-type="picture">
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                  </el-form-item>

                  <el-form-item label="库存数量" prop="stock">
                      <el-input v-model="form.stock"></el-input>
                  </el-form-item>

                  <el-form-item label="剩余库存">
                      <span>{{form.surplusStock}}</span>
                  </el-form-item>
                  
                  <el-form-item label="价格" prop="moonCash">
                      <el-input v-model="form.moonCash"></el-input>
                  </el-form-item>
                  
                  <el-form-item label="购买须知" prop="goodsTips">
                      <el-input v-model="form.goodsTips"></el-input>
                  </el-form-item>
                  
                </el-form>
              </el-col>
          </el-row>
        </div>

        <el-col :span="18" :style="{textAlign: 'right'}">
            <el-button type="default" @click="cancelEdit">取消</el-button>
            <el-button type="primary" @click="update('form')">确定</el-button>
        </el-col>
    </div>
</template>
<script>
import Heads from "../../common/head.vue";
import Listhead from "../../common/listhead.vue";
import Bus from "../../common/bus.js";

import {
  getGoodsList,
  getGoodsDetail,
  updateGoods
} from "../../../service/getData.js";

export default {
  data() {
    // 检查输入框内容是否为空
    var checkContent = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("该项内容不能为空"));
      }
    };
    return {
      fileList: [
        {
          name: "",
          url: ""
        }
      ],
      form: {
        goodsId:"",
        goodsName: "",
        goodsDesc: "",
        goodsImg: "",
        stock: "",
        surplusStock: "",
        moonCash: "",
        goodsTips: ""
      },
      rules: {
        goodsName: [
          { required: true, message: "该项内容不能为空", trigger: "blur" }
        ],
        goodsDesc: [
          { required: true, message: "该项内容不能为空", trigger: "blur" }
        ],
        stock: [
          { required: true, message: "该项内容不能为空", trigger: "blur" }
        ],
        surplusStock: [
          { required: true, message: "该项内容不能为空", trigger: "blur" }
        ],
        moonCash: [
          { required: true, message: "该项内容不能为空", trigger: "blur" }
        ],
        goodsTips: [
          { required: true, message: "该项内容不能为空", trigger: "blur" }
        ]
      },
      rules2: {
        content: [{ validator: checkContent, trigger: "blur" }]
      }
    };
  },
  methods: {
      handleAvatarSuccess(res, file) {
            console.log(URL.createObjectURL(file.raw))
                    this.ruleForm.goodgoodsImgsImg= URL.createObjectURL(file.raw);
                },
    beforeAvatarUpload(file) {
                    console.log(file)
                    const isJPG = file.type === 'image/png'||'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 1;

                    if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 1MB!');
                    }
                    return isJPG && isLt2M;
      },
    cancelEdit() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      var pass = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          pass = true;
        } else {
          console.log("error submit!!");
          pass = false;
        }
      });
      return pass;
    },
    update(formName) {
      // 检查表单内容是否为空
      var pass = this.submitForm(formName);
      if (pass) {
        var params = {};
        params.goodsId = this.form.goodsId;
        params.goodsName = this.form.goodsName;
        params.goodsImg = this.form.goodsImg;
        params.goodsDesc = this.form.goodsDesc;
        params.stock = this.form.stock;
        params.surplusStock = this.form.surplusStock;
        params.moonCash = this.form.moonCash;
        params.goodsTips = this.form.goodsTips;

        // 提交修改信息
        updateGoods(params)
          .then(res => {
            var res = JSON.parse(res);
            //console.log(res);
            if (res.respCode === "0") {
              //跳转主页面
              this.$router.go(-1);
            } else {
              alert("修改失败");
            }
          })
          .catch(err => {
            alert("error" + err);
          });
      } else {
        //alert('不通过')
      }
    },
    getDetail(str) {
      var paramsCode = {
        goodsName: "",
        goodsCode: str.goodsCode
      };

      // 获取商品详情
      getGoodsList(paramsCode)
        .then(res => {
          var res = JSON.parse(res);
          this.form = res.data.list[0];
          this.form.surplusStock = this.form.stock - this.form.exNum;
          //this.fileList.url = this.form.goodsImg.replace("新", "");
          //console.log(this.fileList.url);
          console.log(this.form.goodsImg)
          this.fileList[0].url = this.form.goodsImg;
          console.log( this.fileList)
        })
        .catch(err => {
          alert("error" + err);
        });
    }
  },
  components: {
    Heads,
    Listhead,
    Bus
  },
  created() {
    var o = {
      goodsCode: this.$route.query.goodsCode
    };
    this.getDetail(o);
    console.log(o);
  }
};
</script>
<style lang="less">
h4 {
  height: 40px;
  background: #666;
  color: #fff;
  line-height: 40px;
  padding-left: 30px;
}
.detailWarp {
  margin-top: 20px;
}
.closebtn {
  padding: 40px 0 0 600px;
  z-index: 8889999;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 120px;
  border-top: 1px solid #ccc;
  background: #ffffff;
}
</style>
