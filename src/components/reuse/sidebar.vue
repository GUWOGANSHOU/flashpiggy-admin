<template>
            <div class="l-sidebar">
                <div class="logo-box">
                    <div class="logo-title">
                        <span class="logo-title1">MOBEE</span>
                        <span class="logo-title2">SUPER</span>
                    </div>
                </div>
                <div class="l-sidebar-main">
                    <ul class="main-icons">
                        <li @click.stop.prevent="toggleTab(a=1)"   :class="{ui_on:isTitle1}">
                            <router-link to="/business_info" class="main-icons-wrap zhuye-icon"></router-link>
                            <!-- <a href="" class="main-icons-wrap zhuye-icon"></a> -->
                        </li>
                        <li @click.stop.prevent="toggleTab(a=2)"    :class="{ui_on:isTitle2}">
                            <router-link to="/user_info" class="main-icons-wrap user-icon"></router-link>
                            <!-- <a href="" class="main-icons-wrap user-icon"></a> -->
                        </li>
                        <li @click.stop.prevent="toggleTab(a=3)"   :class="{ui_on:isTitle3}">
                            <router-link to="/shop_info" class="main-icons-wrap shop-icon"></router-link>
                            <!-- <a href="" class="main-icons-wrap shop-icon"></a> -->
                        </li>
                        <li @click.stop.prevent="toggleTab(a=4)"   :class="{ui_on:isTitle4}">
                            <router-link to="/system_set/server_info" class="main-icons-wrap set-icon"></router-link>
                            <!-- <a href="" class="main-icons-wrap shop-icon"></a> -->
                        </li>
                    </ul>
                </div>
                <busi_extrabar v-if="a==1"></busi_extrabar>
                <user_extrabar v-else-if="a==2"></user_extrabar>
                <project_extrabar v-else-if="a==3"></project_extrabar>
                <set_extrabar v-else="a==4"></set_extrabar>
            </div>
</template>

<script>
import Bus from '../../bus.js';
import busi_extrabar from "../busi/business_extrabar.vue";
import user_extrabar from "../user/user_extrabar.vue";
import project_extrabar from "../project/project_extrabar.vue";
import set_extrabar from "../set/set_extrabar.vue";
export default {
    created(){
        Bus.$on('getData', (a, isTitle3, isTitle1)=>{
            this.a = a;
            this.isTitle3 = isTitle3;
            this.isTitle1 = isTitle1;
        })
    },
   components:{
       busi_extrabar,
       user_extrabar,
       project_extrabar,
       set_extrabar
   },
    data(){
        return{
            a:1,
            isTitle1:true,
            isTitle2:false,
            isTitle3:false,
            isTitle4:false
        }
    },
    methods:{
        toggleTab:function(a){
            if(a==1){
                this.isTitle1=true;
                this.isTitle2=false;
                this.isTitle3=false;
                this.isTitle4=false;
            }else if(a==2){
                this.isTitle2=true;
                this.isTitle1=false;
                this.isTitle3=false;
                this.isTitle4=false;
            }else if(a==3){
                this.isTitle2=false;
                this.isTitle1=false;
                this.isTitle3=true;
                this.isTitle4=false;
            }else{
                this.isTitle2=false;
                this.isTitle1=false;
                this.isTitle3=false;
                this.isTitle4=true;
            }
        }

        }
    }
</script>

<style>
/* 侧边栏 */

.l-sidebar {
    float: left;
    height: 100em;
    background-color: #323641;
    margin-left: -100%;
    width: 15em;
}
.l-sidebar-main {
    float: left;
    width: 3em;
    height: 95em;
    background-color: #282b34;
}

.main-icons li.ui_on::before,
.main-icons a:hover::before {
    content: "";
    position: absolute;
    width: .2em;
    height: 100%;
    background: url(../../assets/bg_pre-left.png) no-repeat 0 0;
}
.main-icons li {
    height: 2em;
    margin: 1em 0;
}
.main-icons li.ui_on {
    background-color: #464951;
}

.main-icons a:hover{
    background-color: #464951;
}
.main-icons-wrap {
    display: inline-block;
    width: 3em;
    height: 2em;
}
.zhuye-icon {
    background: url(../../assets/zhuye-icon.png) no-repeat .7em .2em;
    background-size: 1.5em 1.5em;
}
.user-icon {
    background: url(../../assets/user-icon.png) no-repeat .7em .2em;
    background-size: 1.5em 1.5em;
}
.shop-icon {
    background: url(../../assets/shop-icon.png) no-repeat .7em .2em;
    background-size: 1.5em 1.5em;
}
.set-icon {
    background: url(../../assets/set-icon.png) no-repeat .7em .2em;
    background-size: 1.5em 1.5em;
}
/* LOGO区 */
.logo-box {
    height: 5em;
    background: url(../../assets/bg_hov.png) repeat-y 0 0;
}
.logo-title{
    padding: 1.25em .5em;
}
.logo-title1 {
    font-size: 2.5em;
    color:#ffffff;
}
.logo-title2 {
    font-size: 1.5em;
}
</style>
