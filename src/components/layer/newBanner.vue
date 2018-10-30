<template>
  <div>
    <el-form status-icon
            ref="sort"
            :model="sort"
             label-width="125px"
             size="mini">
      <el-row :gutter="10">
        <el-col  :span="18">
          <el-form-item class="" prop="title" :rules="[
                { required: true, message: '请输入标题', trigger: 'blur'}
              ]"
                        label="标题：">
            <el-input v-model="sort.title"
                      :maxlength="100"
                      placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="18">
        <el-form-item class="bannerdataPick"
                     prop="startTime" :rules="[
                { required: true, message: '请输入生效时间', trigger: 'change'}
              ]"
                      label="生效时间：">
          <el-date-picker v-model="sort.startTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择">
          </el-date-picker>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="18">
        <el-form-item class="bannerdataPick"
        prop="endTime" :rules="[
                { required: true, message: '请输入失效时间', trigger: 'change'}
              ]"
                      label="失效时间：">
          <el-date-picker v-model="sort.endTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="请选择">
          </el-date-picker>
        </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="10">
        <el-col :span="18">
        <el-form-item
                      label="是否是问卷：">
             <el-radio v-model="sort.type" :label="1">否</el-radio>
              <el-radio v-model="sort.type" :label="2">是</el-radio>
       </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="sort.type == 1" :gutter="10">
        <el-col :span="18">
        <el-form-item class="bannerdataPick"
        prop="imgHref" :rules="[
                { required: true, message: '请输入图片跳转地址', trigger: 'blur'}
              ]"
                      label="图片跳转地址：">
          <el-input v-model="sort.imgHref"
                      :maxlength="100"
                      placeholder="请输入图片跳转地址"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="sort.type == 2" :gutter="10">
        <el-col :span="18">
        <el-form-item class="bannerdataPick"
          prop="ballotId" :rules="[
                { required: true, message: '请选择问卷列表', trigger: 'change'}
              ]"
                      label="问卷列表：">
         <el-select v-model="sort.ballotId"
                       placeholder="请选择">
              <el-option :label="item.ballotTitle" v-for="(item, index) in list" :key="index"
                         :value="item.ballotId">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="18">
        <el-form-item class="bannerdataPick"
         prop="dialogImageUrl" :rules="[
                { required: true, message: '请选择图片', trigger: 'change'}
              ]"
                      label="图片上传：">
          <img class="imgShow" v-if="sort.dialogImageUrl" :src="sort.dialogImageUrl" alt="">
          <el-upload v-if="!sort.dialogImageUrl"
            action="http://39.106.49.2:8078/upload/upload_img?suffix=.jpg"
            list-type="picture-card"
            :before-upload="uploadBefore"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="sort.dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6" :offset="9">
          <el-button type="primary" @click="sure">确认</el-button>
          <el-button @click="clear">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { saveBanner, getAllBallots, bannerUpdate } from '../../service/getData.js'
export default {
  data () {
    return {
      sort: {
        title: '',
        startTime: '',
        endTime: '',
        type: 1,
        imgHref: '',
        dialogImageUrl: '',
        ballotId: ''
      },
      dialogVisible: false,
      list: [],
      fileType: ['jpeg', 'jpg','png']
    }
  },
  props: {
    bannerId: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    if (this.bannerId) {
      this.sort.title = this.item.bannerTitle
      this.sort.startTime = this.item.startTimeString
      this.sort.type = this.item.bannerType
      this.sort.imgHref = this.item.bannerLink
      this.sort.endTime = this.item.endTimeString
      this.sort.ballotId = this.item.bannerType == 1 ? '' : this.item.newsBallotId
      this.sort.dialogImageUrl = this.item.bannerImgpath
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.sort.dialogImageUrl = ''
    },
    handlePictureCardPreview(file) {
      // this.sort.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      console.log('object', res);
      // res = JSON.parse(res)
      this.sort.dialogImageUrl = res.respMsg
    },
    uploadBefore(file) {
      let typeArr = file.name.split('.')
      let type = typeArr[typeArr.length - 1]
      let isJPG = true
      for (let idx in this.fileType) {
        if (type.toUpperCase() === this.fileType[idx].toUpperCase()) {
          isJPG = true
          break
        }
      }
      const isLt2M = file.size / 1024  < 1000
      if (!isJPG) {
        this.$alert('不支持该格式!', '提示')
        return false
      } else if (!isLt2M) {
        this.$alert('上传大小不能超过 1M!', '提示')
        return false
      } else {
        return true
      }
    },
    clear() {
      this.$emit('clearDialog')
    },
    sure() {
      let that = this
      this.$refs['sort'].validate((valid) => {
        if (valid) {
          if (this.bannerId) {
            let params = {
              bannerId: this.bannerId,
              bannerTitle: this.sort.title,
              startTime: this.sort.startTime,
              endTime: this.sort.endTime,
              type: this.sort.type,
              bannerLink: this.sort.imgHref,
              ballotId: this.sort.ballotId,
              bannerImgpath: this.sort.dialogImageUrl
            }
            if (this.sort.type == 1) {
              params.ballotId = 1
            } else if (this.sort.type == 2) {
              params.ballotId = this.sort.ballotId
            }
            bannerUpdate(params).then(res => {
              let result = JSON.parse(res)
              if (result.respCode.toString() === '0') {
                that.$alert('修改成功', '提示', {
                  callback: action => {
                    that.$emit('clearDialog')
                  }
                })
              } else {
                this.$message(result.respMsg)
              }
            })
          } else {
            let params = {
              bannerTitle: this.sort.title,
              startTime: this.sort.startTime,
              endTime: this.sort.endTime,
              type: this.sort.type,
              bannerLink: this.sort.imgHref,
              ballotId: this.sort.ballotId,
              bannerImgpath: this.sort.dialogImageUrl
            }
            if (this.sort.type == 1) {
              params.ballotId = 1
            } else if (this.sort.type == 2) {
              params.ballotId = this.sort.ballotId
            }
            saveBanner(params).then(res => {
              let result = JSON.parse(res)
              if (result.respCode.toString() === '0') {
                that.$alert('新增成功', '提示', {
                  callback: action => {
                    that.$emit('clearDialog')
                  }
                })
              } else {
                this.$message(result.respMsg)
              }
            })
          }
        }
      })
    }
  },
  watch: {
    'sort.type': function(val) {
      if (val.toString() === '2' && this.list.length == 0) {
        getAllBallots().then(res => {
          console.log(res)
          res = JSON.parse(res)
          if (res.respCode.toString() === '0') {
            this.list = res.data
          } else {
            this.$message(res.respMsg)
          }
        })
      }
    }
  }
}
</script>

<style>
.bannerdataPick .el-date-editor{
  width: 100%
}
.bannerdataPick .el-select{
  width: 100%
}
</style>
<style scoped>
.imgShow{
  width: 148px;
  height: 148px;
}
</style>
