<template>
    <div>
        <h4>
            讨论详情
        </h4>
        <div class="detailWarp">
            <el-container>
                <el-main>
                    <el-form label-width="150px" class="demo-ruleForm">
                        <el-form-item label="标题：" style="overflow:hidden">
                            <div style="width:500px;float:left;height:40px;"> {{data.keyDisTitle}}</div>
                        </el-form-item>
                        <el-form-item label="创建时间：">
                            <span>{{data.ctime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                        </el-form-item>
                        <el-form-item label="类型：">
                            <span>{{data.type}}</span>
                        </el-form-item>
                        <el-form-item label="内容：">
                            <div>{{data.keyDisContent}}</div>
                        </el-form-item>
                        <el-form-item v-if="data.disImg !== ''" label="封面图：">
                            <div><img src="" alt=""></div>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </div>

        <div class="closebtn">
            <el-button @click="close">关闭</el-button>
        </div>
    </div>
</template>
<script>
import { getDisDetail } from '../../../service/getData.js'

export default {
    data(){
        return{
          data:{}
        }
    },
    filters:{
        dataFormat:function (value, fmt) {
            let getDate = new Date(value);
            let o = {
                'M+': getDate.getMonth() + 1,
                'd+': getDate.getDate(),
                'h+': getDate.getHours(),
                'm+': getDate.getMinutes(),
                's+': getDate.getSeconds(),
                'q+': Math.floor((getDate.getMonth() + 3) / 3),
                'S': getDate.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            for (let k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
                }
            }
            return fmt;
        }
    },
    components:{
    },
    mounted(){
    },
    methods:{
        close(){
            this.$router.go(-1)
        },
        getDisDetail(str){
            getDisDetail(str).then((res) => {
                var res = JSON.parse(res);

                if(res.data.type == 0){
                    res.data.type = '正在讨论'
                }else if(res.data.type == 1){
                    res.data.type = '问题征集'
                }
                this.data = res.data
                console.log(this.data)
            }).catch(err => {
                alert('error' + err);
            })
        }
    },
    computed:{
    },
    created(){
        var o = {
            keydisId:this.$route.query.keydisId
        }
        this.getDisDetail(o)
    }
}
</script>
<style lang="less" >
    h4{
        height: 40px;
        background: #666;
        color:#fff;
        line-height: 40px;
        padding-left: 30px;
    }
    .closebtn{
        padding:40px 0 0 600px ;
        z-index: 8889999;
        position: fixed;
        bottom: 0px;
        width: 877px;
        height: 120px;
        background: #ffffff;
    } 
</style>

