<template>
<div class="l-sidebar-extra">
    <ul class="l-sidebar-extra_list">
        <li @click="toggleExtra(1)"   :class="{ui_on1:isExtra1}">
            <router-link to="/business_info">总商信息</router-link>
        </li>
        <li  @click="toggleExtra(2)"    :class="{ui_on2:isExtra2}">
            <router-link to="/achievement_info">奖励成就</router-link>
        </li>
        <li @click="toggleExtra(3)"   :class="{ui_on3:isExtra3}">
            <router-link to="/permission_info">权限配置</router-link>
        </li>
    </ul>
</div>
</template>
<script>
export default {
     data(){
        return{
            isExtra1:true,
            isExtra2:false,
            isExtra3:false,
        }
    },
    methods:{
        toggleExtra:function(b){
            if(b==1){
                this.isExtra1=true;
                this.isExtra2=false;
                this.isExtra3=false;
            }else if(b==2){
                this.isExtra2=true;
                this.isExtra1=false;
                this.isExtra3=false;
            }else{
                this.isExtra2=false;
                this.isExtra1=false;
                this.isExtra3=true;
            }

        }
    }
}
</script>
<style>
.l-sidebar-extra_list a{
    text-decoration: none !important;
    color: #ffffff !important;
}
.l-sidebar-extra {
    float: left;
}
.l-sidebar-extra_list{
    margin: 1.5em 2em;
}
.l-sidebar-extra_list li{
    height: 2em;
    margin: 1em 0;
}
.l-sidebar-extra_list li.ui_on1::after {
    content: "";
    position: absolute;
    top: 6.75em;
    left: 11.5em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on2::after {
    content: "";
    position: absolute;
    top: 10em;
    left: 11.5em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on3::after {
    content: "";
    position: absolute;
    top: 13.25em;
    left: 11.5em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
</style>

