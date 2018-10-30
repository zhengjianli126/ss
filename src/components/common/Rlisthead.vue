<template>
        <div>
            <form>
            <ul>      
                <li v-for="item in list" :key="item.id">
                    <span>{{item.name}} </span>：
                     <div class="block" v-if="!item.type">
                        <el-date-picker
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        v-model='item.names.value'>
                        </el-date-picker>
                    </div>
                    <select v-if="!item.flag" v-model='item.names.value'>
                        <option v-for="x in item.option" :value="x.value" :key="x.id" >{{x.key}}</option>
                    </select>
                    <input :type="item.type" :placeholder="item.plaseholder" v-model='item.names.value' v-if="item.flag"/>
                    
                </li>
                <li><button @click="searchAction">查询</button></li>
            </ul>
            </form>
        </div>
</template>
<script>
import { Listheadsr } from '../../service/getData.js'
import Bus from './bus.js'
export default {
    props:['head'],
    data(){
        return{
            list:this.head,
            data:[]
        }
    },
        create(){
        },
        methods : {
			searchAction(){
                var params = {};
                var arr=this.list
                var value=''
                var pkey=''
				for(var  x in arr){
                    value=  arr[x].names.value;
                    pkey=arr[x].keys
                   params[pkey]=value
                }
               Listheadsr(params).then((res) => {
                this.data=res
                Bus.$emit("getdatas",res)
				}).catch(err => {
				 	alert('error'+err);
				})
        },
        
        } 
        
    
}
</script>
 <style lang="less" scoped>
div{
    
   ul{
       overflow: hidden;
       li{
           font-size: 14px;
            float: left;
            padding-right: 50px;
            height: 30px;
            padding-bottom: 20px;
            overflow: hidden;
            margin-bottom: 20px;
            span{
                width: 80px;
                display:inline-block;
                text-align: right
                
            }
           input{
               height: 20px;
               width: 150px;
              
           }
           select{
               height: 20px;
               width: 150px;
               text-align: center;
              
           }
       }
       button{
           height: 30px;
           width: 80px;
           border-radius: 10px;
           background: hsl(204, 76%, 42%);
           color: #fff
       }
   }
}
</style>




