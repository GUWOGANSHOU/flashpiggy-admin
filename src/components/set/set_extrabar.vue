<template>
<div class="l-sidebar-extra">
    <ul class="l-sidebar-extra_list">
        <li @click="toggleExtra(1)"   :class="{ui_on1:isExtra1}">
            <router-link to="/system_set/server_info">服务发现</router-link>
        </li>
        <li  @click="toggleExtra(2)"    :class="{ui_on2:isExtra2}">
            <router-link to="/system_set/WXAPI_info">微信接口文档</router-link>
        </li>
        <li @click="toggleExtra(3)"   :class="{ui_on3:isExtra3}">
            <router-link to="/system_set/adminAPI_info">管理端接口文档</router-link>
        </li>
        <li @click="toggleExtra(4)"   :class="{ui_on4:isExtra4}">
            <router-link to="/system_set/Message_info">消息队列</router-link>
        </li>
        <li @click="toggleExtra(5)"   :class="{ui_on5:isExtra5}">
            <router-link to="/system_set/link_info">链路追踪</router-link>
        </li>
        <li @click="toggleExtra(6)"   :class="{ui_on6:isExtra6}">
            <router-link to="/system_set/adminconn_info">管理端连接池</router-link>
        </li>
        <li @click="toggleExtra(7)"   :class="{ui_on7:isExtra7}">
            <router-link to="/system_set/wxconn_info">微信端连接池</router-link>
        </li>
        <li @click="toggleExtra(8)"   :class="{ui_on8:isExtra8}">
            <router-link to="/system_set/setonline_info">在线配置中心</router-link>
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
            isExtra4:false,
            isExtra5:false,
            isExtra6:false,
            isExtra7:false,
            isExtra8:false,
        }
    },
    methods:{
        toggleExtra:function(b){
            if(b==1){
                this.isExtra1=true;
                this.isExtra2=false;
                this.isExtra3=false;
                this.isExtra4=false;
                this.isExtra5=false;
                this.isExtra6=false;
                this.isExtra7=false;
                this.isExtra8=false;
            }else if(b==2){
                this.isExtra2=true;
                this.isExtra1=false;
                this.isExtra3=false;
                this.isExtra4=false;
                this.isExtra5=false;
                this.isExtra6=false;
                this.isExtra7=false;
                this.isExtra8=false;
 
            }else if(b==3){
                this.isExtra2=false;
                this.isExtra1=false;
                this.isExtra3=true;
                this.isExtra4=false;
                this.isExtra5=false;
                this.isExtra6=false;
                this.isExtra7=false;
                this.isExtra8=false;
 
            }else if(b==4){
                this.isExtra2=false;
                this.isExtra1=false;
                this.isExtra3=false;
                this.isExtra4=true;
                this.isExtra5=false;
                this.isExtra6=false;
                this.isExtra7=false;
                this.isExtra8=false;
 
            }else if(b==5){
                this.isExtra2=false;
                this.isExtra1=false;
                this.isExtra3=false;
                this.isExtra4=false;
                this.isExtra5=true;
                this.isExtra6=false;
                this.isExtra7=false;
                this.isExtra8=false;
 
            }else if(b==6){
                this.isExtra2=false;
                this.isExtra1=false;
                this.isExtra3=false;
                this.isExtra4=false;
                this.isExtra5=false;
                this.isExtra6=true;
                this.isExtra7=false;
                this.isExtra8=false;
 
            }else if(b==7){
                this.isExtra2=false;
                this.isExtra1=false;
                this.isExtra3=false;
                this.isExtra4=false;
                this.isExtra5=false;
                this.isExtra6=false;
                this.isExtra7=true;
                this.isExtra8=false;
 
            }else if(b==8){
                this.isExtra2=false;
                this.isExtra1=false;
                this.isExtra3=false;
                this.isExtra4=false;
                this.isExtra5=false;
                this.isExtra6=false;
                this.isExtra7=false;
                this.isExtra8=true;
 
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
    top: 6.75em;
    position: absolute;
    left: 13em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}

.l-sidebar-extra_list li.ui_on2::after {
    content: "";
    position: absolute;
    top: 10em;
    left: 13em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on3::after {
    content: "";
    position: absolute;
    top: 13em;
    left: 13em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on4::after {
    content: "";
    position: absolute;
    top: 16em;
    left: 13em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on5::after {
    content: "";
    position: absolute;
    top: 19em;
    left: 13em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on6::after {
    content: "";
    position: absolute;
    top: 22em;
    left: 13em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on7::after {
    content: "";
    position: absolute;
    top: 25em;
    left: 13em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on8::after {
    content: "";
    position: absolute;
    top: 28em;
    left: 13em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}

</style>

