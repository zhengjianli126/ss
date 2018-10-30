<template>
  <div class="banner">
    <div>
      <div class="box">
        <el-row>
          <el-col :span="6">
            状态：
            <el-select v-model="ispub"
                       placeholder="请选择"
                       @change="statusChange">
              <el-option label="全部"
                         value="">
              </el-option>
              <el-option label="未上架"
                         value="0">
              </el-option>
              <el-option label="已上架"
                         value="1">
              </el-option>
              <el-option label="已下架"
                         value="2">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3"
                  :offset="15">
            <el-button plain
                       @click="addNew">新增</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="bannerTable">
        <el-table :data="tableData"
                  :header-cell-style="{background:'#f4f4f4',color:'#666'}"
                  tooltip-effect="dark"
                  border
                  style="width: 100%">
          <el-table-column prop="bannerTitle"
                           label="标题">
          </el-table-column>
          <el-table-column prop="bannerLink"
                           label="图片跳转地址">
          </el-table-column>
          <el-table-column with="300"
                           prop="address"
                           label="生效时间">
            <template slot-scope="scope">
              {{scope.row.startTimeString}}至{{scope.row.endTimeString}}
            </template>
          </el-table-column>
          <el-table-column prop="ispub"
                           label="状态">
            <template slot-scope="scope">
              {{scope.row.ispub | def}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.ispub == 0 || scope.row.ispub == 2"
                         @click="edit(scope.row)"
                         type="text"
                         size="small">修改</el-button>
              <el-button v-if="scope.row.ispub == 0 || scope.row.ispub == 2"
                         @click="publicBanner(scope.row,1)"
                         type="text"
                         size="small">上架</el-button>
              <el-button v-if="scope.row.ispub == 1"
                         @click="publicBanner(scope.row,2)"
                         type="text"
                         size="small">下架</el-button>
              <el-button @click="preview(scope.row)"
                         type="text"
                         size="small">预览</el-button>
              <el-button v-if="scope.row.ispub == 0 || scope.row.ispub == 2"
                         @click="deleteIt(scope.row)"
                         type="text"
                         size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="page"
                   :page-sizes="[10, 20, 30]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next"
                   :total="total">
    </el-pagination>
    <el-dialog title="新增"
               v-if="dialog.newAdd"
               :visible.sync="dialog.newAdd">
      <newBanner :item="{}" @clearDialog="clearDialog"></newBanner>
    </el-dialog>
    <el-dialog title="修改"
               v-if="dialog.editBanner"
               :visible.sync="dialog.editBanner">
      <newBanner @clearDialog="clearDialog"
                 :bannerId="bannerId"
                 :item="item"></newBanner>
    </el-dialog>
    <el-dialog :visible.sync="dialog.preview"
               v-if="dialog.preview">
      <a :href="bannerLink">
        <img width="100%"
             :src="bannerImgpath"
             alt="">
      </a>
    </el-dialog>
  </div>
</template>
<script>
import List from '../common/list.vue'
import newBanner from '../layer/newBanner'
import { getBannersByCondition, deleteBanner, publicBanner } from '../../service/getData.js'
export default {
  data () {
    return {
      ispub: '',
      dialog: {
        newAdd: false,
        editBanner: false,
        preview: false
      },
      item: {},
      bannerId: '',
      bannerLink: 'http://www.baidu.com',
      bannerImgpath: 'https://img.3dmgame.com/uploads/allimg/170915/174_170915002451_1_lit.jpg',
      total: 0,
      page: 1,
      pageSize: 10,
      tableData: [

      ],
      th: [
        {          id: '01',
          key: '标题'
        },
        {          id: '02',
          key: '图片跳转地址'
        },
        {          id: '03',
          key: '生效时间'
        },
        {          id: '04',
          key: '状态'
        },
        {          id: '05',
          key: '操作'
        }],
      head: [{
        id: '01',
        name: '角色名称',
        type: 'text',
        plaseholder: '',
        flag: true,
        option: [
          {
            id: '01',
            key: "111"
          }
        ]
      }],
      data: {}
    }
  },
  methods: {
    statusChange () {
      this.getList()
    },
    addNew () {
      this.dialog.newAdd = true
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getList()
    },
    edit (item) {
      this.item = item
      this.bannerId = item.bannerId
      this.dialog.editBanner = true
    },
    publicBanner (item, type) {
      let params = {
        bannerId: item.bannerId,
        ispub: type
      }
      publicBanner(params).then(res => {
        res = JSON.parse(res)
        if (res.respCode.toString() === '0') {
          this.$alert('操作成功', '提示')
          this.getList()
        } else {
          this.$message(res.respMsg)
        }
      })
    },
    preview (item) {
      this.bannerLink = item.bannerLink
      this.bannerImgpath = item.bannerImgpath
      this.dialog.preview = true
    },
    deleteIt (item) {
      let params = {
        bannerId: item.bannerId
      }
      this.$confirm('是否确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
          // type: 'warning'
        }).then(() => {
          deleteBanner(params).then(res => {
            res = JSON.parse(res)
            if (res.respCode.toString() === '0') {
              this.$alert('删除成功', '提示')
              this.getList()
            } else {
              this.$message(res.respMsg)
            }
          })
        })
    },
    clearDialog () {
      this.dialog.newAdd = false
      this.dialog.editBanner = false
      this.getList()
    },
    getList () {
      let params = {
        bannerTitle: '',
        ispub: this.ispub,
        page: this.page,
        pageSize: this.pageSize
      }
      getBannersByCondition(params).then(res => {
        let result = JSON.parse(res)
        if (result.respCode.toString() === '0') {
          this.tableData = result.data.list
          this.total = result.data.total
          this.pageSize = result.data.pageSize
          this.page = result.data.pageNum
        } else {
          this.$message(result.respMsg)
        }
      })
    }
  },
  filters: {
    def (val) {
      if (val == 0) {
        return '未上架'
      } else if (val == 1) {
        return '已上架'
      } else if (val == 2) {
        return '已下架'
      }
    }
  },
  mounted () {
    this.getList()
  },
  components: {
    List, newBanner
  }
}
</script>
<style scoped>
.banner {
	padding-left: 30px;
}
.box {
	margin-top: 20px;
	margin-bottom: 10px;
}
.bannerTable {
	width: 96%;
	margin-bottom: 30px;
}
</style>
