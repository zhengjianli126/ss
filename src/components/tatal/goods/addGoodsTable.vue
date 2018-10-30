<template>
    <div class="addGoodsTableWrap">
        <div class="add">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="商品名称：" prop="goodsName">
                    <el-input type="text" placeholder="商品名称" v-model="ruleForm.goodsName"></el-input>
                </el-form-item>

                <el-form-item label="商品图片：" prop="goodsImg">
                    <el-upload  :before-upload="beforeAvatarUpload"
                     :on-success="handleAvatarSuccess"
                     :show-file-list="true"
                     class="upload-demo" action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg" list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="商品描述：" prop="goodsDesc">
                    <el-input type="text" placeholder="商品描述" v-model="ruleForm.goodsDesc"></el-input>
                </el-form-item>
                
                <el-form-item label="库存数量：" prop="stock">
                    <el-input type="text" placeholder="库存数量" v-model="ruleForm.stock"></el-input>
                </el-form-item>
                
                <el-form-item label="价格：" prop="moonCash">
                    <el-col :span="17" style="margin-right:15px">
                        <el-input type="text" placeholder="价格" v-model="ruleForm.moonCash"></el-input>
                    </el-col>
                    <el-col :span="6">/月亮币</el-col>
                </el-form-item>

                <el-form-item label="购买须知" prop="goodsTips">
                    <el-input type="textarea" placeholder="购买须知" v-model="ruleForm.goodsTips"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

import { getSaveGoods } from "../../../service/getData.js";

export default {
  data() {
    return {
      fileList: [
        {
          name: "",
          url:
            ""
        }
      ],
      ruleForm: {
        goodsName: "",
        goodsImg: "",
        goodsDesc: "",
        stock: "",
        moonCash: "",
        goodsTips: ""
      },
      rules: {
        goodsName: [
          { required: true, message: "该项目不能为空", trigger: "blur" }
        ],
        
        goodsDesc: [
          { required: true, message: "该项目不能为空", trigger: "blur" }
        ],
        stock: [
          { required: true, message: "该项目不能为空", trigger: "blur" }
        ],
        moonCash: [
          { required: true, message: "该项目不能为空", trigger: "blur" }
        ],
        goodsTips: [
          { required: true, message: "该项目不能为空", trigger: "blur" }
        ]
      }
    };
  },
  
  methods: {
    handleAvatarSuccess(res, file) {
          
                    this.ruleForm.goodgoodsImgsImg= res.respMsg;
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
    addGoods(str) {
      var params = {};
      params.goodsName = this.ruleForm.goodsName;
      params.goodsImg = this.ruleForm.goodgoodsImgsImg;
      params.goodsDesc = this.ruleForm.goodsDesc;
      params.stock = this.ruleForm.stock;
      params.moonCash = this.ruleForm.moonCash;
      params.goodsTips = this.ruleForm.goodsTips;

      getSaveGoods(params)
        .then(res => {
          var res = JSON.parse(res);
          if ((res.respCode = "0")) {
            console.log(res)
            this.$emit('getparams')
          } else {
            alert(res.respMsg);
          }
        })
        .catch(err => {
          alert("error" + err);
        });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  },
  computed: {},
  created() {
   
   
  },
  components: {}
};
</script>
<style lang="less" >
.addGoodsTableWrap {
  margin-right: 60px;
}
</style>


