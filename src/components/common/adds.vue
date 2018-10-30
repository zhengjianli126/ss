<template>
<div>
    <h3>新增</h3>
    <ul>
        <li v-for="item in list" :key="item.id">  
                    {{item.name}} 
                    <select v-if="!item.flag">
                        <option v-for="x in item.option" :value="x.one" :key="x.id" >{{x.key}}</option>
                    </select>
                    <input :type="item.type" :placeholder="item.plaseholder" v-if="item.flag"/>
        </li>
    </ul>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            list:[ {
                    id:'01',
                   name:'操作员账号' ,
                   type:'text',
                   plaseholder:'',
                   flag:false,
                   option:[
                       {
                           id:'01',
                           key:"111"
                           }
                   ]
                }]
        }
    },
    create(){
       
    }
}
</script>

