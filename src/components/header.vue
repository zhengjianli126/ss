<template>
	<div class="headerWrap" :class="{'widthWrap':isHidden}">
        <el-menu
        style="height:100%;"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#304156"
        text-color="#fff"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        active-text-color="#409eff">
        <div class="navLogo verMiddle" v-show="isHidden">
            <img src="../assets/img/logo.png" alt="">
        </div>
        
        <el-submenu index="1" v-show="isshow('0001')">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item  v-show="isshow('0002')" index="/omanagement">操作员信息管理</el-menu-item>
                <el-menu-item  v-show="isshow('0003')"  index="/rmanagement">操作员角色管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="/user" v-show="isshow('0004')">
            <i class="el-icon-location"></i>
            <span slot="title">用户管理</span>
        </el-menu-item>

        <el-submenu index="2" v-show="isshow('0005')">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>基础管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-show="isshow('0006')" index="/banner">Banner设置</el-menu-item>
                <el-menu-item v-show="isshow('0007')" index="/textlable">文章标签管理</el-menu-item>
                <el-menu-item v-show="isshow('0008')" index="/question">问题标签管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-show="isshow('0009')">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-show="isshow('0010')" index="/task">待审任务</el-menu-item>
                <el-menu-item v-show="isshow('0011')" index="/mytask">我的任务</el-menu-item>
                <el-menu-item v-show="isshow('0030')" index="/MyArticle">我的投稿</el-menu-item>
                <el-menu-item v-show="isshow('0012')" index="/grounding">上架管理</el-menu-item>
                <el-menu-item v-show="isshow('0013')" index="/textlist">文章列表</el-menu-item>
                <el-menu-item v-show="isshow('0014')" index="/backtext">退稿列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" v-show="isshow('0015')">         
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>会议管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-show="isshow('0016')" index="/meetnew">会议资讯</el-menu-item>
                <el-menu-item v-show="isshow('0017')" index="/backmeet">往期回顾</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" v-show="isshow('0018')">   
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>问题管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-show="isshow('0019')" index="/questionManage/list">我的提问</el-menu-item>
                <el-menu-item v-show="isshow('0020')" index="/approveManage/list">审核管理</el-menu-item>
                <el-menu-item v-show="isshow('0021')" index="/launchManage/list">上架管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6" v-show="isshow('0022')">           
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>综合管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-show="isshow('0023')" index="/template">模板管理</el-menu-item>
                <el-menu-item v-show="isshow('0024')" index="/questionnaire">问卷管理</el-menu-item>
                <el-menu-item v-show="isshow('0025')" index="/newdiscuss">正在讨论</el-menu-item>
                <el-menu-item v-show="isshow('0026')" index="/goods">商品管理</el-menu-item>
                <el-menu-item v-show="isshow('0027')" index="/wish">许愿管理</el-menu-item>
                <el-menu-item v-show="isshow('0028')" index="/search">搜索管理</el-menu-item>
                <el-menu-item v-show="isshow('0029')" index="/report">举报列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
	</div>
</template>
<script type="text/javascript">
	export default{
		data () {
			return {
                index:0,
                isCollapse:false,
                isHidden:true,
                userMenuList:[]


			}
		},
		mounted (){
            this.Emit.$on('closeCollsap',this.closeCollsap);
            let menuList = JSON.parse(localStorage.getItem("users")).data;
            let fir_menu = [];
            menuList.forEach((item) => {
                fir_menu.push(item.menuId)
                let cur = item.children;
                if(cur.length>0){
                    cur.forEach((item1)=>{
                      
                        fir_menu.push(item1.menuId)
                    })
                }    
            });
           this.userMenuList = fir_menu
          //  console.log(fir_menu,"userMenuList")
            console.log(this.userMenuList,"userMenuList")
            console.log(this.isshow("0001"))
            
        },
        destoryed(){
            this.Emit.$off('closeCollsap');
        },
		methods : {
			handleOpen(key, keyPath) {
				
			},
			handleClose(key, keyPath) {
				
            },
            isshow(menuId){
                let num = this.userMenuList.indexOf(menuId)
                return num>-1?true:false
            },
            routeTo(e) {
                this.$router.push(e);
            },
            closeCollsap(){
                this.isCollapse = !this.isCollapse;
                this.isHidden = !this.isHidden;
            }
		}
	}
</script>
<style type="text/css" lang="less">
	/*页面中使用px2rem*/
     @import '../styles/rem.less';
     .headerWrap.widthWrap{
         width:180px;
     }
	 .headerWrap{
        
        height:100%;
        position:fixed;
        z-index: 0;
        left:0;
        top:0;
        bottom:0;
        background:#304156;
        overflow: auto;
        .navLogo{
            width:100%;
            height:70px;
            background:#304156;
            box-sizing:border-box;
            text-align:left;
            padding-left:20px;
            img{
                vertical-align:middle;
            }
        }
        .el-submenu .el-menu-item{
            min-width:100px;
            background:#1f2d3d !important;
        }
        .el-submenu .el-menu-item:hover{
            background:#001528 !important;
        }
        .el-menu .el-menu--inline{
            background:#1f2d3d !important;
        }
        .el-menu-item-group__title{
            display:none;
        }
     }
</style>