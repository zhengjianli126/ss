<template>
<div>
    <div style="width:100%;height:25px;background:#ccc;">详情</div>
    <div class="meetbase">
      <div style="height:25px;background:#ccc;font-size:14px;line-height:25px;">会议基础信息</div>
      <div class="meetbaseOne">
        <div class="meetbaseLeft">
          <Listhead :head='head' @getparams="searchAction"></Listhead>
        </div>
        <div class="meetbaseRight">
          <div class="rightmain">
            <p>封面图:</p>
            <div>
              <div style="width:100px;height:30px;border:1px solid #ccc;"></div>
              <span>图片上传大小限制100kb,格式:jpg/jpeg/png</span>
            </div>
          </div>
          <div class="rightcount">
            <p>会议内容:</p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="meetbase">
      <div style="height:25px;background:#ccc;font-size:14px;line-height:25px;">会议日程</div>
      <div class="basedata">

      </div>
    </div>
    <div class="meetbase">
      <div style="height:25px;background:#ccc;font-size:14px;line-height:25px;">嘉宾介绍</div>
      <div class="basedata">

      </div>
    </div>
</div>
    
</template>
<script>
import Bus from '../common/bus.js'
import List from './meetlist.vue'
import Listhead from '../common/listhead.vue'
import Pagination from '../common/Pagination.vue'
import {mapState,mapMutations} from 'vuex'
import { getMeetInfo } from '../../service/getData.js'
export default {
    data(){
        return {
            arr:{},
           data:{}
        }
    },
    create(){
      console.log(this.$route.query)
             this.arr=this.$route.query.data
        },
    mounted () {
        // var id = this.$route.query.detailId
        // console.log(id)
        // this.getdetail(id) // 接收数据
    },
    methods:{
       ...mapMutations(["detail","undetail"]),
      //  getdetail(id) {
      //     console.log(id)
      //     var params = {}
      //     params.meetId = id
      //       getMeetInfo(params).then((res) => {
      //       console.log(res)
            
      //       }).catch(err => {
      //           alert('error'+err);
      //       })
      //   },
		searchAction(str){
            console.log(str)
            getMeetsByCondition(str).then((res) => {
            console.log(res)
        //    this.listdata=res
        //        Bus.$emit("getpage",res)
            Bus.$emit("getdata",res)
            }).catch(err => {
                alert('error'+err);
            })
        }
    },
    computed:{
        //  ...mapState(["flag1",'datas'])
    },
    components:{
        Listhead,List,Pagination

    }
}
</script>
<style scoped>
  .meetbase{
    margin:30px 50px;
    height:370px;
    border:1px solid #eee;
   
  }
  .meetbaseOne{
     padding:20px;
  }
  .meetbaseLeft{
    float: left;
    width:300px;
    border-right:1px solid #ccc;
  }
  .meetbaseRight{
    float:left;
    margin-left:20px;
  }
  .rightmain{
    display: flex;
  }
  .rightmain p{
    width:100px;
  }
  .rightmain div{
    flex:1;
  }
  .rightmain span{
    font-size: 14px;
    margin-top:20px;
    display: inline-block;
  }
  .rightcount{
    display: flex;
    margin-top:20px;
  }
  .rightcount p{
    width:100px;
  }
  .rightcount textarea{
    flex:1;
  }
  .basedata{
    height:220px;
    width:90%;
    margin:20px auto;
    border:1px solid #ccc;
  }
</style>


