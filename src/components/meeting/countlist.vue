<template>
<div >
  <table border="1" cellpadding="0" cellspacing="" width='1030'>
            <tr>
               <th v-for="x in ths" :key="x.id" height='54'>{{x.key}}</th>
            </tr>
            <tr v-for='(x,index) in list' :key="index">
                <td><input type="checkbox" name="" id="" :value=x.phoneNum @change="aa" :checked='checked'></td>
                <td style="width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" title="x.meetTitle"> {{x.meetTitle}}</td>
                <td> {{x.beginTimeString}}</td>
                <td> {{x.endTime}} </td>
                <td> {{x.meetAttendCount}} </td>
                <td> {{x.isfinish}} </td>
                <td> {{x.ispublic}}</td>
                <!-- <td> {{x.specialCommittee}} </td>
                <td> {{x.userPosition}} </td>
                <td> {{x.ischeckLevel}} </td>
                <td >{{x.lastLoginTimeString}}</td> -->
                
            </tr>
         </table>
         
        <div v-if="flags" class="add">
            <Oupdate :flag='flags'></Oupdate>
        </div>
        <div v-if="flag1" class="add">
            <Odetails :flag='flag1'></Odetails>
        </div>
</div>
  
</template>

<script>
import Bus from '../common/bus.js'
import { GetDetails } from '../../service/getData.js'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'

  export default {
    props:['th','checked'],
    data() {
      return {
       ths:this.th,
       datas:{},
       list:[],
       value:{},
       phonenum:[]
      }
    },
   methods:{
       ...mapMutations(["update","detail"]), 
       getischeck(x){
           var  params = {};
              params.userId=x
            GetDetails(params).then((res) => {
                Bus.$emit("getuserdatas",res)
				}).catch(err => {
				 	alert('error'+err);
				})
       },
       aa(e){
          
            this.phonenum=[...this.phonenum,e.target.value]
              console.log( this.phonenum)
              this.$emit('childByValue', this.phonenum)
       }
         
    },
    computed:{
         ...mapState(["flags","flag1"])

    },
    mounted () {
      Bus.$on('getdata', (data) => {
        var data = JSON.parse(data);
      this.datas=data
      this.list=data.data.list
      })
     
    },
     components:{
            
    }
     
    }

</script>
<style scoped >
   table
        {
            border-collapse: collapse;
            
            text-align: center;
        }
        table td, table th
        {
            border: 1px solid #cad9ea;
            color: #666;
            height: 30px;
             text-align: center;
        }
        table thead th
        {
            background-color: #CCE8EB;
            width: 100px;
             text-align: center;
        }
        table tr:nth-child(odd)
        {
            background: #fff;
             text-align: center;
        }
        table tr:nth-child(even)
        {
            background: #F5FAFA;
             text-align: center;
        }
        *{margin: 0; padding: 0}
  .add{
    position: fixed;
    top: 50px ;
    left:500px;
    background: #ffffff;
    height: 565px;
    width: 533px;

}
    
</style>
