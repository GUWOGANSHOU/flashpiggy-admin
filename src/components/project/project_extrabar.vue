<template>
<div class="l-sidebar-extra">
    <ul class="l-sidebar-extra_list">
        <li @click="toggleExtra(1)"   :class="{ui_on1:isExtra1}">
            <router-link to="/shop_info">门店列表</router-link>
        </li>
        <li  @click="toggleExtra(2)"    :class="{ui_on2:isExtra2}">
            <router-link :to="{path:'/project_info',query: {business_code: 1001}}">项目管理</router-link>
        </li>
        <li  @click="toggleExtra(3)"    :class="{ui_on3:isExtra3}">
            <router-link to="/project_info/mission_info">任务管理</router-link>
        </li>
        <li  @click="toggleExtra(4)"    :class="{ui_on4:isExtra4}">
            <router-link to="/project_info/question_info">问题管理</router-link>
        </li>
        <li  @click="toggleExtra(5)"    :class="{ui_on5:isExtra5}">
            <router-link to="/project_info/answer_info">答案管理</router-link>
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
            }else if(b==2){
                this.isExtra1=false;
                this.isExtra2=true;
                this.isExtra3=false;
                this.isExtra4=false;
                this.isExtra5=false;
            }else if(b==3){
                this.isExtra1=false;
                this.isExtra2=false;
                this.isExtra3=true;
                this.isExtra4=false;
                this.isExtra5=false;
            }else if(b==4){
                this.isExtra1=false;
                this.isExtra2=false;
                this.isExtra3=false;
                this.isExtra4=true;
                this.isExtra5=false;
            }else if(b==5){
                this.isExtra1=false;
                this.isExtra2=false;
                this.isExtra3=false;
                this.isExtra4=false;
                this.isExtra5=true;
            }

        }
    },
    computed: {

        },
    // created(){   
    //     console.log("getArgs");
    //     Bus.$on('getArgs',(isExtra1,isExtra2)=>{
         
    //         this.isExtra1 = isExtra1;
    //         this.isExtra2 = isExtra2;
    //     })
    // },
    mounted() {
        this.isExtra3 =  !!this.$route.query.isExtra3;
        this.isExtra4 = !!this.$route.query.isExtra4;
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
.l-sidebar-extra_list li.ui_on4::after {
    content: "";
    position: absolute;
    top: 16.50em;
    left: 11.5em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
.l-sidebar-extra_list li.ui_on5::after {
    content: "";
    position: absolute;
    top: 19.75em;
    left: 11.5em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}
</style>

