<template>
    <div class="indexHeadWrap">
        <div class="collaspWrap verMiddle" @click="tabCollasp">
            <img :class="{'rotate':isRoate,'returnRotete':!isRoate}" src="../../assets/img/collasp.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            user:'admin',
            isRoate:false,
        }
    },
    methods:{
        tabCollasp(){
            this.isRoate = !this.isRoate;
            this.Emit.$emit('closeCollsap');
        }
    }
}
</script>
<style lang="less">
@import '../../styles/rem.less';
.indexHeadWrap{
    height: 50px;
    background:#fff;
    width: 100%;
    box-shadow:1px 1px 1px #cecece;
    span{
        display: block;
        float: right;
    }
    .collaspWrap{
        width:30px;
        height:100%;
        margin-left:10px;
        cursor: pointer;
        img{
            width:20px;
            height:20px;
            vertical-align:middle;
        }
        img.rotate{
            transform: rotate(90deg);
            transition: 0.5s;
            transform-origin: 50% 50%;
        }
        img.returnRotete{
            transform: rotate(0deg);
            transition: 0.5s;
            transform-origin: 50% 50%;
        }
    }
}   
</style>

